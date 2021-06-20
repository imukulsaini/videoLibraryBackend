const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());

const mySecret = process.env["keySecret"];

function authVerify(req, res, next) {
  const token = req.headers.authorization;

  try {
    let decoded = jwt.verify(token, mySecret);
    req.user = { userID: decoded.userID };
    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized access" });
  }
}

app.use(bodyParser.json());

//db connect

const { initializeDBConnection } = require("./db/db.connect.js");
const PORT = 3000;
initializeDBConnection();

const videoV1 = require("./Routes/video.routes");
const userV1 = require("./Routes/user.routes");
const likedVideoV1 = require("./Routes/likedvideos.routes.js");
const watchLaterV1 = require("./Routes/watchlater.routes.js");
const playListV1 = require("./Routes/playlist.routes.js");

app.use("/videos", videoV1);
app.use("/", userV1);

//private Route '/me'

app.use("/v1/", authVerify, likedVideoV1);
app.use("/v1/", authVerify, watchLaterV1);
app.use("/v1/", authVerify, playListV1);

// 404 Route Handler

app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: "route not found on server, please check",
    });
});

//  Error Handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: "error occurred, see the errMessage key for more details",
      errorMessage: err.message,
    });
});

// port establish

app.listen(3000, () => {
  console.log("server started");
});
