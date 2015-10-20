var net = require('net');

var HOST = '0.0.0.0';
var PORT = 8001;

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
var server = net.createServer();
server.listen(PORT, HOST);

server.on('connection', function(sock) {
    //console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    setInterval(()=>{sock.write('20 kg');},3000);
    // 其它内容与前例相同

});