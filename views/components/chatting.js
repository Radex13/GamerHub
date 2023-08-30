function isMobile() {
    return window.innerWidth < 640;
  }  

  export const createChatProfile = (userData) => {
    const imgFilename = userData.img;
    const imgSrc = `/images/uploads/${imgFilename}`
    const defaultImgSrc = '/images/profile-default.svg';
  
    // Función para cargar los mensajes y para colocar el ultimo mensaje y colocar la ultima fecha del mensaje
    const loadMessages = async (idToUser) => {
        try {
          const createMyMessages = await axios.put(`/api/messages`, { idToUser });
          const myMessages = createMyMessages.data;
          const createTheMessages = await axios.patch(`/api/messages`, { idToUser });
          const theMessages = createTheMessages.data;
      
          theMessages.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
          myMessages.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
      
          const combinedMessages = [...theMessages, ...myMessages];
          combinedMessages.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
          const lastMessage = combinedMessages[combinedMessages.length - 1];
          
          const now = new Date();
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
      
          const millisecondsPerDay = 24 * 60 * 60 * 1000;
          const millisecondsPerMonth = 30 * millisecondsPerDay;
      
          let messageText = 'No hay mensajes';
          let timeString = '';
      
          if (lastMessage) {
            const messageDate = new Date(lastMessage.createdat);
            const formattedTime = messageDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            if (messageDate.toDateString() === now.toDateString()) {
              timeString = `${formattedTime}`;
            } else if (messageDate.toDateString() === yesterday.toDateString()) {
              timeString = 'ayer';
            } else if (now - messageDate < millisecondsPerMonth) {
              const daysAgo = Math.floor((now - messageDate) / millisecondsPerDay);
              timeString = `${daysAgo} d`;
            } else if (now - messageDate < millisecondsPerMonth * 2) {
              timeString = '1 mes';
            } else {
              const monthsAgo = Math.floor((now - messageDate) / millisecondsPerMonth);
              timeString = `${monthsAgo} meses`;
            }
      
            messageText = lastMessage.text;
          }
          const littleInfo = document.getElementById(`little-info-${userData.id}`);

          return littleInfo.innerHTML = `
            <span class="truncate text-center text-xs">${messageText}</span>
            ${messageText && timeString ? '<span class="text-xs"> - </span>' : ''}
            <span class="flex text-xs text-center justify-center items-center whitespace-nowrap">${timeString}</span>`;
        } catch (error) {
          console.log(error);
          const message = 'no hay mensajes';
          return message;
        }
      };
      
    // Obtener idToUser desde userData
    const idToUser = userData.id;
    let lastMessage;
    // Intentamos cargar la imagen
    fetch(imgSrc)
      .then(async (response) => {
        // Resto de tu código para manejar la respuesta del fetch
        const message = await loadMessages(idToUser);
        lastMessage = message
        // Si la respuesta tiene un código 404, usamos la imagen predeterminada
        if (response.ok === true) {
          document.getElementById(`default-img-${userData.username}`).classList.add('hidden');
          document.getElementById(`img-content-${userData.id}`).innerHTML = `
            <img class="rounded-full h-auto pointer-events-none w-auto sm:h-20 sm:w-20 md:h-12 md:w-12" src="${imgSrc}" alt="photo-profile">
          `;
        }
      });
    return `
      <div class="outline outline-4 outline-blue-600 rounded-full max-h-[4rem] max-w-[4rem] sm:max-h-[5rem] sm:max-w-[5rem] md:min-h-[3rem] md:min-w-[3rem]">
          <span id="ping-${userData.id}" class="absolute hidden h-4 w-4">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </span>
          <div id="img-content-${userData.id}">
              <img id="default-img-${userData.username}" class="rounded-full h-auto pointer-events-none w-auto sm:h-20 sm:w-20 md:h-12 md:w-12" src="${defaultImgSrc}" alt="photo-profile">
          </div>    
      </div>
      <div class="flex flex-col justify-center items-start min-w-[2rem] sm:hidden md:flex md:min-w-[1rem]">
          <span class="font-bold">${userData.username}</span>
          <div id="little-info-${userData.id}" class="flex gap-2 w-full">
              <span class="truncate text-center text-xs">${lastMessage ? lastMessage.text : 'No hay mensajes'}</span>
              <span class="flex text-xs text-center justify-center items-center">${lastMessage ? lastMessage.createdat : ''}</span>
          </div>
      </div>
      `;
  };
  

let chatNow = [];
let chatActive;
let chatSelected = ''

export function selectChat(socket) {
    function scrollToBottom(chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    try {
        const selectContain = document.getElementById('select-content');
        const selectUser = document.getElementById('select-user');
        const chatsItems = selectContain.querySelectorAll('.chat-item');

        for (const chatItem of chatsItems) {
            const addButton = document.getElementById(`${chatItem.id}`);
            addButton.addEventListener('click', async () => {
                if (chatSelected === '') {
                    chatSelected = addButton
                    addButton.classList.remove('hover:bg-gray-600')
                    addButton.classList.add('bg-gray-800');
                } else if (chatSelected !== addButton) {
                    chatSelected.classList.remove('bg-gray-800')
                    chatSelected.classList.add('hover:bg-gray-600')
                    addButton.classList.remove('hover:bg-gray-600')
                    addButton.classList.add('bg-gray-800');
                    chatSelected = addButton
                }
                
                const chatContent = document.getElementById('chat-container')
                if (isMobile()) {
                    selectUser.style.display = 'none';
                    chatContent.style.display = 'flex';
                  }
                chatContent.innerHTML = ''
                const loadin = document.createElement('div');
                loadin.setAttribute('class', 'flex h-full flex-col p-2 items-center justify-center');
                loadin.id = 'chat-container-loading'
                loadin.innerHTML = `
                <div class="flex flex-col justify-center items-center">
                    <div class="spinnerxl"></div>
                </div>
                `
                chatContent.appendChild(loadin)
                const pingOn = document.getElementById(`ping-${addButton.id}`)
                pingOn.classList.remove('flex')
                pingOn.classList.add('hidden')
                if (chatNow.length > 0) {
                    chatNow = [];
                    chatNow = addButton; // Reemplazar el contenido de chatNow con addButton
                } else {
                    chatNow = addButton; // Agregar contenido de addButton a chatNow
                }
                // console.log('chatNow da:',chatNow);
                const userSend = addButton.id
                const idToUser = userSend
                const dataUser = await axios.put('/api/userprofile', { userSend });
                const createMyMessages = await axios.put(`/api/messages`, { idToUser });
                const myMessages = createMyMessages.data;
                const createTheMessages = await axios.patch(`/api/messages`, { idToUser });
                const theMessages = createTheMessages.data;
                const user = dataUser.data
                chatContent.innerHTML = ''
                const chatUserItem = document.createElement('div');
                chatUserItem.id = `chat-user-${userSend}`

                if (user.onlineNow === true) {
                    chatActive = ''
                    chatActive = 'Activ@ ahora'
                } else {
                    function formatTimeDifference(lastActive) {
                        const currentDate = new Date();
                        const lastActiveDate = new Date(lastActive);
                        const differenceInMilliseconds = currentDate - lastActiveDate;
                      
                        const millisecondsPerSecond = 1000;
                        const millisecondsPerMinute = 60 * millisecondsPerSecond;
                        const millisecondsPerHour = 60 * millisecondsPerMinute;
                        const millisecondsPerDay = 24 * millisecondsPerHour;
                        const millisecondsPerMonth = 30 * millisecondsPerDay;
                      
                        if (differenceInMilliseconds < millisecondsPerHour) {
                          if (differenceInMilliseconds < millisecondsPerMinute) {
                            const seconds = Math.floor(differenceInMilliseconds / millisecondsPerSecond);
                            return `Activ@ hace: ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
                          } else {
                            const minutes = Math.floor(differenceInMilliseconds / millisecondsPerMinute);
                            return `Activ@ hace: ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
                          }
                        } else if (differenceInMilliseconds < millisecondsPerDay) {
                          const hours = Math.floor(differenceInMilliseconds / millisecondsPerHour);
                          return `última vez activ@: hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
                        } else if (differenceInMilliseconds < millisecondsPerMonth) {
                          const days = Math.floor(differenceInMilliseconds / millisecondsPerDay);
                          return `última vez activ@: hace ${days} ${days === 1 ? 'día' : 'días'}`;
                        } else if (differenceInMilliseconds < millisecondsPerMonth * 12) {
                          const months = Math.floor(differenceInMilliseconds / millisecondsPerMonth);
                          return `última vez activ@: hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
                        } else {
                          return `última vez activ@: hace más de 1 año`;
                        }
                      }                      
                      const lastActive = user.lastOnline;
                      chatActive = ''
                      chatActive = formatTimeDifference(lastActive);
                }
                chatUserItem.setAttribute('class', 'h-full flex-col justify-between flex');
                chatUserItem.innerHTML = `
                <div id="chat-bar" class="flex p-2">
                    <div id="button-back" class="cursor-pointer flex justify-center items-center sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pointer-events-none">
                            <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <div class="flex flex-col ml-auto mr-auto">
                        <span class="text-base justify-center flex">${user.username}</span>
                        <span class="text-xs justify-center flex">${chatActive}</span>
                    </div>
                </div>

                <div id="chat" class="flex h-full w-full bg-zinc-600 p-4 flex-col gap-3 overflow-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-zinc-600">
                </div>

                <div id="chat-tooltip" class="p-2 flex justify-center items-center gap-3">
                    <input 
                    id="chat-write"
                    placeholder="Escribe aqui..."
                    type="text" 
                    class="bg-zinc-800 w-4/5 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-indigo-700">
                    <button id="send-message" class="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pointer-events-none">
                            <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>                      
                    </button>
                </div>
                `
                chatContent.appendChild(chatUserItem);
                // Ordenar los theMessages y myMessages por fecha de creación de manera descendente (más recientes primero)
                theMessages.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
                myMessages.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
                // Combina los arrays ordenados de theMessages y myMessages
                const combinedMessages = [...theMessages, ...myMessages];
                combinedMessages.sort((a, b) => new Date(a.createdat) - new Date(b.createdat));
                // console.log('los combinados dan', combinedMessages);
                // Recorre el array combinado y pinta los mensajes en el contenedor de chat
                combinedMessages.forEach(message => {
                const messageItem = document.createElement('div');
                messageItem.id = 'message-item';
                // Verifica si el mensaje es de "the messages" o "my messages" y aplica la clase correspondiente
                if (theMessages.some(theMessage => theMessage.id === message.id)) {
                    messageItem.setAttribute('class', 'flex justify-start items-start mr-8');
                    messageItem.innerHTML = `
                    <div class="bg-slate-500 p-2 rounded-lg max-w-sm min-w-[0.5rem]">
                        <p class="break-words">${message.text}</p>
                    </div>
                `;
                } else if (myMessages.some(myMessage => myMessage.id === message.id)) {
                    messageItem.setAttribute('class', 'flex justify-end items-start ml-8');
                    messageItem.innerHTML = `
                        <div class="bg-blue-500 p-2 rounded-lg max-w-sm min-w-[0.5rem]">
                            <p class="break-words">${message.text}</p>
                        </div>
                    `
                }

                const contentOpenChat = document.getElementById('chat');
                contentOpenChat.appendChild(messageItem);
                scrollToBottom(contentOpenChat);
                });
                
                const inputWrite = document.getElementById('chat-write');
                const sendMessageBtn = document.getElementById('send-message')
                const backBtn = document.getElementById('button-back')

                backBtn.addEventListener('click', () => {
                    chatContent.style.display = 'none';
                    selectUser.style.display = 'flex';
                })                

                inputWrite.addEventListener('input', () => {
                    const messageInput = inputWrite.value
                });

                inputWrite.addEventListener('keyup', function(event) {
                    if (event.key === 'Enter') {
                        // Simular un clic en el botón cuando se presiona "Enter"
                        sendMessageBtn.click();
                    }
                });

                sendMessageBtn.addEventListener('click', async () => {
                    const contentOpenChat = document.getElementById('chat')
                    if (inputWrite.value === '') {
                        sendMessageBtn.classList.add('shake');
                        setTimeout(() => {
                            sendMessageBtn.classList.remove('shake');
                        }, 500);
                    } else {
                        const text = inputWrite.value;
                        inputWrite.value = '';
                        const myMessageItem = document.createElement('div');
                        myMessageItem.id = 'your-messages'
                        myMessageItem.setAttribute('class', 'flex justify-end items-start');
                        myMessageItem.innerHTML = `
                        <div class="bg-blue-500 p-2 rounded-lg max-w-sm min-w-[0.5rem]">
                            <p class="break-words">${text}</p>
                        </div>
                        `
                        const touser = userSend
                        contentOpenChat.appendChild(myMessageItem);
                        scrollToBottom(contentOpenChat);
                        const createMessage = await axios.post(`/api/messages`, { text, touser });
                        const myUser = await axios.patch('/api/userslobby');
                        socket.emit('myMessage', {
                            message: text,
                            userIdTo: touser,
                            userIdFrom: myUser.data
                        })
                        console.log(createMessage);
                        console.log(text);
                    }
                });
            });
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export function messagesOnline(data) {
    const chatWho = chatNow
    if (data.userIdFrom === chatWho.id) {
        function scrollToBottom(chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        const theMessageItem = document.createElement('div');
        theMessageItem.id = 'enter-messages';
        theMessageItem.setAttribute('class', 'flex justify-start items-start mr-8')
        theMessageItem.innerHTML = `
            <div class="bg-slate-500 p-2 rounded-lg max-w-sm min-w-[0.5rem]">
                <p class="break-words">${data.message}</p>
            </div>
        `
        const contentOpenChat = document.getElementById('chat')
        contentOpenChat.appendChild(theMessageItem)
        scrollToBottom(contentOpenChat);
    } else {
        const ping = document.getElementById(`ping-${data.userIdFrom}`)
        ping.classList.remove('hidden')
        ping.classList.add('flex')
    }
}