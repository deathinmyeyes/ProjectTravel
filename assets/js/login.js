class LoginForm {
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
      const password = document.getElementById('password').value;
      const passwordWithoutSpaces = password.replaceAll(' ', '');
      let error = '';
  
      if (email === '' || password === '') {
        error = 'Введите все данные';
      } else if (!email.includes('@') || !email.includes('.')) {
        error = 'Неверный формат электронной почты';
      } else if (passwordWithoutSpaces.length === 0) {
        error = 'Пароль не может состоять из пробелов';
      } else if (passwordWithoutSpaces.length < 8) {
        error = 'Пароль слишком короткий';
      }
  
      if (error !== '') {
        alert(error);
      } else {
        alert('Вы успешно вошли в свой аккаунт');
        window.location = '../index.html';
      }
    }
  }
  
  const loginForm = new LoginForm('login');



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