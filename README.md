# node-http
Node.js标准库提供了http模块，该模块是Node中非常重要的一个核心模块。http模块提供了创建客户端和服务端的方法；
## 服务端 （http.Server类）
我们可以使用http模块轻松的创建一个供前端可调用的http服务器（像express，koa这类的框架的使用方式都差不多），使用方式很简单，只需使用http.createServer方法就可以轻松创建一个服务器，代码如下：
>// http.server > create-server.js
```
const http = require('http');
http.createServer((req, res) => {
    console.log(req.url);
    res.end('你的请求地址为：', req.url);
}).listen(3000);
```
然后在终端用node命令运行node create-server.js，
可以看到控制台没有任何输入，别着急，打开浏览器输入localhost:3000/anything，然后控制台会打印出你请求的接口地址，同时会向请求者返回你的地址；这就是一个最简单的http服务器；

http.createServer方法返回一个http.Server实例，使用listen方法设置端口;

http.Server实例提供一些事件、属性和方法，一下列出一部分，如果有兴趣可以自行查看api：http://nodejs.cn/api/http.html#http_class_http_server；

request事件：每次有请求时都会触发。 每个连接可能有多个请求（在 HTTP Keep-Alive 连接的情况下）；

server.listen()方法:启动 HTTP 服务器监听连接。

server.listening属性: 表明服务器是否正在监听连接。

server.maxHeadersCount属性: 限制最大传入请求头数。 如果设置为 0，则不会应用任何限制，默认值2000。

>supervisor

由于我们我们使用node create-server.js运行修改代码后要想生效必须重启启动进程，这是作为一个高效程序员所不能忍受的，甚至新手刚开始学习时经常是编辑完代码怎么刷新浏览器都不生效（好神奇），可以使用supervisor工具来帮你完成这项工作，它会监视你对代码的改动，并自动重启 Node.js，使用方法很简单sudo npm install -g supervisor，然后supervisor create-server.js，这样每次修改完代码保存会自动重启你的node服务（很爽）；
## 客户端 （http.ClientRequest类）

http.ClientRequest实例通过http.request方法创建；

详情请查看：http://nodejs.cn/api/http.html#http_http_request_options_callback

```
const http = require('http');
const querystring = require('querystring');

const postData = querystring.stringify({
  'msg': 'hello world'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`status: ${res.statusCode}`);
  console.log(`headers: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`responsBody: ${chunk}`);
  });
  res.on('end', () => {
    console.log('responst no data');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入请求主体。
req.write(postData);
req.end();
```
options 可以是一个对象、或字符串、或 URL 对象。 如果 options 是一个字符串，它会被自动使用 url.parse() 解析。 如果它是一个 URL 对象, 它会被默认转换成一个 options 对象，如果同时指定了 url 和 options，则对象会被合并，其中 options 属性优先。

http.ClientRequest实例提供一些事件、属性和方法，一下列出一部分，如果有兴趣可以自行查看api：http://nodejs.cn/api/http.html#http_class_http_clientrequest；

response事件：当收到此请求的响应时触发。 此事件仅触发一次；

req.end()方法: 完成发送请求，如果指定了 data，则相当于调用 request.write(data, encoding) 之后再调用 request.end(callback)；

req.finished属性: 如果调用了 request.end()，则 request.finished 属性将为 true。 如果请求是通过 http.get() 发起的，则会自动调用 request.end()；

调用了req.end()。使用 http.request() 必须总是调用 req.end() 来表明请求的结束，即使没有数据被写入请求主体。

除了request外还有http.get方法也可以创建一个http.ClientRequest实例；
## request对象 （http.IncomingMessage类）
http.IncomingMessage实例由http.Server或http.ClientRequest创建；
```
const http = require('http');
http.createServer((req, res) => {
    res.end(req.url);
}).listen(3000, () => {
    console.log('服务启动');
});
```
req为接收到请求的相关信息，http://nodejs.cn/api/http.html#http_class_http_incomingmessage

req.headers属性: 消息头的名称和值的键值对。 消息头的名称都是小写的；
req.httpVersion属性: 客户端的http版本；
req.method属性: 请求方法，get、post、put等；
## response对象 （http.ServerResponse类）
http.ServerResponse实例HTTP服务器在内部创建；http://nodejs.cn/api/http.html#http_class_http_serverresponse

```
const http = require('http');
http.createServer((req, res) => {
    res.end(req.url);
}).listen(3000, () => {
    console.log('服务启动');
});
```

res.end方法: 此方法向服务器发出信号，表明已发送所有响应头和主体，该服务器应该视为此消息已完成。 必须在每个响应上调用此 response.end() 方法。如果指定了 data，则相当于调用 response.write(data, encoding) 之后再调用 response.end(callback)。如果指定了 callback，则当响应流完成时将调用它。
res.setHeader方法: 设置响应头信息；

## 常量
另外http模块还提供了两个常量可供使用
1、http.METHODS：解析器支持的HTTP方法列表；
2、http.STATUS_CODES：所有标准 HTTP 响应状态码的集合，以及每个状态码的简短描述；




