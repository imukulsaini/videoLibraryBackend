const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkPlaylistID } = require("../controllers/playlist.controller.js");
const { checkUserID } = require("../controllers/users.controller.js");

const { User } = require("../Modals/user.modal.js");
const { Video } = require("../Modals/video.modal");

router.param("userID", checkUserID);

/**
 * @api {get} https://api.example.com/v1/users/:userID/playlist  Get User Playlist
 * @apiName  Get User Playlist 
 * @apiGroup Playlist
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 Ok 
{   
    "playlist": [
        {
      "videos": [
          {
             "likesBy": [],
              "_id": "614e75989a1b680059bf6d2c",
              "object": "videos",
              "channelImage": "https://yt3.ggpht.com/ytc/AAUvwngj2k_alaVK6ltOetxbHCDPfzeVKxEebaFqmOPw=s88-c-k-c0x00ffffff-no-rj",
              "channelName": "Top Class Documentries",
              "description": "Can you imagine our world in 2050? Can you imagine the earth in 2050? Can you imagine people in 2050? Do you want to know the future of earth? By mid-century there will likely be 9 billion people on the planet, consuming ever more resources and leading ever more technologically complex lives. What will our cities be like? How will we eat in the future of Earth? Will global warming trigger catastrophic changes, or will we be able to engineer our way out of the world climate crisis? In the future world demographic changes will certainly be dramatic. Rockefeller University mathematical biologist Joel Cohen says it's likely that by 2050 the majority of the people in the world will live in urban areas of the earth, and will have a significantly higher average age than people today",
              "duration": "43:43",
              "likes": 12737,
              "thumbnail": "http://img.youtube.com/vi/g_1oiJqE3OI/maxresdefault.jpg",
              "title": "The World In 2050 [The Real Future Of Earth] - BBC & Nat Geo Documentaries",
             "videoID": "g_1oiJqE3OI",
              "views": 75654,
              "category": "environment",
              "__v": 67
          }
      ],
      "_id": "61e2e6975a7b9c00b583ed14",
      "name": "playlistName"
  },       {
      "videos": [],
      "_id": "61e2e6a55a7b9c00b583ed16",
      "name": "PlaylistName"
  },
          ]
    }
      * @apiErrorExample {json} Error-Response:
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

/**
 * @api {get} https://api.example.com/v1/users/:userID/playlist  Create Playlist
 * @apiName  Create Playlist 
 * @apiGroup Playlist
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Ok Created
{   
    "userPlaylist": {
      "videos": [],
      "_id": "61e2e6a55a7b9c00b583ed16",
      "name": "PlaylistName"
            }
          

  }       
      * @apiErrorExample {json} Error-Response:
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

router
  .route("/")

  .get(async (req, res) => {
    let { user } = req;
    let { playlist } = user;

    res.status(200).json({ playlist });
  })

  .post(async (req, res) => {
    let { user } = req;
    const { _id } = user;

    let { name } = req.body;

    user.playlist.push({ name: name });
    await user.save();
    const userPlaylist = user.playlist;

    res.status(201).json({ userPlaylist });
  });

router.param("playlistID", checkPlaylistID);

/**
 * @api {get} https://api.example.com/v1/users/:userID/playlist/:playlistID  Get Playlist Videos By ID
 * @apiName  Get Playlist Videos By ID
 * @apiGroup Playlist
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiParam {String} playlistID   Unique ID of A Playlist .

 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 Ok 
{   
    "playlist": [
        {
      "videos": [
          {
             "likesBy": [],
              "_id": "614e75989a1b680059bf6d2c",
              "object": "videos",
              "channelImage": "https://yt3.ggpht.com/ytc/AAUvwngj2k_alaVK6ltOetxbHCDPfzeVKxEebaFqmOPw=s88-c-k-c0x00ffffff-no-rj",
              "channelName": "Top Class Documentries",
              "description": "Can you imagine our world in 2050? Can you imagine the earth in 2050? Can you imagine people in 2050? Do you want to know the future of earth? By mid-century there will likely be 9 billion people on the planet, consuming ever more resources and leading ever more technologically complex lives. What will our cities be like? How will we eat in the future of Earth? Will global warming trigger catastrophic changes, or will we be able to engineer our way out of the world climate crisis? In the future world demographic changes will certainly be dramatic. Rockefeller University mathematical biologist Joel Cohen says it's likely that by 2050 the majority of the people in the world will live in urban areas of the earth, and will have a significantly higher average age than people today",
              "duration": "43:43",
              "likes": 12737,
              "thumbnail": "http://img.youtube.com/vi/g_1oiJqE3OI/maxresdefault.jpg",
              "title": "The World In 2050 [The Real Future Of Earth] - BBC & Nat Geo Documentaries",
             "videoID": "g_1oiJqE3OI",
              "views": 75654,
              "category": "environment",
              "__v": 67
          }
      ],
      "_id": "61e2e6975a7b9c00b583ed14",
      "name": "playlistName"
  },       {
      "videos": [],
      "_id": "61e2e6a55a7b9c00b583ed16",
      "name": "PlaylistName"
  },
          ]
    }
      * @apiErrorExample {json} Error-Response:
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

/**
 * @api {post} https://api.example.com/v1/users/:userID/playlist/:playlistID  Add Video In Playlist
 * @apiName  Add Video In Playlist
 * @apiGroup Playlist
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiParam {String} playlistID   Unique ID of A Playlist .

 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Ok Created
{   
    message:"a new video is added in playlist"
    "playlist": [
        {
      "videos": [
          {
             "likesBy": [],
              "_id": "614e75989a1b680059bf6d2c",
              "object": "videos",
              "channelImage": "https://yt3.ggpht.com/ytc/AAUvwngj2k_alaVK6ltOetxbHCDPfzeVKxEebaFqmOPw=s88-c-k-c0x00ffffff-no-rj",
              "channelName": "Top Class Documentries",
              "description": "Can you imagine our world in 2050? Can you imagine the earth in 2050? Can you imagine people in 2050? Do you want to know the future of earth? By mid-century there will likely be 9 billion people on the planet, consuming ever more resources and leading ever more technologically complex lives. What will our cities be like? How will we eat in the future of Earth? Will global warming trigger catastrophic changes, or will we be able to engineer our way out of the world climate crisis? In the future world demographic changes will certainly be dramatic. Rockefeller University mathematical biologist Joel Cohen says it's likely that by 2050 the majority of the people in the world will live in urban areas of the earth, and will have a significantly higher average age than people today",
              "duration": "43:43",
              "likes": 12737,
              "thumbnail": "http://img.youtube.com/vi/g_1oiJqE3OI/maxresdefault.jpg",
              "title": "The World In 2050 [The Real Future Of Earth] - BBC & Nat Geo Documentaries",
             "videoID": "g_1oiJqE3OI",
              "views": 75654,
              "category": "environment",
              "__v": 67
          }
      ],
      "_id": "61e2e6975a7b9c00b583ed14",
      "name": "playlistName"
  },       {
      "videos": [],
      "_id": "61e2e6a55a7b9c00b583ed16",
      "name": "PlaylistName"
  },
          ]
    }
      * @apiErrorExample {json} Error-Response:
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
 *       * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Video ID is Not Found "
 *     } 
 * 
 *
 */

/**
 * @api {post} https://api.example.com/v1/users/:userID/playlist/:playlistID  Remove Video In Playlist
 * @apiName  Remove Video In Playlist
 * @apiGroup Playlist
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiParam {String} playlistID   Unique ID of A Playlist .

 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Ok Created
{   
    message:"video deleted from playlist"
    "playlist": [
        {
      "videos": [],
      "_id": "61e2e6975a7b9c00b583ed14",
      "name": "playlistName"
  },       {
      "videos": [],
      "_id": "61e2e6a55a7b9c00b583ed16",
      "name": "Playlist Name History"
  },
          ]
    }
      * @apiErrorExample {json} Error-Response:
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
 *       * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Video ID is Not Found "
 *     } 
 * 
 *
 */

/**
 * @api {delete} https://api.example.com/v1/users/:userID/playlist/:playlistID  Remove Playlist ID
 * @apiName  Remove Playlist ID
 * @apiGroup Playlist
 * @apiVersion 1.0.0
 * @apiParam {String} userID   Unique ID of A User .
 * @apiPermission Yes

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
    {
    }
      * @apiErrorExample {json} Error-Response:
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

router
  .route("/:playlistID")

  .get(async (req, res) => {
    const { playlist } = req;

    res.status(200).json({ playlist });
  })

  .post(async (req, res) => {
    let { user } = req;

    let { playlist } = req;
    const options = { new: true };

    const { videoId } = req.body;
    if (videoId) {
      const playlistVideoExist = await playlist.videos.find(
        (video) => video._id == videoId
      );

      if (playlistVideoExist) {
        //remove video in playlist
        const getVideosFromPlayList = await playlist.videos.filter(
          (video) => video._id != videoId
        );

        playlist.videos = getVideosFromPlayList;
        await user.save();
        const userPlaylist = user.playlist;
        return res.status(201).json({
          message: "video deleted from playlist",
          playlist: userPlaylist,
        });
      } else {
        //add video in playlist

        playlist.videos.push(videoId);

        await user.save();
        const userPlaylist = user.playlist;
        return res.status(201).json({
          message: "a new video is added in playlist ",
          playlist: userPlaylist,
        });
      }
    } else {
      return res.status(404).json({ message: "video is not found" });
    }
  })

  .delete(async (req, res) => {
    let { playlist, user } = req;

    await playlist.remove();
    await user.save();
    res.status(204).send();
  });

module.exports = router;
