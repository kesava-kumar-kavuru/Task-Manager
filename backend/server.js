const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 5000;
//process.env.PORT
//app.use(cors());
const corsOptions = {
  origin: "https://task-manager-one-sandy.vercel.app", // ✅ replace with your actual Vercel frontend URL
  credentials: true, // if you're sending cookies or authentication headers
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Error:", err));
