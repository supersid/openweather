const axios = require('axios');

const apiKey = '5597b13382691be880ae2b1eaa316cd3';

/**
 * Function to validate if the entered city is valid or not
 * Checks for special characters and is of type string
 */
function validCityName(city) {
  if (typeof city !== 'string' || city.trim().length === 0) {
    return false;
  }
  const re = !/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?\d]/g.test(city);
  return re;
}

/**
 * Function to get weather data for a single city
 */
async function getSingleCityWeather(city) {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
  );
  return data;
}

/**
 * Function to get weather data for a multiple cities
 * This will take all the values and iterate them to get weather data for individual cites
 * This function uses the getSingleCityWeather function
 */
async function getMultipleCityWeather(allCities) {
  let data = null;
  if (allCities) {
    data = allCities.map((city) => getSingleCityWeather(city));
  }
  return Promise.all(data);
}

module.exports = {
  validCityName,
  getSingleCityWeather,
  getMultipleCityWeather,
};
