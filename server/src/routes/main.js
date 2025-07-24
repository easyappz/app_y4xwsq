const express = require('express');
const authController = require('@src/controllers/authController');
const userController = require('@src/controllers/userController');
const postController = require('@src/controllers/postController');
const authMiddleware = require('@src/middleware/auth');

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.getMe);

// User routes
router.get('/users/:id', userController.getProfile);
router.put('/users/:id', authMiddleware, userController.updateProfile);

// Post routes
router.get('/posts', postController.getPosts);
router.post('/posts', authMiddleware, postController.createPost);
router.put('/posts/:id', authMiddleware, postController.updatePost);
router.delete('/posts/:id', authMiddleware, postController.deletePost);

// Existing routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;