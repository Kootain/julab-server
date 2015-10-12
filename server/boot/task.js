var task= function task(app) {
	var Device = require('../utils/device/device');
  var tasks = {
        Scale:require('../utils/device/scale')(app)
      };
  var Async = require('async');
  var devices ={};
  //TODO get connected devices  devices={MACA:ipA,MACB:ipB.....}
  var MACs = devices.map(function(v){return v.MAC});
	

  var knownDevices = [];
  var deviceType=['Scale'];
  for (var i = deviceType.length - 1; i >= 0; i--) {
    knownDevices = knownDevices.concat(app.models[deviceType[i]]
        .find({where:{MAC:{inq:MACs}}})
        .map( function(e) { return {'MAC':e.MAC,'name':name,ip:'',type:deviceType[i]} }));
  };
  
  var unKownDevices=[];

  for (var i = knownDevices.length - 1; i >= 0; i--) {
    if( devices[knownDevices[i]] ) {
      knownDevices[i].ip = device[knownDevices[i]];
      delete devices[knownDevices[i]];
    }
  }

  for (var i in devices) {
    unKownDevices.push({'MAC':i, 'ip':devices[i]});
  };

  knownDevices = knownDevices
                  .filter(function(e){ return e.ip})
                  .map(function(e){ return new Device(e.name, e.ip, 8001)});
  unKownDevices = unKownDevices.map(function(e){ return new Device('unknown', e.ip, 8001)})

  app.unKownDevices = unKownDevices;
  // Async.parallel([
  //   function(){  //check unknown devices
  //     for (var i = unKownDevices.length - 1; i >= 0; i--) {
  //       unKownDevices[i].connect(function(d){
  //         if(!d) {
  //           colorlog.log('unKown');
  //         } else {
  //           var certainDevice
  //           app.models[deviceType[i]].create
  //           //TODO 1.add to db 2.add to knownDevices 
  //         }
  //         unKownDevices[i].close(); 
  //       });
  //     };
  //   },
  //   function(){
  //     for (var i = unKownDevices.length - 1; i >= 0; i--) {
  //         unKownDevices[i].close(); 
  //     };
  //   },
  //   function(){  //build socket connection
  //     for (var i = knownDevices.length - 1; i >= 0; i--) {
  //       Scale(knownDevices[i]);
  //       //knownDevices[i].connect();
  //       //TODO  use different callback to process different action of devices.
  //     };
  //   }
  // ]);
  function(){  //build socket connection
    for (var i = knownDevices.length - 1; i >= 0; i--) {
      tasks[knownDevices[i].type]Scale(knownDevices[i]);
      //knownDevices[i].connect();
      //TODO  use different callback to process different action of devices.
    };
  }
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