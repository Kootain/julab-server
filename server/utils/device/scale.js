var FREQUENCY=900000;//query data per 1s.


var _scale = function scale(app , device, params){
  var colorlog=require('../../tools/colorlog');
  var _canHandle=true;
  var _params=params;
  setInterval(function(){
    _canHandle=true;
  },FREQUENCY);
  device.connect(function(data){
    if(!_canHandle) return;
    _canHandle = false;
    var weight = data.toString().match('[0-9]+')[0];
    console.log(weight);
    app.models.Weight.create(
      {
        'scale_id':_params.id,
        'value':weight,
        'item_id':_params.item_id
      }
      ,function(err){
        if(err)
        console.log(err);
    });
  });
};

module.exports = function scale (app){
  return function(device,params){
    _scale(app, device,params);
  }
}