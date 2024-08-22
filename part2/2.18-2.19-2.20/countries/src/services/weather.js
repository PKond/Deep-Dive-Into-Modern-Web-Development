import axios from "axios";

const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;

// Access the API key from environment variables
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = (cityName) => {
  if (!apiKey) {
    console.error("API key is not set in environment variables.");
    return Promise.reject(new Error("API key is not set."));
  }

  try {
    return axios.get(openWeatherUrl, {
      params: {
        q: cityName[0],
        appid: apiKey,
        units: 'metric',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        console.error("Error fetching weather data:", error.response.data);
        return Promise.reject(new Error(`Error ${error.response.status}: ${error.response.data.message}`));
      } else if (error.request) {
        console.error("No response received from the server.");
        return Promise.reject(new Error("No response received from the server."));
      } else {
        console.error("Error in setting up the request:", error.message);
        return Promise.reject(new Error(`Request setup error: ${error.message}`));
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  getWeather
};
