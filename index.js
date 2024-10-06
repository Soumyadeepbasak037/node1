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
                
                // Extract the data from the POST request
                const username = new URLSearchParams(body).get('data'); // Parse the form data
                const filename = 'newFile.txt'; // Name of the new file

                // Create and write to the new file
                fs.writeFile(filename, username, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error writing file');
                        return;
                    }

                    // Read the newly created file
                    fs.readFile(filename, (err, data) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error reading file');
                            return;
                        }

                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(`Received data: ${data}`);
                    });
                });
            });
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <body>
                <form action="/go" method="POST">
                    <textarea name="data" placeholder="Username"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </body>
        `);
    }
}).listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
