const invitationsRouter = require('express').Router();
const Invitation = require('../models/invitation');

invitationsRouter.post('/', async (request, response) => {
    const user = request.user
    const { status, recipientuser } = request.body
    // console.log(status, recipientuser);

    // Verificar si ya existe una invitación entre los mismos remitente y destinatario
  const existingInvitation = await Invitation.findOne({
    senderuser: user._id,
    recipientuser
  });

  if (existingInvitation) {
    return response.status(400).json({ error: 'Ya existe una invitación entre estos usuarios.' });
  }

    const newInvitation = new Invitation({
        status,
        senderuser: user._id,
        recipientuser
      });
      const savedInvitation = await newInvitation.save();
      user.invitations = user.invitations.concat(savedInvitation._id);
      await user.save();
      
      return response.status(201).json(savedInvitation);
});

invitationsRouter.get('/', async (request, response) => {
  const user = request.user
  const invitations = await Invitation.find({ recipientuser: user });
  return response.status(200).json(invitations);
});

invitationsRouter.get('/chat', async (request, response) => {
  const user = request.user;

  try {
    const invitations = await Invitation.find({
      $or: [
        { recipientuser: user },
        { senderuser: user }
      ]
    });

    return response.status(200).json(invitations);
  } catch (error) {
    return response.status(500).json({ error: 'Error retrieving invitations' });
  }
});


invitationsRouter.patch('/', async (request, response) => {
  const user = request.user
  const { idInvitation } = request.body; 
  const status = 'accepted'
  // const invitations = await Invitation.find({ _id: idInvitation });
  const invitations = await Invitation.findByIdAndUpdate(idInvitation, { status });
  // console.log(invitations);
  return response.status(200).json(invitations);
});

invitationsRouter.patch('/declined', async (request, response) => {
  const { idInvitationDelete } = request.body
  const status = 'declined'
  // const invitations = await Invitation.find({ _id: idInvitation });
  const invitations = await Invitation.findByIdAndUpdate(idInvitationDelete, { status });
  return response.status(200).json(invitations);
});

module.exports = invitationsRouter;