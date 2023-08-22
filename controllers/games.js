const gamesRouter = require('express').Router();
const Game = require('../models/game');
const User = require('../models/user');
const { PAGE_URL } = require('../config');

gamesRouter.get('/', async (request, response) => {
    const user = request.user
    const games = await Game.find({ user: user.id });
    return response.status(200).json(games);
});

gamesRouter.patch('/', async (request, response) => {
  const { usergame } = request.body;
  const user = usergame
  // console.log(user);
  const games = await Game.find({ user: user });
  // console.log(games);
  return response.status(200).json(games);
});

gamesRouter.post('/', async (request, response) => {
    const user = request.user
    const { gameid, name, image, platforms, } = request.body
    const newGame = new Game({
        gameid,
        name,
        image,
        platforms,
        user: user._id
      });
      const savedGame = await newGame.save();
      user.games = user.games.concat(savedGame._id);
      await user.save();
      return response.status(201).json(savedGame);
});

gamesRouter.put('/:id', async (request, response) => {
    try {
        const user = request.user;
        const { existingGame } = request.body; // Recupera el gameId y el juego actualizado de la solicitud
    
        const platforms = existingGame.platforms
        // console.log(platforms);
        // Realiza la actualización del juego en la base de datos usando el gameId como identificador único
        // Por ejemplo, puedes usar una función de tu base de datos para realizar la actualización
        // Esto es solo un ejemplo y debes adaptarlo a tu lógica y base de datos específica
        // console.log(request.params.id);
        // console.log(Game.findByIdAndUpdate(request));
        await Game.findByIdAndUpdate(request.params.id, { platforms });
    
        // Envía la respuesta con los datos actualizados del juego
        return response.sendStatus(200);
      } catch (error) {
        console.error('Error al actualizar el juego:', error);
        response.status(500).json({ error: 'Error al actualizar el juego' });
      }
});

gamesRouter.delete('/:id', async (request, response) => {
  try {
      const gameId = request.params.id;

      // Verificar si el juego existe en la base de datos
      const existingGame = await Game.findById(gameId);
      if (!existingGame) {
          return response.status(404).json({ error: 'El juego no existe en la base de datos' });
      }

      // Eliminar el juego de la base de datos
      await Game.findByIdAndRemove(gameId);

      // Envía la respuesta con éxito
      return response.sendStatus(200);
  } catch (error) {
      console.error('Error al eliminar el juego:', error);
      response.status(500).json({ error: 'Error al eliminar el juego' });
  }
});


module.exports = gamesRouter;