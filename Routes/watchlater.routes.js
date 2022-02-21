const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkUserID } = require("../controllers/users.controller.js");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");

router.param("userID", checkUserID);

/**
 * @api {get} https://api.example.com/v1/users/:userID/watchlater  Get User WatchLater
 * @apiName  Get User WatchLater 
 * @apiGroup Watch Later
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 Ok 
{   
    "watchLaterVideos": [
        {
            "likesBy": [
                "61c8a2459147d0002aa1f155"
            ],
            "_id": "61ab56fb459e0b004eb32ae6",
            "object": "videos",
            "channelImage": "https://yt3.ggpht.com/ytc/AKedOLRpSG1qB5isrAZbGQXWyWcoa332Lwe7WWX1qSYv=s88-c-k-c0x00ffffff-no-rj",
            "channelName": "The Vagabond Films",
            "description": "Documentary on Shri Banke Bihari Temple - VRINDAVAN We were able to film this documentary due of your generous contribution. We are grateful and motivated by the fact that so many individuals supported our work. Please help us make the next documentary film by donating and encouraging us to do so. Banke Bihari Temple is a Hindu temple dedicated to Krishna, in the holy city of Vrindavan in the Mathura district of Uttar Pradesh, India. It was constructed in 1864. Situated near Shri Radha Vallabh temple, Bankey Bihari was originally worshipped at Nidhivan.",
            "duration": "17:19",
            "likes": 78,
            "thumbnail": "https://img.youtube.com/vi/8WltYGnETWA/maxresdefault.jpg",
            "title": "BANKE BIHARI TEMPLE - Vrindavan | Documentary 2021 | Incredible Facts From Inside The Temple | 4K",
            "videoID": "8WltYGnETWA",
            "views": 4654,
            "category": "history",
            "__v": 1
        },
        {
            "likesBy": [],
            "_id": "61ab57b8459e0b004eb32ae7",
            "object": "videos",
            "channelImage": "https://yt3.ggpht.com/ytc/AKedOLRYmnyvVq1rICAuDvn0HQM5GldGKBeBSYy1YwJoCQ=s88-c-k-c0x00ffffff-no-rj",
            "channelName": "Timeline - World History Documentaries",
            "description": "A stirring cinematic journey into the dramatic and heroic lives of the convict rebels exiled to the prison without walls. Revered in their homelands their convict lives are an amazing untold story - until now.",
            "duration": "49:29",
            "likes": 45,
            "thumbnail": "https://img.youtube.com/vi/OZLc4QcJb-U/maxresdefault.jpg",
            "title": "Australia: How A British Prison Colony Became A Nation | Death Or Liberty | Timeline",
            "videoID": "OZLc4QcJb-U",
            "views": 7974,
            "category": "history",
            "__v": 0
        },
          ]
    }
      * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User ID is not found"
 *     } 
 * 
 * 
 * *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "An authentication error."
 *     } 
 *
 */

/**
 * @api {post} https://api.example.com/v1/users/:userID/watchlater  Add In WatchLater
 * @apiName  Add In WatchLater 
 * @apiGroup Watch Later
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiBody {String} videoId   Unique ID of A Video 

 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Ok Created
{   
    "message":"a new video added in watch later"
    "video": 
        {
            "likesBy": [
                "61c8a2459147d0002aa1f155"
            ],
            "_id": "61ab56fb459e0b004eb32ae6",
            "object": "videos",
            "channelImage": "https://yt3.ggpht.com/ytc/AKedOLRpSG1qB5isrAZbGQXWyWcoa332Lwe7WWX1qSYv=s88-c-k-c0x00ffffff-no-rj",
            "channelName": "The Vagabond Films",
            "description": "Documentary on Shri Banke Bihari Temple - VRINDAVAN We were able to film this documentary due of your generous contribution. We are grateful and motivated by the fact that so many individuals supported our work. Please help us make the next documentary film by donating and encouraging us to do so. Banke Bihari Temple is a Hindu temple dedicated to Krishna, in the holy city of Vrindavan in the Mathura district of Uttar Pradesh, India. It was constructed in 1864. Situated near Shri Radha Vallabh temple, Bankey Bihari was originally worshipped at Nidhivan.",
            "duration": "17:19",
            "likes": 78,
            "thumbnail": "https://img.youtube.com/vi/8WltYGnETWA/maxresdefault.jpg",
            "title": "BANKE BIHARI TEMPLE - Vrindavan | Documentary 2021 | Incredible Facts From Inside The Temple | 4K",
            "videoID": "8WltYGnETWA",
            "views": 4654,
            "category": "history",
            "__v": 1
        },
          
    }
      * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User ID is not found"
 *     } 
 * 
 * 
 * *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "An authentication error."
 *     } 
 * 
 *  * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "video already exit"
 *     } 
 *
 */

/**
 * @api {delete} https://api.example.com/v1/users/:userID/watchlater  Remove From WatchLater
 * @apiName  Remove From WatchLater
 * @apiGroup Watch Later
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiBody {String} videoId   Unique ID of A Video 

 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
    
      * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User ID is not found"
 *     } 
 * 
 * 
 * *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "An authentication error."
 *     } 
 * 

 */

router
  .route("/")

  .get(async (req, res) => {
    const { user } = req;

    const { watchLater } = user;

    res.status(200).json({
      watchLaterVideos: watchLater,
    });
  })

  .post(async (req, res) => {
    const { user } = req;

    const { videoId } = req.body;

    const watchLaterVideoExist = await user.watchLater.find(
      (video) => video._id == videoId
    );

    if (watchLaterVideoExist) {
      return res.status(403).json({ message: "video already exit" });
    } else {
      user.watchLater.push(videoId);

      await user.save();
      const video = await Video.findById(videoId);
      return res.status(201).json({
        video,
        message: "a new video added in watch later ",
      });
    }
  })

  .delete(async (req, res) => {
    let { videoId } = req.body;
    const { user } = req;

    const { _id } = user;

    const options = { new: true };

    const getWatchLaterVideos = await user.watchLater.filter(
      (video) => video._id != videoId
    );

    await User.findByIdAndUpdate(
      _id,
      {
        watchLater: getWatchLaterVideos,
      },
      options
    ).populate("watchLater");

    res.status(204).send();
    //  json({

    // message:'update watchLater successfull ',

    // userData : updateWatchLaterInUser,
    // status:201})
  });

module.exports = router;
