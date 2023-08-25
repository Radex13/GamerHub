const app = require('./app');
const http = require('http');
const User = require('./models/user');
const server = http.createServer(app);
const SocketIO = require('socket.io')
const io = SocketIO(server);

// websockets
// Servidor
const userSocketMap = new Map(); // Cambio a usar un Map en lugar de un objeto

io.on('connection', (socket) => {
  console.log('Nueva conexión:', socket.id);
  
  socket.on('setUserId', (userId) => {
    userSocketMap.set(socket.id, userId);
    const currentDate = new Date();
    // console.log('LA FECHA DE inicio:', currentDate);
    socket.emit('userOnline', currentDate)
  });

  socket.on('disconnect', async () => {
    const disconnectedUserId = userSocketMap.get(socket.id); // Obtener userId asociado a socket.id
    // console.log('Id usuario desconectado:', disconnectedUserId);
    if (disconnectedUserId) {
      userSocketMap.delete(socket.id); // Eliminar la asociación al desconectar
      console.log('Desconexión:', socket.id);
      const currentDate = new Date();
      const utcDateString = currentDate.toISOString();
      // console.log('LA FECHA DE CIERRE ES:', utcDateString);
      try {
        const user = await User.findByIdAndUpdate(disconnectedUserId, {
            lastOnline: utcDateString,
            onlineNow: false
          });
          // console.log('user me da',user);
      } catch (error) {
        console.error('Error al guardar la información de desconexión:', error);
      }
    }
  });
  
  socket.on('invitarUsuario', (data) => {
    const usuarioIdInvitado = data.user;
    const usuarioIdEmit = data.userEmit;
    const idInvitation = data.idInvitation

    // Buscar el socketId del usuario invitado en el mapa
    const socketIdInvitado = [...userSocketMap.entries()].find(
      ([_, userId]) => userId === usuarioIdInvitado
    )?.[0];

    // console.log('Invitar a usuario ID:', usuarioIdInvitado);
    // console.log('Socket ID invitado:', socketIdInvitado);

    if (socketIdInvitado) {
    //   console.log('Enviando invitación a:', socketIdInvitado);
      io.to(socketIdInvitado).emit('nuevaInvitacion', { usuarioIdEmit, idInvitation });
    }
  });

  socket.on('myMessage', (data) => {
    const message = data.message;
    const userIdTo = data.userIdTo;
    const userIdFrom = data.userIdFrom;
        // Buscar el socketId del usuario invitado en el mapa
        const socketIdInvitado = [...userSocketMap.entries()].find(
          ([_, userId]) => userId === userIdTo
        )?.[0];

          // console.log('Enviar mensaje a usuario ID:', userIdTo);

        if (socketIdInvitado) {
            console.log('Enviando mensaje a:', socketIdInvitado);
          io.to(socketIdInvitado).emit('newMessage', { userIdFrom, message });
          }
  })
});

server.listen(3003, () => {
    console.log('Servidor: http://localhost:3003/');
    console.log('El servidor esta corriendo');
})