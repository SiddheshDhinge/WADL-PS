const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
    Songname : String,
    Film: String,
    Music_director: String,
    singer: String,
    actor: String,
    actress: String,
});

const Music = mongoose.model("songdetails", MusicSchema);

module.exports = Music;