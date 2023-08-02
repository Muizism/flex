const bcrypt = require("bcrypt");
const Student = require("../models/student");

exports.signup = async (req, res) => {
  const { rollNo, studentName, batch, semester, degree, section, status, phone, gender, email, password, address, guardian } = req.body;
 

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      rollNo,
      studentName,
      batch,
      semester,
      degree,
      section,
      status,
      phone,
      gender,
      email,
      password: hashedPassword,
      address,
      guardian
    });

    const student = await newStudent.save()
      .then((response) => {
        res.status(201).json({ message: 'Signup successfuly' });
      }).catch((error) => {
        res.status(500).json({ message: error.message });
      });
  
      
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };