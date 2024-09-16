const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// User registration
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
        message:"Registration successful!"
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update user profile
// exports.updateUserProfile = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
    
//     const user = await User.findById(req.user.id);

//     if (user) {
//       if (username) user.username = username;
//       if (email) user.email = email;
//       if (password) user.password = password; // Assuming password is hashed before saving

//       const updatedUser = await user.save();

//       res.json({
//         _id: updatedUser._id,
//         username: updatedUser.username,
//         email: updatedUser.email,
//         // You might want to return a token or some other response
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.updateUserProfile = async (req, res) => {
  try {
    // Ensure req.user is defined and contains an id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { username, email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user.id);

    if (user) {
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password; // Ensure this is hashed on the server side

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        // You might want to return a token or some other response
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


















// Get user profile (protected route)
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
