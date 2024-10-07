const http = require('http');
const PORT = process.env.PORT || 5000;
http.createServer((req, res) => {
    if (req.url === "/go" && req.method === "POST") {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log('Form data received:', body); // Log the received data to the console

            // Respond with a success message and display the form again
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<body>
                <h2>Form submitted successfully!</h2>
                <form action="/go" method="POST">
                    <textarea name="data" placeholder="Username"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </body>`);
        });
    } else if (req.url === "/go" && req.method === "GET") {
        // Display the form when the user visits the page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<body>
            <form action="/go" method="POST">
                <textarea name="data" placeholder="Username"></textarea>
                <button type="submit">Submit</button>
            </form>
        </body>`);
    } else {
        // Handle other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
}).listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
