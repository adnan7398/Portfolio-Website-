const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    leetcode: { type: String, default: '' },
    codeforces: { type: String, default: '' },
    codechef: { type: String, default: '' },
    github: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', ProfileSchema);
