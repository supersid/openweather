/**
 * This file contains response to all dynamic api(s)
 */
const weather = require('../modules/weather');

async function getSingleWeather(req, res) {
  if (req.method === 'POST') {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', async () => {
        const cityName = JSON.parse(body).city;
        if (!cityName || !weather.validCityName(cityName)) {
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

async function getMultipleWeather(req, res) {
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

module.exports = {
  getSingleWeather,
  getMultipleWeather,
};
