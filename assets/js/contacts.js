class BurgerMenu {
  constructor(burgerId, wrapperClass, contactsBlockClass) {
    this.burger = document.getElementById(burgerId);
    this.wrapper = document.querySelector(wrapperClass);
    this.contactsBlock = document.querySelector(contactsBlockClass);
    this.init();
  }

  init() {
    this.burger.addEventListener('click', this.toggleMenu.bind(this));
  }

  toggleMenu() {
    if (this.wrapper.classList.toggle('active')) {
      this.contactsBlock.style.marginTop = '400px';
    } else {
      this.contactsBlock.style.marginTop = '0px';
    }
  }
}

const burgerMenu = new BurgerMenu('burger', '.header__wrapper', '.contacts__block');




class Modal {
  constructor(modalId, openBtnId, closeBtnId) {
    this.modal = document.querySelector(modalId);
    this.openBtn = document.querySelector(openBtnId);
    this.closeBtn = document.querySelector(closeBtnId);
    this.init();
  }

  init() {
    this.openBtn.addEventListener('click', this.open.bind(this));
    this.closeBtn.addEventListener('click', this.close.bind(this));
  }

  open() {
    this.modal.style.display = 'block';
  }

  close() {
    this.modal.style.display = 'none';
  }
}

const modal3 = new Modal('#modal3', '#openModal3', '#close3');




class FormValidator {
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
    const surname = document.getElementById('surname').value;
    const message = document.getElementById('message').value;
    let error = '';

    if (email === '' || name === '' || surname === '' || message === '') {
      error = 'Введите все данные';
    } else if (!email.includes('@') || !email.includes('.')) {
      error = 'Неверный формат электронной почты';
    } else if (name.length <= 3 || name.length > 50) {
      error = 'Слишком короткое или длинное имя';
    } else if (surname.length <= 3 || surname.length > 50) {
      error = 'Слишком короткая или длинная фамилия';
    } else if (message.length < 1) {
      error = 'Причина обращения не должна быть пустой';
    }

    if (error !== '') {
      alert(error);
    } else {
      alert('Вы успешно отправили заявку на обратную связь');
      window.location = '../contacts.html';
    }
  }
}

const formValidator = new FormValidator('contact');





class ThemeManager {
  constructor(themeBtnId, styleLinkId) {
    this.themeBtn = document.getElementById(themeBtnId);
    this.styleLink = document.getElementById(styleLinkId);
    this.init();
  }

  init() {
    window.addEventListener('load', this.applySavedTheme.bind(this));
    this.themeBtn.addEventListener('click', this.toggleTheme.bind(this));
  }

  applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.themeBtn.classList.add('dark');
      this.styleLink.setAttribute('href', './css/style_dark.css');
    } else {
      this.themeBtn.classList.remove('dark');
      this.styleLink.setAttribute('href', './css/style.css');
    }
  }

  toggleTheme() {
    this.themeBtn.classList.toggle('dark');

    if (this.themeBtn.classList.contains('dark')) {
      this.styleLink.setAttribute('href', './css/style_dark.css');
      localStorage.setItem('theme', 'dark');
    } else {
      this.styleLink.setAttribute('href', './css/style.css');
      localStorage.setItem('theme', 'light');
    }
  }
}

const themeManager = new ThemeManager('change_theme', 'style_link');



class UserManager {
  constructor() {
    this.loginLink = document.getElementById('login-link');
    this.profileLink = document.getElementById('profile-link');
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  checkUserStatus() {
    const userCookie = this.getCookie('user');
    const user = userCookie ? JSON.parse(userCookie) : null;

    if (user) {
      this.loginLink.style.display = 'none';
      this.profileLink.style.display = 'inline';
    } else {
      this.loginLink.style.display = 'inline';
      this.profileLink.style.display = 'none';
    }
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.checkUserStatus();
    });
  }
}

const userManager = new UserManager();
userManager.init();