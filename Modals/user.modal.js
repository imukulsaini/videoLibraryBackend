const mongoose = require("mongoose");

const { Video } = require("./video.modal");

const UserSchema = new mongoose.Schema(
  {
    object: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    likedVideo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    playlist: [
      {
        name: {
          type: String,
          required: true,
        },

        videos: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
          },
        ],
      },
    ],

    watchLater: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
