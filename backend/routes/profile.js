const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});
router.post('/upload', auth, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Profile image is required' });
    }
    const profileImageUrl = `/uploads/${req.file.filename}`;

    res.json({
      message: 'Profile image uploaded successfully',
      profileImageUrl
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
});
router.get('/image', async (req, res) => {
  try {
    console.log('Fetching profile image...');

    if (!fs.existsSync(uploadsDir)) {
      console.log('Uploads directory does not exist, using default');
      return res.json({ profileImageUrl: '/uploads/profile.svg' });
    }
    const profileFiles = fs.readdirSync(uploadsDir).filter(file => file.startsWith('profile-'));

    if (profileFiles.length > 0) {
      const latestProfile = profileFiles.sort().pop();
      const profileImageUrl = `/uploads/${latestProfile}`;
      console.log('Found profile image:', profileImageUrl);
      res.json({ profileImageUrl });
    } else {
      console.log('No profile image found, using default');
      res.json({ profileImageUrl: '/uploads/profile.svg' });
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
    res.status(500).json({
      error: 'Failed to fetch profile image',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

const Profile = require('../models/Profile');

router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const { leetcode, codeforces, codechef, github } = req.body;

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile();
    }

    profile.leetcode = leetcode;
    profile.codeforces = codeforces;
    profile.codechef = codechef;
    profile.github = github;
    profile.updatedAt = Date.now();

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 