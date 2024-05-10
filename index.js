// import required files and packages
const express = require("express");
require("dotenv").config();

const database = require("./config/database.config.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary.config.js");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 4000;

// initialize the express application
const app = express();

// connect to database
database.connect();

// adding middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// connect to cloudinary
cloudinaryConnect();

// defining routes
const userRoutes = require("./routes/User.routes.js");
const profileRoutes = require("./routes/Profile.routes.js");
// const paymentRoutes = require("./routes/Payment.routes.js");
const courseRoutes = require("./routes/Course.routes.js");
// const defaultRoutes = require("./routes/Default.routes.js");

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/", defaultRoutes);

app.get("/", (req, res) => {
  return res.status(200).send(`<h1>Welcome to StudyNotion</h1>`).json({
    message: "Welcome to studynotion",
  });
});

// activate the server
app.listen(port, () => {
  console.log("\nServer started successfully! at PORT: ", port);
});
