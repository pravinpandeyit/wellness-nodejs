const express = require("express");
const multer = require("multer");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const upload = multer();
const app = express();

app.use(upload.any());

app.use("/api/", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected & Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
});
