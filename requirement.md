## 路由器需求说明
###**核心需求场景**
* **在路由器中运行一个基于[node.js](http://nodejs.org) 的 web运行环境，我们所开发的应用的包依赖项暂时如下：**

    ```
{
  "name": "julab-router",
  "version": "0.1.0",
  "main": "server/server.js",
  "description": "solution for the julab-router",
  "dependencies": {
    "lodash": "^2.4.1",
    "ee-first": "1.0.3",
    "express": ">4.13.0",
    "async": "^0.2.10",
    "compression": "^1.0.3",
    "cors": "^2.5.2",
    "errorhandler": "^1.1.1",
    "loopback": "^2.14.0",
    "loopback-boot": "^2.6.5",
    "loopback-datasource-juggler": "^2.19.0",
    "loopback-connector-mysql": "*",
    "serve-favicon": "^2.0.1",
    "socket.io":"1.3.6"
  },
  "optionalDependencies": {
    "loopback-explorer": "^1.1.0"
  },
  "repository": {
    "type": "git",
    "url": "https://git.oschina.net/tankijong/julab-server.git"
  }
  "Private": "true"
}

    ```
### 实际可能的开发过程我们希望能够提供一个开发板，部署所有开发环境，我方在其中进行开发，最后对固件进行清理封装。
* 开发所需的各种依赖项空间占用较大，需要提供1G的可安装空间。
* 我方暂时无法预估最后剥离出的固件占用空间大小。
* **开发环境需要部署Python2.7，GCC等依赖项，用以编译一些基于 [node-gyp](https://github.com/nodejs/node-gyp) 的模块包**
  
    在系统中通过npm安装依赖包，比较典型的**存在风险**的几个包如下：

    ```
        $ npm install -g strongloop
        $ npm install socket.io
    ```
    


