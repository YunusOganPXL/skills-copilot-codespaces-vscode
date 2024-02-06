// Create web server
// Load comments from file
// Add new comment to file
// Serve comments to client

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');

// Load comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(comments));
  } else if (request.method === 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var comment = JSON.parse(body);
      comments.push(comment);
      fs.writeFileSync('comments.json', JSON.stringify(comments));
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(comments));
    });
  }
});

// Listen on port 8000, IP defaults to