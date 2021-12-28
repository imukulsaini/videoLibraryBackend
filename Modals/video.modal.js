const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  object: {
    type: String,
    required: true,
  },
  videoID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  channelImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  likesBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likes: {
    type: Number,
  },
  views: {
    type: Number,
  },
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
