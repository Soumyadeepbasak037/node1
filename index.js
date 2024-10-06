const formidable = require('formidable');
const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 5000; 

http.createServer((req, res) => {
    if (req.url === "/go") {
        if (req.method === "POST") {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                console.log(body);
                res.writeHead(200, { 'Content-Type': 'text/plain' });  // Correct Content-Type
                res.end(`Received data: ${body}`);
            });
        }
    } else {
        fs.readFile('l.txt', (err, data) => {
            if (err) { // Added error handling for file read
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <body>
                    <h1>File Content:</h1>
                    <pre>${data}</pre> <!-- Added <pre> to format file content -->
                    <form action="/go" method="POST">
                        <textarea name="data" placeholder="Username"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </body>
            `);
        });
    }
}).listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // Corrected logging
});
