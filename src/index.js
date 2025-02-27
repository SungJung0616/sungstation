require("dotenv").config({ path: "../.env" });
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/orders', orderRoutes);

console.log("🔍 MONGODB_URI_PROD:", process.env.MONGODB_URI_PROD);

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

if (!MONGODB_URI_PROD) {
  console.error("❌ ERROR: MongoDB URI is undefined! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI_PROD)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

  app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
  });
