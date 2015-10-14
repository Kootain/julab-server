var SERVER_PORT = 8001;
var task= function task(app) {
	var Device = require('../utils/device/device');
  var tasks = {
        Scale:require('../utils/device/scale')(app)
      };
  var Async = require('async');
  var devices ={};
  var Q = require('q');  
    //TODO get connected devices  devices={MACA:ipA,MACB:ipB.....}

  var exec = require('child_process').exec;
  exec('arp -a',function(err,stdout,stderr){
    var ips=stdout.match(/(\d+\.){3}\d+/g);
    var MACs=stdout.match(/([0-9a-zA-Z]{2}:){5}[0-9a-zA-Z]+/g);

    for (var i = ips.length - 1; i >= 0; i--) {
      devices[MACs[i]]=ips[i];
    };
    var onlineDevices = [],    // [{MAC:??, ip:??, name:??, type:??}, ... ]
        offlineDevices=[],     // [{MAC:??, name:??}, ... ]
        unKownDevices=[];      // [{MAC：??, ip:??}, ... ]
    var deviceType=['Scale'];

    function getDeviceListOfAType(type){  
      var deferred = Q.defer();//
      app.models[type]
              .find(
                {where:{MAC:{inq:MACs}}},
                function(data){
                  for (var i = data.length - 1; i >= 0; i--) {
                    if(devices[data[i].MAC]){   //if exist in 'devices' => online  else  offline
                      devices[data[i].MAC]['known']=true;
                      data[i]['type']=type;
                      onlineDevices.push(data[i]);
                    } else {
                      offlineDevices.push(data[i]);
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
        if(!devices[mac]['known']) unKownDevices.push(mac);
      } 

      //generate devices socket, bind on app
      setTimeout(function(){
          app.onlineDevices = {
            list:onlineDevices,
            connectors:onlineDevices.map(function(e){ return new Device(e.name, e.ip, SERVER_PORT)})
          };
      },0);

      setTimeout(function(){
          app.unKownDevices ={
            list:unKownDevices,
            connctors:unKownDevices.map(function(e){ return new Device('unknown', e.ip, SERVER_PORT)})
          };
      },0);
      
      

      app.offlineDevices = offlineDevices;

      // register task for online devices.
      for (var i = knownDevices.length - 1; i >= 0; i--) {
        tasks[app.onlineDevices.list[i]['type']](app.onlineDevices.connectors[i]);
      }
    });
  });
}

//module.exports =  task;

/*
register a tasks to observe environment status.
1.connected device
  ** when connected, build socket to confirm indeicate device type.
  ** do qurey to confirm whether the certain device has registered by end user.
     # if registered, set 'true' flag to app.connected.[type].[certain device].isKnown
     # if unregistered, set 'false' flag to app.connected.[type].[certain device].isKnown
*/