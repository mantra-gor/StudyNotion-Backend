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

//define rete limit
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after few minutes",
  },
});

// apply rate limiter to app
app.use(limiter);

// adding middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// connect to cloudinary
cloudinaryConnect();

// defining routes
const userRoutes = require("./routes/User.routes.js");
const profileRoutes = require("./routes/Profile.routes.js");
const generalRoutes = require("./routes/General.routes.js");
// const paymentRoutes = require("./routes/Payment.routes.js");
const courseRoutes = require("./routes/Course.routes.js");
// const defaultRoutes = require("./routes/Default.routes.js");

app.use("/api/v1", generalRoutes);
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

// sending mails for testing mails
const mailSender = require("./utils/mailSender.utils.js");
const {
  updatePassword,
} = require("./emails/templates/passwordUpdated.email.js");

async function testMails() {
  const title = "Your password is changed successfully";
  const email = "mantragor77@gmail.com";
  const body = updatePassword(email, "Mantra");
  await mailSender(email, title, body);
}
// testMails();
