module.exports = function(server,app) {
  var router = server.loopback.Router();

  router.get('/status', server.loopback.status());

  router.get('/env/devices',function(req,res,value){
  	//TODO use native api
    var onlines=app.onlineDevices.list || [];
    var offlines=app.offlineDevices || [];
    var data={
      'online':onlines,
      'offline':offlines
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
  
  server.use(router);
};
