document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('single-city-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.target;
      const city = document.getElementById('city').value;

      const data = await fetch(form.action, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ city }), // body data type must match "Content-Type" header
      });
      const singleCityWeatherResponse = await data.json();
      let innerHTML;
      if (data.status === 200) {
        innerHTML = `<h2>${singleCityWeatherResponse.name}, ${
          singleCityWeatherResponse.sys && singleCityWeatherResponse.sys.country
        }</h2>
        <table align='center'>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Main</td><td>City's Main Weather</td><td>${
  singleCityWeatherResponse.weather[0].main
}</td></tr>
            <tr><td>Description</td><td>A short description of the city's weather</td><td>${
  singleCityWeatherResponse.weather[0].description
}</td></tr>
            <tr><td>Temp</td><td>The City's current temperature</td><td>${
  singleCityWeatherResponse.main.temp
} F</td></tr>
            <tr><td>Pressure</td><td>The current air pressure</td><td>${
  singleCityWeatherResponse.main.pressure
} hPa</td></tr>
            <tr><td>Humidity</td><td>The city's humidity index</td><td>${
  singleCityWeatherResponse.main.humidity
}%</td></tr>
            <tr><td>Speed</td><td>The city's wind speed</td><td>${
  singleCityWeatherResponse.wind.speed
} mph NW</td></tr>
          </tbody>
        </table>`;
      } else {
        innerHTML = `<h3>${singleCityWeatherResponse.message}</h3>`;
      }
      document.getElementById('result1').innerHTML = innerHTML;
    });
  document
    .getElementById('multi-city-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.target;
      const allCities = Array.prototype.slice
        .call(document.querySelectorAll('#allCities option:checked'), 0)
        .map((v) => v.value);
      const data = await fetch(form.action, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ allCities }), // body data type must match "Content-Type" header
      });
      const multiCityWeatherResponse = await data.json();
      const orderedListData = multiCityWeatherResponse.map(
        (weatherData) => `<li>${weatherData.name},${weatherData.weather[0].main}, ${weatherData.weather[0].description}, ${weatherData.main.temp} Degrees</li>`,
      );
      let innerHTML;
      if (data.status === 200) {
        innerHTML = `<ol>${orderedListData.join('')}</ol>`;
      } else {
        innerHTML = `<h3>${multiCityWeatherResponse.message}</h3>`;
      }
      document.getElementById('result2').innerHTML = innerHTML;
    });
});
