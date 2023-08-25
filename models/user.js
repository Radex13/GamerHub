const mongoose = require('mongoose');
const Invitation = require('./invitation');

const userSchema = new mongoose.Schema({
  username: String,
  img: String,
  language: String,
  server: String,
  platforms: [String],
  description: String,
  email: String,
  passwordHash: String,
  dateOfBirth: Date,
  lastOnline: String,
  onlineNow: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  newuser: {
    type: Boolean,
    default: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  invitations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invitation'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;