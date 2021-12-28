const { User } = require("../Modals/user.modal.js");
const mySecret = process.env["keySecret"];

const bcrypt = require("bcrypt");
const saltRounds = 10;

// check user ID

async function checkUserID(req, res, next, id) {
  try {
    console.log(id);
    const isUserExist = await User.findById(id)
      .populate("watchLater")
      .populate("likedVideo")
      .populate("playlist.videos");

    req.user = isUserExist;
    next();
  } catch (error) {
    res.status(404).json({ message: "User ID is not found " });
  }
}

//update user profile

async function updateUserProfile(userID, userData) {
  const isUserNameExist = await User.findOne({
    username: userData.username,
  });

  if (isUserNameExist && isUserNameExist._id == userID) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      {
        $set: userData,
      },
      { new: true }
    );
    return updatedUser;
  } else if (isUserNameExist && isUserNameExist._id !== userID) {
    return { errorMessage: "username already exist" };
  } else {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      {
        $set: userData,
      },
      { new: true }
    );
    return updatedUser;
  }
}

// update Password

async function updateUserPassword(userID, newPassword) {
  const updatedUser = await User.findByIdAndUpdate(
    userID,
    {
      password: newPassword,
    },
    { new: true }
  );
  return updatedUser;
}

// Compare And Update UserPassword

async function compareAndUpdatePassword(
  userID,
  currentPassword,
  userOldPassword,
  newPassword
) {
  const passwordCheck = await bcrypt.compare(currentPassword, userOldPassword);

  if (passwordCheck) {
    const hashPassword = bcrypt.hashSync(newPassword, saltRounds);

    const updatedUser = await updateUserPassword(userID, hashPassword);

    return true;
  } else {
    return false;
  }
}

module.exports = { checkUserID, updateUserProfile, compareAndUpdatePassword };
