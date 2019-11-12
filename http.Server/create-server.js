const http = require('http');
http.createServer((req, res) => {
    console.log(req.url);
    res.end('url:' + req.url);
}).listen(3000, () => {
    console.log('服务已启动');
});
