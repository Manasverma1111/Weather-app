const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const weatherRoutes = require('./routes/weather');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://getweather-app-24x7.netlify.app'], // Allow only this origin
  methods: ['GET', 'POST'], // You can add 'PUT', 'DELETE' if needed
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', weatherRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Weather API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});









// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// // Import routes
// const weatherRoutes = require('./routes/weather');

// // Initialize express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', weatherRoutes);

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: 'Weather API is running' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });