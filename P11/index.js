const Music = require("./music");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/addAll", async (req, res) => {
    const musics = req.body;
    const data = []
    musics.forEach(music => {
        const {songname, film, musicdirector, singer} = music;
        data.push({
            Songname: songname, 
            Film: film, 
            Music_director: musicdirector,
            singer: singer
        });
    });

    const result = await Music.insertMany(data);
    res.send(result);
});

app.get("/getAll", async (req, res) => {
    const result = await Music.find();
    res.send({"Total Music" : result.length, result});
});

app.get("/getByDirector/:director", async (req, res) => {
    const director = req.params.director;
    const filter = {
        Music_director: director
    }

    const result = await Music.find(filter);
    res.send(result);
});

app.get("/getByDirectorAndSinger/:director/:singer", async (req, res) => {
    const director = req.params.director;
    const singer = req.params.singer;

    const filter = {
        Music_director : director,
        singer : singer,
    }

    const result = await Music.find(filter);
    res.send(result);
});

app.delete("/removeMusic/:id", async (req, res) => {
    const id = req.params.id;

    const filter = {
        _id : id,
    }

    const result = await Music.deleteOne(filter);
    res.send(result);
});

app.post("/add", async (req, res) => {
    const {songname, film, musicdirector, singer} = req.body;
    const data = {
        Songname: songname,
        Film: film,
        Music_director: musicdirector,
        singer: singer
    };

    const result = await Music.create(data);
    res.send(result);
});

app.get("/getBySingerAndFilm/:singer/:film", async (req, res) => {
    const singer = req.params.singer;
    const film = req.params.film;
    const filter = {
        Film: film,
        singer: singer,
    }

    const result = await Music.find(filter);
    res.send(result);
});

app.patch("/updateActorAndActress/:id/", async (req, res) => {
    const id = req.params.id;
    const {actor, actress} = req.body;

    const filter = {
        _id : id
    }
    const update = {
        $set: {
            actor, actress
        }
    }
    
    const result = await Music.findOneAndUpdate(filter, update, {new: true});
    res.send(result);
});

app.get("/display", async (req, res) => {
    const result = await Music.find();

    let page = `
        <table border="2px">
            <tr>
                <th>Song Name</th>
                <th>Film Name</th>
                <th>Music Director</th>
                <th>Singer</th>
                <th>Actor</th>
                <th>Actress</th>
            </tr>
    `;
    console.log(result);
    result.forEach((row) => {
        page += "<tr>";
        page += ("<th>" + row.Songname + "</th>");
        page += ("<th>" + row.Film + "</th>");
        page += ("<th>" + row.Music_director + "</th>");
        page += ("<th>" + row.singer + "</th>");
        page += ("<th>" + row.actor + "</th>");
        page += ("<th>" + row.actress + "</th>");
        page += "</tr>";
    });

    res.send(page);
});

app.getr


mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(3000, () => {
        console.log("Server has started on http://localhost:3000");
    })
})
.catch((e) => {
    console.log("Error in connecting to DB");
    console.log(e);
})