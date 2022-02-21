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

/**
 * @api {post} https://api.example.com/v1/login Login with Username 
 * @apiName   Login with Username 
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiBody {String} username  username of user
 * @apiBody {String} passoword  password of user 
 * @apiPermission none


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "userData": {
        "likedVideo": [],
        "watchLater": [],
        "_id": "61e2e6095akhkhb9c00bnv583ed0f",
        "firstName": "Mukul",
        "lastName": "Saini",
        "email": "mukulsaini@xyz.com",
        "username": "mukulxyz",
        "password": "$2b$10$Z1JllK1ZyK2jU9mvUejxdOgl4XA1mzjGJADcL8e",
        "object": "users",
        "playlist": [],
        "createdAt": "2022-01-15T15:19:37.875Z",
        "updatedAt": "2022-02-21T02:25:06.837Z",
    },
    "token": "eyJhbGciiOiI2MWUyZTYwOTVhN2I5YzAwYjU4M2VkMGYiLCJpYXQiOjE2NDU0MjM3NzZ9.rFiQeLbNYjVO9Dvar-slcWUZIO3FoRMDcYQIRGS5PcA"
}
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "user account is not found"
 *     } 
 *
 *
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request Error
 *     {
 *       "message": " Request Error"
 *     } 
 *
 * * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "your password is not correct please try again"
 *     } 
 *
 *
 */

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

/**
 * @api {post} https://api.example.com/v1/signup Create New User
 * @apiName   Create New User
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiPermission none
 * @apiBody {String} username  A unique username for user
 * @apiBody {String} password  password for user
 * @apiBody {String} email    A email address for a user
 * @apiBody {String} firstName  A first name for a user.
 * @apiBody {String} lastName  A last name for a user.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK Created
{
    "userData": {
        "likedVideo": [],
        "watchLater": [],
        "_id": "61e2e6095akhkhb9c00bnv583ed0f",
        "firstName": "Mukul",
        "lastName": "Saini",
        "email": "mukulsaini@xyz.com",
        "username": "mukulxyz",
        "password": "$2b$10$Z1JllK1ZyK2jU9mvUejxdOgl4XA1mzjGJADcL8e",
        "object": "users",
        "playlist": [],
        "createdAt": "2022-01-15T15:19:37.875Z",
        "updatedAt": "2022-02-21T02:25:06.837Z",
    },
    "token": "eyJhbGciiOiI2MWUyZTYwOTVhN2I5YzAwYjU4M2VkMGYiLCJpYXQiOjE2NDU0MjM3NzZ9.rFiQeLbNYjVO9Dvar-slcWUZIO3FoRMDcYQIRGS5PcA"
}

 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "username is already exist"
 *     } 
 *
 ** * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request Error
 *     {
 *       "message": " Request Error"
 *     } 
 *
 */

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

/**
 * @api {get} https://api.example.com/v1/users/:userID Get User By ID
 * @apiName   Get User By ID
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK 
{
    "userData": {
        "likedVideo": [],
        "watchLater": [],
        "_id": "61e2e6095akhkhb9c00bnv583ed0f",
        "firstName": "Mukul",
        "lastName": "Saini",
        "email": "mukulsaini@xyz.com",
        "username": "mukulxyz",
        "password": "$2b$10$Z1JllK1ZyK2jU9mvUejxdOgl4XA1mzjGJADcL8e",
        "object": "users",
        "playlist": [],
        "createdAt": "2022-01-15T15:19:37.875Z",
        "updatedAt": "2022-02-21T02:25:06.837Z",
    },
    "token": "eyJhbGciiOiI2MWUyZTYwOTVhN2I5YzAwYjU4M2VkMGYiLCJpYXQiOjE2NDU0MjM3NzZ9.rFiQeLbNYjVO9Dvar-slcWUZIO3FoRMDcYQIRGS5PcA"
}     
* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User ID is not found"
 *     } 
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "token is not valid"
 *     } 
 * 
 *
 */

/**
 * @api {delete} https://api.example.com/v1/users/:userID Delete User By ID
 * @apiName   Delete User By ID
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content

* @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User ID is not found"
 *     } 
 * 
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request Error
 *     {
 *       "message": " Request Error, Try Again Later"
 *     } 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "An authentication error."
 *     } 
 *
 *
 */

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
      return res.status(401).json({ message: "token is not valid " });
    }
  })

  .delete(authVerify, async (req, res) => {
    const userID = req.params.userID;
    try {
      await User.findByIdAndRemove(userID);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Request Error , Try Again Later" });
    }
  });

/**
 * @api {post} https://api.example.com/v1/users/:userID/profile  Update User Profile 
 * @apiName  Update User Profile 
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes
 * 
 * @apiBody {String} username  A unique username for user
 * @apiBody {String} passoword  password for user
 * @apiBody {String} email    A email address for a user
 * @apiBody {String} firstName  A first name for a user.
 * @apiBody {String} lastName  A last name for a user.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Ok Created
{   "message":"User Profile Updated"
    "userData": {
        "likedVideo": [],
        "watchLater": [],
        "_id": "61e2e6095akhkhb9c00bnv583ed0f",
        "firstName": "Mukul",
        "lastName": "Saini",
        "email": "mukulsaini@xyz.com",
        "username": "mukulxyz",
        "password": "$2b$10$Z1JllK1ZyK2jU9mvUejxdOgl4XA1mzjGJADcL8e",
        "object": "users",
        "playlist": [],
        "createdAt": "2022-01-15T15:19:37.875Z",
        "updatedAt": "2022-02-21T02:25:06.837Z",
    },
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "username already exist"
 *     } 
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User ID is not found"
 *     } 
 * 
 * 
 * *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "An authentication error."
 *     } 
 *
 */

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

/**
 * @api {post} https://api.example.com/v1/users/:userID/password  Change User Password
 * @apiName  Change User Password 
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes
 * 
 * @apiBody {String} currentPassword  a old password for user
 * @apiBody {String} newPassword  new password for user


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Ok Created
{   "message":"User Password updated"
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Your Current Password is incorrect"
 *     } 
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User ID is not found"
 *     } 
 * 
 * 
 * *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized Error
 *     {
 *       "message": "An authentication error."
 *     } 
 *
 */

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
