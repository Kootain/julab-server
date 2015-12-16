var net = new  require('net');

var server = net.createServer(function(socket){
  var cl = setInterval(function(){
    socket.write('11.0kg');
  },2000);

  socket.on('error',function(err){
    if(err.errno == 'ECONNRESET'){
      console.log('connection closed!');
    }else{
      console.log(err);
    }
    clearInterval(cl);
  });
  socket.on('data',function(data){
    console.log(data.toString());
  })

});

server.listen({
  host: '192.168.20.150',
  port: 8080,
  exclusive: true
},function(){
  address = server.address();
  console.log("opened server on %j", address);
});
