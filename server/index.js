const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user");
const activityRoutes = require("./routes/activityRoutes");
const inventarisRoutes = require("./routes/inventarisRoutes");
const pengajuanRoutes = require("./routes/pengajuanRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/login-activity", activityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/inventaris", inventarisRoutes);
app.use("/api/pengajuan", pengajuanRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
