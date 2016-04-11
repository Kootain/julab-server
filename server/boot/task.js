// var exec = require('child_process').exec;
// var SERVER_PORT = 8080;
// module.exports = function (app) {
//   console.log('called');
//     var Device = require('../utils/device/device');
//   var tasks = {
//         Scale:require('../utils/device/scale')(app)
//       };
//   var Async = require('async');
//   var devices ={};
//   var Q = require('q');  
//     //TODO get connected devices  devices={MACA:ipA,MACB:ipB.....}

//   app.onlineDevices = {
//           list: [],
//           connectors: []
//         };
//   if( new RegExp(/win.*/).test(process.platform)){
//     var cmd = 'type dhcp.leases';
//   }else{
//     var cmd = './get_2.4g_stainfo.sh';
//   }
//   exec(cmd,function(err,data,stderr){
//     data = data.toString();
//     if(err) throw new Error(err)
//     //30:10:b3:9a:5f:7a 192.168.100.174 QJZN-20151021YG
//     console.log('=========');
//     console.log(data);
//     console.log('=========');
//     var MACs=[];
//     var ips=[];    
//     var ips=data.match(/(\d+\.){3}\d+/g);
//     var MACs=data.match(/([0-9a-zA-Z]{2}:){5}[0-9a-zA-Z]+/g);

//     for (var i = ips.length - 1; i >= 0; i--) {
//       devices[MACs[i]]={
//         ip: ips[i],
//         known : false
//       };
//     };

//     var onlineDevices = [],    // [{MAC:??, ip:??, name:??, type:??, ip: ??}, ... ]
//         offlineDevices=[],     // [{MAC:??, name:??, type: ??}, ... ]
//         unKnownDevices=[];      // [{MAC：??, ip:??}, ... ]
//     var deviceType=['Scale'];

//     function getDeviceListOfAType(type){  
//       var deferred = Q.defer();//
//       app.models[type].find()
//       .then(function(data){
//         for (var i = data.length - 1; i >= 0; i--) {
//           if(devices[data[i].MAC]){   //if exist in 'devices' => online  else  offline
//             devices[data[i].MAC].known=true;
//             data[i]['type']=type;
//             var aDevice={
//               'MAC' : data[i].MAC, 
//               'name' : data[i].name, 
//               'type' : type,
//               'ip' : devices[data[i].MAC].ip  
//             };
//             app.onlineDevices.list.push(aDevice);
//             var connector=new Device(aDevice.name, aDevice.ip, SERVER_PORT);
//             app.onlineDevices.connectors.push(connector);
//             tasks[type](connector,data[i]);
//           } else {
//             offlineDevices.push({
//               'MAC' : data[i].MAC, 
//               'name' : data[i].name, 
//               'type' : type 
//             });
//           }
//         };
//         deferred.resolve();
//       });
//       return deferred.promise;
//     }

//     var jobs=[];
//     for (var i = deviceType.length - 1; i >= 0; i--) {
//       jobs.push(getDeviceListOfAType(deviceType[i]));
//     };

//     Q.all(jobs)  
//     .done(function(){   
//       //mark unknown
//       for(var mac in devices){
//         if(!devices[mac].known) unKnownDevices.push({MAC:mac,ip:devices[mac].ip});
//       } 

//       // //generate devices socket, bind on app
//       // process.nextTick(function(){
//       //   app.onlineDevices = {
//       //     list: onlineDevices,
//       //     connectors: onlineDevices.map(function(e){ return new Device(e.name, e.ip, SERVER_PORT)})
//       //   };

//       //   console.log("KNOWN\t",app.onlineDevices);

//       //   // register task for online devices.
//       //   for (var i = app.onlineDevices.list.length - 1; i >= 0; i--) {
//       //     tasks[app.onlineDevices.list[i]['type']](app.onlineDevices.connectors[i],{app.onlineDevices.list[i]});
//       //   }
//       // });

//       process.nextTick(function(){
//         var list = unKnownDevices.map(function(e){ 
//           e.connector=new Device('unknown', e.ip, SERVER_PORT);
//           return e;
//         });

//         app.unKnownDevices = {};

//         for (var i = list.length - 1; i >= 0; i--) {
//           app.unKnownDevices[list[i].MAC] = list[i];
//         };
//         console.log('OFFLINE:',app.offlineDevices);
//         console.log('ONLINE:',app.onlineDevices);
//         console.log('UNKNOWN:',app.unKnownDevices);
//       });

//       app.offlineDevices = offlineDevices;

//     });
//   });
// }


// /*
// register a tasks to observe environment status.
// 1.connected device
//   ** when connected, build socket to confirm indeicate device type.
//   ** do qurey to confirm whether the certain device has registered by end user.
//      # if registered, set 'true' flag to app.connected.[type].[certain device].isKnown
//      # if unregistered, set 'false' flag to app.connected.[type].[certain device].isKnown
// */