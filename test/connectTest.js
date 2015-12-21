var net = new  require('net');
var client = new net.Socket();

var _port = 8080;
var _ip = 'localhost';


client.connect(_port, _ip, function(){
    console.log(['connected device: ','undefined',', ',_ip,':',_port]);
});

client.on('data',function(data){
  console.log(data.toString());
});
