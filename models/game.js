const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameid: String,
  name: String,
  image: String,
  platforms: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

gameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
