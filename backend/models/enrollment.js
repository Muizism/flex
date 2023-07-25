const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const enrollmentSchema=new Schema({
    student_id:{type: String, required : true},
    course_id:{type: String, required : true},
});

const enrollment=mongoose.model('enrollment', enrollmentSchema);
module.exports=enrollment;
