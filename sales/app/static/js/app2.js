'use strict';
const e = React.createElement;


const menu = document.querySelecter('#mobile-menu');
const menuLink = document.querySelector('.navbar__menu');


menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});
