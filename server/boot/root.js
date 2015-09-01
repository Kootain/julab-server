module.exports = function(server) {
  var router = server.loopback.Router();

  router.get('/status', server.loopback.status());

  router.get('/env/devices',function(req,res,value){
  	//TODO use native api
  	res.json([
  		{name:'scn3', type:'scanner',MAC:'23B2A4C2222124'},
  		{name:'scale14', type:'scale',MAC:'23B2A4C2D27117'},
  		{name:'scn5', type:'scanner',MAC:'23B2A4C2027914'},
  		{name:'taptop', type:'web',MAC:'23B2A4C22A8124'}
  		]);
  });
  
  server.use(router);
};
