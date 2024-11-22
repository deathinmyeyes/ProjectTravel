document.getElementById('login').addEventListener("submit", checkData); //Элементу по айди добавляем событие "Submit", при срабатывании которого вызывается функция CheckData

function checkData() { //Создаем функцию


    const email = document.getElementById('email').value; //Создаем неизменяемую переменную, в которые передаем значение из input полей
    const password = document.getElementById('password').value; //Создаем неизменяемую переменную, в которые передаем значение из input полей
    const password_with_out_space = password.replaceAll(' ', '') //Создаем переменную, в которую передаем данные из поля password, где все пробелы меняем на ''

    let error = ""; //Создаем изменяемую переменную error

    if(email == '' ||  password == '') //Если поле email или password пустые - то срабатывает error
        error = "Введите все данные"; //Передаем текст в переменную error
    else if (!email.includes('@') || !email.includes('.')) //Иначе если поле email не включает какой то из символов: "@", ".", то срабатывает error
        error = "Неверный формат электронной почты" //Передаем текст в переменную error
    else if(password_with_out_space.length == 0 ) //Иначе если поле password состоит из пробелов - то срабатывает error
        error = "Пароль не может состоять из пробелов"; //Передаем текст в переменную error
    else if(password_with_out_space.length < 8 ) //Иначе если длина поля password (в котором пробелы удаляются) меньше 8 - то срабатывает error
        error = "Пароль слишком короткий"; //Передаем текст в переменную error

    if(error != '') { //Если поле error что то содержит в себе, то
        alert(error) //Отображаем error методом alert
    } else { //Иначе
        alert("Вы успешно вошли в свой аккаунт") //Отображаем текст, о том что мы успешно вошли в аккаунт методом alert
        window.location = '.../index.html'; //Делаем отображение текста на странице index.html
    }

}