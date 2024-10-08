// server.js
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
// Create an Express application
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());
// Use the routes defined in routes.js
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
