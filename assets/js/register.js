class RegistrationForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.checkData.bind(this));
  }

  checkData(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    const passwordWithoutSpaces = password.replaceAll(' ', '');
    let error = '';

    if (email === '' || password === '' || repassword === '') {
      error = 'Введите все данные';
    } else if (!email.includes('@') || !email.includes('.')) {
      error = 'Неверный формат электронной почты';
    } else if (name.length <= 1 || name.length > 50) {
      error = 'Неправильное имя';
    } else if (password !== repassword) {
      error = 'Пароли не совпадают';
    } else if (passwordWithoutSpaces.length === 0) {
      error = 'Пароль не может состоять из пробелов';
    } else if (passwordWithoutSpaces.length < 8) {
      error = 'Пароль слишком короткий';
    }

    if (error !== '') {
      alert(error);
    } else {
      this.sendDataToServer({ email, name, password });
    }
  }

  async sendDataToServer(data) {
    try {
      const response = await fetch('https://6752c922f3754fcea7b99892.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Вы зарегистрированы');
        window.location = './index.html';
      } else {
        alert('Ошибка при регистрации');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при отправке данных');
    }
  }
}

const registrationForm = new RegistrationForm('registration');



  class ThemeManager {
    constructor(styleLinkId) {
      this.styleLink = document.getElementById(styleLinkId);
      this.init();
    }
  
    init() {
      window.addEventListener('load', this.applySavedTheme.bind(this));
    }
  
    applySavedTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.styleLink.setAttribute('href', './css/style_dark.css');
      } else {
        this.styleLink.setAttribute('href', './css/style.css');
      }
    }
  }
  
  const themeManager = new ThemeManager('style_link');