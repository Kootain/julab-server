var net = require('net');

var HOST = '0.0.0.0';
var PORT = 8080;

var server = net.createServer();
server.listen(PORT, HOST);
try{
server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    setInterval(()=>{sock.write(Math.round(Math.random()*500)+' kg');},3000);
    // 其它内容与前例相同

});
}catch(err){
  console.log(err);
}