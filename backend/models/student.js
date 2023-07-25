const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    first_name:{ type: String, required: true},
    last_name:{ type: String, required: true},
    email:{ type: String, required: true},
    password: {type : String, required: true},
});

const student= mongoose.model('student', studentSchema);
module.exports = student;