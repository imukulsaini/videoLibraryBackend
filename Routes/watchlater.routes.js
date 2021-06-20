const express = require("express");
const router = express.Router();
const { extend } = require("lodash");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");

router.param("userId", async (req, res, next, id) => {
  try {
    const userIdCheck = await User.findById(id)

      .populate("likedVideo.videoId")
      .populate("watchLater")
      .populate("playlist.videoId");

    req.user = userIdCheck;
    next();
  } catch (error) {
    res.json({ status: 401, message: "user Id is not Valid" });
  }
});

router
  .route("/:userId/watchlater")
  .get(async (req, res) => {
    const { user } = req;

    const { watchLater } = user;

    res.json({
      watchLaterVideos: watchLater,
      status: 201,
    });
  })

  .post(async (req, res) => {
    const { user } = req;

    const { videoId } = req.body;

    const watchLaterVideoExist = await user.watchLater.find(
      (video) => video._id == videoId
    );

    if (watchLaterVideoExist) {
      return res.json({ message: "video already exit " });
    } else {
      user.watchLater.push(videoId);

      await user.save();

      return res.json({
        status: 201,
        message: "New Watch Later Video Added",
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

    const updateWatchLaterInUser = await User.findByIdAndUpdate(
      _id,
      {
        watchLater: getWatchLaterVideos,
      },
      options
    ).populate("watchLater");

    res.json({
      message: "update watchLater successfully ",

      userData: updateWatchLaterInUser,
      status: true,
    });
  });

module.exports = router;
