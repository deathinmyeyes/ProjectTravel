document.getElementById('login').addEventListener("submit", checkData);

function checkData() {


    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password_with_out_space = password.replaceAll(' ', '')

    var error = "";

    if(email == '' ||  password == '')
        error = "Введите все данные";
    else if (!email.includes('@') || !email.includes('.'))
        error = "Неверный формат электронной почты"
    else if(password_with_out_space.length == 0 )
        error = "Пароль не может состоять из пробелов";
    else if(password_with_out_space.length < 8 )
        error = "Пароль слишком короткий";

    if(error != '') {
        alert(error)
    } else {
        alert("Вы успешно вошли в свой аккаунт")
        window.location = '.../index.html';
    }

    return false;

}