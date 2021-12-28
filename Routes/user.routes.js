const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const jwt = require("jsonwebtoken");

const mySecret = process.env["keySecret"];

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { User } = require("../Modals/user.modal");
const authVerify = require("../middlewares/authVerify.middleware");
const {
  checkUserID,
  compareAndUpdatePassword,
  updateUserProfile,
} = require("../controllers/users.controller");

router.route("/login").post(async (req, res) => {
  let getUserData = req.body;
  let { username, password } = getUserData;

  try {
    const isUserExist = await User.findOne({ username: username })

      .populate("watchLater")
      .populate("likedVideo")
      .populate("playlist.videos");

    if (isUserExist) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserExist.password
      );

      if (isPasswordCorrect) {
        const token = jwt.sign({ userID: isUserExist._id }, mySecret);
        return res.status(201).json({ userData: isUserExist, token });
      } else {
        return res
          .status(403)
          .json({ message: "your password is not correct please try again " });
      }
    } else {
      return res.status(404).json({ message: "user account is not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router
  .route("/signup")

  .post(async (req, res) => {
    let getUserData = req.body;

    let { username, password } = getUserData;

    try {
      const userExistCheck = await User.findOne({ username: username });
      if (userExistCheck) {
        return res.status(403).json({ message: "username is already exist  " });
      } else {
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        getUserData.password = hashPassword;

        const NewUser = new User(getUserData);

        const newUserData = await NewUser.save();

        const token = jwt.sign({ userID: newUserData._id }, mySecret, {
          expiresIn: "24h",
        });

        return res.status(201).json({
          message: "New User Saved Successfully ",
          userData: newUserData,
          token,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

router.param("userID", checkUserID);

router
  .route("/users/:userID")

  .get(authVerify, async (req, res) => {
    const { userId } = req;
    const { user } = req;

    let paramUserId = user._id.toString();
    let tokenUserId = userId.userID.toString();

    if (paramUserId === tokenUserId) {
      const token = jwt.sign({ userID: user._id }, mySecret, {
        expiresIn: "24h",
      });
      return res.status(200).json({ userData: user, token });
    } else {
      return res.status(401).json({ message: " token is not valid " });
    }
  })

  .delete(authVerify, async (req, res) => {
    const userID = req.params.userID;

    await User.findByIdAndRemove(userID);
    res.status(204);
  });

router.route("/users/:userID/profile").post(authVerify, async (req, res) => {
  const userData = req.body;
  const userID = req.params.userID;

  const updatedData = await updateUserProfile(userID, userData);
  if (updatedData.errorMessage) {
    res.status(403).json({
      message: updatedData.errorMessage,
    });
  } else {
    res.status(201).json({
      message: "User Profile updated",

      userData: updatedData,
    });
  }
});

router.route("/users/:userID/password").post(
  (authVerify,
  async (req, res) => {
    const { user } = req;
    const userID = req.params.userID;
    const { currentPassword, newPassword } = req.body;

    const isPasswordUpdated = await compareAndUpdatePassword(
      userID,
      currentPassword,
      user.password,
      newPassword
    );

    if (isPasswordUpdated) {
      return res.status(201).json({
        message: "User Password updated ",
      });
    } else {
      res.status(403).json({ message: "Your Current Password is incorrect" });
    }
  })
);

module.exports = router;
