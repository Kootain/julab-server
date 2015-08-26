
angular.module('julab', [
    'ui.router',                    // Routing
    'ui.bootstrap',					// Bootstrap
    'pascalprecht.translate',       // translate
    'ncy-angular-breadcrumb',
    'oc.lazyLoad',
    'cgNotify',
    'lbServices'          
]);

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {


　　　　　　　　　　　　var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

var socket = io.connect('http://localhost:3000');
socket.emit('in',{type:'web'});