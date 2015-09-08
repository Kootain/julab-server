module.exports = function task(app) {
	var onlineDevice=require('../utils/onlines');
	var ips=[];
	for(var i=0; i<onlineDevice.length; i++){
		ips.push(onlineDevice[i].MAC);
	}
	var scales=app.models.Scale.find({where:{MAC:{inq:ips}}});
}