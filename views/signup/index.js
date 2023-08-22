import { createNotification } from "../components/notification.js"

const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');
// Obtén una referencia al elemento del spinner
const spinner = document.querySelector('#spinner-container');
const button = document.getElementById('button-text');

// Regex Validation

const EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;

// Validations 

let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;

function spinnerShow() {
    button.innerHTML = '';
    spinner.style.display = 'flex';
  }
  
  function spinnerHidden() {
    spinner.style.display = 'none';
    button.innerHTML = 'Registrar';
  }

const validation = (input, regexValidation) => {
    formBtn.disabled = emailValidation && passwordValidation && matchValidation ? false : true;
    
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

// Events

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation)
});

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

form.addEventListener('submit', async e => {
 e.preventDefault();
 
 try {
    spinnerShow();
    const newUser = {
        email: emailInput.value.toLowerCase(),
        password: passwordInput.value,
     }
     const { data } = await axios.post('/api/users', newUser);
     createNotification(false, data)
    setTimeout(() => {
        notification.innerHTML = '';
    }, 5000)
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    matchInput.value = '';
    validation(nameInput, false)
    validation(emailInput, false)
    validation(passwordInput, false)
    validation(matchInput, false)
    spinnerHidden();
 } catch (error) {
    spinnerHidden();
    createNotification(true, error.response.data.error)
    setTimeout(() => {
        notification.innerHTML = '';
    }, 5000);    
 }
});