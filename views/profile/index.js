import { createNotification } from "../components/notification.js"
import { createGameProfile, cardProfileIcon, createGame, cardIcon, attachAddEvent, attachDeleteEvent } from "../components/gamesitem.js"
// funciones
document.addEventListener("DOMContentLoaded", async() => {

    // const results = await axios.get('/api/usergames');
    // console.log(results);
    const loaderContainer = document.getElementById("loader-container");
    const cuentaContent = document.getElementById("cuenta-content");

    // Mostrar el loader al inicio (opcional, si deseas mostrarlo al principio)
    loaderContainer.classList.add("hide-loader");
  
    // Simulación de una operación asíncrona
    async function fetchData() {
      // Mostrar el loader antes de cargar los datos
      loaderContainer.classList.remove("hide-loader");
      document.getElementById("profile-container").classList.add("loading");
      cuentaContent.classList.remove('hidden');  
      cuentaContent.classList.add('flex')  
    const { data } = await axios.get('/api/userprofile', {
        withCredentials: true
    });

    const userImg = data.img;
    const profilePicture = document.getElementById("profile-picture");
    const profileDefault = document.getElementById("profile-default"); // Obtener referencia a la imagen predeterminada

    // Agregar un evento onload a la imagen para ocultar la predeterminada una vez que la imagen personalizada se haya cargado
    profilePicture.onload = () => {
        // Mostrar la imagen personalizada una vez que se haya cargado
        profilePicture.style.display = "block";
        // Ocultar la imagen predeterminada una vez que se haya cargado la personalizada
        profileDefault.style.display = "none";
    };

    if (!userImg) {
        // Si no hay imagen de perfil personalizada, ocultarla por defecto
        profilePicture.style.display = "none";
        // Mostrar la imagen predeterminada en caso de que no haya imagen personalizada
        profileDefault.style.display = "block";
    } if (userImg === 'profile-default.svg') {
        // Si no hay imagen de perfil personalizada, ocultarla por defecto
        profilePicture.style.display = "none";
        // Mostrar la imagen predeterminada en caso de que no haya imagen personalizada
        profileDefault.style.display = "block";
    } 
     else {
        // Si hay imagen de perfil personalizada, asignar la ruta y cargar la imagen
        profilePicture.src = `/images/uploads/${userImg}`;
    }

        
    // Manejo de eventos para el botón de cambiar foto de perfil
    document.getElementById("change-profile-picture-btn").addEventListener("click", () => {
        // Simular el clic en el campo de selección de archivo para abrir el cuadro de diálogo
        document.getElementById("profile-picture-input").click();
    });


    // Manejo de eventos para la selección de archivo
    document.getElementById("profile-picture-input").addEventListener("change", async (event) => {
        const file = event.target.files[0];

        if (!file) {
            // El usuario cancela subida
            return;
        }
        try {
            const { data } = await axios.get('/api/userprofile', {
                withCredentials: true
              });
              const username = data.username

            //   console.log(username);
            if (!username) {
                console.error("Nombre de usuario no definido.");
                return;
            }
            // Subir la imagen seleccionada al servidor
            const formData = new FormData();
            formData.append("image", file);
            formData.append("username", username);

            // Realizar la solicitud POST para subir la imagen al servidor
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // La imagen se subió y procesó correctamente
                // Actualizar la imagen mostrada en el componente
                const imageUrl = await response.text();
                document.getElementById("profile-picture").src = imageUrl;
            } else {
                // Error al subir o procesar la imagen
                console.error("Error al subir y procesar la imagen.");
            }
        } catch (error) {
            console.error(error);
        }
    });

    // asignar info a los input

    const inputUsername = document.getElementById('input-username');
    const inputEmail = document.getElementById('input-email');

    // Asignar el valor de data.username al input
    inputUsername.value = data.username;
    inputEmail.value = data.email;
    descriptionInput.value = data.description

    // plataformas
    const divPlatforms = document.getElementById('select-platforms')
    // console.log(divPlatforms.children[0]);
    const platforms = data.platforms
    // console.log(platforms);
    platforms.forEach(platform => {
        if (platform === 'Pc/Mac') {
            divPlatforms.children[0].classList.add("platform-added")
        }
        if (platform === 'Playstation') {
            divPlatforms.children[1].classList.add("platform-added")
        }
        if (platform === 'Xbox') {
            divPlatforms.children[2].classList.add("platform-added")
        }
        if (platform === 'Nintendo Switch') {
            divPlatforms.children[3].classList.add("platform-added")
        }
        if (platform === 'Mobile Games') {
            divPlatforms.children[4].classList.add("platform-added")
        }
        if (platform === 'Vr') {
            divPlatforms.children[5].classList.add("platform-added")
        }
    })

    
            
    try {
        const resultsgame = await axios.get('/api/games');
        // console.log(resultsResponse);
        const gamesProfileContent = document.getElementById('gamesprofile-content');
        resultsgame.data.forEach(async game => {
            const gameProfileItem = document.createElement('div');
            gameProfileItem.id = game.id;
            const card = game;
            gameProfileItem.innerHTML = createGameProfile(game);
            cardProfileIcon(gameProfileItem, card);
            gamesProfileContent.appendChild(gameProfileItem);
            });
    } catch (error) {
        console.error(error);
    }

    // Aquí iría tu lógica para obtener los datos (axios.get u otra lógica)
      // Simulación de una espera de 2 segundos (puedes remplazar esto con tu lógica real)
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Después de obtener los datos, ocultar el loader y mostrar el contenido
      loaderContainer.classList.add("hide-loader");
      document.getElementById("profile-container").classList.remove("loading");
    }
  
    // Ejecutar la simulación al cargar la página
    await fetchData();
});

// Regex
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const DESCRIPTION_VALIDATION = /^[\s\S]{1,500}$/;
// selectores
const inputUsername = document.getElementById('input-username');
const btnUsername = document.getElementById('btn-username');
const inputEmail = document.getElementById('input-email');
const btnEmail = document.getElementById('btn-email');
const changePasswordModal = document.getElementById("change-password-modal");
const changePasswordBtn = document.getElementById("btn-change-password");
const inputCurrentPassword = document.getElementById("current-password");
const savePassword = document.getElementById("save-password");
const passwordInput = document.getElementById("new-password");
const matchInput = document.getElementById('confirm-password');
const changeDescriptionModal = document.getElementById('change-description-modal');
const changeDescriptionBtn = document.getElementById('btn-change-description');
const descriptionInput = document.getElementById('text-description');
const saveDescription = document.getElementById('save-description');
const selectPlatforms = document.getElementById('select-platforms');
const savePlatforms = document.getElementById('btn-save-platforms');
const btnGame = document.getElementById('btn-search-game');
// Obtén una referencia al elemento de los spinners
const spinner = document.querySelector('#spinner-container');
const button = document.getElementById('button-text');
const spinnerDescription = document.querySelector('#spinner-container-description');
const buttonDescription = document.getElementById('button-text-description')
const spinnerPlatforms = document.querySelector('#spinner-platforms')
const buttonPlatforms =  document.getElementById('text-platforms')
// agregar evento de clic al botón utilizando una función de flecha directamente
btnUsername.addEventListener('click', async () => {
    if (inputUsername.hasAttribute('readonly')) {
      inputUsername.focus();
      inputUsername.removeAttribute('readonly');
    } else {
        const username = inputUsername.value;

        await axios.patch(`/api/userprofile`, { username });

        inputUsername.setAttribute('value', inputUsername.value);
        inputUsername.setAttribute('readonly', true);
    }
  });

btnEmail.addEventListener('click', async () => {
    if (inputEmail.hasAttribute('readonly')) {
        inputEmail.focus();
      inputEmail.removeAttribute('readonly');
    } else {
        const email = inputEmail.value;

        await axios.patch(`/api/userprofile`, { email });

        inputEmail.setAttribute('value', inputEmail.value);
        inputEmail.setAttribute('readonly', true);
    }
  });

// Función de flecha para mostrar el cuadro emergente (modal) al hacer clic en el botón de cambiar contraseña
const showChangePasswordModal = () => {
    document.getElementById("change-password-modal").classList.remove("hidden");
    document.getElementById("change-password-modal").classList.add("flex");
  };
  

  // Event Listener para el botón de cambiar contraseña
  changePasswordBtn.addEventListener("click", showChangePasswordModal);
  
  changePasswordModal.addEventListener("click", (event) => {
    if (event.target === changePasswordModal) {
        document.getElementById("change-password-modal").classList.remove("flex");
        document.getElementById("change-password-modal").classList.add("hidden");
    }
});

let passwordValidation = false;
let matchValidation = false;
let descriptionValidation = false;

function spinnerShow() {
    button.innerHTML = '';
    spinner.style.display = 'flex';
  }
  
function spinnerHidden() {
    spinner.style.display = 'none';
    button.innerHTML = 'Guardar Cambios';
  }

function spinnerShowDescription() {
    buttonDescription.innerHTML = '';
    spinnerDescription.style.display = 'flex';
  }

function spinnerHiddenDescription() {
    spinnerDescription.style.display = 'none';
    buttonDescription.innerHTML = 'Guardar Cambios';
  }

function spinnerShowPlatforms() {
buttonPlatforms.innerHTML = '';
spinnerPlatforms.classList.remove('hidden')
spinnerPlatforms.classList.add('flex')
}

function spinnerHiddenPlatforms() {
spinnerPlatforms.classList.remove('flex')
spinnerPlatforms.classList.add('hidden')
buttonPlatforms.innerHTML = 'Guardar cambios';
}

const validation = (input, regexValidation) => {
    savePassword.disabled = passwordValidation && matchValidation ? false : true;
    
    if (input.value === ''){
        input.classList.remove('outline-red-700', 'outline-2', 'outline');
        input.classList.remove('outline-gren-700', 'outline-2', 'outline');
        input.classList.add('focus:outline-indigo-700');
    }  else if (regexValidation){
        input.classList.remove('outline-red-700', 'outline-2', 'outline');
        input.classList.remove('focus:outline-indigo-700');
        input.classList.add('outline-green-700', 'outline-2', 'outline');
    } else if (!regexValidation) {
        input.classList.remove('focus:outline-indigo-700');
        input.classList.remove('outline-green-700', 'outline-2', 'outline');
        input.classList.add('outline-red-700', 'outline-2', 'outline');
    }
};

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    matchValidation = e.target.value === matchInput.value;
    validation(passwordInput, passwordValidation)
    validation(matchInput, matchValidation)
});

matchInput.addEventListener('input', e => {
    matchValidation = e.target.value === passwordInput.value;
    validation(matchInput, matchValidation)
});

savePassword.addEventListener('click', async e => {
    e.preventDefault();
    try {
        spinnerShow();
        const changedPassword = {
            currentpassword: inputCurrentPassword.value,
            newpassword: passwordInput.value
        }
        const { data } = await axios.post('/api/userprofile', changedPassword);
        createNotification(false, data)
    setTimeout(() => {
        notification.innerHTML = '';
    }, 5000)
    spinnerHidden();
    } catch (error) {
        spinnerHidden();
        createNotification(true, error.response.data.error)
    setTimeout(() => {
        notification.innerHTML = '';
    }, 5000);    
    }
})
let originalDescription;
const showChangeDescriptionModal = () => {
    document.getElementById("change-description-modal").classList.remove("hidden");
    document.getElementById("change-description-modal").classList.add("flex");
    // Guarda el valor original del descriptionInput solo si no ha sido almacenado previamente
    if (originalDescription === undefined) {
        originalDescription = descriptionInput.value;
    }
  };


  // Event Listener para el botón de cambiar contraseña
  changeDescriptionBtn.addEventListener("click", showChangeDescriptionModal);
  changeDescriptionModal.addEventListener("click", async (event) => {
    if (event.target === changeDescriptionModal) {
        document.getElementById("change-description-modal").classList.remove("flex");
        document.getElementById("change-description-modal").classList.add("hidden");
    // Verifica si el valor ha cambiado antes de hacer la solicitud
    if (descriptionInput.value !== originalDescription) {
        // Aquí podrías mostrar un mensaje al usuario para confirmar si desea descartar los cambios no guardados
        // En este caso, simplemente restauraremos el valor original sin preguntar al usuario.
        descriptionInput.value = originalDescription;
    }
    }
});


const validationDescription = (input, regexValidation) => {
    saveDescription.disabled = descriptionValidation ? false : true;
    
    if (input.value === ''){
        input.classList.remove('outline-red-700', 'outline-2', 'outline');
        input.classList.remove('outline-gren-700', 'outline-2', 'outline');
        input.classList.add('focus:outline-none', 'focus:ring', 'focus:outline-indigo-700');
    } else if (regexValidation){
        input.classList.remove('outline-red-700', 'outline-2', 'outline');
        input.classList.remove('focus:outline-none', 'focus:ring', 'focus:outline-indigo-700');
        input.classList.add('outline-green-700', 'outline-2', 'outline');
    } else if (!regexValidation) {
        input.classList.remove('focus:outline-none', 'focus:ring', 'focus:outline-indigo-700');
        input.classList.remove('outline-green-700', 'outline-2', 'outline');
        input.classList.add('outline-red-700', 'outline-2', 'outline');
    }
};

descriptionInput.addEventListener('input', async e  => {  
    const { data } = await axios.get('/api/userprofile', {
        withCredentials: true
    });
    if (descriptionInput.value === data.description) {
        descriptionInput.classList.remove('outline-red-700', 'outline-2', 'outline');
        descriptionInput.classList.remove('outline-gren-700', 'outline-2', 'outline');
        descriptionInput.classList.add('focus:outline-none', 'focus:ring', 'focus:outline-indigo-700');
    } else {
        descriptionValidation = DESCRIPTION_VALIDATION.test(e.target.value);
        validationDescription(descriptionInput, descriptionValidation);
    }
  });

saveDescription.addEventListener('click', async () => {
        spinnerShowDescription();
        const description = descriptionInput.value;
        await axios.patch(`/api/userprofile`, { description });
        spinnerHiddenDescription();
        originalDescription = descriptionInput.value;
        descriptionInput.setAttribute('value', descriptionInput.value);
  });

  const iconDivs = selectPlatforms.querySelectorAll('.cursor-pointer'); // Obtén todos los iconos
    iconDivs.forEach(iconDiv => {
        iconDiv.addEventListener('click', () => {
            if (iconDiv.classList.contains('platform-added')) {
                iconDiv.classList.remove('platform-added');
            } else {
                iconDiv.classList.add('platform-added');
            }
        });
    });

  savePlatforms.addEventListener('click', async () => {
    try {
        spinnerShowPlatforms();
        const clickedIcons = Array.from(selectPlatforms.querySelectorAll('.platform-added'));
        // console.log(clickedIcons.length);
        if (clickedIcons.length > 0) {
            const platforms = [];
            clickedIcons.forEach(async div => {
                if (div.id === 'pc') {
                    platforms.push('Pc/Mac');
                } else if (div.id === 'psx') {
                    platforms.push('Playstation');
                } else if (div.id === 'xbox') {
                    platforms.push('Xbox');
                } else if (div.id === 'switch') {
                    platforms.push('Nintendo Switch');
                } else if (div.id === 'mobile') {
                    platforms.push('Mobile Games');
                } else if (div.id === 'vr') {
                    platforms.push('Vr');
                }                
            })
            await axios.patch(`/api/userprofile`, { platforms });
            spinnerHiddenPlatforms();
            // console.log(platforms);
        }
    } catch (error) {
        
    }
  })

  
// Agregar eventos de clic a los botones para cambiar entre pestañas
document.getElementById('tab-cuenta').addEventListener('click', function() {
    showTab('cuenta');
});

document.getElementById('tab-games').addEventListener('click', function() {
    showTab('games');
});

document.getElementById('tab-security').addEventListener('click', function() {
    showTab('security');
});

const loaderContainer = document.getElementById("loader-container");
const loaderGames = document.getElementById("loader-games");

async function showTab(tabName) {
    const cuentaContent = document.getElementById('cuenta-content');
    const gamesContent = document.getElementById('games-content');
    const securityContent = document.getElementById('security-content');


    if (tabName === 'cuenta') {
        gamesContent.style.display = 'none';
        securityContent.style.display = 'none';
        cuentaContent.style.display = 'flex';
    } else if (tabName === 'games') {
        securityContent.style.display = 'none';
        cuentaContent.style.display = 'none';
                // Mostrar el loader antes de cargar los datos
            loaderContainer.classList.remove("hide-loader");

            gamesContent.style.display = 'flex';
            await loadUserGames();
        // Después de obtener los datos, ocultar el loader y mostrar el contenido
            loaderContainer.classList.add("hide-loader");

    
    } else if (tabName === 'security') {
        cuentaContent.style.display = 'none';
        gamesContent.style.display = 'none';
        securityContent.style.display = 'flex';
    }
}

async function loadUserGames() {
    try {
        const results = await axios.get('/api/usergames');
        const resultsResponses = await axios.get('/api/games');
        const resultsResponse = resultsResponses.data
        // console.log(resultsResponse);
        const gamesContain = document.getElementById('games-div');
        let currentIndex = 0;
        results.data.forEach(async game => {
            console.log(game);
            const gameItem = document.createElement('div');
            gameItem.id = game.id;
            const card = game;
            gameItem.classList.add("pb-2");
            gameItem.classList.add("game-item");
            gameItem.innerHTML = createGame(game);
            cardIcon(gameItem, card);
            gamesContain.appendChild(gameItem);

            // Verificar si el juego ya está en results y marcar los íconos correspondientes
        resultsResponse.forEach(existingGame => {
            // console.log(existingGame.gameid);
    if (existingGame.gameid === gameItem.id) {
        const iconDivs = gameItem.querySelectorAll(`#select-platforms-${game.id} > div`); // Cambia la clase si es diferente
        iconDivs.forEach(iconDiv => {
            const platform = iconDiv.id;
            // console.log(platform);
            // console.log(iconDiv);
            // console.log(existingGame.platforms.includes(platform));
            if (existingGame.platforms.includes(platform)) {
                iconDiv.classList.add('clicked');
            }
        });
    }
            });
        });
        attachAddEvent();
        attachDeleteEvent();
    } catch (error) {
        console.error('Error fetching user games:', error);
    }
}
// Obtener referencias a los elementos del DOM
const searchInput = document.getElementById('search-game');
// Agregar un evento de escucha para la tecla "Enter" en el input
searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        // Simular un clic en el botón cuando se presiona "Enter"
        btnGame.click();
    }
});
const gamesContain = document.getElementById('games-div');

// Agrega un evento para detectar cambios en el campo de búsqueda
searchInput.addEventListener('input', async () => {
    const textGame = searchInput.value;
    try {
        let response;
        if (textGame.trim() === '') {
            // Limpiar los elementos existentes en el contenedor
            while (gamesContain.firstChild) {
                gamesContain.removeChild(gamesContain.firstChild);
            }
            loaderGames.classList.remove("hidden");
            loaderGames.classList.add("flex");
            // Si el campo de búsqueda está vacío, restauramos la lista original
            loadUserGames();
            return;
        }
        loaderGames.classList.remove("flex");
            loaderGames.classList.add("hidden");
    } catch (error) {
        console.error('Error al buscar juegos:', error);
    }
});

btnGame.addEventListener('click', async () => {
    const searchGame = document.getElementById('search-game');
    const textGame = searchGame.value;
    // console.log(textGame);
    try {
        const gamesContain = document.getElementById('games-div');
        // Limpiar los elementos existentes en el contenedor
        while (gamesContain.firstChild) {
            gamesContain.removeChild(gamesContain.firstChild);
        }
        loaderGames.classList.remove("hidden");
        loaderGames.classList.add("flex");
        const response = await axios.post('/api/usergames/search', { query: textGame });
        const foundGames = response.data;
        const resultsResponses = await axios.get('/api/games');
        const resultsResponse = resultsResponses.data
        
        // Agregar los nuevos elementos al contenedor
        foundGames.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.id = game.id;
            gameItem.classList.add("pb-2");
            gameItem.classList.add("game-item");
            const card = game
            gameItem.innerHTML = createGame(game);
            cardIcon(gameItem, card);
            gamesContain.appendChild(gameItem);
            
            // Verificar si el juego ya está en results y marcar los íconos correspondientes
        resultsResponse.forEach(existingGame => {
            // console.log(existingGame.gameid);
    if (existingGame.gameid === gameItem.id) {
        const iconDivs = gameItem.querySelectorAll(`#select-platforms-${game.id} > div`); // Cambia la clase si es diferente
        iconDivs.forEach(iconDiv => {
            const platform = iconDiv.id;
            // console.log(platform);
            // console.log(iconDiv);
            // console.log(existingGame.platforms.includes(platform));
            if (existingGame.platforms.includes(platform)) {
                iconDiv.classList.add('clicked');
                        }
                    });
                }
            });
        });
        attachAddEvent();
        loaderGames.classList.remove("flex");
        loaderGames.classList.add("hidden");
        // console.log(foundGames);
    } catch (error) {
        console.error('Error al buscar juegos:', error);
    }
});






