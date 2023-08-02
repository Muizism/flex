const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const enrollmentSchema=new Schema({
    rollNo: {
        type: Schema.Types.ObjectId,
        ref: 'student',
        required: true,
      },
      course_id: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true,
      },
});

const enrollment=mongoose.model('enrollment', enrollmentSchema);
module.exports=enrollment;
