const messagesRouter = require('express').Router();
const Message = require('../models/message');

messagesRouter.post('/', async (request, response) => {
    const user = request.user
    const { text, touser } = request.body

    const newMessage = new Message({
        text,
        fromuser: user._id,
        touser
      });

      const savedMessage = await newMessage.save();
      user.messages = user.messages.concat(savedMessage._id);
      await user.save();
      
      return response.status(201).json(savedMessage);
});

messagesRouter.put('/', async (request, response) => {
  const user = request.user
  const { idToUser } = request.body
  
  const messages = await Message.find({
    fromuser: user,
    touser: idToUser
  });
  return response.status(200).json(messages);
});

messagesRouter.patch('/', async (request, response) => {
  const user = request.user
  const { idToUser } = request.body
  const theMessages = await Message.find({
    touser: user,
    fromuser: idToUser
  });
  return response.status(200).json(theMessages);
});

module.exports = messagesRouter;