const formidable = require('formidable')
const http = require('http')
const fs = require('fs')
const pg = require('pg')

http.createServer((req,res)=>{
    if(req.url == "/go"){
        if(req.method = "POST"){
            let body = '';
            req.on('data',(chunk)=>{
                body+=chunk;
            });
            req.on('end',()=>{
                console.log(body);
                res.writeHead(200, { 'Content-Type': 'text' });
                res.end(`Received data: ${body}`);
            });
        }
        else{
            res.end("gawk gawk 3000");
        }
    }
}).listen(5000,()=>{
    console.log("listening on 5000")
})