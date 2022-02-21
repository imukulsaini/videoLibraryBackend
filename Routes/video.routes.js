const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkVideoID } = require("../controllers/videos.controller");

const { Video } = require("../Modals/video.modal");
const { Category } = require("../Modals/category.modal");

/**
 * @api {get} https://api.example.com/v1/videos Get Videos
 * @apiName Get Videos
 * @apiGroup Videos
 * @apiVersion 1.0.0
* @apiPermission none

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *   "message": "videos Fetching Successfully Done ",
 *   "videos": [
 *       {
 *           "likesBy": [],
 *           "_id": "614e751a9a1bbf6d2b",
 *           "object": "videos",
 *           "channelImage": "https://yt3.ggpht.com/ytc/AAUhH4Bp0-xpFW2DOzOezZnGfU9kva03NaBVog=s176-c-k-c0x00ffffff-no-rj",
 *           "channelName": "System Innovations",
 *           "description": "This video explores the e mainstream within just a  crisis on a global scale. In this short documentary film, we explore this new environmental context ."
 *           "duration": "42:15",
 *           "likes": 735,
 *           "thumbnail": "http://img.youtube.com/vi/bjrPm30g/maxreefault.jpg",
 *           "title": "Sustainability - Full Documentary",
 *           "videoID": "bjrPim30g",
 *           "views": 5654,
 *           "category": "environment",
 *       },
 *
 *
 */

router
  .route("/")

  .get(async (req, res) => {
    const videos = await Video.find({});

    res
      .status(200)
      .json({ message: "videos Fetching Successfully Done ", videos });
  })

  .post(async (req, res) => {
    try {
      const video = req.body;

      const NewVideo = new Video(video);
      const savedVideo = await NewVideo.save();
      res.status(201).json({
        message: "new video saved Successfully ",
        video: savedVideo,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });

/**
 * @api {get} https://api.example.com/v1/videos/trending Get Trending Videos
 * @apiName Get Trending Videos
 * @apiGroup Videos
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *   "message": "Trending Videos Fetching Successfully Done",
 *   "trendingVideos": [
 *       {
 *           "likesBy": [],
 *           "_id": "614e751a1bbf6d2b",
 *           "object": "videos",
 *           "channelImage": "https://yt3.ggpht.com/ytc/AAUhH4Bp0-xpFW2DOzOezZnGfU9kva03NaBVog=s176-c-k-c0x00ffffff-no-rj",
 *           "channelName": "System Innovations",
 *           "description": "This video explores the e mainstream within just a  crisis on a global scale. In this short documentary film, we explore this new environmental context ."
 *           "duration": "42:15",
 *           "likes": 735,
 *           "thumbnail": "http://img.youtube.com/vi/bjrPm30g/maxreefault.jpg",
 *           "title": "Sustainability - Full Documentary",
 *           "videoID": "bjr30g",
 *           "views": 5654,
 *           "category": "environment",
 *       },
 *        {
 *           "likesBy": [],
 *           "_id": "614e751a9bbf6d2b",
 *           "object": "videos",
 *           "channelImage": "https://yt3.ggpht.com/ytc/AAUhH4Bp0-xOzOezZnGfU9kva03NaBVog=s176-c-k-c0x00ffffff-no-rj",
 *           "channelName": "System Innovations",
 *           "description": "This video explores the e mainstream within just a  crisis on a global scale. In this short documentary film, we explore this new environmental context ."
 *           "duration": "42:15",
 *           "likes": 735,
 *           "thumbnail": "http://img.youtube.com/vi/bjm30g/maxreefault.jpg",
 *           "title": "Sustainability - Full Documentary",
 *           "videoID": "bjrP30g",
 *           "views": 5654,
 *           "category": "history",
 *       },
 *            ]
 *
 *   }
 *
 *
 */

router.route("/trending").get(async (req, res) => {
  const videos = await Video.find({}).sort({ views: -1 });
  res.status(200).json({
    message: "videos Fetching Successfully Done ",
    trendingVideos: videos,
  });
});

/**
 * @api {get} https://api.example.com/v1/videos/category/:categoryName Get Category Videos
 * @apiName Get Category Videos
 * @apiGroup Videos
 * @apiVersion 1.0.0
 * @apiParam {String} CategoryName   Name of the Category .
 * @apiPermission none
  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Categories Videos Fetch Successful",
    "videos": [
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
  
 *
     * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "category name is not found"
 *     } 
 */

router
  .route("/category/:categoryName")

  .get(async (req, res) => {
    const { categoryName } = req.params;

    const isCategoryExist = await Category.find({ name: categoryName });
    if (isCategoryExist) {
      const getCategoriesVideos = await Video.find({ category: categoryName });

      res.status(200).json({
        message: "Categories Videos Fetch Successful",
        videos: getCategoriesVideos,
      });
    } else {
      res.status(404).json({ message: "category name is not found " });
    }
  });

router.param("videoID", checkVideoID);

/**
 * @api {get} https://api.example.com/v1/videos/:videoID   Get Video By ID 
 * @apiName Get Video ID 
 * @apiGroup Videos
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiParam {String} videoID   unique ID of Video.

  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
 *   "message": "video Fetching Successfully Done",
 *   "video": [
 *       {
 *           "likesBy": [],
 *           "_id": "614e751a9a1bbf6d2b",
 *           "object": "videos",
 *           "channelImage": "https://yt3.ggpht.com/ytc/AAUhH4Bp0-xpFW2DOzOezZnGfU9kva03NaBVog=s176-c-k-c0x00ffffff-no-rj",
 *           "channelName": "System Innovations",
 *           "description": "This video explores the e mainstream within just a  crisis on a global scale. In this short documentary film, we explore this new environmental context ."
 *           "duration": "42:15",
 *           "likes": 735,
 *           "thumbnail": "http://img.youtube.com/vi/bjrPm30g/maxreefault.jpg",
 *           "title": "Sustainability - Full Documentary",
 *           "videoID": "bjrPim30g",
 *           "views": 5654,
 *           "category": "environment",
 *       },
 *   
 *            ]
 * 
 *   }
 * 
 * 
 */

router
  .route("/:videoID")

  .get((req, res) => {
    let { video } = req;
    video.__v = undefined;
    res
      .status(200)
      .json({ video, message: "video Fetching Successfully Done" });
  })

  .post(async (req, res) => {
    let { video } = req;
    const updateVideo = req.body;
    video = extend(video, updateVideo);
    video = await video.save();
    res.status(201).json({ message: "video Updated", video });
  })

  .delete(async (req, res) => {
    let { video } = req;
    video = await video.remove();
    res.status(204);
  });

module.exports = router;
