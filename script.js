document.getElementById('weather-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;

  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const currentWeather = data.current_weather;

          // Displaying the current weather data
          if (currentWeather) {
              document.querySelector('.temperature').textContent = `Temperature: ${currentWeather.temperature} °C`;
              document.querySelector('.wind-speed').textContent = `Wind Speed: ${currentWeather.windspeed} m/s`;
              document.querySelector('.humidity').textContent = `Humidity: ${data.hourly.relative_humidity_2m[0]}%`;
          } else {
              document.querySelector('.temperature').textContent = 'Weather data unavailable for this location.';
              document.querySelector('.wind-speed').textContent = '';
              document.querySelector('.humidity').textContent = '';
          }
      })
      .catch(error => {
          console.error('Error fetching the weather data:', error);
          document.querySelector('.temperature').textContent = 'Error fetching the weather data.';
          document.querySelector('.wind-speed').textContent = '';
          document.querySelector('.humidity').textContent = '';
      });
});
