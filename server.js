const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const postRoutes = require('./routes/posts');
const DB_Conn = require('./config/connection.js')

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URL

// mongoose.connect(DB_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

const corsOptions = {
  origin: process.env.FRONT_END_HOST,
  credentials: true
}

app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());

DB_Conn(DB_URI);


app.use('/api/posts', postRoutes);


app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
