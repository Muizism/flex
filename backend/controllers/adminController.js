const bcrypt = require("bcrypt");
const Student = require("../models/student");

const signup=async(req, res)=> {
  console.log(res.body);
  // try {
  //   console.log("Inside signup");
  //   console.log(req.body);
  //   const { rollNo, studentName, batch, semester, degree, section, status, phone, gender, email, password, address, guardian } = req.body;
    

  //   const existingStudent = await Student.findOne({ email });
  //   if (existingStudent) {
  //     return res.status(409).json({ error: "Student with this email already exists." });
  //   }

  //   const saltRounds = 10;
  //   const hashedPassword = await bcrypt.hash(password, saltRounds);

  //   const newStudent = new Student({
  //     rollNo,
  //     studentName,
  //     batch,
  //     semester,
  //     degree,
  //     section,
  //     status,
  //     phone,
  //     gender,
  //     email,
  //     password: hashedPassword,
  //     address,
  //     guardian,
  //   });


  //   await newStudent.save();

  //   return res.status(201).json({ message: "Signup successful." });
  // } catch (error) {
  //   console.error("Error in signup:", error);
  //   return res.status(500).json({ error: "Internal server error." });
  // }
}

module.exports = { signup };
