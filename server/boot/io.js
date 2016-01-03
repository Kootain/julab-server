module.exports = function io(app) {
	app.io = require('socket.io')(app.start());
	HashSet = require('../tools/HashSet');
	colorlog = require('../tools/colorlog');

	var ShakeHands = (function () {
	    function ShakeHands(prefix) {
	        this.start = prefix + "." + "ShakeHands.start";
	        this.accept = prefix + "." + "ShakeHands.accept";
	        this.reject = prefix + "." + "ShakeHands.reject";
	    }
	    return ShakeHands;
	})();
	var job = (function () {
	    function job(prefix) {
	        this.shakeHands = new ShakeHands(prefix + ".Job");
	        this.submit = prefix + "." + "Job.submit";
	        this.spread = prefix + "." + "Job.spread";
	    }
	    return job;
	})();
	var Connection = (function () {
	    function Connection() {
	    }
	    Connection.in = "Connection.in";
	    return Connection;
	})();
	var RegisterReagents = (function () {
	    function RegisterReagents() {
	    }
	    RegisterReagents.isInProcess = "RegisterReagents.isInProcess";
	    RegisterReagents.Job = new job("RegisterReagents");
	    RegisterReagents.update = "RegisterReagents.update";
	    return RegisterReagents;
	})();
	var FindReagents = (function () {
	    function FindReagents() {
	    }
	    FindReagents.Job = new job("FindReagents");
	    return FindReagents;
	})();


	/*-------device type------
	 * scanner
	 * web
	 *
	 */

	app.todo={
		scanner: {},
		web: {}
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
						socket.on(FindReagents.Job.submit, function (data) {
							todo.scanner[data.serial]=data.list;
							for(var id in scanner){
								scanner[id].emit(FindReagents.Job.spread,
									{ serial:data.serial, detail: data, owner: socket.id });
							}
						});

					},	
		scanner: 	function(socket){
						var todo=app.todo;
						socket.on(FindReagents.Job.shakeHands.start,function (data){
							data=JSON.parse(data);
							if(!todo.scanner[data.serial]){
								colorlog.log([colorlog.yellow(data.serial),' was ',colorlog.red('expired'),'!']);
								socket.emit(FindReagents.Job.shakeHands.reject, data);
								return;
							}
							colorlog.log([colorlog.yellow(data.serial),' was ',colorlog.green('accepeted'),'!']);
							socket.emit(FindReagents.Job.shakeHands.accept, data);
							delete todo.scanner[data.serial];
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
			console.log(data.type+"  connected");
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