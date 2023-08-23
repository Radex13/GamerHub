require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');
const usersLobbyRouter = require('./controllers/userslobby');
const sharp = require('sharp');
const fs = require('fs');
const User = require('./models/user');
const userProfileRouter = require('./controllers/userprofile');
const fileUpload = require('express-fileupload');
const userGamesRouter = require('./controllers/usergames');
const gamesRouter = require('./controllers/games');
const invitationsRouter = require('./controllers/invitations');
const messagesRouter = require('./controllers/messages');

(async() => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Conecto a MongoDB');
    } catch (error) {
        console.log(error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Rutas Frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/account', express.static(path.resolve('views', 'account')));
app.use('/lobby', express.static(path.resolve('views', 'lobbyapp')));
app.use('/profile', express.static(path.resolve('views', 'profile')));
app.use('/chat', express.static(path.resolve('views', 'chat')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(fileUpload());
// Ruta para subir una imagen

app.post('/api/uploadFirst', async (req, res) => {
    const file = req.files ? req.files.image : null; // Archivo de imagen subido
    const username = req.body.username; // Nombre de usuario enviado desde el cliente
    const email = req.body.email;

    if (!file || !username) {
        return res.status(400).send("Falta el archivo de imagen o el nombre de usuario.");
    }

    try {
        // Verificar si el usuario ya tiene una imagen guardada en MongoDB
        const user = await User.findOne({ email });

        // Eliminar la imagen anterior (si la hay)
        if (user && user.img) {
            const existingImagePath = path.join(__dirname, 'img', 'uploads', user.img);
            if (fs.existsSync(existingImagePath)) {
                fs.unlinkSync(existingImagePath);
            }
        }

        // Procesar la imagen con Sharp y guardarla con un nombre de archivo único
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.name);
        const newFilename = `${username}-${uniqueSuffix}${extension}`;

        await sharp(file.data).resize(600, 600).toFile(path.join(__dirname, 'img', 'uploads', newFilename));

        // Actualizar el nombre de la imagen en la propiedad "img" del usuario en MongoDB
        if (user) {
            user.img = newFilename;
            await user.save();
        }

        // Devolver la ruta de la imagen redimensionada para que el cliente pueda mostrarla
        const imageUrl = `/images/uploads/${newFilename}`;
        res.send(imageUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir y procesar la imagen.');
    }
});

app.post('/api/upload', async (req, res) => {
    const file = req.files ? req.files.image : null; // Archivo de imagen subido
    const username = req.body.username; // Nombre de usuario enviado desde el cliente

    if (!file || !username) {
        return res.status(400).send("Falta el archivo de imagen o el nombre de usuario.");
    }

    try {
        // Verificar si el usuario ya tiene una imagen guardada en MongoDB
        const user = await User.findOne({ username });

        // Eliminar la imagen anterior (si la hay)
        if (user && user.img) {
            const existingImagePath = path.join(__dirname, 'img', 'uploads', user.img);
            if (fs.existsSync(existingImagePath)) {
                fs.unlinkSync(existingImagePath);
            }
        }

             // Crear la carpeta "uploads" si no existe
             const uploadsFolderPath = path.join(__dirname, 'img', 'uploads');
             if (!fs.existsSync(uploadsFolderPath)) {
                 fs.mkdirSync(uploadsFolderPath);
             }
     

        // Procesar la imagen con Sharp y guardarla con un nombre de archivo único
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.name);
        const newFilename = `${username}-${uniqueSuffix}${extension}`;

        await sharp(file.data).resize(600, 600).toFile(path.join(__dirname, 'img', 'uploads', newFilename));

        // Actualizar el nombre de la imagen en la propiedad "img" del usuario en MongoDB
        if (user) {
            user.img = newFilename;
            await user.save();
        }

        // Devolver la ruta de la imagen redimensionada para que el cliente pueda mostrarla
        const imageUrl = `/images/uploads/${newFilename}`;
        res.send(imageUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir y procesar la imagen.');
    }
});

app.use(morgan('tiny'));

// Rutas Backend
app.use('/api/users', usersRouter);
app.use('/api/userslobby', userExtractor, usersLobbyRouter);
app.use('/api/userprofile', userExtractor, userProfileRouter)
app.use('/api/usergames', userExtractor, userGamesRouter)
app.use('/api/games', userExtractor, gamesRouter)
app.use('/api/invitations', userExtractor, invitationsRouter)
app.use('/api/messages', userExtractor, messagesRouter)
// Middleware para manejar las rutas de imágenes subidas
app.use('/images/uploads', express.static('img/uploads'));
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

module.exports = app;
