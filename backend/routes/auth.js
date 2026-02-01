const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const z = require('zod');
const router = express.Router();

router.post('/register', async (req, res) => {
  const requirebody = z.object({
    email: z.string().min(3).max(50).email(),
    password: z.string().min(8).max(20).refine((password) => {
      const uppercase = /[A-Z]/.test(password);
      const lowercase = /[a-z]/.test(password);
      const specialchar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return uppercase && lowercase && specialchar;
    }, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one special character.'
    })
  });

  try {
    const parsedBody = requirebody.parse(req.body);
    const { email, password } = parsedBody;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashed });
    await admin.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 