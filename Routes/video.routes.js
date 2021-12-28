const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkVideoID } = require("../controllers/videos.controller");

const { Video } = require("../Modals/video.modal");
const { Category } = require("../Modals/category.modal");

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

router.route("/trending").get(async (req, res) => {
  const videos = await Video.find({}).sort({ views: -1 });
  res.status(200).json({
    message: "videos Fetching Successfully Done ",
    trendingVideos: videos,
  });
});

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
      res.status(404).json({ message: " category name is not found " });
    }
  });

router.param("videoID", checkVideoID);

router
  .route("/:videoID")

  .get((req, res) => {
    let { video } = req;
    video.__v = undefined;

    res.status(200).json({ video });
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
