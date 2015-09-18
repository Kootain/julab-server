module.exports = function(Weight) {
	Weight.remoteMethod(
        'greet', 
        {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
        }
    );

};
