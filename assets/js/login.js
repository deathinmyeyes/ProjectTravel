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
      this.checkUserOnServer(email, password);
    }
  }

  async checkUserOnServer(email, password) {
    try {
      const response = await fetch(`https://6752c922f3754fcea7b99892.mockapi.io/users?email=${email}`);
      const users = await response.json();
  
      if (users.length === 0) {
        alert('Пользователь с таким email не найден');
      } else {
        const user = users.find(user => user.password === password);
        if (user) {
          document.cookie = `user=${JSON.stringify(user)}; path=/; max-age=${60 * 60 * 24}`; 
          alert('Вы успешно вошли в свой аккаунт');
          window.location = './profile.html'; 
        } else {
          alert('Неверный пароль');
        }
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при проверке данных');
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