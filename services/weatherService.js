const axios = require('axios');
const cache = require('../config/cacheConfig');

const fetchWeatherData = async (city) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const cacheKey = `${city}-metric`; // Cache key based on city name and unit
  const cachedWeather = cache.get(cacheKey);

  if (cachedWeather) {
    return cachedWeather;
  }

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather`, { 
      params: {
        q: city,
        appid: apiKey,
        units: 'metric', 
      },
    }
  );

  const responseDate = response.headers.date;

    
  const date = new Date(response.data.dt * 1000); 
  const dateTime = date.toLocaleString(); 

 console.log(response);
  const weatherData = {
    city: response.data.name,
    temperature: `${response.data.main.temp}°C`, 
    feels_like:`${response.data.main.feels_like}°C`,
    humidity: `${response.data.main.humidity}%`,
    windSpeed: `${response.data.wind.speed} m/s`, 
    description: response.data.weather[0].description,
    dateTime: response.dateTime,
    dateTime: dateTime, 
    responseDate: responseDate 
  };
  console.log(weatherData)

  cache.set(cacheKey, weatherData); 
  return weatherData;
};

module.exports = { fetchWeatherData };
