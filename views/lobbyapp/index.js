import { createCard, cardIcon, createGame, cardProfileIcon, createInvitation, attachAddEvent, attachDeleteEvent } from "../components/carditem.js"

const socket = io();

document.addEventListener('DOMContentLoaded', async () => {
  const responseUserid = await axios.patch('/api/userslobby');
  socket.emit('setUserId', responseUserid.data);
  const responseInvitationForLobby = await axios.get('/api/invitations/chat');
  const pendingInvitationsForLobby = responseInvitationForLobby.data.filter(invitation => invitation.status === 'accepted');

    const { data } = await axios.put('/api/userslobby/users', {
      pendingInvitationsForLobby,
      withCredentials: true
    });
    console.log('que es data:', data);
    const cardcontain = document.getElementById('card-container');
    const loading = document.getElementById('spinnerload');
    let currentIndex = 0;
    const usersPerPage = 1;
    let isLoading = false;
    let isScrollEnabled = true;

    const usergame = data.map(item => item.id);
    // console.log(usergame);
    //             INVITACIONES
    const numberInvitationsContent = document.getElementById('invitations-number')
    const responseInvitation = await axios.get('/api/invitations');
    // console.log(responseInvitation.data);
    // Filtrar y mostrar solo los elementos "pending" 
    const pendingInvitations = responseInvitation.data.filter(invitation => invitation.status === 'pending');
    // console.log(pendingInvitations);
    if (pendingInvitations.length > 0) {
      numberInvitationsContent.textContent = pendingInvitations.length
      numberInvitationsContent.parentElement.classList.remove('hidden')
      numberInvitationsContent.parentElement.classList.add('flex')
    }

    const resultsgame = await axios.patch('/api/games', { usergame });
    const myusergames = await axios.get('/api/games');
    const invitationsContent = document.getElementById('invitations-content')
    pendingInvitations.forEach(async invitation => {
      const userSend = invitation.senderuser
      const user = await axios.put('/api/userprofile', { userSend });
      const userData = user.data;
        const invitationItem = document.createElement('div');
        invitationItem.id = invitation.id;
        invitationItem.setAttribute('class', 'flex-col invitation-item flex justify-center w-full sm:flex-row sm:justify-evenly');
        invitationItem.innerHTML = createInvitation(userData, invitation.id);
        invitationsContent.appendChild(invitationItem);
        attachAddEvent();
        attachDeleteEvent();
      })
    const showUser = () => {

      const cardItem = document.createElement('div');
      cardItem.id = data[currentIndex].id;

      //código para calcular la edad y crear la tarjeta
      const card = data[currentIndex];
      const fechaActual = new Date();
      const fechaNacimiento = new Date(card.dateOfBirth);
      const diferencia = fechaActual - fechaNacimiento;
      const milisegundosEnUnAno = 1000 * 60 * 60 * 24 * 365.25;
      const edad = Math.round(diferencia / milisegundosEnUnAno);

      cardItem.innerHTML = createCard(card, edad);
      cardIcon(cardItem, card);
        // console.log(resultsResponse);
        // oculta el loading y muestra los usuarios
        loading.classList.add('hidden')
        cardcontain.classList.remove('hidden')
        cardcontain.appendChild(cardItem);
        const userId = data[currentIndex].id;
        const gamesProfileContent = document.getElementById(`favorite-games-${userId}`);
        const wegamesProfileContent = document.getElementById(`wegames-${userId}`);
        const invitationsContent = document.getElementById('invitations-content')
        const btnInvitation = document.getElementById(`invite-btn-${userId}`);
        // gamesProfileContent.innerHTML = ''; // Limpiar contenido previo
        // Filtrar los juegos que pertenecen al usuario actual
    const userGames = resultsgame.data.filter(game => game.user === userId);
    const myGamesName = myusergames.data.map(game => game.name);
    // console.log(userGames);
    // console.log(resultsgame);
    const myGames = userGames.filter(game => {
      const findGame = myGamesName.find(fullGame => fullGame === game.name);
      // console.log(findGame);
      return findGame;
    });
    // console.log(myGames);
    // Agregar los juegos correspondientes al usuario
    const userGamesLength = userGames.length
    const myGamesLength = myGames.length
    userGames.forEach(game => {
        const gameProfileItem = document.createElement('div');
        gameProfileItem.id = game.id;
        gameProfileItem.innerHTML = createGame(game, userId, userGamesLength, myGamesLength);
        cardProfileIcon(gameProfileItem, game);
        gamesProfileContent.appendChild(gameProfileItem);
    });

    myGames.forEach(game => {
      const gameProfileItem = document.createElement('div');
      gameProfileItem.id = game.id;
      gameProfileItem.innerHTML = createGame(game, userId, userGamesLength, myGamesLength);
      cardProfileIcon(gameProfileItem, game);
      wegamesProfileContent.appendChild(gameProfileItem);
    });

    btnInvitation.addEventListener('click', async () => {
      const numericPart = btnInvitation.id.slice(11); // Elimina los primeros 9 caracteres ("invite-btn-")
      const createResponse = await axios.post('/api/invitations', { 
        status: 'pending',
        recipientuser: numericPart,
    });
      const dataResponse = createResponse.data 
    const responseUser = await axios.patch('/api/userslobby');
    // console.log('mi user:', responseUser.data);
    // console.log('enviado a:', numericPart);
    socket.emit('invitarUsuario', {user: numericPart, userEmit: responseUser.data, idInvitation: dataResponse.id});
    });
        // Escuchar eventos de invitación
    socket.on('nuevaInvitacion', async (data) => {
      const userSend = data.usuarioIdEmit
      const idInvitation = data.idInvitation

      const numberInvitationsContent = document.getElementById('invitations-number')
      const responseInvitation = await axios.get('/api/invitations');
      const pendingInvitations = responseInvitation.data.filter(invitation => invitation.status === 'pending');
      if (pendingInvitations.length > 0) {
        numberInvitationsContent.textContent = pendingInvitations.length
        numberInvitationsContent.parentElement.classList.remove('hidden')
        numberInvitationsContent.parentElement.classList.add('flex')
      }

        const user = await axios.put('/api/userprofile', { userSend });
        const userData = user.data;
          const invitationItem = document.createElement('div');
          invitationItem.id = idInvitation
          invitationItem.setAttribute('class', 'flex-col invitation-item flex justify-center w-full sm:flex-row sm:justify-evenly');
          invitationItem.innerHTML = createInvitation(userData, idInvitation);
          invitationsContent.appendChild(invitationItem);
          attachAddEvent();
          attachDeleteEvent();
      // Lógica para mostrar la notificación al usuario
    });

      currentIndex++;

      if (currentIndex >= data.length) {
        loadMoreButton.style.display = 'none'; // Ocultar el botón si ya no hay más usuarios por cargar
        window.addEventListener('scroll', enableScroll); // Habilitar el scroll
      } else if (currentIndex % usersPerPage === 0) {
        cardcontain.appendChild(loadMoreButton); // Agregar el botón después de cargar usuarios
      }
    };

    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Cargar más usuarios';
    loadMoreButton.classList.add('bg-green-700', 'py-2', 'px-4', 'rounded-lg', 'font-bold', 'text-white', 'hover:bg-green-800', 'text-center', 'transition', 'ease-in-out', 'mr-auto', 'ml-auto', 'mb-4');
    loadMoreButton.style.display = 'none'; // Ocultar el botón inicialmente

    const disableScroll = () => {
      isScrollEnabled = false;
    };

    const enableScroll = () => {
      isScrollEnabled = true;
    };

    loadMoreButton.addEventListener('click', () => {
      loadMoreButton.style.display = 'none'; // Ocultar el botón al cargar más usuarios
      showUser();
      if (currentIndex < data.length) {
        enableScroll(); // Habilitar el scroll si aún hay usuarios por cargar
      }
    });

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollPosition = scrollTop + clientHeight;
      const isAtBottom = scrollPosition >= scrollHeight - 1;

      if (isAtBottom && isScrollEnabled) {
        disableScroll(); // Deshabilitar el scroll para evitar cargas múltiples al hacer scroll rápidamente
        showUser();
        if (currentIndex < data.length) {
          loadMoreButton.style.display = 'block'; // Mostrar el botón si aún hay usuarios por cargar
        }
      }
    };

    showUser();
    if (currentIndex < data.length) {
      enableScroll(); // Habilitar el scroll si aún hay usuarios por cargar
      window.addEventListener('scroll', handleScroll); // Escuchar el evento scroll
    }

    if (currentIndex >= usersPerPage && currentIndex < data.length) {
      cardcontain.appendChild(loadMoreButton); // Agregar el botón si hay más usuarios por cargar inicialmente
    }
  });
