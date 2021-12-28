const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkUserID } = require("../controllers/users.controller.js");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");




router.param("userID", checkUserID);



router
  .route("/:userID/watchlater")

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
      return res.status(403).json({ message:" video already exit" });
    } else {
      user.watchLater.push(videoId);

      await user.save();
      const video = await Video.findById(videoId);
      return res.status(201).json({
        video,
        message: " a new video added in watch later ",
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
    ).populate("watchLater") ;

    res.status(204).send();
    //  json({

    // message:'update watchLater successfull ',

    // userData : updateWatchLaterInUser,
    // status:201})
  });




module.exports = router;
