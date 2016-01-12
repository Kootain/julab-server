var FREQUENCY=9000;//query data per 1s.
var Transaction = require('loopback-datasource-juggler').Transaction;

var jump={
  0 : function(scale){
    if(scale.value <= scale.full_weight * 0.2){
      scale.state =2;
    }
    return scale.state;
  },
  2 : function(scale){
    if(scale.value > scale.full_weight * 0.2){
      scale.state =0;
    }
    return scale.state;
  },
  3 : function(scale){
    if(scale.value > scale.full_weight * 0.2){
      scale.state =0;
    }
    return scale.state;
  }
}

var _scale = function (app , device, params){
  var colorlog=require('../../tools/colorlog');
  var _canHandle=true;
  var _params=params;
  setInterval(function(){
    _canHandle=true;
  },FREQUENCY);
  device.connect(function(data){
    if(!_canHandle) return;
    _canHandle = false;
    var weight = data.toString().match('[0-9]+.[0-9]+')[0];
 
    app.models.Weight.create(
      {
        'scale_id':_params.id,
        'value':weight,
        'item_id':_params.item_id
      }
    ).then(function(w){
      //TODO 将 full_weight 绑定 
      app.models.Scale.find({where:{id : w.scale_id}}).then(function(s){
        var full =(w.value > s[0].value +0.3 || s[0].full_weight === 0) ? w.value : s[0].full_weight;
        var scaleData = {
          value : w.value,
          full_weight : full,
          state : jump[s[0].state](s[0])
        };
        app.models.Scale.updateAll({id : s[0].id},scaleData).then(function(){
          console.log('update success!');
        });
      })
    });
  });
};



module.exports = function scale (app){
  return function(device,params){
    _scale(app, device,params);
  }
}