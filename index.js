const formidable = require('formidable')
const http = require('http')
const fs = require('fs')


const PORT = process.env.PORT || 5000; 
http.createServer((req,res)=>{
    if(req.url === "/go"){
        if(req.method === "POST"){
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
    }
    else{
        fs.readFile('l.txt',(err,data)=>{
            res.write(data);
        })
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.end(`
            <body>
                <form action="/go" method="POST">
                    <textarea name="data" placeholder="Username"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </body>
        `);
        }
}).listen(PORT,()=>{
    console.log("listening on 5000")
})