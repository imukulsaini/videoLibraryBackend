const express = require("express");
const router = express.Router();
const { extend } = require("lodash");

const jwt = require("jsonwebtoken");
const mySecret = process.env["keySecret"];

const bcrypt = require("bcrypt");

const saltRounds = 10;

const { User } = require("../Modals/user.modal");

router.route("/login").post(async (req, res) => {
  let getUserData = req.body;
  let { username, password } = getUserData;

  try {
    const usernameExist = await User.findOne({ username: username })
      .populate("watchLater")
      .populate("likedVideo")
      .populate("playlist.videos");
    if (usernameExist) {
      const passwordCheck = await bcrypt.compare(
        password,
        usernameExist.password
      );

      if (passwordCheck) {
        const token = jwt.sign({ userID: usernameExist._id }, mySecret);
        return res.json({ status: 201, userData: usernameExist, token });
      } else {
        return res.json({ status: 402, message: "password is not correct" });
      }
    } else {
      return res.json({ status: 401, message: "user is not found" });
    }
  } catch (error) {
    res.json({ status: 401, message: error });
  }
});

router.route("/signup").post(async (req, res) => {
  let getUserData = req.body;

  let { username, password } = getUserData;

  try {
    const userExistCheck = await User.findOne({ username: username });
    if (userExistCheck) {
      return res.json({ status: 403, message: "user already exist " });
    } else {
      const hashPassword = bcrypt.hashSync(password, saltRounds);
      getUserData.password = hashPassword;

      const NewUser = new User(getUserData);
      const newUserData = await NewUser.save();

      const token = jwt.sign({ userID: newUserData._id }, mySecret);

      return res.json({
        status: 201,
        message: "New User Saved Successfully ",
        userData: newUserData,
        token,
      });
    }
  } catch (error) {
    res.json({ status: 401, message: error });
  }
});

module.exports = router;
