const userProfileRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { PAGE_URL } = require('../config');

userProfileRouter.get('/', async (request, response) => {
  try {
    // Obtenemos el ID del usuario desde el objeto request.user
    const userId = request.user.id;

    // Buscamos el usuario por su ID en la base de datos
    const user = await User.findById(userId);

    // Si el usuario no se encuentra, devolvemos error 403
    if (!user) {
      return response.sendStatus(403);
    }

    // Accedemos a la propiedad 'username' del usuario para obtener el nombre de usuario
    const username = user

    response.status(200).json(username);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error al obtener el usuario.' });
  }
});

userProfileRouter.patch('/', async (request, response) => {
  const user = request.user;

  const { username, email, description, platforms } = request.body;

  if (username) {
    await User.findByIdAndUpdate(user._id, { username });
    }

  if (email) {
    await User.findByIdAndUpdate(user._id, { email });
    }

  if (description) {
    await User.findByIdAndUpdate(user._id, { description });
    }

  if (platforms) {
    await User.findByIdAndUpdate(user._id, { platforms });
  }

  return response.sendStatus(200);
});

userProfileRouter.post('/', async (request, response) => {
  const userId = request.user.id;
  const { currentpassword, newpassword } = request.body;
  const user = await User.findById(userId);
  if (!currentpassword || !newpassword) {
    return response.status(400).json({ error: 'Todos los espacios son requeridos.' });
  }
  const isCorrect = await bcrypt.compare(currentpassword, user.passwordHash);

  if (!isCorrect) {
    return response.status(400).json({ error: 'contraseña invalida' });
  }
  
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(newpassword, saltRounds);

  console.log(passwordHash);

  await User.findByIdAndUpdate(user._id, { passwordHash });

  return response.status(201).json('Contraseña actualizada');
});

userProfileRouter.put('/', async (request, response) => {

  const { userSend } = request.body;
  // console.log(userSend);
  const userExist = await User.findOne({ _id: userSend });
  return response.status(200).json(userExist);
});



module.exports = userProfileRouter;