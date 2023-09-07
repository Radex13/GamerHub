import { cardIcon, createGame, cardProfileIcon } from "/components/carditem.js"
(async() => {
    try {
      const spinner = document.getElementById('spinner')
      const invitationId = window.location.pathname.split('/')[3];
      const userId = window.location.pathname.split('/')[2];
      const { data } = await axios.patch(`/api/invitations/${userId}/${invitationId}`);
      const usergame = data.id
      const resultsgame = await axios.patch('/api/games', { usergame });
      const myusergames = await axios.get('/api/games');

      const userGames = resultsgame.data.filter(game => game.user === userId);
      const myGamesName = myusergames.data.map(game => game.name);

      const myGames = userGames.filter(game => {
        const findGame = myGamesName.find(fullGame => fullGame === game.name);
        // console.log(findGame);
        return findGame;
      });

      const imgFilename = data.img;
      const cardContain = document.getElementById('card-container')

      const imgSrc = `/images/uploads/${imgFilename}`
      const defaultImgSrc = '/images/profile-default.svg';
      
      // Intentamos cargar la imagen
      fetch(imgSrc).then(response => {
          // Si la respuesta tiene un código 404, usamos la imagen predeterminada
          if (response.ok === true) {
              document.getElementById(`default-img-${data.username}`).classList.add('hidden');
              document.getElementById(`card-img-${data.username}`).innerHTML = `
            <img class="rounded-full w-48 h-48 md:w-40 md:h-40" src="${imgSrc}" alt="photo-profile">
          `;
          }
        })
    let description
    if (data.description === '') {
      description = 'Aún no hay descripción'
    } else {
      description = data.description
    }
    
    const fechaActual = new Date();
    const fechaNacimiento = new Date(data.dateOfBirth);
    const diferencia = fechaActual - fechaNacimiento;
    const milisegundosEnUnAno = 1000 * 60 * 60 * 24 * 365.25;
    const edad = Math.round(diferencia / milisegundosEnUnAno);

    function formatTimeDifference(lastActive) {
      const currentDate = new Date();
      const lastActiveDate = new Date(lastActive);
      const differenceInMilliseconds = currentDate - lastActiveDate;
    
      const millisecondsPerSecond = 1000;
      const millisecondsPerMinute = 60 * millisecondsPerSecond;
      const millisecondsPerHour = 60 * millisecondsPerMinute;
      const millisecondsPerDay = 24 * millisecondsPerHour;
      const millisecondsPerMonth = 30 * millisecondsPerDay;
      const millisecondsPerYear = 365 * millisecondsPerDay;
    
      if (differenceInMilliseconds < millisecondsPerMinute) {
        const seconds = Math.floor(differenceInMilliseconds / millisecondsPerSecond);
        return `última vez activ@: hace ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
      } else if (differenceInMilliseconds < millisecondsPerHour) {
        const minutes = Math.floor(differenceInMilliseconds / millisecondsPerMinute);
        return `última vez activ@: hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
      } else if (differenceInMilliseconds < millisecondsPerDay) {
        const hours = Math.floor(differenceInMilliseconds / millisecondsPerHour);
        return `última vez activ@: hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      } else if (differenceInMilliseconds < millisecondsPerMonth) {
        const days = Math.floor(differenceInMilliseconds / millisecondsPerDay);
        return `última vez activ@: hace ${days} ${days === 1 ? 'día' : 'días'}`;
      } else if (differenceInMilliseconds < millisecondsPerYear) {
        const months = Math.floor(differenceInMilliseconds / millisecondsPerMonth);
        return `última vez activ@: hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
      } else {
        return `última vez activ@: hace más de 1 año`;
      }
    }  
    const lastActive = data.lastOnline;
    const formattedTimeDifference = formatTimeDifference(lastActive);
  
      cardContain.innerHTML = `
      <div id="card-profile" class="flex flex-col bg-zinc-700 p-4 rounded-md gap-4 justify-center items-center">
  
                  <div id="card-img-${data.username}" class="flex w-48 h-48 justify-center items-center outline outline-4 outline-blue-600 rounded-full  md:w-40 md:h-40">
                      <img id="default-img-${data.username}" class="rounded-full w-48 h-48 md:w-40 md:h-40" src="${defaultImgSrc}" alt="photo-profile">
                  </div>
  
              <div id="${data.username}">
                  <p class="text-white font-bold text-lg md:text-2xl">
                      ${data.username}
                  </p>
              </div>
      
              <div id="card-commontime" class="">
              </div>
  
              <div id="card-littleinfo" class="">
                  <p class="text-white font-bold text-center md:text-base">
                      ${data.language}/${data.server}/${edad}
                  </p>
              </div>
  
              <!-- <div id="card-pegatines" class="">
                  <div id="select-pegatines">
  
                  </div>
              </div> -->
  
              <div id="card-description" class="bg-zinc-800 rounded-md p-2 w-4/5 min-h-[5rem] md:w-3/4 lg:w-2/3">
                  <p class="text-white font-normal break-words text-center text-sm md:text-lg">
                      ${description}
                  </p>
              </div>
  
              <div></div>
  
              <div id="card-platforms" class="rounded-md">
  
                  <p class="text-center pb-2 text-slate-200 font-semibold md:text-lg">Yo juego en:</p>
  
                  <div id="select-platforms" class="flex gap-2 text-white font-bold text-center flex-row flex-wrap justify-center items-center">
                  </div>
              </div>
  
              <div id="card-wegames" class="">
                  <p class="text-center pb-2 text-slate-200 font-semibold md:text-lg">Juegos que a ambos nos gustan:</p>
  
                  <div id="wegames-container" class="flex gap-4 flex-col justify-center items-center">
                      <button id="wegames-show" class="text-slate-200 text-center outline outline-2 outline-blue-500 rounded-2xl bg-zinc-800 p-2 md:text-base">
                          Preguntame sobre tus gustos!
                      </button>
                      <div id="wegames-${data.id}" class="flex flex-wrap justify-center items-center gap-2 text-slate-200 text-center">
  
  
                      </div>
                  </div>
              </div>
  
              <div id="card-favoritegames">
  
                  <p class="text-center pb-2 text-slate-200 font-semibold md:text-lg">Todos mis juegos:</p>
  
                  <div id="games-container" class="flex gap-4 flex-col justify-center items-center">
                      <button id="favorite-show" class="text-slate-200 cursor-default text-center outline outline-2 outline-blue-500 rounded-2xl bg-zinc-800 p-2 md:text-base">
                      Pregunta sobre los juegos que tengo!
                      </button>
  
                      <div id="favorite-games-${data.id}" class="flex flex-wrap justify-center items-center gap-2 text-slate-200 text-center">               
                      </div>
                  </div>
  
              </div>
  
              <div id="card-activity">
                  <p class="text-center text-slate-300 font-semibold">${formattedTimeDifference}</p>
              </div>
  
              <div id="btns" class="flex gap-4 w-full justify-center">
                <button id="accept-btn-${data.id}" class="text-zinc-100 w-2/5 accept-item dark:text-zinc-100 uppercase font-bold px-2 py-2 bg-green-600 rounded-lg hover:bg-green-700  dark:hover:bg-green-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pointer-events-none mr-auto ml-auto sm:hidden">
                    <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <div id="spinner-accept" class="hidden justify-center">
                    <div class="spinner-sm"></div>
                  </div>
                  <span class="hidden justify-center pointer-events-none sm:flex">Aceptar</span>
                </button>

                <button id="decline-btn-${data.id}" class="text-zinc-100 w-2/5 dark:text-zinc-100 uppercase font-bold px-2 py-2 bg-red-600  rounded-lg hover:bg-red-700  dark:hover:bg-red-700 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pointer-events-none mr-auto ml-auto sm:hidden">
                    <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <div id="spinner-decline" class="hidden justify-center">
                    <div class="spinner-sm"></div>
                  </div>
                  <span class="hidden justify-center pointer-events-none sm:flex">Denegar</span>
                </button>
              </div>
      </div>
      `
      cardIcon(cardContain, data)
      spinner.classList.add('hidden')
      const gamesProfileContent = document.getElementById(`favorite-games-${userId}`);
      const wegamesProfileContent = document.getElementById(`wegames-${userId}`);

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

    const btns = document.getElementById('btns');
    const acceptBtn = btns.children[0];
    const declineBtn = btns.children[1];
    acceptBtn.addEventListener('click', async () => {
        const span = acceptBtn.children[2]
        const svg = acceptBtn.children[0]
        const spinner = document.getElementById('spinner-accept')
        spinner.classList.remove('hidden')
        svg.classList.add('hidden')
        span.classList.remove('sm:flex')
        span.classList.add('hidden')
        spinner.classList.add('flex')
        const idInvitation = invitationId
        const createResponse = await axios.patch('/api/invitations', { idInvitation });
        spinner.classList.remove('flex')
        spinner.classList.add('hidden')
        span.classList.add('sm:flex')
        window.location.pathname = '/lobby/';
      });

      declineBtn.addEventListener('click', async () => {
        const span = declineBtn.children[2]
        const svg = declineBtn.children[0]
        const spinner = document.getElementById('spinner-decline')
        spinner.classList.remove('hidden')
        svg.classList.add('hidden')
        span.classList.remove('sm:flex')
        span.classList.add('hidden')
        spinner.classList.add('flex')
        const idInvitationDelete = invitationId
        const createResponse = await axios.patch('/api/invitations/declined', { idInvitationDelete });
        spinner.classList.remove('flex')
        spinner.classList.add('hidden')
        span.classList.add('sm:flex')
        window.location.pathname = '/lobby/';
      });

    } catch (error) {
      if (error.response.data.error === 'La invitacion no esta pendiente.')  {
        window.location.pathname = '/lobby/';
      }
      console.error(error);
    }
  })();