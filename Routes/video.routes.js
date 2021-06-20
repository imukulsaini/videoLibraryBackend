const express = require("express");
const router = express.Router();
const { extend } = require("lodash");

const { Video } = require("../Modals/video.modal");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({});

      res.json({
        status: 201,
        message: "videos Fetching Successfully Done ",
        videos,
      });
    } catch (error) {
      res.json({
        status: 401,
        message: error,
      });
    }
  })

  .post(async (req, res) => {
    try {
      const video = req.body;

      const NewVideo = new Video(video);
      const savedVideo = await NewVideo.save();
      res.json({
        status: 400,
        message: "new video saved Successfully ",
        video: savedVideo,
      });
    } catch (error) {
      res.json({
        status: 500,
        message: "video is not saved",
        errorMessage: error.message,
      });
    }
  });

router.param("videoId", async (req, res, next, id) => {
  try {
    const video = await Video.findById(id);

    if (!video) {
      res.json({ status: 401, message: "Video id is not valid " });
    } else {
      req.video = video;

      return next();
    }
  } catch (error) {
    res.json({ status: 410, message: error.message });
  }
});

router
  .route("/:videoId")
  .get((req, res) => {
    let { video } = req;
    video.__v = undefined;

    res.json({ status: 201, video });
  })
  .post(async (req, res) => {
    let { video } = req;
    const updateVideo = req.body;
    video = extend(video, updateVideo);
    video = await video.save();
    res.json({ status: 201, message: "video Updated", video });
  })

  .delete(async (req, res) => {
    let { video } = req;
    video = await video.remove();
    res.json({ status: 201, message: "video deleted" });
  });

module.exports = router;
