// controllers/postController.js
const PostModel = require('../models/Post.js');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const path = require('path');
// Controller function to get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({ status: 'success', posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body
    const image = req.file ? req.file.filename : null;
    if (!title || !content || !author) {
      return res.status(422).json({
        status: "Failed",
        message: "All fields are required"
      })
    }

    const post = new PostModel({
      title,
      content,
      author,
      image,
    });
    const savedPost = await post.save();
    res.status(201).json({ status: 'success', message: 'Post created successfully!', savedPost });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// const createPost = async (req, res) => {
//   try {
//     const { title, content, author } = req.body;
//     const image = req.file ? req.file.filename : null;

//     if (!title || !content || !author) {
//       return res.status(422).json({
//         status: "Failed",
//         message: "All fields are required"
//       });
//     }

//     // Extract token from headers
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ status: 'Failed', message: 'No token provided' });
//     }

//     // Verify token and extract user info
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust secret as needed
//     } catch (err) {
//       return res.status(401).json({ status: 'Failed', message: 'Invalid token' });
//     }

//     // Find the user from token payload
//     const user = await UserModel.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ status: 'Failed', message: 'User not found' });
//     }

//     // Create and save post associated with the user
//     const post = new PostModel({
//       title,
//       content,
//       author,
//       image,
//  // Associate post with user
//     });

//     const savedPost = await post.save();
//     res.status(201).json({ status: 'success', message: 'Post created successfully!', savedPost });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };























const postDetail = async (req, res) => {
  try {
    const { id } = req.params
    const post = await PostModel.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found!"
      })
    }
    return res.status(200).json({
      status: "success",
      post
    })
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
// const postUpdate = async (req, res) => {
//   try {
//     const { id } = req.params
//     const { title, content } = req.body;
 
//     const post = await PostModel.findById(id);
//     if (!post) {
//       return res.status(404).json({
//         status: "failed",
//         message: "Post not found!"
//       })
//     }
//     const UpdatePost = await PostModel.findByIdAndUpdate(id, {
//       title,
//       content
   
//     }, { new: true })
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }

const postUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found!",
      });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




















const postDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const postDeleted = await PostModel.findByIdAndDelete(id);
    if (!postDeleted) {
      return res.status(400).json({
        status: "success",
        message: "Unable to delete post"
      })
    }
    return res.status(200).json({
      status: "success",
      message: "Post Deleted Successfully"
    })
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}



const getSinglePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ status: 'Failed', message: 'Post not found' });
    }
    res.status(200).json({ status: 'success', post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  postDetail,
  postUpdate,
 getSinglePost,
  postDelete
};
