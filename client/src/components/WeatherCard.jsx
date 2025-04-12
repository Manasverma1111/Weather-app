import React from 'react';
import './WeatherCard.css';

function WeatherCard({ data, units }) {
  // Exit early if no data
  if (!data) return null;

  // Convert temperature units for display
  const getTemperatureUnit = () => {
    return units === 'metric' ? '°C' : '°F';
  };

  // Format date from timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{data.city}, {data.country}</h2>
        <p className="date">{formatDate(data.dt)}</p>
      </div>
      
      <div className="weather-main">
        <div className="temperature-container">
          <h1 className="temperature">
            {Math.round(data.temperature.current)}
            <span className="unit">{getTemperatureUnit()}</span>
          </h1>
          <p className="feels-like">
            Feels like: {Math.round(data.temperature.feels_like)}{getTemperatureUnit()}
          </p>
        </div>
        
        <div className="weather-icon">
          <img 
            src={getWeatherIconUrl(data.weather.icon)} 
            alt={data.weather.description} 
          />
          <p className="weather-description">{data.weather.description}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{data.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            {data.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{data.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">
            {(data.visibility / 1000).toFixed(1)} km
          </span>
        </div>
      </div>
      
      <div className="temperature-range">
        <div className="min-temp">
          <span>Min</span>
          <span>{Math.round(data.temperature.min)}{getTemperatureUnit()}</span>
        </div>
        <div className="max-temp">
          <span>Max</span>
          <span>{Math.round(data.temperature.max)}{getTemperatureUnit()}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;