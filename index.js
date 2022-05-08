const http = require("http");
const port = 3000;

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("App server works!!");
  res.end();
});

server.listen(port, function (error) {
  if (error) {
    server.close((err) => console.log(err));
  }
  console.log(`🚀 Server running on ${port} 🚀`);
});
