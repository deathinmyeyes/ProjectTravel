document.getElementById('burger').addEventListener('click', function() { //Создаем событие по клику для элемента burger
    const wrapper = document.querySelector('.header__wrapper'); //Создаем переменную с html элементом .header__wrapper
    if (wrapper.classList.toggle('active')) {   //С помощью условия добавляем класс active элементу header__wrapper методом toggle
    document.querySelector('.contacts__block').style.marginTop = '400px' //При открытом бургер меню - делаем отступ сверху 400px элементу contacts__block
    } else {
      document.querySelector('.contacts__block').style.marginTop = '0px' //При закрытом бургер меню - делаем отступ сверху 0px элементу contacts__block
    }
    });



const modal3 = document.querySelector('#modal3'); //Создаем константу (неизменяемую переменную)
const btn3 = document.querySelector('#openModal3'); //Создаем константу (неизменяемую переменную)
const close3 = document.querySelector('#close3'); //Создаем константу (неизменяемую переменную)

btn3.onclick = function () { //Создаем функцию, которую привязываем к элементу btn3
  modal3.style.display = 'block'; //При срабатывании функции элементу modal3 устанавливается стиль display: block
};

close3.onclick = function () { //Создаем функцию, которую привязываем к элементу close3
  modal3.style.display = 'none'; //При срабатывании функции элементу modal3 устанавливается стиль display: none
};

document.getElementById('contact').addEventListener("submit", checkData); //Добавляем событие 'submit' элементу contact

function checkData() { //Создаем функцию


    const email = document.getElementById('email').value; //Создаем константу, в которую передаем элемент input, получая от него значение .value
    const name = document.getElementById('name').value; //Создаем константу, в которую передаем элемент input, получая от него значение .value
    const surname = document.getElementById('surname').value; //Создаем константу, в которую передаем элемент input, получая от него значение .value
    const message = document.getElementById('message').value; //Создаем константу, в которую передаем элемент input, получая от него значение .value
    let error = ""; //Создаем изменяемую переменную error

        if(email == '' || name == '' || surname == '' || message == '') //Если какой то из инпутов пустой - срабатывает error
            error = "Введите все данные"; //Передаем текст в переменную error
        else if (!email.includes('@') || !email.includes('.')) //Иначе если поле email не включает знаки: "@", ".", то срабатывает error
            error = "Неверный формат электронной почты"; //Передаем текст в переменную error
        else if(name.length <= 3 || name.length > 50 ) //Иначе если поле name короче 3 или длиннее 50 символов - срабатывает error
            error = "Слишком короткое или длинное имя"; //Передаем текст в переменную error
        else if(surname.length <= 3 || surname.length > 50 ) //Иначе если поле surname меньше или равно 3 символам или длиннее 50 - срабатывает error
            error = "Слишком короткая или длинная фамилия"; //Передаем текст в переменную error
        else if (message.length < 1) //Иначе если поле message по длине меньше 1 символа - срабатывает error
            error = 'Причина обращения не должна быть пустой'; //Передаем текст в переменную error

        if(error != '') { //Если переменная error НЕ пустая,
            alert(error) //То отображаем текст, который содержится в переменной error методом alert
        } else { //Иначе
            alert("Вы успешно отправили заявку на обратную связь") //Отображаем текст, об успешной отправки заявки методом alert
            window.location = '.../contacts.html'; //Делаем отображение текста на странице contacts.html
        }


}

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