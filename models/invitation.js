const mongoose = require('mongoose');

const invitationsSchema = new mongoose.Schema({
    status: String,
    senderuser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipientuser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdat: {
      type: Date,
      default: Date.now
    }
  });  

invitationsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Invitation = mongoose.model('Invitation', invitationsSchema);

module.exports = Invitation;
