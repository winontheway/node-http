const http = require('http');
http.createServer((req, res) => {
    console.log(res.url);
    res.end('你的请求地址为：', res.url);
})