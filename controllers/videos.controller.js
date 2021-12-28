
const { Video } = require("../Modals/video.modal.js");

async function checkVideoID (req, res, next, id)  {
    try {
      const video = await Video.find({ videoID: id });
      req.video = video;
  
      return next();
      } 
     catch (error) {
        res.status(404).json({ message: " Video id is not found or for more read errMessage" ,errMessage:error })
    }
  }

  module.exports = { checkVideoID };
