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



class BurgerMenu {
  constructor(burgerId, wrapperClass, mainWrapperClass) {
    this.burger = document.getElementById(burgerId);
    this.wrapper = document.querySelector(wrapperClass);
    this.mainWrapper = document.querySelector(mainWrapperClass);
    this.init();
  }

  init() {
    this.burger.addEventListener('click', this.toggleMenu.bind(this));
  }

  toggleMenu() {
    if (this.wrapper.classList.toggle('active')) {
      this.mainWrapper.style.marginTop = '270px';
    } else {
      this.mainWrapper.style.marginTop = '0px';
    }
  }
}

const burgerMenu = new BurgerMenu('burger', '.header__wrapper', '.main__wrapper');



class Modal {
  constructor(modalId, openBtnId, closeBtnId, footerId) {
    this.modal = document.querySelector(modalId);
    this.openBtn = document.querySelector(openBtnId);
    this.closeBtn = document.querySelector(closeBtnId);
    this.footer = document.getElementById(footerId);
    this.init();
  }

  init() {
    this.openBtn.addEventListener('click', this.open.bind(this));
    this.closeBtn.addEventListener('click', this.close.bind(this));
  }

  open() {
    this.modal.style.display = 'block';
    if (window.innerWidth <= 414) {
      this.footer.style.marginTop = '150px';
    }
  }

  close() {
    this.modal.style.display = 'none';
    if (window.innerWidth <= 414) {
      this.footer.style.marginTop = '1270px';
    }
  }
}

const modal1 = new Modal('#modal1', '#openModal1', '#close1', 'footer');
const modal2 = new Modal('#modal2', '#openModal2', '#close2', 'footer');



class Slider {
  constructor(sliderClass, prevButtonClass, nextButtonClass) {
    this.slider = document.querySelector(sliderClass);
    this.prevButton = document.querySelector(prevButtonClass);
    this.nextButton = document.querySelector(nextButtonClass);
    this.slides = Array.from(this.slider.querySelectorAll('img'));
    this.slideCount = this.slides.length;
    this.slideIndex = 0;
    this.init();
  }

  init() {
    this.prevButton.addEventListener('click', this.showPreviousSlide.bind(this));
    this.nextButton.addEventListener('click', this.showNextSlide.bind(this));
    this.updateSlider();
  }

  showPreviousSlide() {
    this.slideIndex = (this.slideIndex - 1 + this.slideCount) % this.slideCount;
    this.updateSlider();
  }

  showNextSlide() {
    this.slideIndex = (this.slideIndex + 1) % this.slideCount;
    this.updateSlider();
  }

  updateSlider() {
    this.slides.forEach((slide, index) => {
      slide.style.display = index === this.slideIndex ? 'block' : 'none';
    });
  }
}

const slider = new Slider('.main__slider', '.main__prev-button', '.main__next-button');

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