document.getElementById('registration').addEventListener("submit", checkData); //Элементу по айди добавляем событие "Submit", при срабатывании которого вызывается функция CheckData

function checkData() { //Создаем функцию


    const email = document.getElementById('email').value; //Создаем неизменяемую переменную, в которые передаем значение из input полей
    const name = document.getElementById('name').value; //Создаем неизменяемую переменную, в которые передаем значение из input полей
    const password = document.getElementById('password').value; //Создаем неизменяемую переменную, в которые передаем значение из input полей
    const repassword = document.getElementById('repassword').value; //Создаем неизменяемую переменную, в которые передаем значение из input полей
    const password_with_out_space = password.replaceAll(' ', '') //Создаем переменную, в которую передаем данные из поля password, где все пробелы меняем на ''

    let error = ""; //Создаем изменяемую переменную error

    if(email == '' ||  password == '' || repassword == '' ) //Если какой то из инпутов пустой - срабатывает error
        error = "Введите все данные"; //Передаем текст в переменную error
    else if (!email.includes('@') || !email.includes('.')) //Иначе если поле email не включает знаки: "@", ".", то срабатывает error
        error = "Неверный формат электронной почты" //Передаем текст в переменную error
    else if(name.length <= 1 || name.length > 50 ) //Иначе если поле name <= 1 или > 50 символов - срабатывает error
        error = "Неправильное имя"; //Передаем текст в переменную error
    else if(password != repassword) //Иначе если поле password не равно полю repassword - то срабатывает error
        error = "Пароли не совпадают"; //Передаем текст в переменную error
    else if(password_with_out_space.length == 0 ) //Иначе если поле password состоит из пробелов - то срабатывает error
        error = "Пароль не может состоять из пробелов"; //Передаем текст в переменную error
    else if(password_with_out_space.length < 8 ) //Иначе если длина поля password (в котором пробелы удаляются) меньше 8 - то срабатывает error
        error = "Пароль слишком короткий"; //Передаем текст в переменную error

    if(error != '') { //Если переменная error что то содержит в себе, то
        alert(error) //Отображаем текст на странице методом alert
    } else { //Иначе
        alert("Вы зарегистрированы") //Отображаем текст методом alert об успешной регистрации
        window.location = '.../index.html'; //Делаем отображение текста на странице index.html
    }

}

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.getElementById('style_link').setAttribute('href', './css/style_dark.css');
    } else {
      document.getElementById('style_link').setAttribute('href', './css/style.css');
    }
  });
  