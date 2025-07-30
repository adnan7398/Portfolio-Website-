const express = require('express');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact/Hire Me (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, message, type } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    
    // Save message to database
    const msg = new Message({ name, email, message, type: type || 'contact' });
    await msg.save();
    
    // Try to send email notification (but don't fail if email fails)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New ${type === 'hire' ? 'Hire Me' : 'Contact'} Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nType: ${type || 'contact'}\nMessage: ${message}`,
      });
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Don't fail the request if email fails - message is still saved to DB
    }
    
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Message creation error:', err);
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
});

// Get all messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single message (admin only)
router.get('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (err) {
    console.error('Get single message error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read/unread (admin only)
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const { read } = req.body;
    const updated = await Message.findByIdAndUpdate(req.params.id, { read }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Mark message read error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    console.error('Delete message error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 