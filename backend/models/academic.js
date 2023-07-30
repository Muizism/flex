const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const academicSchema = new Schema({
    first_name:{ type: String, required: true},
    last_name:{ type: String, required: true},
    email:{ type: String, required: true},
    password: {type : String, required: true},
});

const academic= mongoose.model('academic', academicSchema);
module.exports = academic;