module.exports = function(Weight) {
	// Weight.remoteMethod(
 //        'greet', 
 //        {
 //          accepts: {arg: 'msg', type: 'string'},
 //          returns: {arg: 'greeting', type: 'string'}
 //        }
 //    );
  Weight.observe('before save',function addTimeInfo(ctx, next){
    console.log('called Weight before save');
    if(ctx.isNewInstance){ //new instance -> create option
      ctx.instance.gmt_created=(new Date()).toGMTString();
    }
    next();
  });
};
