# Weather Dashboard

A real-time weather dashboard application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Search for weather by city name
- View current weather conditions
- View 5-day weather forecast
- Toggle between metric (°C) and imperial (°F) units
- Dark/light mode toggle
- Search history with localStorage

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **API Integration**: OpenWeatherMap API
- **Styling**: Custom CSS

## Project Structure

```
weather-dashboard/
├── client/                 # React Frontend
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── components/     # React components
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js Backend
│   ├── routes/             # API routes
│   │   └── weather.js      # Weather endpoint logic
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```
   PORT=5000
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/weather?city={cityName}&units={units}` - Get current weather for a city
- `GET /api/forecast?city={cityName}&units={units}` - Get 5-day forecast for a city

## Potential Future Enhancements

- User authentication and saved preferences
- Weather maps integration
- Geolocation for automatic local weather
- Weather alerts and notifications
- Historical weather data visualization
