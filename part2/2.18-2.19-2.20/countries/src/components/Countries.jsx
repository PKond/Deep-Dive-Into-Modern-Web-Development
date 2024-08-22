import React, { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Countries = ({ filteredCountries }) => {
  const [weatherData, setWeatherData] = useState(null);
  const numCountries = filteredCountries.length;

  useEffect(() => {
    if (numCountries === 1) {
      const country = filteredCountries[0];
      weatherService.getWeather(country.capital)
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [filteredCountries, numCountries]);

  const handleOnClick = (countryName) => {
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      {numCountries > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : numCountries > 1 ? (
        <ul>
          {filteredCountries.map((country, index) => (
            <li key={index}>
              {country.name.common}
              <button
                onClick={() => handleOnClick(country.name.common)}
                style={{ backgroundColor: "#fff", color: "#000" }}
              >
                Show
              </button>
            </li>
          ))}
        </ul>
      ) : numCountries === 1 ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>
            <span>Capital: </span>
            {filteredCountries[0].capital}
          </div>
          <div>
            <span>Area: </span>
            {filteredCountries[0].area}
          </div>
          <br />
          <div>
            <span style={{ fontWeight: 700 }}>Languages: </span>
            <ul>
              {Object.values(filteredCountries[0].languages).map(
                (language, index) => (
                  <li key={index}>{language}</li>
                )
              )}
            </ul>
          </div>
          <div>
            <img
              src={filteredCountries[0].flags.png}
              alt=""
              style={{ maxHeight: "180px" }}
            />
          </div>
          <div>
            <span>Weather in {filteredCountries[0].capital}: </span>
            {weatherData ? (
              <div>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Weather: {weatherData.weather[0].description}</p>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </div>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default Countries;
