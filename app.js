// import express
const express = require("express");

const cookieParser = require("cookie-parser");

// path for routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");

// const path = require("path");
// import morgan
// const morgan = require("morgan");
// import and config dotenv
// require("dotenv").config();
// import helmet
// const helmet = require("helmet");

// connection with database
// const mysql = require("mysql2");
// require("dotenv").config();

// const pool = mysql.createPool({
//   connectionLimit: 100,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// pool.getConnection((err, connection) => {
//   if (err) throw err;
//   console.log("Connected as ID " + connection.threadId);
// });

const app = express();

// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// app.use(morgan("dev"));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// method to parse the request body as a JSON object (POST)
app.use(express.json());
app.use(cookieParser());

// static image resource management
// app.use("/images", express.static(path.join(__dirname, "images")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
