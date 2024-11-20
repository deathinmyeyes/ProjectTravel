const burger = document.querySelector('#burger');
const openBurger = document.querySelector('#openBurger');
const closeBurger = document.querySelector('#closeBurger');

openBurger.onclick = function () {
  burger.style.display = 'block';
  openBurger.style.display = 'none';
};

closeBurger.onclick = function () {
  burger.style.display = 'none';
  closeBurger.style.display = 'none';
};

window.onclick = function (event) {
    if (burger.style.display == 'block')
        closeBurger.style.display = 'block'
        openBurger.style.display = 'none'
    if (closeBurger.style.display == 'none')
        openBurger.style.display = 'block'
}

if (burger.style.display == 'none') {
    openBurger.style.display == 'block'
  }