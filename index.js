const http = require('http');
const fs = require('fs');

const port = 3000;
const host = 'localhost';
const weather = require('./weather');

// Function to validate if the entered city is valid or not
// Checks for special characters and is of type string
function validCityName(city) {
  if (typeof city !== 'string' || city.trim().length === 0) {
    return false;
  }
  const re = !/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?\d]/g.test(city);
  return re;
}

/**
 * Create server using http module
 * Using different url load the requested data. For eg- loading css, js index files
 * Based on url invoke a rest call. End the call by sending appropriate data
 */
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    if (req.method === 'GET') {
      try {
        fs.readFile(`${__dirname}/index.html`, async (error, data) => {
          if (error) {
            res.writeHead(404);
            res.write('Error: Page Not Found');
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        });
      } catch (error) {
        res.writeHead(500);
        res.end(error.message);
      }
    }
  }
  if (req.url === '/public/style.css') {
    fs.readFile(
      `${__dirname}/public/style.css`,
      { encoding: 'utf8' },
      async (error, data) => {
        if (error) {
          res.writeHead(404);
          res.end(error.message);
        }
        res.writeHead(200, { 'Content-type': 'text/css' });
        res.end(data);
      },
    );
  }
  if (req.url === '/public/script.js') {
    fs.readFile(
      `${__dirname}/public/script.js`,
      { encoding: 'utf8' },
      async (error, data) => {
        if (error) {
          res.writeHead(404);
          res.end(error.message);
        }
        res.writeHead(200, { 'Content-type': 'text/js' });
        res.end(data);
      },
    );
  }
  if (req.url === '/my-weather-app/single-search') {
    if (req.method === 'POST') {
      try {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          const cityName = JSON.parse(body).city;
          if (!cityName || !validCityName(cityName)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                message: `Sorry, "${cityName}" is an invalid city, please try another`,
              }),
            );
            return;
          }
          try {
            const weatherData = await weather.getSingleCityWeather(cityName);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(weatherData));
            return;
          } catch (error) {
            if (error.response.status === 404) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  message: `Sorry, ${cityName} was not found, please try another`,
                }),
              );
            }
          }
        });
      } catch (error) {
        res.writeHead(404);
        res.end(JSON.stringify(error.message));
      }
    }
  }
  if (req.url === '/my-weather-app/multiple-search') {
    if (req.method === 'POST') {
      try {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          const cityNames = JSON.parse(body).allCities;
          try {
            const weatherData = await weather.getMultipleCityWeather(cityNames);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(weatherData));
            return;
          } catch (error) {
            if (error.response.status === 404) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(error.message));
            }
          }
        });
      } catch (error) {
        res.writeHead(404);
        res.end(JSON.stringify(error.message));
      }
    }
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
