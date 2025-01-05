const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");



const app = express();
connectDB();


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
