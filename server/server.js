var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
app.connected={
  scanner:{},
  web:{},
  scale:{}
}

app.env={
  devices:{}
};

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};
require('./boot/task.js')(app);
boot(app, __dirname);


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.

