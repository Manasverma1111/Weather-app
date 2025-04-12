import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';

// Styles
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [units, setUnits] = useState('metric');
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode and last searched city
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    }
  }, []);

  // Apply/remove dark mode class on <body>
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  const toggleUnits = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    if (city) {
      fetchWeather(city, newUnits);
    }
  };

  const fetchWeather = async (cityName, selectedUnits = units) => {
    setLoading(true);
    setError('');

    try {
      localStorage.setItem('lastCity', cityName);

      const weatherResponse = await axios.get('/api/weather', {
        params: { city: cityName, units: selectedUnits }
      });

      const forecastResponse = await axios.get('/api/forecast', {
        params: { city: cityName, units: selectedUnits }
      });

      setWeatherData(weatherResponse.data.data);
      setForecastData(forecastResponse.data.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error fetching weather data');
      } else {
        setError('Error connecting to the server. Please try again later.');
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Weather Dashboard</h1>
          <div className="header-controls">
            <button 
              onClick={toggleUnits} 
              className="units-toggle"
            >
              {units === 'metric' ? '°C' : '°F'}
            </button>
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </header>

        <main>
          <SearchBar onSearch={handleSearch} lastSearched={city} />

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <>
              {weatherData && <WeatherCard data={weatherData} units={units} />}
              {forecastData && <ForecastCard forecast={forecastData} units={units} />}
            </>
          )}

          {!loading && !error && !weatherData && (
            <div className="welcome-message">
              <h2>Welcome to the Weather Dashboard</h2>
              <p>Enter a city name to get the current weather and forecast.</p>
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>
            Powered by OpenWeatherMap API | 
            Created with React and Node.js
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
