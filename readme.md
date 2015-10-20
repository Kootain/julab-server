# julab router

## install:

 1. install ` node.js` (include ` npm`). [click here](https://nodejs.org/ "nodejs")
 2. install dependency. run the following commands.
``` shell
$ npm install bower -g
$ npm install grunt -g
$ npm install -g grunt-cli
```    
**tips** you may have to add ` sudo` in some os like MacOS or Linux
```shell
cd path/to/your/source
$ bower install
$ npm install
```

3. start developing!
    * ` grunt run` will start in a debugging mode in chrome, change of static file will be automatically reload. 
    **if you change js files, ` ctrl-c`, then rerun ` grunt run`**
    * ` grunt release` will build the whole project for release

4. docs:
    run `grunt docs` to check available APIs for angular.