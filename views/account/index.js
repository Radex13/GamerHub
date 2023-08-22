import { createNotification } from "../components/notification.js"

// Obtenemos una referencia al formulario y al botón "Siguiente"
const configForm = document.getElementById('config-form');
const plataformasJuegos = document.getElementById('plataformas-juegos');
const nextBtnBasic = document.getElementById('next-btn-basic');
const btnAtrasPlataformas = document.getElementById('atras-btn-plataformas');
const nextBtnPlataformas = document.getElementById('next-btn-plataformas');
const formPicture = document.getElementById('picture-form');
const atrasBtnPicture = document.getElementById('atras-btn-picture');
const skipBtnPicture = document.getElementById('skip-btn-picture');
const nextBtnPicture = document.getElementById('next-btn-picture');
const descripcionInput = document.getElementById("descripcionInput");
const formDescription = document.getElementById("description-form");
const btnAtrasDescription = document.getElementById('atras-btn-description')
const skipBtnDescription = document.getElementById('skip-btn-description')
const saveBtn = document.getElementById('save-btn');

// selectores de imagen
const changePhotoBtn = document.getElementById('change-profile-picture-btn')
const inputProfilePicture = document.getElementById('profile-picture-input')

// Selectores
const form = document.querySelector('#form');
const userInput = document.getElementById('username-input');
const verificationContent = document.getElementById('verification-username-live');
const spinnerUser = document.getElementById('spinner-username');
const checkUser = document.getElementById('check-username')
const notCheckUser = document.getElementById('nocheck-username')
const dateInput = document.getElementById('date-input');
const languageInput = document.getElementById('language-input');
const serverInput = document.getElementById('server-input');
// Regex validation

const USER_VALIDATION = /^[a-zA-Z][a-zA-Z0-9-_]{5,11}/;
const DESCRIPTION_VALIDATION = /^[\s\S]{1,500}$/;

// Funcion de los botones atras y siguiente
// Agregamos un evento de clic al botón "Siguiente"

nextBtnBasic.addEventListener('click', function(event) {
  event.preventDefault(); // Evitamos que el formulario se envíe
  // Ocultamos el formulario de configuración y mostramos las plataformas de juegos
  configForm.style.display = 'none';
  plataformasJuegos.style.display = 'flex';
});

btnAtrasPlataformas.addEventListener('click', function(event) {
  event.preventDefault(); 
  plataformasJuegos.style.display = 'none';
  configForm.style.display = 'flex';
});

nextBtnPlataformas.addEventListener('click', function(event) {
  event.preventDefault();
  plataformasJuegos.style.display = 'none';
  formPicture.style.display = 'flex';
});

atrasBtnPicture.addEventListener('click', function(event) {
  event.preventDefault();
  formPicture.style.display = 'none';
  plataformasJuegos.style.display = 'flex';
});

skipBtnPicture.addEventListener('click', async function(event) {
  event.preventDefault();
  formPicture.style.display = 'none';
  formDescription.style.display = 'flex';

  try {
    const { data } = await axios.put('/api/userslobby/update-img', {
      img: 'profile-default.svg' 
    });

    // console.log(data); //ver que trae en la consola

  } catch (error) {
    console.log(error);
  }
});


nextBtnPicture.addEventListener('click', function(event) {
  event.preventDefault();
  formPicture.style.display = 'none';
  formDescription.style.display = 'flex';
});

btnAtrasDescription.addEventListener('click', function(event) {
  event.preventDefault(); 
  formDescription.style.display = 'none';
  formPicture.style.display = 'flex';
});

let userValidation = false;
let dateValidation = false;
let languageValidation = false;
let serverValidation = false;
let descriptionValidation = false;


const validation = (input, regexValidation, btn) => {
  btn.disabled = userValidation && dateValidation && languageValidation && serverValidation ? false : true;
  
  if (input.value === ''){
      input.classList.remove('outline-red-700', 'outline-2', 'outline');
      input.classList.remove('outline-gren-700', 'outline-2', 'outline');
      input.classList.add('focus:outline-indigo-700');
  } else if (regexValidation){
      input.classList.remove('outline-red-700', 'outline-2', 'outline');
      input.classList.remove('focus:outline-indigo-700');
      input.classList.add('outline-green-700', 'outline-2', 'outline');
  } else if (!regexValidation) {
      input.classList.remove('focus:outline-indigo-700');
      input.classList.remove('outline-green-700', 'outline-2', 'outline');
      input.classList.add('outline-red-700', 'outline-2', 'outline');
  }
};

userInput.addEventListener('input', e => {
  userValidation = USER_VALIDATION.test(e.target.value);
  validation(userInput, userValidation, nextBtnBasic)
});

userInput.addEventListener('input', async () => {
  if (userInput.value.length > 5) {
    try {
      checkUser.classList.remove('flex')
      checkUser.classList.add('hidden')
      notCheckUser.classList.remove('flex')
      notCheckUser.classList.add('hidden')
      verificationContent.classList.remove('hidden');
      verificationContent.classList.add('flex');
      spinnerUser.classList.remove('hidden');
      spinnerUser.classList.add('flex');
      const username = userInput.value
      const response = await axios.put('/api/userslobby/try', { username });
      if (response.status === 200) {
        notCheckUser.classList.remove('flex')
        notCheckUser.classList.add('hidden')
        spinnerUser.classList.remove('flex');
        spinnerUser.classList.add('hidden');
        checkUser.classList.remove('hidden')
        checkUser.classList.add('flex')
      }
    } catch (error) {
      checkUser.classList.remove('flex')
      checkUser.classList.remove('flex')
      checkUser.classList.remove('flex')
      checkUser.classList.add('hidden')
      spinnerUser.classList.remove('flex');
      spinnerUser.classList.add('hidden');
      checkUser.classList.remove('flex')
      notCheckUser.classList.remove('hidden')
      notCheckUser.classList.add('flex')
    }
  }
  if (userInput.value.length < 6) {
    verificationContent.classList.remove('flex');
    verificationContent.classList.add('hidden');
    notCheckUser.classList.remove('flex')
    notCheckUser.classList.add('hidden')
    spinnerUser.classList.remove('flex');
    spinnerUser.classList.add('hidden');
    checkUser.classList.remove('flex')
    checkUser.classList.add('hidden')
  }
});

// Fecha


dateInput.addEventListener('input', () => {
  const fechaNacimientoObj = new Date(dateInput.value);
  const fechaActual = new Date();
  const edad = fechaActual.getFullYear() - fechaNacimientoObj.getFullYear();
  if (edad >= 18) {
    dateValidation = true;
    validation(dateInput, dateValidation, nextBtnBasic)
  } if (edad >= 120) {
    dateValidation = false;
    validation(dateInput, dateValidation, nextBtnBasic)
  } else if (edad <= 18) {
    dateValidation = false;
    validation(dateInput, dateValidation, nextBtnBasic)
  }
});

languageInput.addEventListener('input', () => {
  const selectedValue = languageInput.value;
  if (selectedValue !== 'Selected') {
    languageValidation = true;
    validation(languageInput, languageValidation, nextBtnBasic)
  } else {
    languageValidation = false;
    validation(languageInput, languageValidation, nextBtnBasic)
  }
  // Hacer algo con el resultado de la validación
});

serverInput.addEventListener('input', () => {
  const selectedValue = serverInput.value;
  if (selectedValue !== 'Selected') {
    serverValidation = true;
    validation(serverInput, serverValidation, nextBtnBasic)
  } else {
    serverValidation = false;
    validation(serverInput, serverValidation, nextBtnBasic)
  }
});

descripcionInput.addEventListener('input', e  => {
  if (descripcionInput.value.trim() === '') {
    // Si el textarea está vacío (sin contenido visible, solo espacios en blanco)
    // Mostramos el botón "Save"
    skipBtnDescription.style.display = 'block';
    // Y ocultamos el botón "Save"
    saveBtn.style.display = 'none';
  } else {
    // Si el textarea tiene contenido
    // Mostramos el botón "Skip"
    saveBtn.style.display = 'block';
    // Y ocultamos el botón "Skip"
    skipBtnDescription.style.display = 'none';
  }

  descriptionValidation = DESCRIPTION_VALIDATION.test(e.target.value);
  validation(descripcionInput, descriptionValidation, saveBtn)
})

document.addEventListener("DOMContentLoaded", async() => {
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
  } else {
      // Si hay imagen de perfil personalizada, asignar la ruta y cargar la imagen
      profilePicture.src = `/images/uploads/${userImg}`;
  } 
  // Manejo de eventos para el botón de cambiar foto de perfil
  changePhotoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Simular el clic en el campo de selección de archivo para abrir el cuadro de diálogo
    inputProfilePicture.click();
  });
  
  
  // Manejo de eventos para la selección de archivo
  inputProfilePicture.addEventListener("change", async (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      console.log('cancele');
        // El usuario cancela subida
        return;
    }
       // Mostrar el botón "Next" para permitir al usuario continuar
      nextBtnPicture.style.display = "block";
      // Ocultar el botón "Skip" ya que se seleccionó una imagen
      skipBtnPicture.style.display = "none";
    
    try {
      const { data } = await axios.get('/api/userprofile', {
        withCredentials: true
      });
          const username = userInput.value;
          const email = data.email;
  
        // Subir la imagen seleccionada al servidor
        const formData = new FormData();
        formData.append("image", file);
        formData.append("username", username);
        formData.append("email", email);
  
        // Realizar la solicitud POST para subir la imagen al servidor
        const response = await fetch("/api/uploadFirst", {
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
  
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const selectedValues = Array.from(checkboxes).map(checkbox => checkbox.value);
  
  // console.log(selectedValues)
  
  try {
      const { data } = await axios.post('/api/userslobby', {
        username: userInput.value,
        language: languageInput.value,
        server: serverInput.value,
        dateOfBirth: dateInput.value,  
        platforms: selectedValues,
        description: descripcionInput.value  
      });
      
      window.location.pathname = `/lobby/`;
   
  } catch (error) {
     console.log(error);   
  }
 });