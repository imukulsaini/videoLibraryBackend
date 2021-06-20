const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  object: {
    type: String,
    required: true,
  },
  videoId: {
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

  channelName: {
    type: String,
    required: true,
  },
  channelImage: {
    type: String,
    required: true,
  },
  channelSubscribers: {
    type: Number,
  },
  duration: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
  views: {
    type: Number,
  },
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
