const express = require('express');
const axios = require('axios');
const router = express.Router();

// Environment variables
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * @route   GET /api/weather
 * @desc    Get current weather data for a city
 * @param   {string} city - City name
 * @param   {string} units - Units (metric, imperial, standard)
 * @returns {object} Weather data
 */
router.get('/weather', async (req, res) => {
  try {
    const { city, units = 'metric' } = req.query;
    
    // Validate input
    if (!city) {
      return res.status(400).json({ 
        success: false, 
        message: 'City parameter is required' 
      });
    }

    // Make request to OpenWeatherMap API
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units
      }
    });

    // Structure the data for our frontend
    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: {
        current: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        min: response.data.main.temp_min,
        max: response.data.main.temp_max
      },
      weather: {
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon
      },
      wind: {
        speed: response.data.wind.speed,
        deg: response.data.wind.deg
      },
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      visibility: response.data.visibility,
      timezone: response.data.timezone,
      dt: response.data.dt // Unix timestamp
    };

    return res.json({ success: true, data: weatherData });
    
  } catch (error) {
    // Handle specific errors
    if (error.response) {
      // OpenWeatherMap API error
      if (error.response.status === 404) {
        return res.status(404).json({ 
          success: false, 
          message: 'City not found' 
        });
      }
      
      return res.status(error.response.status).json({ 
        success: false, 
        message: error.response.data.message || 'Error fetching weather data'
      });
    }
    
    // Server or network error
    console.error('Weather API Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

/**
 * @route   GET /api/forecast
 * @desc    Get 5-day forecast data for a city
 * @param   {string} city - City name
 * @param   {string} units - Units (metric, imperial, standard)
 * @returns {object} Forecast data
 */
router.get('/forecast', async (req, res) => {
  try {
    const { city, units = 'metric' } = req.query;
    
    // Validate input
    if (!city) {
      return res.status(400).json({ 
        success: false, 
        message: 'City parameter is required' 
      });
    }

    // Make request to OpenWeatherMap API
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: units
      }
    });
    
    // Process and organize forecast data
    const forecastData = {
      city: response.data.city.name,
      country: response.data.city.country,
      list: response.data.list.map(item => ({
        dt: item.dt,
        date: new Date(item.dt * 1000).toISOString(),
        temperature: {
          current: item.main.temp,
          feels_like: item.main.feels_like,
          min: item.main.temp_min,
          max: item.main.temp_max
        },
        weather: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        },
        wind: {
          speed: item.wind.speed,
          deg: item.wind.deg
        },
        humidity: item.main.humidity,
        pressure: item.main.pressure
      }))
    };

    return res.json({ success: true, data: forecastData });
    
  } catch (error) {
    // Handle specific errors
    if (error.response) {
      // OpenWeatherMap API error
      if (error.response.status === 404) {
        return res.status(404).json({ 
          success: false, 
          message: 'City not found' 
        });
      }
      
      return res.status(error.response.status).json({ 
        success: false, 
        message: error.response.data.message || 'Error fetching forecast data'
      });
    }
    
    // Server or network error
    console.error('Forecast API Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;