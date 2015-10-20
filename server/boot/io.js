module.exports = function io(app) {
	app.io = require('socket.io')(app.start());
	HashSet = require('../tools/HashSet');
	colorlog = require('../tools/colorlog');
	/*-------device type------
	 * scanner
	 * web
	 *
	 */

	app.todo={
		scanner: new HashSet(),
		web: new HashSet()
	}

	//var scanner=app.connected.scanner;
	//var web=app.connected.web;
	//var todo=app.todo;
	// socket jobs for different devices
	var jobs=function(){};
	jobs.list={
		web: 		function(socket){
						var todo=app.todo;
						var scanner=app.connected.scanner;
						/*  job type list
						 *  * add reagent
						 *  * find reagents
						 */
						socket.on('submit job', function (data) {
							todo.scanner.add(data.serial);
							for(var id in scanner){
								scanner[id].emit('notify job',
									{ detail: data, owner: socket.id });
							}
						});

					},	
		scanner: 	function(socket){
						var todo=app.todo;
						socket.on('notify accept job',function (data){
							if(!todo.scanner.contains(data.serial)){
								colorlog.log([colorlog.yellow(data.serial),' was ',colorlog.red('expired'),'!']);
								socket.emit('cancel job', {serial: data.detail.serial});
								return;
							}
							colorlog.log([colorlog.yellow(data.serial),' was ',colorlog.green('accepeted'),'!']);
							socket.emit('register job',{serial: data.detail.serial});
							todo.scanner.remove(data.serial);
						});

						socket.on('get reagent rfid result', function (data){
							web[data.owner].emit('reagent add notify rfid',
									{ serial: data.serial, rfid: data.rfid }
								);
						});

						socket.on('search report', function (data){
							app.models.RfidInfo.update(
								{ id: { in: data.toFind } }, 
								{gmt_visited: (new Date()).toGMTString() },
								function(err, info){
									colorlog.error(err.message);
								});
						})
					}
		};
	jobs.registerJobs=function(type,socket){
		if(!this.list.hasOwnProperty(type)) {
			colorlog.warning('don\'t have property of '+type);
			return;
		}
		this.list[type](socket);
	};




	app.io.on('connection', function (socket) {
		socket.on('in',function(data){
			app.connected[data.type][socket.id]=socket;
			jobs.registerJobs(data.type, socket);
		});
	});
}

/*
socket.emit('in',{type: 'scanner'});;
socket.on('notify job',function(data){
	socket.emit('notify accept serial', data);
});
socket.on('cancel job',function(data){console.log('canceled')});
socket.on('register job',function(data){console.log('registered')});
*/