const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    roll_no: Number,
    wad_marks: Number,
    cc_marks: Number,
    dsbda_marks: Number,
    cns_marks: Number,
    ai_marks: Number,
})

const Student = mongoose.model("student", studentSchema);
module.exports = Student;