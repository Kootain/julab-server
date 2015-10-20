module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/status', app.loopback.status());

  router.get('/env/devices',function(req,res,value){
  	//TODO use native api
    var onlines = app.onlineDevices.list || [];
    var unKnown = app.unKnownDevices.list || [];
    var offlines = app.offlineDevices || [];
    var data={
      'online':onlines,
      'offline':offlines,
      'unKnown':unKnown
    }

    /* data example
    {
      online:[{MAC:??, ip:??, name:??, type:??}, ... ]
      offline:[{MAC:??, name:??}, ... ]
    }
     */
  	res.json(data);
  });

  router.get('')
  
  app.use(router);
};
