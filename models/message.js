const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    text: String,
    fromuser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    touser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdat: {
      type: Date,
      default: Date.now
    }
  });  

  messagesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Message = mongoose.model('Message', messagesSchema);

module.exports = Message;
