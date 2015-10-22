module.exports = function(Scale) {
  Scale.observe('before save',function addTimeInfo(ctx, next){
    console.log('called');
    if(ctx.isNewInstance){ //new instance -> create option
      ctx.instance.gmt_created=(new Date()).toGMTString();
      ctx.instance.gmt_login=(new Date()).toGMTString();
    }
    next();
  });
  Scale.observe('after save',function updateStatus(ctx, next){
    console.log('after save');
    require('../../server/boot/task')(global.app);
    next();
  });
};
