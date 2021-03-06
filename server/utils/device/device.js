var device = function (name, ip, port){
	var _name = name;
	var _ip = ip;
	var _port =port;
	var client = new  require('net').Socket();
	var isConnected=false;
	var _info=null;
	var colorlog = require('../../tools/colorlog');

	this.getInfo = function (){
		return {
			name:_name,
			ip:_ip
		};

	};

	this.getDeviceDetails = function (model,MAC){
		model.find({'where': {'MAC': MAC}})
		.then(function(data){
			if(data.length != 1){
				throw new error('duplicate result returned');
			} else {
				_info = data[0];
			}
		});
	};

	this.connect = function (callback){
		console.log(_name +' '+_ip+ ' '+_port);
		if(isConnected) {
			colorlog.error(colorlog.log[_name, ' already connected']);
			return false;
		}

		client.connect(_port, _ip, function(){
			isConnected= true;
			colorlog.log(['connected device: ',_name||'undefined',', ',_ip,':',_port]);
		});

		client.on('data', function(data){
			colorlog.info(['get data from server']);
			colorlog.warning([data.toString()]);
			callback(data);
		});

		client.on('close', function() {
		    colorlog.info(['connection with ', _name ,' closed.']);
		});

		return true;
	};

	this.close=function (){
		if(!isConnected) {
			colorlog.error(colorlog.log([_name, ' already closed']));
			return false;
		}
		client.end();
		return true;
	};

	this.send=function (data){
		if(!isConnected){
			colorlog.error(colorlog.log[_name, ' already connected']);
			return false;
		}

		client.write(data);
	};
}

module.exports = device;