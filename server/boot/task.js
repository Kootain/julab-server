var SERVER_PORT = 8080;
module.exports = function (app) {
  console.log('called');
	var Device = require('../utils/device/device');
  var tasks = {
        Scale:require('../utils/device/scale')(app)
      };
  var Async = require('async');
  var devices ={};
  var Q = require('q');  
    //TODO get connected devices  devices={MACA:ipA,MACB:ipB.....}

  app.onlineDevices = {
          list: [],
          connectors: []
        };
  var exec = require('child_process').exec;
  exec('arp -a',function(err,stdout,stderr){
    //if(err) throw new Error(err)
    stdout='192.168.100.152  0x1         0x2         8c:88:2b:00:1f:80     *        br-lan';
    console.log('=========');
    console.log(stdout);
    console.log('=========');
    if( new RegExp(/win.*/).test(process.platform)){
      stdout='192.168.100.105  0x1         0x2         ac-bc-32-8d-9d-5d     *        br-lan';
      var ips = stdout.match(/(\d+\.){3}\d+/g);
      ips.shift();
      var MACs = stdout.match(/([0-9a-zA-Z]{2}\-){5}[0-9a-zA-Z]+/g);
      console.log(MACs);
      MACs = MACs.map(function(e){ return e.replace('-',':')});
    } else {
      var ips=stdout.match(/(\d+\.){3}\d+/g);
      var MACs=stdout.match(/([0-9a-zA-Z]{2}:){5}[0-9a-zA-Z]+/g);
    }

    for (var i = ips.length - 1; i >= 0; i--) {
      devices[MACs[i]]=ips[i];
    };
    var onlineDevices = [],    // [{MAC:??, ip:??, name:??, type:??, ip: ??}, ... ]
        offlineDevices=[],     // [{MAC:??, name:??, type: ??}, ... ]
        unKnownDevices=[];      // [{MAC：??, ip:??}, ... ]
    var deviceType=['Scale'];

    function getDeviceListOfAType(type){  
      var deferred = Q.defer();//
      app.models[type].find({where:{MAC:{inq:MACs}}})
      .then(function(data){
        for (var i = data.length - 1; i >= 0; i--) {
          if(devices[data[i].MAC]){   //if exist in 'devices' => online  else  offline
            devices[data[i].MAC]['known']=true;
            data[i]['type']=type;
            var aDevice={
              'MAC' : data[i].MAC, 
              'name' : data[i].name, 
              'type' : type,
              'ip' : devices[data[i].MAC]  
            };
            app.onlineDevices.list.push(aDevice);
            var connector=new Device(aDevice.name, aDevice.ip, SERVER_PORT);
            app.onlineDevices.connectors.push(connector);
            tasks[type](connector,data[i]);
          } else {
            offlineDevices.push({
              'MAC' : data[i].MAC, 
              'name' : data[i].name, 
              'type' : type 
            });
          }
        };
        deferred.resolve();
      });
      return deferred.promise;
    }

    var jobs=[];
    for (var i = deviceType.length - 1; i >= 0; i--) {
      jobs.push(getDeviceListOfAType(deviceType[i]));
    };

    Q.all(jobs)  
    .done(function(){   
      //mark unknown
      for(var mac in devices){
        if(!devices[mac]['known']) unKnownDevices.push({MAC:mac,ip:devices[mac]});
      } 

      // //generate devices socket, bind on app
      // process.nextTick(function(){
      //   app.onlineDevices = {
      //     list: onlineDevices,
      //     connectors: onlineDevices.map(function(e){ return new Device(e.name, e.ip, SERVER_PORT)})
      //   };

      //   console.log("KNOWN\t",app.onlineDevices);

      //   // register task for online devices.
      //   for (var i = app.onlineDevices.list.length - 1; i >= 0; i--) {
      //     tasks[app.onlineDevices.list[i]['type']](app.onlineDevices.connectors[i],{app.onlineDevices.list[i]});
      //   }
      // });

      process.nextTick(function(){
        app.unKnownDevices ={
          list: unKnownDevices,
          connectors: unKnownDevices.map(function(e){ return new Device('unknown', e.ip, SERVER_PORT)})
        };
      });

      app.offlineDevices = offlineDevices;

      console.log("UNKNOWN\t",app.unKnownDevices);

    });
  });
}


/*
register a tasks to observe environment status.
1.connected device
  ** when connected, build socket to confirm indeicate device type.
  ** do qurey to confirm whether the certain device has registered by end user.
     # if registered, set 'true' flag to app.connected.[type].[certain device].isKnown
     # if unregistered, set 'false' flag to app.connected.[type].[certain device].isKnown
*/