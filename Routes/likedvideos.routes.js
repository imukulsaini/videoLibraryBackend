const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkUserID } = require("../controllers/users.controller.js");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");

router.param("userID", checkUserID);

router
  .route("/:userID/likedVideo")

  .get(async (req, res) => {
    const { user } = req;
    const { likedVideo } = user;
    res.status(200).json({
      likedVideos: likedVideo,
    });
  })


  .post(async (req, res) => {


    let { user } = req;

    const { videoId } = req.body;
    let isVideoExist = await Video.findById(videoId);
    isVideoExist.likesBy.push(req.params.userID);
    isVideoExist.likes = isVideoExist.likes + 1;
    await isVideoExist.save();

    user.likedVideo.push(videoId);
    await user.save();
    res.status(201).json({
      video: isVideoExist,
      user,
      message: " user like a new video  ",
    });


  })

  .delete(async (req, res) => {
      
    let { user } = req;

    const { videoId } = req.body;

    const isVideoExist = await Video.findById(videoId);

    isVideoExist.likesBy.pull(req.params.userID);
    isVideoExist.likes = isVideoExist.likes - 1;
    await isVideoExist.save();

    user.likedVideo.pull(videoId);
    await user.save();

    res.status(204).send();

    // json({
    //     message: '',
    //     video: videoExist,
    //     user,
    //     status: 201
    // })
  });



module.exports = router;
