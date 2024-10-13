const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

app.post("/api", (req, res) => {});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
