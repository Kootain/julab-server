var log4js = require("log4js");
var log4js_config = require("./log4js.json");
log4js.configure(log4js_config);
var c = log4js.getLogger('log_file');
global.console.log = function(r){ c.info(r);};

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
  global.app=app;
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

