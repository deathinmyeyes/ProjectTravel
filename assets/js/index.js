window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.getElementById('change_theme').classList.add('dark');
    document.getElementById('style_link').setAttribute('href', './css/style_dark.css');
  } else {
    document.getElementById('change_theme').classList.remove('dark');
    document.getElementById('style_link').setAttribute('href', './css/style.css');
  }
});

document.getElementById('change_theme').addEventListener('click', () => {
  const themeButton = document.getElementById('change_theme');
  const styleLink = document.getElementById('style_link');

  themeButton.classList.toggle('dark');

  if (themeButton.classList.contains('dark')) {
    styleLink.setAttribute('href', './css/style_dark.css');
    localStorage.setItem('theme', 'dark'); 
  } else {
    styleLink.setAttribute('href', './css/style.css');
    localStorage.setItem('theme', 'light'); 
  }
});

document.getElementById('burger').addEventListener('click', function() { //Создаем событие по клику для элемента burger
  const wrapper = document.querySelector('.header__wrapper'); //Создаем переменную с html элементом .header__wrapper
  if (wrapper.classList.toggle('active')) {   //С помощью условия добавляем класс active элементу header__wrapper методом toggle
  document.querySelector('.main__wrapper').style.marginTop = '270px' //При открытом бургер меню - делаем отступ сверху 270px элементу main__wrapper
  } else {
    document.querySelector('.main__wrapper').style.marginTop = '0px' //При закрытом бургер меню - делаем отступ сверху 0px элементу main__wrapper
  }
  });

const modal1 = document.querySelector('#modal1'); //Создаем константу (неизменяемую переменную)
const btn1 = document.querySelector('#openModal1'); //Создаем константу (неизменяемую переменную)
const close1 = document.querySelector('#close1'); //Создаем константу (неизменяемую переменную)

btn1.onclick = function () { //Привязываем функцию к элементу btn1
  modal1.style.display = 'block'; //Если функция срабатывает - то modal1 принимает стиль display: block
  document.getElementById('footer').style.marginTop = '150px'
};

close1.onclick = function () { //Привязываем функцию к элементу close1
  modal1.style.display = 'none'; //Если функция срабатывает - то modal1 принимает стиль display: none
  document.getElementById('footer').style.marginTop = '1270px'
};



const modal2 = document.querySelector('#modal2'); //Создаем константу (неизменяемую переменную)
const btn2 = document.querySelector('#openModal2'); //Создаем константу (неизменяемую переменную)
const close2 = document.querySelector('#close2'); //Создаем константу (неизменяемую переменную)

btn2.onclick = function () { //Привязываем функцию к элементу btn2
  modal2.style.display = 'block'; //Если функция срабатывает - то modal2 принимает стиль display: block
  document.getElementById('footer').style.marginTop = '150px'
};

close2.onclick = function () { //Привязываем функцию к элементу close2
  modal2.style.display = 'none'; //Если функция срабатывает - то modal2 принимает стиль display: none
  document.getElementById('footer').style.marginTop = '1270px'
};


const slider = document.querySelector('.main__slider'); //Создаем константу (неизменяемую переменную)
const prevButton = document.querySelector('.main__prev-button'); //Создаем константу (неизменяемую переменную)
const nextButton = document.querySelector('.main__next-button'); //Создаем константу (неизменяемую переменную)
const slides = Array.from(slider.querySelectorAll('img')); //Создаем константу (неизменяемую переменную), в которой содержится массив с элементами img из hmtl
const slideCount = slides.length; //Создаем счетчик, который считает количество слайдов
let slideIndex = 0; //Создаем константу, которая является точкой отсчета и показом соответствующего элемента

prevButton.addEventListener('click', showPreviousSlide); //Кнопке prevButton добавляем событие по клику, которое вызывает функцию showPreviousSlide
nextButton.addEventListener('click', showNextSlide); //Кнопке nextButton добавляем событие по клику, которое вызывает функцию showNextSlide

function showPreviousSlide() { //Создаем функицю
  slideIndex = (slideIndex - 1 + slideCount) % slideCount; //В переменную slideIndex помещаем значение, которое равно (slideIndex - 1 + slideCount) % slideCount
  updateSlider(); //Вызываем функцию обновления слайдера
}

function showNextSlide() { //Создаем функицю
  slideIndex = (slideIndex + 1) % slideCount; //В переменную slideIndex помещаем значение, которое равно (slideIndex + 1) % slideCount
  updateSlider(); //Вызываем функцию обновления слайдера
}

function updateSlider() { //Создаем функицю
  slides.forEach((slide, index) => { //В массиве slides перебираем все элементы методом forEach
    if (index === slideIndex) { //Если index строго равен slideIndex, тогда 
      slide.style.display = 'block'; //Картинке (slide) добавляем стиль display: block
    } else { //Иначе
      slide.style.display = 'none'; //Картинке (slide) добавляем стиль display: none
    }
  });
}

updateSlider(); //Вызываем функцию
