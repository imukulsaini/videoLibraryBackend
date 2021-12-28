async function checkPlaylistID(req, res, next, id) {

    try {

        let { user } = req;

        const playlistExist = await user.playlist.find((item) => item._id == id);

        if (!playlistExist) {
            res.status(404).json({ message: "playlist ID is not Found " });
        } else {
            req.playlist = playlistExist
            next();
        }


    } catch (error) {
        res.status(400).json({ message: error });
    }

}


module.exports = { checkPlaylistID };
