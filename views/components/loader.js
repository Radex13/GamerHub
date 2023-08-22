// Mostrar el loader
export function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  document.body.appendChild(loader);
}

// Ocultar el loader
export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}
