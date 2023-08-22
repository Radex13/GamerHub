const usersLobbyRouter = require('express').Router();
const User = require('../models/user');
const { PAGE_URL } = require('../config');

usersLobbyRouter.get('/', async (request, response) => {
  try {
    
    // esto es el ID del usuario que realiza la búsqueda
    const requestingUserId = request.user.id;
    // estos son todos los usuarios de la base de datos
    const users = await User.find();

    // Aplica el algoritmo de la base de datos
    const filteredUsers = users.filter(user => {
      
      // Aplica tus condiciones de filtrado aquí
      // Por ejemplo, si deseas filtrar usuarios mayores de 18 años:
      // return user.dateOfBirth.getFullYear() <= new Date().getFullYear() - 18;

      // Esto es para para retornar todos los usuarios sin aplicar ningún filtro
      // return true;

      // Compara el ID del usuario actual con el ID del usuario que realiza la búsqueda
      return user._id.toString() !== requestingUserId;
    });

    // Devuelve la lista filtrada de usuarios en formato JSON
    return response.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
});

usersLobbyRouter.patch('/', async (request, response) => {
  try {
    // esto es el ID del usuario que realiza la búsqueda
    const requestingUserId = request.user.id;

    // Devuelve la lista filtrada de usuarios en formato JSON
    return response.status(200).json(requestingUserId);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error al obtener el usuario.' });
  }
});

usersLobbyRouter.put('/update-img', async (request, response) => {
  try {
    const userId = request.user.id;
    const { img } = request.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { img }, { new: true });

    if (!updatedUser) {
      return response.status(404).json({ error: 'Usuario no encontrado.' });
    }

    return response.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error al actualizar la imagen del usuario.' });
  }
});


usersLobbyRouter.post('/', async (request, response) => {
  const user = request.user;
  const { username, language, server, dateOfBirth, platforms, description } = request.body;

  const userExist = await User.findOne({ username });

  if (userExist) {
    return response.status(400).json({ error: 'El nombre de usuario ya se encuentra en uso.' });
  }

  user.username = username;
  user.language = language;
  user.server = server;
  user.dateOfBirth = dateOfBirth;
  user.platforms = platforms;
  user.description = description;

  try {
    const user = request.user;
    const updatedUser = await user.save();
    await User.findByIdAndUpdate(user, { newuser: false });
    return response.sendStatus(200);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Error al actualizar los datos del usuario.' });
  }
});

usersLobbyRouter.put('/try', async (request, response) => {
  const { username } = request.body;

  const userExist = await User.findOne({ username });

  if (userExist) {
    return response.status(400).json();
  } else {
    return response.status(200).json()
  }
  
});


module.exports = usersLobbyRouter;