var http = require('http');
var mod = require('./module2');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write(mod.myData());
    console.log(mod.myData());
    res.end();
}).listen(8080);