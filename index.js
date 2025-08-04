// import required files and packages
const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const database = require("./config/database.config.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary.config.js");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 4000;
const path = require("path");

// initialize the express application
const app = express();

// connect to database
database.connect();

// enable CORS
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// define rete limit
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after sometime.",
  },
});

// apply rate limiter to app
app.use(limiter);

// adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// multer middleware
// express-fileupload middleware
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(express.static(path.join(__dirname, "documentation")));

// connect to cloudinary
cloudinaryConnect();

// defining routes
const userRoutes = require("./routes/User.routes.js");
const profileRoutes = require("./routes/Profile.routes.js");
const generalRoutes = require("./routes/General.routes.js");
const paymentRoutes = require("./routes/Payment.routes.js");
const courseRoutes = require("./routes/Course.routes.js");
const awsServicesRoutes = require("./routes/AmazonWebServices.routes.js");
const defaultRoutes = require("./routes/Default.routes.js");

// app.use("/", defaultRoutes);
app.use("/v1", generalRoutes);
app.use("/v1/auth", userRoutes);
app.use("/v1/profile", profileRoutes);
app.use("/v1/course", courseRoutes);
app.use("/v1/aws-services", awsServicesRoutes);
app.use("/v1/payment", paymentRoutes);

// activate the server
app.listen(port, () => {
  console.log("\nServer started successfully! at PORT: ", port);
});
