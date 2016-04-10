var net = new  require('net');
var process = require('process');

var weight = '11.0kg';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    chunk = chunk.slice(0,chunk.length-2);
    weight = chunk + 'kg';
    process.stdout.write('data: ' + weight );
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});

var server = net.createServer(function(socket){
  var cl = setInterval(function(){
    socket.write(weight);
  },2000);
  console.log('connected!');
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
  host: 'localhost',
  port: 8080,
  exclusive: true
},function(){
  address = server.address();
  console.log("opened server on %j", address);
});
