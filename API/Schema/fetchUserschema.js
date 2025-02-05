const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect('mongodb://127.0.0.1:27017/Movies')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Define a Schema and Model
const YourSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  proffesion:String
});
const YourModel = mongoose.model("newuser", YourSchema,"newuser");

// GET API to fetch data
app.get('/', async (req, res) => {
  try {
    const data = await YourModel.find({});
    res.json(data);
    console.log(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
