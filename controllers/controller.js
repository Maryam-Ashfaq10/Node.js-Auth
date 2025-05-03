// 
const User = require('../models/User');

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
