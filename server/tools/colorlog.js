function colorlog() {

}

colorlog.bold = function(str) {
    return '\033[1m'+str+'\033[0m';
};

colorlog.green = function(str) {
    return '\033[32m'+str+'\033[0m';
};

colorlog.yellow = function(str) {
    return '\033[33m'+str+'\033[0m';
};

colorlog.red = function(str) {
    return '\033[31m'+str+'\033[0m';
};

colorlog.blue = function(str) {
    return '\033[34m'+str+'\033[0m';
};

colorlog.log = function(strArr){
    var str=String.prototype.concat.apply("",strArr);
    str = colorlog.bold(str);
    console.log(str);
}

colorlog.info =function(str){
    console.log(colorlog.bold('[info]\t')+colorlog.blue(str));
}

colorlog.error =function(str){
    console.log(colorlog.bold('[error]\t')+colorlog.red(str));
}

colorlog.warning =function(str){
    console.log(colorlog.bold('[warning]\t')+colorlog.yellow(str));
}

module.exports = colorlog