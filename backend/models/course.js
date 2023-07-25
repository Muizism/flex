const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const courseSchema=new Schema({
    course_name:{type: String, required : true},
    course_id:{type: String, required : true},
    schedule:{type: String, required : true},
    capacity:{type: Number, required : true},
});

const course=mongoose.model('course', courseSchema);
module.exports=course;