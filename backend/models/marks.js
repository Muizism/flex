const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markSchema = new Schema({
    student_id:{type: String, required : true},
    course_id:{type: String, required : true},
    assignment_marks:{type: Number, required : true},
    quiz_marks:{type: Number, required : true},
    midterm_marks:{type: Number, required : true},
    final_marks:{type: Number, required : true},
});

const mark=mongoose.model('mark', markSchema);
module.exports=mark;
