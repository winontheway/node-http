# node-http
Node.js标准库提供了http模块，该模块是Node中非常重要的一个核心模块。http模块提供了创建客户端和服务端的方法；
## 服务端
我们可以使用http模块轻松的创建一个供前端可调用的http服务器（像express，koa这类的框架的使用方式都差不多），使用方式很简单，只需使用http.createServer方法就可以轻松创建一个服务器，代码如下：
>// create-server.js
```
const http = require('http');
http.createServer((req, res) => {
    console.log(req.url);
    res.end('你的请求地址为：', req.url);
}).listen(3000);
```
然后在终端用node命令运行node create-server.js，
可以看到控制台没有任何输入，别着急，打开浏览器输入localhost:3000/anything，然后控制台会打印出你请求的接口地址，同时会向请求者返回你的地址；这就是一个最简单的http服务器；

http.createServer方法返回一个http.Server实例，使用listen方法设置端口，这时候有请求过来就会走到回调中，回调函数中的req为请求信息

>supervisor

由于我们我们使用node create-server.js运行修改代码后要想生效必须重启启动进程，这是作为一个高效程序员所不能忍受的，甚至新手刚开始学习时经常是编辑完代码怎么刷新浏览器都不生效（好神奇），可以使用supervisor工具来帮你完成这项工作，它会监视你对代码的改动，并自动重启 Node.js，使用方法很简单sudo npm install -g supervisor，然后supervisor create-server.js，这样每次修改完代码保存会自动重启你的node服务（很爽）；