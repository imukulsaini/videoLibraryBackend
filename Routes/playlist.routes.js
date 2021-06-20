const express = require("express");
const router = express.Router();
const { extend } = require("lodash");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");

router.param("userId", async (req, res, next, id) => {
  try {
    const userIdCheck = await User.findById(id).populate("playlist.videos");

    req.user = userIdCheck;
    next();
  } catch (error) {
    res.json({ status: 401, message: "user Id is not Valid" });
  }
});

router
  .route("/:userId/playlist")
  .get(async (req, res) => {
    let { user } = req;
    let { playlist } = user;

    res.json({ status: 201, playlist });
  })
  .post(async (req, res) => {
    let { user } = req;
    const { _id } = user;

    let { name } = req.body;

    user.playlist.push({ name: name });
    await user.save();

    res.json({ status: 201, userData: user });
  });

router.param("playlistId", async (req, res, next, id) => {
  try {
    let { user } = req;
    const playlistExist = await user.playlist.find((item) => item._id == id);

    req.playlist = playlistExist;
    next();
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
});

router
  .route("/:userId/playlist/:playlistId")

  .get(async (req, res) => {
    const { playlist } = req;
    res.json({ status: 201, playlist });
  })
  .post(async (req, res) => {
    let { user } = req;

    let { playlist } = req;
    const options = { new: true };

    const { name, videoId } = req.body;

    if (videoId) {
      const playlistVideoExist = await playlist.videos.find(
        (video) => video._id == videoId
      );

      if (playlistVideoExist) {
        const getVideosFromPlayList = await playlist.videos.filter(
          (video) => video._id != videoId
        );

        playlist.videos = getVideosFromPlayList;
        await user.save();
        return res.json({ status: 201, message: "delete video successfully" });
      } else {
        playlist.videos.push(videoId);

        playlist.markModified("videos");
        user.markModified("playlist");

        await user.save();

        return res.json({
          status: 201,
          message: "video added successfully ",
          user,
        });
      }
    } else {
      return res.json({ message: "video is not present" });
    }
  })
  .delete(async (req, res) => {
    let { playlist, user } = req;
    await playlist.remove();
    await user.save();
    res.json({ status: 201, message: "playlist deleted" });
  });

module.exports = router;
