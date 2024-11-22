document.getElementById('burger').addEventListener('click', function() { //Создаем событие по клику для элемента burger
  const wrapper = document.querySelector('.header__wrapper'); //Создаем переменную с html элементом .header__wrapper
  if (wrapper.classList.toggle('active')) {   //С помощью условия добавляем класс active элементу header__wrapper методом toggle
  document.querySelector('.main__wrapper').style.marginTop = '270px' //При открытом бургер меню - делаем отступ сверху 270px элементу route__input-wrapper
  } else {
    document.querySelector('.main__wrapper').style.marginTop = '0px' //При закрытом бургер меню - делаем отступ сверху 0px элементу route__input-wrapper
  }
  });

const modal1 = document.querySelector('#modal1');
const btn1 = document.querySelector('#openModal1');
const close1 = document.querySelector('#close1');

btn1.onclick = function () {
  modal1.style.display = 'block';
};

close1.onclick = function () {
  modal1.style.display = 'none';
};



const modal2 = document.querySelector('#modal2');
const btn2 = document.querySelector('#openModal2');
const close2 = document.querySelector('#close2');

btn2.onclick = function () {
  modal2.style.display = 'block';
};

close2.onclick = function () {
  modal2.style.display = 'none';
};


const slider = document.querySelector('.main__slider');
const prevButton = document.querySelector('.main__prev-button');
const nextButton = document.querySelector('.main__next-button');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
let slideIndex = 0;

prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

updateSlider();
