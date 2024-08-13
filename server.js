const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
require("dotenv").config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use("/api", noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
