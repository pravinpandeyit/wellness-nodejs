const express = require("express");
const multer = require("multer");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const errorHandler = require("./utils/errorHandler");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("./utils/rateLimiter");

// const upload = multer();
const app = express();

app.use(helmet());
app.use(cors());
app.use(rateLimiter);

// app.use(upload.any());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Wellness Node.js API is running.",
    timestamp: new Date().toISOString(),
  });
});
app.use("/api/", userRoutes);
app.use("/api/admin/", adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected & Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
});
