const http = require('http');
const staticRoute = require('./routes/static');
const api = require('./routes/api');

const port = 3000;
const host = 'localhost';

/**
 * Create server using http module
 * Using different url load the requested data. For eg- loading css, js index files
 * Based on url invoke a rest call. End the call by sending appropriate data
 */
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    staticRoute.getForms(req, res);
  }
  if (req.url === '/public/style.css') {
    staticRoute.getCssFile(req, res);
  }
  if (req.url === '/public/script.js') {
    staticRoute.getJsFile(req, res);
  }
  if (req.url === '/my-weather-app/single-search') {
    api.getSingleWeather(req, res);
  }
  if (req.url === '/my-weather-app/multiple-search') {
    api.getMultipleWeather(req, res);
  }
});

// Start the server using the given port
server.listen(port, host, (error) => {
  if (error) {
    // eslint-disable-next-line no-console
    server.close((err) => console.log(err));
  }
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://${host}:${port} 🚀`);
});
