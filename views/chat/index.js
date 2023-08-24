import { createChatProfile, selectChat, messagesOnline } from "../components/chatting.js"
const socket = io()

document.addEventListener('DOMContentLoaded', async () => {
  const responseUserid = await axios.patch('/api/userslobby');
  socket.emit('setUserId', responseUserid.data);
  const chatsContent = document.getElementById('select-content');
  const chatLoading = document.getElementById('select-loading')
  const responseInvitation = await axios.get('/api/invitations/chat');
  const pendingInvitations = responseInvitation.data.filter(invitation => invitation.status === 'accepted');
  const findId = await axios.patch('/api/userslobby');
  const myUser = findId.data;

  pendingInvitations.forEach(async chat => {
    let userSend = chat.senderuser;
    if (userSend === myUser) {
      userSend = chat.recipientuser;
    }
    const user = await axios.put('/api/userprofile', { userSend });
    const userData = user.data;
    const chatItem = document.createElement('div');
    chatItem.id = userSend;
    chatItem.setAttribute('class', 'p-2 cursor-pointer chat-item');
    chatLoading.classList.add('fadeInn');
    setTimeout(() => {
      chatLoading.classList.remove('flex');
      chatLoading.classList.add('hidden');
      chatItem.innerHTML = createChatProfile(userData);
      chatsContent.classList.remove('hidden');
      chatsContent.classList.add('flex');
      chatsContent.appendChild(chatItem);
    }, 1000);
    selectChat(socket);
  });

  socket.on('newMessage', (data) => {
    console.log(data);
    messagesOnline(data)
    });
});
