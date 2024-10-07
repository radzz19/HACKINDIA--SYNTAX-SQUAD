const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const tokenRoutes = require("./routes/tokenRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Add token routes
app.use("/api/tokens", tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
