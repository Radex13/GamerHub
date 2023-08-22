const pcIcon = () => {
    const div = document.createElement('div');
    div.id = 'pc';
    div.setAttribute('class', 'flex flex-row cursor-pointer outline outline-2 outline-blue-500 rounded-2xl p-1');
    div.innerHTML = `
    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pointer-events-none">
                    <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
    `;
    return div;
}

const psxIcon = () => {
    const div = document.createElement('div');
    div.id = 'psx';
    div.setAttribute('class', 'flex flex-row cursor-pointer outline outline-2 outline-blue-500 rounded-2xl p-1');
    div.innerHTML = `
    <svg class="w-6 h-6 pointer-events-none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30"
                style="fill:#FFFFFF;">
                <path class="pointer-events-none" d="M 11.181641 3.7421875 L 11.181641 24.857422 L 15.761719 26.257812 L 15.761719 8.5761719 C 15.761719 8.0671719 15.761625 7.8135937 16.015625 7.5585938 C 16.142625 7.3045937 16.396391 7.3046406 16.650391 7.4316406 C 17.286391 7.6856406 17.669922 8.1948906 17.669922 9.2128906 L 17.669922 16.207031 C 19.195922 16.970031 20.466375 16.970031 21.484375 16.207031 C 22.502375 15.444031 23.011719 14.300578 23.011719 12.392578 C 23.012719 10.357578 22.630234 9.0853594 21.740234 8.0683594 C 20.977234 7.0503594 19.578969 6.1594375 17.542969 5.5234375 C 14.998969 4.7604375 12.835641 4.1241875 11.181641 3.7421875 z M 9.9101562 16.972656 L 4.0585938 19.007812 L 3.1699219 19.388672 C 1.7709219 20.024672 1.0078125 20.660875 1.0078125 21.296875 C 1.1348125 22.059875 1.388875 23.078844 3.296875 23.714844 C 5.077875 24.350844 6.4770625 24.604891 10.039062 23.587891 L 10.039062 21.296875 C 6.6030625 22.440875 6.0949375 22.314547 5.5859375 22.060547 C 5.0769375 21.806547 5.076125 21.550828 5.203125 21.423828 C 5.585125 21.169828 6.984375 20.660156 6.984375 20.660156 L 9.9101562 19.642578 L 9.9101562 16.972656 z M 22.853516 17.962891 C 22.440109 17.948984 22.026781 17.956531 21.613281 17.988281 C 20.214281 17.988281 18.941063 18.243 17.414062 18.625 L 17.414062 21.296875 L 20.212891 20.277344 L 21.738281 19.769531 C 21.738281 19.769531 22.375812 19.642625 22.757812 19.515625 C 23.393812 19.388625 24.15625 19.642578 24.15625 19.642578 C 24.53825 19.642578 24.792969 19.768438 24.792969 20.023438 C 24.919969 20.277438 24.665297 20.406156 24.029297 20.660156 L 22.630859 21.169922 L 17.542969 23.076172 L 17.542969 25.748047 L 19.832031 24.984375 L 26.191406 22.695312 L 26.955078 22.3125 C 28.481078 21.8035 29.117234 21.167297 28.990234 20.404297 C 28.990234 19.642297 28.100219 19.134 26.574219 18.625 C 25.333719 18.24325 24.093734 18.004609 22.853516 17.962891 z"></path>
                </svg>
    `;
    return div;
}

const xboxIcon = () => {
    const div = document.createElement('div');
    div.id = 'xbox';
    div.setAttribute('class', 'flex flex-row cursor-pointer outline outline-2 outline-blue-500 rounded-2xl p-1');
    div.innerHTML = `
    <svg class="h-6 w-6 pointer-events-none" style="color: white" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                    <path class="pointer-events-none" d="M126.8,248.3c39.7-58.6,77.9-92.8,77.9-92.8s-42.1-48.9-92.8-67.4l-3.3-.8A224.13,224.13,0,0,0,77.2,391C77.2,386.6,77.8,320.7,126.8,248.3Z" fill="white"></path>
                    <path class="pointer-events-none" d="M480,256A223.71,223.71,0,0,0,403.4,87.3l-3.2.9c-50.7,18.5-92.9,67.4-92.9,67.4s38.2,34.2,77.9,92.8c49,72.4,49.6,138.3,49.5,142.7A222.8,222.8,0,0,0,480,256Z" fill="white"></path>
                    <path class="pointer-events-none" d="M201.2,80.9c29.3,13.1,54.6,34.6,54.6,34.6s25.5-21.4,54.8-34.6c36.8-16.5,64.9-11.3,72.3-9.5a224.06,224.06,0,0,0-253.8,0C136.3,69.6,164.3,64.3,201.2,80.9Z" fill="white"></path>
                    <path class="pointer-events-none" d="M358.7,292.9C312.4,236,255.8,199,255.8,199s-56.3,37-102.7,93.9c-39.8,48.9-54.6,84.8-62.6,107.8l-1.3,4.8a224,224,0,0,0,333.6,0l-1.4-4.8C413.4,377.7,398.5,341.8,358.7,292.9Z" fill="white"></path>
                </svg>
    `;
    return div;
}

const switchIcon = () => {
    const div = document.createElement('div');
    div.id = 'switch';
    div.setAttribute('class', 'flex flex-row cursor-pointer outline outline-2 outline-blue-500 rounded-2xl p-1');
    div.innerHTML = `
    <svg class="w-6 h-6 pointer-events-none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0,0,256,256" style="fill:#000000;">
                <g class="pointer-events-none" fill="none" fill-rule="none" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                    <g class="pointer-events-none" transform="scale(5.33333,5.33333)">
                    <path class="pointer-events-none" d="M22,7v34h-8c0,0 -6,-2 -6,-7c0,-3 -1,-19 0,-21c1,-2 3,-5 6,-6c1.897,-0.632 8,0 8,0z" fill-opacity="0" fill="#efebe9" fill-rule="nonzero" stroke="none" stroke-width="1"></path>
                    <path class="pointer-events-none" d="M17,7h5v34h-6c-4.401,0 -8,-3.33 -8,-8.053v-17c0,-5.677 3.719,-8.947 9,-8.947z" fill="none" fill-rule="nonzero" stroke="#ffffff" stroke-width="2"></path>
                    <path class="pointer-events-none" d="M30,6h-5v36h5c5,0 10,-4 10,-9v-17c0,-6 -4.342,-10 -10,-10zM32.5,31c-1.934,0 -3.5,-1.566 -3.5,-3.5c0,-1.934 1.566,-3.5 3.5,-3.5c1.934,0 3.5,1.566 3.5,3.5c0,1.934 -1.566,3.5 -3.5,3.5z" fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1"></path>
                    <circle class="pointer-events-none" cx="15.5" cy="16.5" r="3.5" fill="#ffffff" fill-rule="evenodd" stroke="none" stroke-width="1"></circle>
                </g>
            </g>
                </svg>
    `;
    return div;
}

const mobileIcon = () => {
    const div = document.createElement('div');
    div.id = 'mobile';
    div.setAttribute('class', 'flex flex-row cursor-pointer outline outline-2 outline-blue-500 rounded-2xl p-1');
    div.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pointer-events-none">
        <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
    `;
    return div;
}

const vrIcon = () => {
    const div = document.createElement('div');
    div.id = 'vr';
    div.setAttribute('class', 'flex flex-row cursor-pointer outline outline-2 outline-blue-500 rounded-2xl p-1');
    div.innerHTML = `
    <svg class="w-6 h-6 pointer-events-none" style="color: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path class="pointer-events-none" d="M576 64H64c-35.2 0-64 28.8-64 64v256c0 35.2 28.8 64 64 64l128.3 .0001c25.18 0 48.03-14.77 58.37-37.73l27.76-61.65c7.875-17.5 24-28.63 41.63-28.63s33.75 11.13 41.63 28.63l27.75 61.63c10.35 22.98 33.2 37.75 58.4 37.75L576 448c35.2 0 64-28.8 64-64v-256C640 92.8 611.2 64 576 64zM160 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S195.4 304 160 304zM480 304c-35.38 0-64-28.63-64-64s28.62-63.1 64-63.1s64 28.62 64 63.1S515.4 304 480 304z" fill="white"></path>
                </svg>
    `;
    return div;
}

export const createGameProfile = (game) => {
    return `<div id="gamesprofile" class="flex flex-wrap justify-center items-center gap-2 text-slate-200 text-center">

    <div class="flex outline outline-2 outline-blue-500 rounded-2xl bg-zinc-800 p-2">
        <div class="flex items-center justify-center flex-wrap">
            <span id="wegames-text" class="md:text-lg">${game.name}</span>
            <div id="wegame-img" class="p-1 flex gap-2 flex-wrap justify-center items-center">
            </div>
        </div>
    </div>
</div>`
}

export const cardProfileIcon = (card, user) => {
    const platforms = card.children[0].children[0].children[0].children[1];
    user.platforms.forEach(platform => {
        if (platform === 'pc') {
            platforms.append(pcIcon());
        }

        if (platform === 'xbox') {
            platforms.append(xboxIcon());
        }

        if (platform === 'psx') {
            platforms.append(psxIcon());
        }

        if (platform === 'mobile') {
            platforms.append(mobileIcon());
        }

        if (platform === 'switch') {
            platforms.append(switchIcon());
        }

        if (platform === 'vr') {
            platforms.append(vrIcon());
        }
    });

}

export const createGame = (game) => {
    return `<div id="games" class="flex gap-2 flex-col bg-slate-800 rounded-lg outline outline-2 outline-blue-500 w-60 min-h-[14rem]">
    <img class="w-60 h-32" src="${game.background_image}" alt="">
    <div id="info-game" class="flex flex-col gap-2 justify-center items-center">
        <p class="text-white text-lg text-center">${game.name}</p>
        <div id="select-platforms-${game.id}" class="flex gap-2 p-2 text-white font-bold text-center flex-row flex-wrap justify-center items-center">
        </div>
        <div id="select-buttons" class="flex gap-2 pb-2">
            <button id="btn-remove-${game.id}" class="flex gap-2 bg-red-700 text-center justify-center items-center text-white px-4 py-2 rounded-md hover:bg-red-800 transition-all">
                Quitar
            </button>
            <button id="btn-add-${game.id}" class="flex gap-2 bg-green-700 text-center justify-center items-center text-white px-4 py-2 rounded-md hover:bg-green-800 transition-all">
                Agregar
            </button>
        </div>
    </div>
</div>`
}

export const cardIcon = (gameItem, card) => {
    const platforms = gameItem.children[0].children[1].children[1];

    let hasVrTag = false;
    for (const tag of card.tags) {
        if (tag.id === 33) {
            hasVrTag = true;
            break;
        }
    }

    if (hasVrTag) {
        platforms.append(vrIcon());
    }

    const platformIds = card.platforms.map(platform => platform.platform.id);

    if (platformIds.includes(4) || platformIds.includes(5)) {
        platforms.append(pcIcon());
    }

    if (platformIds.includes(186) || platformIds.includes(1)) {
        platforms.append(xboxIcon());
    }

    if (platformIds.includes(18) || platformIds.includes(187)) {
        platforms.append(psxIcon());
    }

    if (platformIds.includes(21) || platformIds.includes(3)) {
        platforms.append(mobileIcon());
    }

    if (platformIds.includes(7)) {
        platforms.append(switchIcon());
    }

    const iconDivs = platforms.querySelectorAll('.cursor-pointer'); // Obtén todos los iconos
    iconDivs.forEach(async iconDiv => {
        iconDiv.addEventListener('click', () => {
            if (iconDiv.classList.contains('clicked')) {
                iconDiv.classList.remove('clicked');
            } else {
                iconDiv.classList.add('clicked');
            }
        });
    });
};

export function attachAddEvent() {
    try {
        const gamesContain = document.getElementById('games-div');
        const gameItems = gamesContain.querySelectorAll('.game-item');

        for (const gameItem of gameItems) {
            const addButton = gameItem.querySelector(`#btn-add-${gameItem.id}`);
            addButton.addEventListener('click', async () => {
                try {
                    const clickedIcons = Array.from(gameItem.querySelectorAll('.clicked'));

                    if (clickedIcons.length > 0) {
                        const gameId = gameItem.id;
                        const gameName = gameItem.querySelector('.text-white.text-lg').textContent;
                        const gameImage = gameItem.querySelector('img').getAttribute('src');
                        const gamePlatforms = clickedIcons.map(iconDiv => iconDiv.id);

                        addButton.disabled = true; // Deshabilitar el botón mientras se realiza la acción

                        // Verificar si el juego ya existe en la base de datos
                        const existingGameResponse = await axios.get(`/api/games/`);
                        const existingGames = existingGameResponse.data;
                        // console.log('Comparando:', gameId, existingGames.map(game => game.gameid));
                        const existingGame = existingGames.find(game => game.gameid === gameId);
                        // console.log('el id es:', existingGame.id);
                        // console.log('Resultado:', existingGame);
                        if (existingGame) {
                            // Actualizar las plataformas del juego existente
                            existingGame.platforms = gamePlatforms;
                            const updateResponse = await axios.put(`/api/games/${existingGame.id}`, { existingGame });
                            // console.log('Juego actualizado:', updateResponse.data);
                        } else {
                            // Crear un nuevo registro para el juego
                            const createResponse = await axios.post('/api/games', { 
                                gameid: gameId,
                                name: gameName,
                                image: gameImage,
                                platforms: gamePlatforms
                            });
                            // console.log('Juego creado:', createResponse.data);
                        }

                        // Habilitar el botón nuevamente después de la acción
                        addButton.disabled = false;

                        // Aquí podrías mostrar un mensaje o hacer alguna otra acción si lo deseas
                    } else {
                        console.log(`No hay plataformas seleccionadas para agregar al juego: ${gameId}`);
                    }
                } catch (error) {
                    console.error('Error al agregar juegos:', error);
                }
            });
        }

    } catch (error) {
        console.error('Error al agregar juegos:', error);
    }
}

export function attachDeleteEvent() {
    try {
        const gamesContain = document.getElementById('games-div');
        const gameItems = gamesContain.querySelectorAll('.game-item');

        for (const gameItem of gameItems) {
            const deleteButton = gameItem.querySelector(`#btn-remove-${gameItem.id}`);
            deleteButton.addEventListener('click', async () => {
                try {
                    const gameId = gameItem.id;

                    deleteButton.disabled = true; // Deshabilitar el botón mientras se realiza la acción

                    // Verificar si el juego ya existe en la base de datos
                    const existingGameResponse = await axios.get(`/api/games/`);
                    const existingGames = existingGameResponse.data;
                    const existingGame = existingGames.find(game => game.gameid === gameId);

                    if (existingGame) {
                        // Eliminar el juego de la base de datos
                        const deleteResponse = await axios.delete(`/api/games/${existingGame.id}`);
                        // console.log('Juego eliminado:', deleteResponse.data);
                        const platforms = gameItem.children[0].children[1].children[1];
                        const iconDivs = platforms.querySelectorAll('.cursor-pointer'); // Obtén todos los iconos
                        iconDivs.forEach(iconDiv => {
                            iconDiv.classList.remove('clicked');
                        });
                    } else {
                        console.log(`El juego con ID ${gameId} no existe en la base de datos.`);
                    }

                    // Habilitar el botón nuevamente después de la acción
                    deleteButton.disabled = false;

                    // Aquí podrías mostrar un mensaje o hacer alguna otra acción si lo deseas
                } catch (error) {
                    console.error('Error al eliminar el juego:', error);
                }
            });
        }

    } catch (error) {
        console.error('Error al agregar eventos de eliminación:', error);
    }
}

