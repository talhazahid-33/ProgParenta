// server.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Create an Express application
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
