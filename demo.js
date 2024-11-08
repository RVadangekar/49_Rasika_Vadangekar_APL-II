var http=require("http");
http.createServer(function(req,res){
res.writeHead(200,{'Content-Type':'Text/html'});
res.end('Hello World');
}).listen(8080);
console.log('server running at http://127.0.0.1.8080/');
