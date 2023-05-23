const express = require("express");
const mongoose = require("mongoose");
const Student = require("./students");
require("dotenv").config()
app = express();

app.use(express.json());


app.post("/addStudent", async (req, res) => {
    const name = req.body.name;
    const roll = req.body.roll;
    const wad = req.body.wad;
    const cc = req.body.cc;
    const dsbda = req.body.dsbda;
    const cns = req.body.cns;
    const ai = req.body.ai;

    const data = {
        "name" : name,
        "roll_no" : roll,
        "wad_marks" : wad,
        "cc_marks" : cc,
        "dsbda_marks" : dsbda,
        "cns_marks" : cns,
        "ai_marks" : ai,
    }
    const student = await Student.create(data);
    res.send(student);
});

app.get("/getAll", async (req, res) => {
    const students = await Student.find();
    res.send({"Total Count": students.length , students});
});

app.get("/getMoreThan20DSBDA", async (req, res) => {
    const students = await Student.find({dsbda_marks : {$gt : 20} }, {name : 1});
    res.send(students);
});

app.patch("/updateMarksBy10/:roll", async (req, res) => {
    const roll = req.params.roll;
    const update = {wad_marks: 10, cc_marks: 10, cns_marks: 10, dsbda_marks: 10, ai_marks: 10};
    const student = await Student.findOneAndUpdate({roll_no : roll},  update, {new: true});
    res.send(student);
});

app.get("/getMoreThan25ALL", async (req, res) => {
    const filter = {
        wad_marks : {$gt : 25},
        cc_marks : {$gt : 25},
        cns_marks : {$gt : 25},
        dsbda_marks : {$gt : 25},
        ai_marks : {$gt : 25},
    }

    const students = await Student.find(filter, {name: 1});
    
    res.send(students);
});

app.get("/getMoreThan40WADCC", async (req, res) => {
    const filter = {
        cc_marks : {$gt : 20},
        wad_marks : {$gt : 20},
    }

    const students = await Student.find(filter, {name : 1});
    res.send(students);
});

app.delete("/removeStudent/:roll", async (req, res) => {
    const roll = req.params.roll;
    const student = await Student.deleteOne({roll_no: roll})
    console.log(student);
    res.send(student);
});

mongoose.connect(process.env.DB_URL).then(() => {
    app.listen(3000, () => {
        console.log("Server has started");
    })
})
.catch((e) => {
    console.log("Error with DB connection");
    console.log(e);
})