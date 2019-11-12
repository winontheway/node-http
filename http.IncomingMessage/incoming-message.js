const http = require('http');
http.createServer((req, res) => {
    // console.log(req.url);
    res.end('ok');
}).listen(3000, () => {
    console.log('服务启动');
});