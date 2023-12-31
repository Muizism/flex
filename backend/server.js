const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const academicsRoutes = require('./routes/academicRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const express = require('express');
const cors = require('cors');
app = express();
app.use(cors());

dotenv.config();
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use('/academics', academicsRoutes);
app.use('/students', studentRoutes);
app.use('/admin', adminRoutes);
app.get('/logout', (req, res) => {
  res.redirect('/');
});


  const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});