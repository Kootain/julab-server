var exec = require('child_process').exec;
var SERVER_PORT = 8080;
module.exports = function (app) {
  var Device = require('../utils/device/deviceNew');
  var tasks = {
        Scale:require('../utils/device/scale')(app)
      };
  var Async = require('async');
  var devices ={};
  var Q = require('q');
  var proxy = new require('eventproxy')();
    //TODO get connected devices  devices={MACA:ipA,MACB:ipB.....}

  app.onlineDevices = [];

  var deviceList = function(){
    if( new RegExp(/win.*/).test(process.platform)){
      var cmd = 'type dhcp.leases';
    }else{
      var cmd = './get_2.4g_stainfo.sh';
    }
    exec(cmd,function(err,data,stderr){
      data = data.toString();
      if(err) throw new Error(err)
      //30:10:b3:9a:5f:7a 192.168.100.174 QJZN-20151021YG
      console.log('=========');
      console.log(data);
      console.log('=========');
      var MACs=[];
      var ips=[];
      
      var ips=data.match(/(\d+\.){3}\d+/g);
      var MACs=data.match(/([0-9a-zA-Z]{2}:){5}[0-9a-zA-Z]+/g);

      proxy.after('try',ips.length,function(data){
        for(var i in data){
          if(data[i].flag){
            app.onlineDevices[data[i].MAC]={
              connector: data[i].connector,
              type : ''
            };
          }
        }
      });
      for (var i = ips.length - 1; i >= 0; i--) {
        if(app.onlineDevices[MACs[i]] === undefined){
          var connector = new Device(i, ips[i], MACs[i], SERVER_PORT);
          connector.try(proxy);
        }else{
          proxy.emit('try',{flag:false});
        }
      }
    
      //TODO: 掉线设备及时排除列表

      var offlineDevices=[],     // [{MAC:??, name:??, type: ??}, ... ]
          unKnownDevices=[];      // [{MAC：??, ip:??}, ... ]
      var deviceType=['Scale'];

      function getDeviceListOfAType(type){  
        var deferred = Q.defer();//
        app.models[type].find()
        .then(function(data){
          for (var i = data.length - 1; i >= 0; i--) {
            if(app.onlineDevices[data[i].MAC]){   //if exist in 'devices' => online  else  offline
              app.onlineDevices[data[i].MAC].type = type;
              app.onlineDevices[data[i].MAC].new = true;
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
        for(var mac in app.onlineDevices){
          if(app.onlineDevices[mac].new === true){
            app.onlineDevices[mac].new = false;
          }else{
            app.onlineDevices[mac].type = '';
            unKnownDevices[mac] = app.onlineDevices[mac];
            app.onlineDevices[mac].new = false;
          }
        }
        app.offlineDevices = offlineDevices;
        console.log('OFFLINE:',app.offlineDevices);
        console.log('ONLINE:',app.onlineDevices);
        setTimeout(function() {
          deviceList();
        }, 5000);
      });
    });
  }

  deviceList();
}
