const menuToggle = document.querySelector('.menu-toggle');
const navUL = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navUL.classList.toggle('active');
});
