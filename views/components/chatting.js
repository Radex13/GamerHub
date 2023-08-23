export const createChatProfile = (userData) => {
            // Obtener el nombre del archivo de la imagen (ejemplo: profile-default.svg)
  const imgFilename = userData.img.split('/').pop();
  // Comprobar si el archivo se encuentra en la carpeta "uploads"
  let imgSrc;
  if (imgFilename === 'profile-default.svg') {
    // Si la imagen es "profile-default.svg", cargar una imagen predeterminada
    imgSrc = '/images/profile-default.svg'; // Ruta de la imagen predeterminada
  } else {
    // Si la imagen está en la carpeta "uploads", cargar normalmente
    imgSrc = `/images/uploads/${imgFilename}`;
  }
    return `
    <span id="ping-${userData.id}" class="absolute hidden h-4 w-4">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
    </span>
    <img class="rounded-full h-auto pointer-events-none w-auto sm:h-28 sm:w-28 md:h-24 md:w-24" src="${imgSrc}" alt="">
    `
}

let chatNow = [];

export function selectChat(socket) {
    function scrollToBottom(chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    try {
        const selectContain = document.getElementById('select-content');
        const chatsItems = selectContain.querySelectorAll('.chat-item');

        for (const chatItem of chatsItems) {
            const addButton = document.getElementById(`${chatItem.id}`);
            addButton.addEventListener('click', async () => {
                const chatContent = document.getElementById('chat-container')
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

                chatUserItem.setAttribute('class', 'h-full flex-col justify-between flex');
                chatUserItem.innerHTML = `
                <div id="chat-bar" class="flex flex-col justify-center items-center p-2">
                <span class="text-base">${user.username}</span>
                <span class="text-xs">Activo(a) hace 3 min</span>
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