const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken');

// const authVerify = require('./middlewares/authverify.middleware.js')

const authVerify = require('./middlewares/authVerify.middleware.js')
const { routeErrorHandler } = require('./middlewares/routeErrorHandler.middleware.js');
const { errorHandler } = require('./middlewares/errorHandler.middleware.js');
const mySecret = process.env['keySecret']


app.use(cors())
app.use(bodyParser.json());



// db connect 

const { initializeDBConnection } = require("./db/db.connect.js")
const PORT = 3000;
initializeDBConnection();




const videoV1 = require("./Routes/video.routes")
const userV1 = require("./Routes/user.routes")
const likedVideoV1 = require("./Routes/likedvideos.routes.js");
const watchLaterV1 = require("./Routes/watchlater.routes.js")
const playListV1 = require("./Routes/playlist.routes.js");






app.use("/v1/videos", videoV1)
app.use("/v1/", userV1)

// private Route 

app.use("/v1/", authVerify, likedVideoV1);
app.use("/v1/", authVerify, watchLaterV1)
app.use("/v1/", authVerify, playListV1)



// 404 Route Handler

app.use(routeErrorHandler)



//  Error Handler

app.use(errorHandler)


// port establish


app.listen(3000, () => {
    console.log('server started');
});