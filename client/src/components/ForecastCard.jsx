import React from 'react';
import './ForecastCard.css';

function ForecastCard({ forecast, units }) {
  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return null;
  }

  // Group forecast data by day
  const groupByDay = (forecastList) => {
    const grouped = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      if (!grouped[day]) {
        grouped[day] = [];
      }
      
      grouped[day].push(item);
    });
    
    return grouped;
  };

  // Get a single forecast item to represent each day (noon or closest to it)
  const getDailyForecast = (groupedForecast) => {
    const dailyForecast = [];
    
    Object.keys(groupedForecast).forEach(day => {
      const dayData = groupedForecast[day];
      
      // Find forecast closest to noon
      let closestToNoon = dayData[0];
      let minDiff = Infinity;
      
      dayData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const hours = date.getHours();
        const diff = Math.abs(12 - hours);
        
        if (diff < minDiff) {
          minDiff = diff;
          closestToNoon = item;
        }
      });
      
      dailyForecast.push({
        day,
        ...closestToNoon
      });
    });
    
    return dailyForecast;
  };

  const groupedForecast = groupByDay(forecast.list);
  const dailyForecast = getDailyForecast(groupedForecast);

  // Get unit symbol based on current units
  const getTemperatureUnit = () => {
    return units === 'metric' ? '°C' : '°F';
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {dailyForecast.map((day, index) => (
          <div className="forecast-day-card" key={index}>
            <div className="forecast-day">{day.day}</div>
            <img 
              src={getWeatherIconUrl(day.weather.icon)} 
              alt={day.weather.description} 
              className="forecast-icon"
            />
            <div className="forecast-temp">
              {Math.round(day.temperature.max)}{getTemperatureUnit()} / {Math.round(day.temperature.min)}{getTemperatureUnit()}
            </div>
            <div className="forecast-desc">{day.weather.main}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
