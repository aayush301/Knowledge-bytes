const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");


app.use(express.json());
app.use(cors());


const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...");
});


app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);



if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html")));
}


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});