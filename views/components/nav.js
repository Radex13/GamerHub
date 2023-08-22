const navbar = document.querySelector('#navbar');

const createHomeNav = () => {
  // como agregar clases en tailwind

  // const div = document.createElement('nav');
  // nav.classList.add('backdrop-blur-sm', 'dark:bg-zinc-800', 'border-b-2', 'border-zinc-50', 'fixed', 'top-0', 'left-0', 'right-0', 'h-[5rem]')
  navbar.innerHTML = `
    <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
        <img src="/images/GamerhubWhite.svg" alt="GamerHub" class="h-9">
        <div class="flex gap-4">
          <button></button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-zinc-50 md:hidden">
            <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div class="hidden md:flex gap-4">
            <a href="/signup/" class="bg-indigo-700 dark:bg-indigo-300 text-white dark:text-zinc-700 uppercase font-bold px-4 py-2 rounded-lg hover:bg-indigo-800 dark:hover:bg-indigo-200 transition-all">Registro</a>
            <a href="/login/" class="text-zinc-700 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">Login</a>
          </div>
        </div>
        <div class="bg-zinc-100 dark:bg-zinc-700 p-4 fixed h-screen top-20 w-0 bottom-0 -right-12 transition-all">
      <div class="gap-4 flex-col text-center hidden">
        <a href="/signup/" class="bg-indigo-700 dark:bg-indigo-300 text-white dark:text-zinc-700 uppercase font-bold px-4 py-2 rounded-lg hover:bg-indigo-800 dark:hover:bg-indigo-200 transition-all">Registro</a>
        <a href="/login/" class="text-zinc-700 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">Login</a>
      </div>
    </div>
      </div>
    `
}

const createSignupNav = () => {
  // como agregar clases en tailwind

  // const div = document.createElement('nav');
  // nav.classList.add('backdrop-blur-sm', 'dark:bg-zinc-800', 'border-b-2', 'border-zinc-50', 'fixed', 'top-0', 'left-0', 'right-0', 'h-[5rem]')
  navbar.innerHTML = `
  <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
      <img src="/images/GamerhubWhite.svg" alt="GamerHub" class="h-9">

      <div class="flex gap-4">
        <button></button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-zinc-50 md:hidden">
          <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div class="hidden md:flex gap-4">
          <a href="/login/" class="text-zinc-700 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">Login</a>
        </div>
      </div>
      <div class="bg-zinc-100 dark:bg-zinc-700 p-4 fixed h-screen top-20 w-0 bottom-0 -right-12 transition-all">
    <div class="gap-4 flex-col text-center hidden">
      <a href="/login/" class="text-zinc-700 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">Login</a>
    </div>
  </div>
    </div>
  `
}

const createLoginNav = () => {
  // como agregar clases en tailwind

  // const div = document.createElement('nav');
  // nav.classList.add('backdrop-blur-sm', 'dark:bg-zinc-800', 'border-b-2', 'border-zinc-50', 'fixed', 'top-0', 'left-0', 'right-0', 'h-[5rem]')
  navbar.innerHTML = `
  <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
   <img src="/images/GamerhubWhite.svg" alt="GamerHub" class="h-9">

      <div class="flex gap-4">
        <button></button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-zinc-50 md:hidden">
          <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div class="hidden md:flex gap-4">
          <a href="/signup/" class="text-zinc-700 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">Registro</a>
        </div>
      </div>
      <div class="bg-zinc-100 dark:bg-zinc-700 p-4 fixed h-screen top-20 w-0 bottom-0 -right-12 transition-all">
    <div class="gap-4 flex-col text-center hidden">
      <a href="/signup/" class="text-zinc-700 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">Registro</a>
    </div>
  </div>
    </div>
  `
}

const createLoginLobby = () => {
  navbar.innerHTML = `
  <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
  <img src="/images/GamerhubWhite.svg" alt="GamerHub" class="h-6 pr-2">

  <div class="relative flex gap-2" style="margin-left: auto;">
  <button id="chat-btn" class="text-white">
    <div class="hidden h-4 w-4 pointer-events-none rounded-3xl bg-red-500 justify-center items-center absolute bottom-5 left-3">
      <span class="pointer-events-none">6</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pointer-events-none h-6 w-6">
      <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  </button>
  <button id="invitations-btn" class="text-white">
    <div class="h-4 w-4 hidden pointer-events-none rounded-3xl bg-red-500 justify-center items-center absolute bottom-5 left-11">
      <span id="invitations-number" class="pointer-events-none">6</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pointer-events-none h-6 w-6">
      <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  </button>
</div>
      <div class="flex gap-2">
        <button></button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-50">
          <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      
      <div class=" bg-zinc-700 dark:bg-zinc-700 p-4 fixed h-screen top-20 w-0 bottom-0 -right-12 transition-all">
    <div class="gap-4 flex-col text-center">
      <button id="profile-btn" class="text-zinc-100 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-all">Perfil</button>
      <button id="close-btn" class="text-zinc-100 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-all">Cerrar sesion</button>
    </div>
  </div>
  <div id="invitations" class="bg-[#2e2d2d] pb-24 dark:bg-[#2e2d2d] px-4 pt-4 fixed h-screen top-20 w-0 bottom-0 -right-12 transition-all opacity-0 overflow-auto scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-blue-800">
    <div id="invitations-content" class="gap-4 flex-col text-center hidden">
      <h2 class="text-white font-bold">Invitaciones</h2>

    </div>
  </div>
    </div>
  `
}

const createProfileNav = () => {
  navbar.innerHTML = `
  <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
  <img src="/images/GamerhubWhite.svg" alt="GamerHub" class="h-6">

      <div class="flex gap-4">
        <button></button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-50">
          <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

      </div>
      <div class=" bg-zinc-700 dark:bg-zinc-700 p-4 fixed z-50 h-screen top-20 w-0 bottom-0 -right-12  transition-all">
    <div class="gap-4 flex-col text-center z-50">
      <button id="gamers-btn" class="text-zinc-100 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-all">Gamers</button>
      <button id="close-btn" class="text-zinc-100 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-all">Cerrar sesion</button>
    </div>
  </div>
    </div>
  `
}

const createChatNav = () => {
  navbar.innerHTML = `
  <div class="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
  <img src="/images/GamerhubWhite.svg" alt="GamerHub" class="h-6">

      <div class="flex gap-4">
        <button></button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-zinc-50">
          <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

      </div>
      <div class=" bg-zinc-700 dark:bg-zinc-700 p-4 fixed z-50 h-screen top-20 w-0 bottom-0 -right-12  transition-all">
    <div class="gap-4 flex-col text-center z-50">
      <button id="gamers-btn" class="text-zinc-100 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-all">Gamers</button>
      <button id="profile-btn" class="text-zinc-100 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-all">Perfil</button>
      <button id="close-btn" class="text-zinc-100 dark:text-zinc-100 uppercase font-bold px-4 py-2 rounded-lg hover:bg-zinc-600 dark:hover:bg-zinc-600 transition-all">Cerrar sesion</button>
    </div>
  </div>
    </div>
  `
}


if (window.location.pathname === '/') {
  createHomeNav();
} else if (window.location.pathname === '/signup/') {
  createSignupNav();
} else if (window.location.pathname === '/login/') {
  createLoginNav();
} else if (window.location.pathname === '/lobby/') {
  createLoginLobby();
} else if (window.location.pathname === '/profile/') {
  createProfileNav();
} else if (window.location.pathname === '/chat/') {
  createChatNav(); 
}
if (window.location.pathname === '/lobby/') {
  const navBtn = navbar.children[0].children[2];
  const invitationBtn = navbar.children[0].children[1].children[1];
  // console.log(invitationBtn);
  navBtn.addEventListener('click', e => {
    // console.log(navbar.children[0].children[1]);
    const sidebar = e.target.parentElement.parentElement.children[3];
    const sidebarInvite = e.target.parentElement.parentElement.children[4];
    // console.log(sidebar);
    const buttons = sidebar.children[0];
    const buttonsInvite = sidebarInvite.children[0]
    if (sidebar.classList.contains('-right-12')) {
      sidebarInvite.classList.add('-right-12', 'w-0');
      sidebarInvite.classList.remove('right-0', 'w-7/12')
      buttonsInvite.classList.add('hidden')
      buttonsInvite.classList.remove('flex')
      sidebar.classList.remove('-right-12', 'w-0');
      sidebar.classList.add('right-0', 'w-7/12')
      buttons.classList.remove('hidden')
      buttons.classList.add('flex')
    } else {
      sidebar.classList.add('-right-12', 'w-0');
      sidebar.classList.remove('right-0', 'w-7/12')
      buttons.classList.add('hidden')
      buttons.classList.remove('flex')
    }
  });
  invitationBtn.addEventListener('click', e => {
    // console.log(navbar.children[0].children[1]);
    const sidebar = e.target.parentElement.parentElement.children[4];
    const sidebarConfig = e.target.parentElement.parentElement.children[3];
    const buttons = sidebar.children[0];
    const buttonsConfig = sidebarConfig.children[0]
    if (sidebar.classList.contains('-right-12')) {
      sidebarConfig.classList.add('-right-12', 'w-0');
      sidebarConfig.classList.remove('right-0', 'w-7/12')
      buttonsConfig.classList.add('hidden')
      buttonsConfig.classList.remove('flex')
      sidebar.classList.remove('opacity-0')
      sidebar.classList.remove('-right-12', 'w-0');
      sidebar.classList.add('right-0', 'w-7/12')
      buttons.classList.remove('hidden')
      buttons.classList.add('flex')
    } else {
      sidebar.classList.add('-right-12', 'w-0');
      sidebar.classList.remove('right-0', 'w-7/12')
      buttons.classList.add('hidden')
      sidebar.classList.add('opacity-0')
      buttons.classList.remove('flex')
    }
  });
} else {
  const navBtn = navbar.children[0].children[1];
  navBtn.addEventListener('click', e => {
    // console.log(navbar.children[0].children[1]);
    const sidebar = e.target.parentElement.parentElement.children[2];
    // console.log(sidebar);
    const buttons = sidebar.children[0];
    if (sidebar.classList.contains('-right-12')) {
      sidebar.classList.remove('-right-12', 'w-0');
      sidebar.classList.add('right-0', 'w-7/12')
      buttons.classList.remove('hidden')
      buttons.classList.add('flex')
    } else {
      sidebar.classList.add('-right-12', 'w-0');
      sidebar.classList.remove('right-0', 'w-7/12')
      buttons.classList.add('hidden')
      buttons.classList.remove('flex')
    }
  });
}

const redirectToLogin = () => {
  if (window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
}

navbar.addEventListener('click', async e => {
  const target = e.target;
  
  if (target.id === 'gamers-btn') {
    try {
      window.location.pathname = '/lobby';
    } catch (error) {
      console.log(error);
    }
  } else if (target.id === 'profile-btn') {
    try {
      window.location.pathname = '/profile';
    } catch (error) {
      console.log(error);
    }
  } else if (target.id === 'chat-btn') {
    try {
      window.location.pathname = '/chat';
    } catch (error) {
      console.log(error);
    }
  }
   else if (target.id === 'close-btn') {
    try {
      await axios.get('/api/logout');
      window.location.pathname = '/login';
      window.location.replace('/login');
    } catch (error) {
      console.log(error);
    }
  }
});

// const btngamers = document.querySelector('#gamers-btn');

// const gamersBtn = navbar.children[0].children[2].children[0].children[0];
// const closeBtnMobile = navbar.children[0].children[2].children[0].children[1];
// const profileBtn = navbar.children[0].children[2].children[0].children[0];
// // const closeBtnDesktop = navbar.children[0].children[1].children[2];

// profileBtn.addEventListener('click', async e => {
//   try {
//     window.location.pathname = '/profile';
//   } catch (error) {
//     console.log(error);
//   }
// });

// btngamers.addEventListener('click', async e => {
//   try {
//     window.location.pathname = '/lobby';
//   } catch (error) {
//     console.log('.');
//   }
// });

// closeBtnMobile.addEventListener('click', async e => {
//   try {
//     await axios.get('/api/logout');
//     window.location.pathname = '/login';
//   } catch (error) {
//     console.log(error);
//   }
// });

// closeBtnDesktop.addEventListener('click', async e => {
//   console.log(navbar.children[0].children[1].children[0]);
//   const button = e.target;
//   // const spinner = button.querySelector('#spinner-container-close');
//   try {
//     // spinner.style.display = 'flex';
//     // button.querySelector('span').textContent = '';
//     await axios.get('/api/logout');
//     window.location.pathname = '/login';
//     window.history.replaceState({}, '', '/login');
//   } catch (error) {
//     // spinner.style.display = 'none';
//     // button.querySelector('span').textContent = 'Cerrar sesion';
//     console.log(error);
//   }
// })