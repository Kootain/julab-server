var server = require('./server');
var ds = server.dataSources['router-db'];
var Tables = [];
for(var x in server.models) Tables.push(x);
	console.log(Tables);
ds.automigrate(Tables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + Tables + '] created in ', ds.adapter.name);
  ds.disconnect();
});


\.exit