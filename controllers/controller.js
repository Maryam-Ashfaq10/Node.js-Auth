// 
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.home = (req, res) => {
  res.send("Hello, welcome to the Node.js Auth Systemm!");
};

exports.register = async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username || !email || !password) {
    return res.status(400).send('All fields are required.');
  }

  try {

     // Check if the user already exists
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).send('Email already registered.');
     }
 
     // Create a new user instance with the hashed password
    const newUser = new User({
      username,
      email,
      password 
    });

    await newUser.save();
    res.status(200).send('User registered successfully!');
    
  } catch (error) {
    res.status(500).send('Server error.');
    throw error;

  }

}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send('Invalid email or password.');
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password.');
    }

    // User is authenticated, you can return a success message or a token
    res.status(200).send('Login successful!');
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).send('Server error.');
  }
};
