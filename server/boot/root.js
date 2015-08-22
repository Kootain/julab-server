module.exports = function(server) {
  var router = server.loopback.Router();

  router.get('/status', server.loopback.status());

  router.get('/env/devices',function(req,res,value){
  	//TODO use native api
  	res.json([
  		{name:'scn3', type:'scanner'},
  		{name:'scale14', type:'scale'},
  		{name:'scn5', type:'scanner'},
  		{name:'taptop', type:'computer'}
  		]);
  });
  
  server.use(router);
};
