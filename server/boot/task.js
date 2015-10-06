var task= function task(app) {
	var Device = require('../utils/device/device');
  var Async = require('async');
  var devices ={};
  //TODO get connected devices  devices={MACA:ipA,MACB:ipB.....}
  var MACs = devices.map(function(v){return v.MAC});
	var knownDevices = app.models.Device
		    .find({where:{MAC:{inq:MACs}}})
        .map( function(e) { return {'MAC':e.MAC,'name':name,ip:''} });
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

  Async.parallel([
    function(){  //check unknown devices
      for (var i = unKownDevices.length - 1; i >= 0; i--) {
        unKownDevices[i].connect(function(d){
          if(d) 
            colorlog.log('add device to db'); 
          unKownDevices[i].close(); 
        });
      };
    },
    function(){
      for (var i = unKownDevices.length - 1; i >= 0; i--) {
          unKownDevices[i].close(); 
      };
    },
    function(){  //build socket connection
      for (var i = knownDevices.length - 1; i >= 0; i--) {
        //knownDevices[i].connect();
        //TODO  use different callback to process different action of devices.
      };
    }
  ]);
/////////////TODO ansync block  use Q.






///////////////

}

module.exports =  function  (app) {
}

/*
register a tasks to observe environment status.
1.connected device
  ** when connected, build socket to confirm indeicate device type.
  ** do qurey to confirm whether the certain device has registered by end user.
     # if registered, set 'true' flag to app.connected.[type].[certain device].isKnown
     # if unregistered, set 'false' flag to app.connected.[type].[certain device].isKnown
*/