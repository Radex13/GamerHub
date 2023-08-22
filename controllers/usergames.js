const userGamesRouter = require('express').Router();
const axios = require('axios');
const User = require('../models/user');
const { PAGE_URL } = require('../config');

userGamesRouter.get('/', async (request, response) => {
    try {
        const { userId } = request.query; // Suponiendo que obtienes el userId de algún lugar en la solicitud
        // Realizar una consulta a tu base de datos para obtener la clave API del usuario si es necesario
        const user = await User.findById(userId);
        const API_KEY = process.env.API_RAWG; // Obtén la clave API del usuario desde tu modelo de usuario
    
        // Obtener 10 juegos aleatorios
        const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50&ordering=-added&tags=multiplayer`);
        const gamesData = apiResponse.data.results;// Los datos de los juegos aleatorios desde rawg.io
        // console.log(gamesData);
        // Ahora puedes procesar y enviar los datos al cliente, por ejemplo:
        response.json(gamesData);
    } catch (error) {
        console.error('Error al obtener los datos de los juegos:', error);
        response.status(500).json({ error: 'Error al obtener los datos de los juegos' });
    }
});

userGamesRouter.post('/search', async (request, response) => {
    try {
        const { query } = request.body; // Obtener el término de búsqueda del cuerpo de la solicitud
        const API_KEY = process.env.API_RAWG; // Obtén la clave API del usuario desde tu modelo de usuario
    
        // Realizar la búsqueda de juegos utilizando el término de búsqueda en la solicitud a la API
        const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10&search=${encodeURIComponent(query)}`);
        const foundGames = apiResponse.data.results; // Los juegos encontrados desde rawg.io
        response.json(foundGames);
    } catch (error) {
        console.error('Error al buscar juegos:', error);
        response.status(500).json({ error: 'Error al buscar juegos' });
    }
});

module.exports = userGamesRouter;