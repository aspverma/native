const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./Schema/UserSchema'); // Import the User model
const app = express();
const cors=require('cors')
const bodyParser=require('body-parser')


// MongoDB connection
mongoose
    .connect('mongodb://127.0.0.1:27017/Movies')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// Routes
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input

        // Check for existing user
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.json({ message: "User created successfully", savedUser });
    } catch (error) {
        console.error('Error:', error);
        res.json({ message: "Internal server error" });
    }
});


// POST login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'User does not exist' });
        }

        // Check if the password matches
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        return res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        return res.json({ message: 'Server error' });
    }
});



// To get  fetch a user
app.get("/user", async (req, res) => {
    try {
        // Fetch  user from the "User" collection
        const abc = await User.find({}); // This fetches the  user in the collection

        if (!abc) {
            return res.json({ message: "No user found" });
        }

        res.json(abc); // Send the user data as a response
    } catch (err) {
        console.error(err);
        res.json({ message: "Server error" });
    }
});


// Start server
const PORT = 9091;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
