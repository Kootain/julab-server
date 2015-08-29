module.exports =function device (name, ip, port){
	var _name = name;
	var _ip = ip;
	var _port =port;
	var client = new  require('net').Socket();
	var isConnected=false;
	device.colorlog = require('../tools/colorlog');

	device.prototype.connect= function (callback){
		console.log(_name +' '+_ip+ ' '+_port);
		if(isConnected) {
			device.colorlog.error(device.colorlog.log[name, ' already connected']);
			return false;
		}

		client.connect(_port, _ip, function(){
			
			isConnected= true;
			device.colorlog.log(['connected device',_name,': ',_ip,':',_port]);
		});

		client.on('data', callback);

		client.on('close', function() {
		    device.colorlog.info(['connection with ', _name ,' closed.']);
		});

		return true;
	};

	device.prototype.close=function (){
		if(isConnected) {
			device.colorlog.error(device.colorlog.log[name, ' already closed']);
			return false;
		}
		client.end();
		return true;
	}

	device.prototype.send=function (data){
		if(!isConnected){
			device.colorlog.error(device.colorlog.log[name, ' already connected']);
			return false;
		}

		client.write(data);
	}
}