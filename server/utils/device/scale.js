var FREQUENCY=1000;//query data per 1s.


var _scale = function scale(app , device){
  var colorlog=require('../../tools/colorlog');
  var _canHandle=true;
  setTimeout(function(){
    _canHandle=true;
  },FREQUENCY);
  device.connect(function(data){
    if(!_canHandle) return;
    _canHandle = false;
    var weight = data.toString().match('[0-9]+')[0];
    app.models.Weight.create(
      {
        scale_id:device.scaleId,
        value:weight,
        item_id:device.itemId
      }
      ,function(err){colorlog.error(err.msg)});
  });
}

module.exports = function scale (app){
  return function(device){
    _scale(app, device);
  }
}