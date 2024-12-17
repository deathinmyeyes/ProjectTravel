class DataManager {
  constructor() {
    this.allData = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.sortBy = '';
    this.order = '';
    this.filterByDistrict = '';
    this.filterByType = '';
    this.searchTerm = '';
  }

  saveParams(sortBy, order, filterByDistrict, filterByType, searchTerm) {
    this.sortBy = sortBy;
    this.order = order;
    this.filterByDistrict = filterByDistrict;
    this.filterByType = filterByType;
    this.searchTerm = searchTerm;
  }

  getParams() {
    return {
      sortBy: this.sortBy,
      order: this.order,
      filterByDistrict: this.filterByDistrict,
      filterByType: this.filterByType,
      searchTerm: this.searchTerm
    };
  }

  async fetchData(page, sortBy = '', order = '', filterByDistrict = '', filterByType = '', searchTerm = '', isPagination = false) {
    const isValidCombination = await this.checkCombination(filterByDistrict, filterByType);
    if (!isValidCombination) {
      console.log('Комбинация district и type не существует');
      UI.displayData([]); 
      return;
    }
  
    if (!isPagination) {
      this.saveParams(sortBy, order, filterByDistrict, filterByType, searchTerm);
    }
  
    const {
      sortBy: currentSortBy,
      order: currentOrder,
      filterByDistrict: currentFilterByDistrict,
      filterByType: currentFilterByType,
      searchTerm: currentSearchTerm
    } = this.getParams();
  
    const urlParams = new URLSearchParams();
    urlParams.append('page', page);
    urlParams.append('limit', this.itemsPerPage);
  
    if (currentSortBy && currentOrder) {
      urlParams.append('sortBy', currentSortBy);
      urlParams.append('order', currentOrder);
    }
  
    if (currentFilterByDistrict) {
      urlParams.append('district', currentFilterByDistrict);
    }
    if (currentFilterByType) {
      urlParams.append('type', currentFilterByType);
    }
  
    if (currentSearchTerm) {
      urlParams.append('search', currentSearchTerm);
    }
  
    const url = `https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism?${urlParams.toString()}`;
  
    try {
      console.log('Запрос к API:', url);
  
      UI.showLoader();
      UI.hideData();
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      console.log('Данные:', data);
  
      UI.showData();
      UI.hideLoader();
  
      if (data.length > 0) {
        this.allData = data;
        UI.displayData(this.allData);
  
        if (isPagination) {
          UI.scrollToPagination();
        }
      } else {
        this.currentPage--;
        await this.fetchData(this.currentPage, currentSortBy, currentOrder, currentFilterByDistrict, currentFilterByType, currentSearchTerm, isPagination);
      }
      return data;
    } catch (error) {
      console.error('Ошибка загрузки данных', error);
      UI.showData();
      UI.hideLoader();
      return [];
    }
  }

  async checkCombination(district, type) {
    const url = `https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism?district=${encodeURIComponent(district)}&type=${encodeURIComponent(type)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error('Ошибка проверки комбинации:', error);
      return false;
    }
  }

  async checkNextPage() {
    const nextPage = this.currentPage + 1;
    const urlParams = new URLSearchParams();
    urlParams.append('page', nextPage);
    urlParams.append('limit', this.itemsPerPage);

    const { sortBy, order, filterByDistrict, filterByType, searchTerm } = this.getParams();

    if (sortBy && order) {
      urlParams.append('sortBy', sortBy);
      urlParams.append('order', order);
    }
    if (filterByDistrict) {
      urlParams.append('district', filterByDistrict);
    }
    if (filterByType) {
      urlParams.append('type', filterByType);
    }
    if (searchTerm) {
      urlParams.append('search', searchTerm);
    }

    const url = `https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism?${urlParams.toString()}`;

    try {
      console.log('Проверка следующей страницы. URL:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка проверки следующей страницы: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error('Ошибка проверки следующей страницы', error);
      return false;
    }
  }
}



class UI {
  static init() {
    this.dataContainer = document.getElementById('data');
    this.searchInput = document.getElementById('searchInput');
    this.dropDown = document.getElementById('dropdown');
    this.paginationContainer = document.getElementById('pagination');
    this.filterBlock = document.getElementById('filters');
    this.detailsContainer = document.getElementById('details');
    this.gallery = document.getElementById('gallery');
    this.galleryImage = document.getElementById('galleryImage');
    this.sortByCategoryBtn = document.getElementById('sortByCategory');
    this.sortByRatingBtn = document.getElementById('sortByRating');
    this.filterByDistrictSelect = document.getElementById('filterByDistrict');
    this.filterByTypeSelect = document.getElementById('filterByType');
    this.loader = document.getElementById('loader'); 

    if (!this.loader) {
      console.error('Элемент loader не найден в DOM');
    }

    this.searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = this.searchInput.value.toLowerCase();
        dataManager.currentPage = 1; 
        dataManager.fetchData(
          dataManager.currentPage,
          dataManager.sortBy,
          dataManager.order,
          dataManager.filterByDistrict,
          dataManager.filterByType,
          searchTerm
        );
      }
    });
    
    this.sortByCategoryBtn.addEventListener('click', () => {
      dataManager.sortBy = 'category';
      dataManager.order = 'asc';
      dataManager.currentPage = 1; 
      dataManager.fetchData(
        dataManager.currentPage,
        dataManager.sortBy,
        dataManager.order,
        dataManager.filterByDistrict,
        dataManager.filterByType,
        dataManager.searchTerm
      );
    });
    
    this.sortByRatingBtn.addEventListener('click', () => {
      dataManager.sortBy = 'rating';
      dataManager.order = 'desc';
      dataManager.currentPage = 1; 
      dataManager.fetchData(
        dataManager.currentPage,
        dataManager.sortBy,
        dataManager.order,
        dataManager.filterByDistrict,
        dataManager.filterByType,
        dataManager.searchTerm
      );
    });
    
    this.filterByDistrictSelect.addEventListener('change', () => {
      dataManager.filterByDistrict = this.filterByDistrictSelect.value;
      dataManager.currentPage = 1; 
      dataManager.fetchData(
        dataManager.currentPage,
        dataManager.sortBy,
        dataManager.order,
        dataManager.filterByDistrict,
        dataManager.filterByType,
        dataManager.searchTerm
      );
    });
    
    this.filterByTypeSelect.addEventListener('change', () => {
      dataManager.filterByType = this.filterByTypeSelect.value;
      dataManager.currentPage = 1;
      dataManager.fetchData(
        dataManager.currentPage,
        dataManager.sortBy,
        dataManager.order,
        dataManager.filterByDistrict,
        dataManager.filterByType,
        dataManager.searchTerm
      );
    });
  }

  static displayData(data) {
    this.dataContainer.innerHTML = '';
    data.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = 'route__card';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="Image"></img>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <a href="#" onclick="Details.showDetails(${item.id})">Подробнее</a>
      `;
      this.dataContainer.appendChild(itemElement);
      setTimeout(() => {
        itemElement.classList.add('visible');
      }, 50);
    });
    Pagination.updatePagination(data.length > 0);
  }

  static toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  static showLoader() {
    if (this.loader) {
      this.loader.style.display = 'flex'; 
    } else {
      console.error('Элемент loader не найден в DOM');
    }
  }

  static hideLoader() {
    if (this.loader) {
      this.loader.style.display = 'none'; 
    } else {
      console.error('Элемент loader не найден в DOM');
    }
  }

  static hideData() {
    this.dataContainer.style.display = 'none'; 
  }

  static showData() {
    this.dataContainer.style.display = 'block'; 
  }

  static scrollToPagination() {
    if (this.paginationContainer) {
      this.paginationContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}



class Pagination {
  static async updatePagination(hasItems) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
  
    if (dataManager.currentPage > 1) {
      const prevPageButton = document.createElement('button');
      prevPageButton.className = 'route__pagination-pBtn';
      prevPageButton.textContent = '<';
      prevPageButton.addEventListener('click', () => {
        dataManager.currentPage--;
        dataManager.fetchData(dataManager.currentPage, dataManager.sortBy, dataManager.order, dataManager.filterByDistrict, dataManager.filterByType, dataManager.searchTerm, true);
      });
      paginationContainer.appendChild(prevPageButton);
    }
  
    const paginationCount = document.createElement('p');
    paginationCount.textContent = `${dataManager.currentPage}`;
    paginationCount.style.fontSize = '20px';
    paginationContainer.appendChild(paginationCount);
  
    const hasNextPage = await dataManager.checkNextPage();
  
    if (hasItems && hasNextPage) {
      const nextPageButton = document.createElement('button');
      nextPageButton.className = 'route__pagination-nBtn';
      nextPageButton.textContent = '>';
      nextPageButton.addEventListener('click', () => {
        dataManager.currentPage++;
        dataManager.fetchData(dataManager.currentPage, dataManager.sortBy, dataManager.order, dataManager.filterByDistrict, dataManager.filterByType, dataManager.searchTerm, true);
      });
      paginationContainer.appendChild(nextPageButton);
    }
  }
}



class Details {
  static async showDetails(attractionId) {
    try {
      const attractions = await dataManager.fetchData(
        dataManager.currentPage,
        dataManager.sortBy,
        dataManager.order,
        dataManager.filterByDistrict,
        dataManager.filterByType,
        UI.searchInput.value 
      ); 
      const attraction = attractions.find(a => a.id === attractionId);
  
      if (attraction) {
        this.saveToSearchHistory(attraction);
  
        const newUrl = `./route/${attractionId}`;
        window.history.pushState({ id: attractionId }, '', newUrl);
  
        UI.searchInput.style.display = 'none';
        UI.dropDown.style.display = 'none';
        UI.paginationContainer.style.display = 'none';
        UI.filterBlock.style.display = 'none';
        UI.dataContainer.style.display = 'none';
        UI.detailsContainer.style.display = 'block';

        document.getElementById('logo_link').setAttribute('href', '../index.html');
        document.getElementById('index').setAttribute('href', '../index.html');
        document.getElementById('routes').setAttribute('href', '../routes.html');
        document.getElementById('contacts').setAttribute('href', '../contacts.html');
        document.getElementById('profile-link').setAttribute('href', '../profile.html');
        document.getElementById('login-link').setAttribute('href', '../login.html');

  
        UI.detailsContainer.innerHTML = `
          <h2>${attraction.name}</h2>
          <div class='route__details-wrapper'>
            <p>${attraction.descriptions[0]}</p>
            <img src="${attraction.images[0]}" alt="Image" onclick="Gallery.openGallery([${attraction.images.map(img => `'${img}'`)}], 0)">
          </div>
          <div class='route__details-wrapper'>
            <img src="${attraction.images[1]}" alt="Image" onclick="Gallery.openGallery([${attraction.images.map(img => `'${img}'`)}], 1)">
            <p>${attraction.descriptions[1]}</p>
          </div>
          <h2>Мы на карте</h2>
          ${attraction.location}
        `;
        UI.detailsContainer.classList.remove('hidden');
      } else {
        alert('Достопримечательность не найдена');
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      alert('Произошла ошибка при загрузке данных');
    }
  }

  static saveToSearchHistory(attraction) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const existingItemIndex = searchHistory.findIndex(item => item.id === attraction.id);
  
    if (existingItemIndex !== -1) {
      searchHistory[existingItemIndex].timestamp = new Date().toISOString();
    } else {
      searchHistory.push({
        id: attraction.id,
        name: attraction.name,
        timestamp: new Date().toISOString()
      });
    }
  
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
}



class Gallery {
  static currentImageIndex = 0;

  static openGallery(images, index) {
    const gallery = document.getElementById('gallery');
    const galleryImage = document.getElementById('galleryImage');
    this.currentImageIndex = index;
    galleryImage.src = images[this.currentImageIndex];
    gallery.classList.add('show');
  }

  static closeGallery() {
    const gallery = document.getElementById('gallery');
    gallery.classList.remove('show');
  }

  static prevImage() {
    const galleryImage = document.getElementById('galleryImage');
    const images = Array.from(document.querySelectorAll('.route__details-wrapper img')).map(img => img.src);
    this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length;
    galleryImage.src = images[this.currentImageIndex];
  }

  static nextImage() {
    const galleryImage = document.getElementById('galleryImage');
    const images = Array.from(document.querySelectorAll('.route__details-wrapper img')).map(img => img.src);
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    galleryImage.src = images[this.currentImageIndex];
  }
}

window.openGallery = Gallery.openGallery.bind(Gallery);
window.closeGallery = Gallery.closeGallery.bind(Gallery);
window.prevImage = Gallery.prevImage.bind(Gallery);
window.nextImage = Gallery.nextImage.bind(Gallery);

const dataManager = new DataManager();
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
  dataManager.fetchData(dataManager.currentPage);
});

window.addEventListener('popstate', async (event) => {
  const state = event.state;
  if (state && state.id) {
    await Details.showDetails(state.id);
  } else {
    UI.searchInput.style.display = 'block';
    UI.dropDown.style.display = 'block';
    UI.paginationContainer.style.display = 'flex';
    UI.filterBlock.style.display = 'flex';
    UI.dataContainer.style.display = 'block';
    UI.detailsContainer.style.display = 'none'
  }
});



class BurgerMenu {
  constructor(burgerId, wrapperClass, inputWrapperClass) {
    this.burger = document.getElementById(burgerId);
    this.wrapper = document.querySelector(wrapperClass);
    this.inputWrapper = document.querySelector(inputWrapperClass);

    if (!this.burger || !this.wrapper || !this.inputWrapper) {
      console.error('Один или несколько элементов не найдены!');
      return;
    }

    this.initEventListeners();
  }

  initEventListeners() {
    this.burger.addEventListener('click', () => this.toggleMenu());
  }

  toggleMenu() {
    this.wrapper.classList.toggle('active');
    if (this.wrapper.classList.contains('active')) {
      this.inputWrapper.style.marginTop = '270px';
    } else {
      this.inputWrapper.style.marginTop = '0px';
    }
  }
}

const burgerMenu = new BurgerMenu('burger', '.header__wrapper', '.route__input-wrapper');



class ThemeManager {
  constructor() {
      this.themeButton = document.getElementById('change_theme');
      this.styleLink = document.getElementById('style_link');
      this.lightThemePath = './css/routes.css';
      this.darkThemePath = './css/routes_dark.css';

      this.init();
  }

  init() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
          this.setDarkTheme();
      } else {
          this.setLightTheme();
      }

      this.themeButton.addEventListener('click', () => this.toggleTheme());
  }

  setDarkTheme() {
      this.themeButton.classList.add('dark');
      this.styleLink.setAttribute('href', this.darkThemePath);
  }

  setLightTheme() {
      this.themeButton.classList.remove('dark');
      this.styleLink.setAttribute('href', this.lightThemePath);
  }

  toggleTheme() {
      if (this.themeButton.classList.contains('dark')) {
          this.setLightTheme();
          localStorage.setItem('theme', 'light');
      } else {
          this.setDarkTheme();
          localStorage.setItem('theme', 'dark');
      }
  }
}

window.addEventListener('load', () => {
  new ThemeManager();
});



const API_URL = 'https://672b170d976a834dd0258e17.mockapi.io/api/v1';

class ReviewManager {
    constructor() {
        this.reviewsContainer = document.getElementById('reviewsContainer');
        this.reviewForm = document.getElementById('reviewForm');
        this.ratingStars = document.querySelectorAll('.rating .star');
        this.selectedRating = 0;
        this.averageRatingElement = document.getElementById('averageRating');
        this.totalReviewsElement = document.getElementById('totalReviews');

        this.init();
    }

    async init() {
      await this.fetchAllReviews();
      this.setupEventListeners();
  
      const userManager = new UserManager();
      if (userManager.getCookie('user')) {
        this.showReviews();
      } else {
        this.hideReviews();
      }

      const user = userManager.getUserProfile();
      if (user) {
        this.setDefaultReviewName(user.name);
      }
    }

    setDefaultReviewName(name) {
      const reviewNameInput = document.getElementById('reviewName');
      if (reviewNameInput) {
        reviewNameInput.value = name || '';
      }
    }
  
    showReviews() {
      this.reviewsContainer.style.display = 'block';
      this.reviewForm.style.display = 'flex';
    }
  
    hideReviews() {
      this.reviewsContainer.style.display = 'none';
      this.reviewForm.style.display = 'none';
    }

    async fetchAllReviews() {
        try {
            const response = await fetch(`${API_URL}/reviews`);
            const reviews = await response.json();
            this.displayReviews(reviews);
            this.calculateAndDisplayAverageRating(reviews);
        } catch (error) {
            console.error('Ошибка при загрузке отзывов:', error);
        }
    }

    displayReviews(reviews) {
        this.reviewsContainer.innerHTML = '';

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
              <button onclick="reviewManager.deleteReview(${review.id})">🗑️</button>
              <div class="title">
                <h3>${review.name}</h3>
                <div class="rating">
                    ${this.generateStars(review.rating)}
                </div>
              <div class="reviewBtn">
              </div>
              </div>
              <div class="sub-title">
                <p>${review.text}</p>
              </div>
            `;
            this.reviewsContainer.appendChild(reviewElement);
        });
    }

    generateStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<span class="star selected">★</span>';
            } else {
                starsHTML += '<span class="star">★</span>';
            }
        }
        return starsHTML;
    }

    setupEventListeners() {
        this.ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                this.selectedRating = parseInt(star.getAttribute('data-value'), 10);
                this.highlightStars(this.selectedRating);
            });
        });

        this.reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('reviewName').value;
            const text = document.getElementById('reviewText').value;

            if (!name || !text || this.selectedRating === 0) {
                alert('Пожалуйста, заполните все поля и выберите рейтинг');
                return;
            }

            try {
                const response = await fetch(`${API_URL}/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        text,
                        rating: this.selectedRating,
                    }),
                });

                if (response.ok) {
                    await this.fetchAllReviews();
                    this.reviewForm.reset();
                    this.highlightStars(0);
                } else {
                    alert('Ошибка при добавлении отзыва');
                }
            } catch (error) {
                console.error('Ошибка при отправке отзыва:', error);
            }
        });
    }

    highlightStars(rating) {
        this.ratingStars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'), 10);
            if (starValue <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    async deleteReview(reviewId) {
        try {
            const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await this.fetchAllReviews();
            } else {
                alert('Ошибка при удалении отзыва');
            }
        } catch (error) {
            console.error('Ошибка при удалении отзыва:', error);
        }
    }

    calculateAndDisplayAverageRating(reviews) {
        if (reviews.length === 0) {
            this.averageRatingElement.textContent = '0';
            this.totalReviewsElement.textContent = '0';
            return;
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / reviews.length).toFixed(1);
        this.averageRatingElement.textContent = averageRating;
        this.totalReviewsElement.textContent = reviews.length;
    }
}

window.addEventListener('load', () => {
    window.reviewManager = new ReviewManager();
});



class UserManager {
  constructor() {
    this.loginLink = document.getElementById('login-link');
    this.profileLink = document.getElementById('profile-link');
    this.reviewsContainer = document.getElementById('reviewsContainer');
    this.reviewForm = document.getElementById('reviewForm');
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  getUserProfile() {
    const userCookie = this.getCookie('user');
    return userCookie ? JSON.parse(userCookie) : null;
  }

  checkUserStatus() {
    const user = this.getUserProfile();

    if (user) {
      this.loginLink.style.display = 'none';
      this.profileLink.style.display = 'inline';
      this.showReviews();
      this.setDefaultReviewName(user.name); 
    } else {
      this.loginLink.style.display = 'inline';
      this.profileLink.style.display = 'none';
      this.hideReviews();
    }
  }

  setDefaultReviewName(name) {
    const reviewNameInput = document.getElementById('reviewName');
    if (reviewNameInput) {
      reviewNameInput.value = name || '';
    }
  }

  showReviews() {
    this.reviewsContainer.style.display = 'block';
    this.reviewForm.style.display = 'block';
  }

  hideReviews() {
    this.reviewsContainer.style.display = 'none';
    this.reviewForm.style.display = 'none';
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.checkUserStatus();
    });
  }
}

const userManager = new UserManager();
userManager.init();


//Абстрактные классы, в них нельзя создать экземпляр класса

//Наследование - устанавливает отношения между классами (родительский/дочерний), используются ключевые слова extends (для обозначения отношения дочерний-родительский класс) super(для наследования конструктора родительского класса)

//Модификаторы - public(по умолчанию), private(Запрещает вызывать метод/свойство из вне [#]), protected(Аналогично private, только члены класса могут быть доступны в подклассах [_]), readonly (Делает свойства, доступные для чтения, запрещает взаимодействовать с объектами класса)

//Promise - объект для асинхронного кода, (состояния pending (ожидание), fulfilled(успешное), reject(с ошибкой)). Методы - .then (Отрабатывает при состоянии fulfilled), .catch (Отрабатывает при состоянии reject), .finally (выполняется всегда, не в зависимости от состояния промиса)

//async/await - используется для асинхронных функций, acync - обозначает асинхр. функцию, await - используется внутри асинхр. функций, после выполнения функции возвращается значение, которые было внутри промиса. Обрабатывается с помощью try/catch

//Конструктор - используется для инициализации объекта в классе, new - функция-конструктор используется для создания экземпляров объекта.

//Call/apply - используется для непрямого вызова функции. call - возвращает список аргументов, apply - массив. bind - используется для связывания контекста выполнения с функцией

//Геттеры/сеттеры - свойсва объекта, геттер (get) - для чтения, сеттер (set) - для записи

//Прототип - механизм, с помощью которого объекты наследуют свойства друг друга, получить прототип - Object.getPrototypeOf. Основной метод - __proto__

//Методы 
//reduce(func, startValue) => value
//map(func) => []
//sort(func) => sortedArray
//slice(start, stop) => [start, ...stop]
//splice(index, count, ...items) => []
//filter(func) => []
//find(index) => value
//findIndex(value) => index
//some(func) => true/false
//includes(value) => true/false
//forEach(func) => []
//Array.concat(...items) =>[...array, ...items]
//push(...items) => [, ...items]
//indexOf(item, index) => index/-1
//join() => string
//split() => array
//reverse() => reverser array