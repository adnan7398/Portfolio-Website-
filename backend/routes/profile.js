const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for profile image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename for profile image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// POST /api/profile/upload - Upload profile image (admin only)
router.post('/upload', auth, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Profile image is required' });
    }

    // Create URL for the uploaded profile image
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

// GET /api/profile/image - Get current profile image (public)
router.get('/image', async (req, res) => {
  try {
    // Check if there's a profile image in the uploads directory
    const profileFiles = fs.readdirSync(uploadsDir).filter(file => file.startsWith('profile-'));
    
    if (profileFiles.length > 0) {
      // Return the most recent profile image
      const latestProfile = profileFiles.sort().pop();
      const profileImageUrl = `/uploads/${latestProfile}`;
      console.log('Found profile image:', profileImageUrl);
      res.json({ profileImageUrl });
    } else {
      // Return default profile image
      console.log('No profile image found, using default');
      res.json({ profileImageUrl: '/uploads/profile.svg' });
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
    res.status(500).json({ error: 'Failed to fetch profile image' });
  }
});

module.exports = router; 