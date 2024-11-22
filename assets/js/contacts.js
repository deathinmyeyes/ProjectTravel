document.getElementById('burger').addEventListener('click', function() { //Создаем событие по клику для элемента burger
    const wrapper = document.querySelector('.header__wrapper'); //Создаем переменную с html элементом .header__wrapper
    if (wrapper.classList.toggle('active')) {   //С помощью условия добавляем класс active элементу header__wrapper методом toggle
    document.querySelector('.contacts__block').style.marginTop = '400px' //При открытом бургер меню - делаем отступ сверху 270px элементу route__input-wrapper
    } else {
      document.querySelector('.contacts__block').style.marginTop = '0px' //При закрытом бургер меню - делаем отступ сверху 0px элементу route__input-wrapper
    }
    });



const modal3 = document.querySelector('#modal3');
const btn3 = document.querySelector('#openModal3');
const close3 = document.querySelector('#close3');

btn3.onclick = function () {
  modal3.style.display = 'block';
};

close3.onclick = function () {
  modal3.style.display = 'none';
};

document.getElementById('contact').addEventListener("submit", checkData);

function checkData() {


    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const message = document.getElementById('message').value;
    var error = "";

        if(email == '' || name == '' || surname == '' || message == '')
            error = "Введите все данные";
        else if (!email.includes('@') || !email.includes('.'))
            error = "Неверный формат электронной почты";
        else if(name.length <= 3 || name.length > 50 )
            error = "Слишком короткое имя";
        else if(surname.length <= 3 || surname.length > 50 )
            error = "Слишком короткая фамилия";
        else if (message.length < 1)
            error = 'Причина обращения не должна быть пустой';

        if(error != '') {
            alert(error)
        } else {
            alert("Вы успешно отправили заявку на обратную связь")
            window.location = '.../contacts.html';
        }


}




