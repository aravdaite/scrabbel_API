const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  addFreeWord,
  addSevenLetterWords,
  getWords,
  logout
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetPassword/:resettoken', resetPassword);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/addFreeWord', protect, addFreeWord);
router.put('/addSevenWord', protect, addSevenLetterWords);
router.get('/words', protect, getWords);
router.get('/logout', logout);

module.exports = router;