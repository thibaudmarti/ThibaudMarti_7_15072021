// import express
const express = require("express");

const cookieParser = require("cookie-parser");

// path for routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const commentRoutes = require("./routes/comment.routes");
// const { requireAuth } = require("./middlewares/auth.middleware");
const authJwtid = require("./middlewares/authJwtid.middleware");
// const auth = require("./middlewares/auth.middleware");

const path = require("path");
// import morgan
const morgan = require("morgan");

// import helmet
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("dev"));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// method to parse the request body as a JSON object (POST)
app.use(express.json());
app.use(cookieParser());

app.get("/jwtid", authJwtid, (req, res) => {
  // console.log(res.locals.user);
  // console.log(res.locals.user.id_user);
  res.status(200).json(res.locals.user.id_user);
});

// static image resource management
app.use("/images", express.static(path.join(__dirname, "images")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
