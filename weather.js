const axios = require("axios");

const apiKey = "5597b13382691be880ae2b1eaa316cd3";

/**
 * Function to get weather data for a single city
 */
async function getSingleCityWeather(city) {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  return data;
}

/**
 * Function to get weather data for a multiple cities
 * This will take all the values and iterate them to get weather data for individual cites using the getSingleCityWeather function
 */
async function getMultipleCityWeather(allCities) {
  let data = null;
  if (allCities) {
    data = allCities.map((city) => getSingleCityWeather(city));
  }
  return Promise.all(data);
}

module.exports = {
  getSingleCityWeather,
  getMultipleCityWeather,
};
