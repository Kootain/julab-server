module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/status', app.loopback.status());

  router.get('/env/devices',function(req,res,value){
  	//TODO use native api
    var onlines = app.onlineDevices.list || [];
    var unKnown = app.unKnownDevices.list || [];
    var offlines = app.offlineDevices || [];

    unKnown = [{
      MAC: 'a2:12:31:d3:32',
      ip: '192.168.1.3',
      name: 'device1',
      type: 'Scale'
    }
    ]
    var data={
      'online':onlines,
      'offline':offlines,
      'unKnown':unKnown
    }

    /* data example
    {
      online:[{MAC:??, ip:??, name:??, type:??}, ... ],
      offline:[{MAC:??, name:??}, ... ],
      unKnown:[{MAC:??, name:??}, ... ]
    }
     */
  	res.json(data);
  });

  router.get('')
  
  app.use(router);
};
