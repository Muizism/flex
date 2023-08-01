const bcrypt = require("bcrypt");
const Student = require("../models/student");

const signup=(req, res)=> {
  
console.log(req.body.rollNo);

    // const { rollNo, studentName, batch, semester, degree, section, status, phone, gender, email, password, address, guardian } = req.body;
    const rollNo = req.body.rollNo;

    // const existingStudent =  Student.findOne({ email });
    // if (existingStudent) {
    //   return res.status(409).json({ error: "Student with this email already exists." });
    // }

    // const saltRounds = 10;
    // const hashedPassword =  bcrypt.hash(password, saltRounds);

    const newStudent = new Student({
      rollNo,
      // studentName,
      // batch,
      // semester,
      // degree,
      // section,
      // status,
      // phone,
      // gender,
      // email,
      // password: hashedPassword,
      // address,
      // guardian,
    });


     newStudent.save().then(() => {
      res.status(201).json({ message: "Signup successful." });
     }).catch((err) => {
      res.status(500).json({ error: "Signup failed." });
     });

    
   
}

module.exports = { signup };
