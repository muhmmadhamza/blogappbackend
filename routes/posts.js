// routes/postRouter.js

const express = require('express');
const { createPost, getAllPosts, postDetail, postUpdate, postDelete,getSinglePost } = require('../controllers/postController');
const upload = require('../middlewares/multerConfig');
const router = express.Router();

// Route to get all posts
router.get('/get', getAllPosts);

router.get('/:id', getSinglePost);

// Route to create a new post
router.post('/add', upload.single('image'), createPost);

// get single post detail
router.get('/detail/:id', postDetail);

// update post
router.put('/update/:id',postUpdate);

// Delete post
router.delete('/delete/:id', postDelete)

module.exports = router;
