const express = require("express");
const router = express.Router();
const { extend } = require("lodash");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");

router.param("userId", async (req, res, next, id) => {
  try {
    const userIdCheck = await User.findById(id)
      .populate("likedVideo")
      .populate("watchLater");

    req.user = userIdCheck;
    next();
  } catch (error) {
    res.json({ status: 401, message: "user Id is not Valid" });
  }
});

router
  .route("/:userId/likedVideo")
  .get(async (req, res) => {
    const { user } = req;
    const { likedVideo } = user;
    res.json({
      likedVideos: likedVideo,
      status: 201,
    });
  })

  .post(async (req, res) => {
    let { user } = req;

    const { videoId } = req.body;
    let { _id } = user;

    const options = { new: true };

    let likedVideoExist = await user.likedVideo.find(
      (video) => video._id == videoId
    );

    if (!likedVideoExist) {
      let updateVideoLikes = await Video.findByIdAndUpdate(
        videoId,
        {
          $inc: { likes: 1 },
        },
        options
      );

      user.likedVideo.push(videoId);
      await user.save();

      res.json({
        updateLikedVideo: updateVideoLikes,
        user,
        status: 201,
        message: "new video in likedVideo saved Successfully ",
      });
    } else {
      res.json({ message: "already Liked By User" });
    }
  })

  .delete(async (req, res) => {
    let { user } = req;

    const { videoId } = req.body;
    let { _id } = user;

    const options = { new: true };

    const getLikedVideos = await user.likedVideo.filter(
      (video) => video._id != videoId
    );

    const updateLikedVideoInUser = await User.findByIdAndUpdate(
      _id,
      {
        likedVideo: getLikedVideos,
      },
      options
    ).populate("likedVideo");

    const updateVideoLikes = await Video.findByIdAndUpdate(
      videoId,
      {
        $inc: { likes: -1 },
      },
      options
    );

    res.json({
      message: "update watchLater successfully ",
      updateLikedVideo: updateVideoLikes,
      user: updateLikedVideoInUser,
      status: 201,
    });
  });

module.exports = router;
