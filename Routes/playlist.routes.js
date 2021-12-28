const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkPlaylistID } = require("../controllers/playlist.controller.js");
const { checkUserID } = require("../controllers/users.controller.js");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");

router.param("userID", checkUserID);

router
  .route("/:userID/playlist")

  .get(async (req, res) => {
    let { user } = req;
    let { playlist } = user;

    res.status(200).json({ playlist });
  })

  .post(async (req, res) => {
    let { user } = req;
    const { _id } = user;

    let { name } = req.body;

    user.playlist.push({ name: name });
    await user.save();
    const userPlaylist = user.playlist;

    res.status(201).json({ userPlaylist });
  });

router.param("playlistID", checkPlaylistID);

router
  .route("/:userID/playlist/:playlistID")

  .get(async (req, res) => {
    const { playlist } = req;

    res.status(200).json({ playlist });
  })

  .post(async (req, res) => {
    let { user } = req;

    let { playlist } = req;
    const options = { new: true };

    const { videoId } = req.body;
    if (videoId) {
      const playlistVideoExist = await playlist.videos.find(
        (video) => video._id == videoId
      );

      if (playlistVideoExist) {
        //remove video in playlist
        const getVideosFromPlayList = await playlist.videos.filter(
          (video) => video._id != videoId
        );

        playlist.videos = getVideosFromPlayList;
        await user.save();
        const userPlaylist = user.playlist;
        return res.status(201).json({
          message: "video deleted from playlist",
          playlist: userPlaylist,
        });
      } else {
        //add video in playlist

        playlist.videos.push(videoId);

        await user.save();
        const userPlaylist = user.playlist;
        return res.status(201).json({
          message: "a new video is added in playlist ",
          playlist: userPlaylist,
        });
      }
    } else {
      return res.status(404).json({ message: "video is not found" });
    }
  })

  .delete(async (req, res) => {
    let { playlist, user } = req;

    await playlist.remove();
    await user.save();
    res.status(204).send();
  });

module.exports = router;
