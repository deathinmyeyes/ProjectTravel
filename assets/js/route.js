const dataContainer = document.getElementById('data');
const searchInput = document.getElementById('searchInput');
const loader = document.createElement('div');
const dropDown = document.getElementById('dropdown');
const wrapper = document.getElementById('wrapper');
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const paginationContainer = document.getElementById('pagination');
const filterByDistrictSelect = document.getElementById('filterByDistrict');
const filterByTypeSelect = document.getElementById('filterByType');
const filterBlock = document.getElementById('filters');
const detailsContainer = document.getElementById('details');
const gallery = document.getElementById('gallery');
const galleryImage = document.getElementById('galleryImage');

let allData = [];
let currentPage = 1;
let currentImageIndex = 0;
let itemsPerPage = 10;
let sortBy = '';
let order = '';
let filterByDistrict = '';
let filterByType = '';

loader.id = 'loader';
filterBlock.className = 'route__filter-block';
loader.innerHTML = "<img src='./img/25.gif' alt='loader'></img>";
dataContainer.appendChild(loader);

function fetchData(page, sortBy = '', order = '', filterByDistrict = '', filterByType = '', searchTerm = '') {
  dataContainer.appendChild(loader);
  searchInput.style.display = 'none';
  dropDown.style.display = 'none';
  header.style.display = 'none';
  footer.style.display = 'none';
  filterBlock.style.display = 'none';
  paginationContainer.style.display = 'none';
  document.getElementById('checkbox').style.display = 'none';

  const urlParams = new URLSearchParams();
  urlParams.append('page', page);
  urlParams.append('limit', itemsPerPage);
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

  fetch(url)
    .then(response => response.json())
    .then(data => {
      dataContainer.style.display = 'block';
      searchInput.style.display = 'block';
      dropDown.style.display = 'block';
      header.style.display = 'block';
      footer.style.display = 'block';
      filterBlock.style.display = 'block';
      paginationContainer.style.display = 'flex';
      document.getElementById('checkbox').style.display = 'block';
      if (data.length > 0) {
        allData = data;
        displayData(allData);
        dataContainer.removeChild(loader);
        setTimeout(() => {
          dropDown.classList.add('show');
        }, 10);
      } else {
        currentPage = currentPage - 1;
        fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
      }
    })
    .catch(error => {
      dataContainer.removeChild(loader);
      console.error('Ошибка загрузки данных', error);
    });
}

function displayData(data) {
  dataContainer.innerHTML = '';
  data.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = 'route__card';
    itemElement.innerHTML = `
      <img src="${item.image}" alt="Image"></img>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <a href="#" onclick="openDetailsWindow(${item.id})">Подробнее</a>
    `;
    dataContainer.appendChild(itemElement);
    setTimeout(() => {
      itemElement.classList.add('visible');
    }, 50);
  });
  updatePagination(data.length > 0);
}

function updatePagination(hasItems) {
  paginationContainer.innerHTML = '';

  if (currentPage > 1) {
    const prevPageButton = document.createElement('button');
    prevPageButton.className = 'route__pagination-pBtn';
    prevPageButton.textContent = '<';
    prevPageButton.addEventListener('click', () => {
      currentPage--;
      fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
    });
    paginationContainer.appendChild(prevPageButton);
  }

  const paginationCount = document.createElement('p')
  paginationCount.textContent = `${currentPage}`;
  paginationCount.style.fontSize = '20px';
  paginationContainer.appendChild(paginationCount);

  if (hasItems) {
    const nextPageButton = document.createElement('button');
    nextPageButton.className = 'route__pagination-nBtn';
    nextPageButton.textContent = '>';
    nextPageButton.addEventListener('click', () => {
      currentPage++;
      fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
    });
    paginationContainer.appendChild(nextPageButton);
  } 
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.toLowerCase();
    currentPage = 1; 
    fetchData(currentPage, sortBy, order, filterByDistrict, filterByType, searchTerm);
  }
});

searchInput.addEventListener('blur', () => {
  const searchTerm = searchInput.value.toLowerCase();
  currentPage = 1; 
  fetchData(currentPage, sortBy, order, filterByDistrict, filterByType, searchTerm);
});

function checkFluency() {
  const checkBox_msg = document.getElementById('checkbox');
  if (checkBox_msg.checked) {
    alert("Вы включили поиск по описанию");
  } else {
    alert("Вы отключили поиск по описанию");
  }
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
} 

const sortByCategoryBtn = document.getElementById('sortByCategory');
sortByCategoryBtn.addEventListener('click', () => {
  sortBy = 'category';
  order = 'asc';
  currentPage = 1;
  fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
});

const sortByRatingBtn = document.getElementById('sortByRating');
sortByRatingBtn.addEventListener('click', () => {
  sortBy = 'rating';
  order = 'desc';
  currentPage = 1;
  fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
});

function openDetailsWindow(itemId) {
  event.preventDefault(); 
  history.pushState({ id: itemId }, '', `./route/${itemId}`); 
  showDetails(itemId); 
}

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.id) {
    showDetails(event.state.id); 
  } else {
    fetchData(currentPage);
  }
});

async function fetchAttractions() {
  const response = await fetch('https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism');
  return response.json();
}

function openGallery(images, index) {
  const gallery = document.getElementById('gallery');
  const galleryImage = document.getElementById('galleryImage');
  currentImageIndex = index;
  galleryImage.src = images[currentImageIndex];
  gallery.classList.add('show');
}

function closeGallery() {
  const gallery = document.getElementById('gallery');
  gallery.classList.remove('show');
}

function prevImage() {
  const galleryImage = document.getElementById('galleryImage');
  const images = Array.from(document.querySelectorAll('.route__details-wrapper img')).map(img => img.src);
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  galleryImage.src = images[currentImageIndex];
}

function nextImage() {
  const galleryImage = document.getElementById('galleryImage');
  const images = Array.from(document.querySelectorAll('.route__details-wrapper img')).map(img => img.src);
  currentImageIndex = (currentImageIndex + 1) % images.length;
  galleryImage.src = images[currentImageIndex];
}

async function showDetails(attractionId) {
  try {
    const attractions = await fetchAttractions();
    const attraction = attractions.find(a => a.id === attractionId);

    if (attraction) {
      searchInput.style.display = 'none';
      dropDown.style.display = 'none';
      document.getElementById('checkbox').style.display = 'none';
      document.getElementById('pagination').style.display = 'none';
      filterBlock.style.display = 'none';
      dataContainer.style.display = 'none';
      document.getElementById('change_theme').style.display = 'none';
      detailsContainer.style.display = 'block';

      document.getElementById('index').setAttribute('href', '../index.html');
      document.getElementById('routes').setAttribute('href', '../routes.html');
      document.getElementById('contacts').setAttribute('href', '../contacts.html');
      document.getElementById('login').setAttribute('href', '../login.html');

      detailsContainer.innerHTML = `
        <h2>${attraction.name}</h2>
        <div class='route__details-wrapper'>
          <p>${attraction.descriptions[0]}</p>
          <img src="${attraction.images[0]}" alt="Image" onclick="openGallery([${attraction.images.map(img => `'${img}'`)}], 0)">
        </div>
        <div class='route__details-wrapper'>
          <img src="${attraction.images[1]}" alt="Image" onclick="openGallery([${attraction.images.map(img => `'${img}'`)}], 1)">
          <p>${attraction.descriptions[1]}</p>
        </div>
        <h2>Мы на карте</h2>
        ${attraction.location}
      `;
      detailsContainer.classList.remove('hidden');
    } else {
      alert('Достопримечательность не найдена');
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    alert('Произошла ошибка при загрузке данных');
  }
}

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.id) {
    showDetails(event.state.id);
  } else {
    fetchData(currentPage);
    searchInput.style.display = 'block';
    dropDown.style.display = 'block';
    document.getElementById('checkbox').style.display = 'block';
    document.getElementById('pagination').style.display = 'flex';
    filterBlock.style.display = 'block';
    dataContainer.style.display = 'block';
    document.getElementById('change_theme').style.display = 'block';
    detailsContainer.style.display = 'none';
    document.getElementById('index').setAttribute('href', './index.html');
    document.getElementById('routes').setAttribute('href', './routes.html');
    document.getElementById('contacts').setAttribute('href', './contacts.html');
    document.getElementById('login').setAttribute('href', './login.html');
  }
});

window.onload = async () => {
  const path = window.location.pathname; 
  const parts = path.split('/'); 

  if (parts[1] === 'route' && parts[2]) {
    const routeId = parseInt(parts[2], 10); 
    if (!isNaN(routeId)) {
      showDetails(routeId); 
    } else {
      alert('Неверный идентификатор маршрута');
    }
  } else {
    fetchData(currentPage);
  }
};

document.getElementById('burger').addEventListener('click', function () {
  const wrapper = document.querySelector('.header__wrapper');
  wrapper.classList.toggle('active');
  if (wrapper.classList.contains('active')) {
    document.querySelector('.route__input-wrapper').style.marginTop = '270px';
  } else {
    document.querySelector('.route__input-wrapper').style.marginTop = '0px';
  }
});

filterByDistrictSelect.addEventListener('change', () => {
  filterByDistrict = filterByDistrictSelect.value;
  currentPage = 1;
  fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
});

filterByTypeSelect.addEventListener('change', () => {
  filterByType = filterByTypeSelect.value;
  currentPage = 1;
  fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
});



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

        this.init();
    }

    async init() {
        await this.fetchAllReviews();
        this.setupEventListeners();
    }

    async fetchAllReviews() {
        try {
            const response = await fetch(`${API_URL}/reviews`);
            const reviews = await response.json();
            this.displayReviews(reviews);
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
                <p><strong>${review.name}</strong>: ${review.text}</p>
                <div class="rating">
                    ${this.generateStars(review.rating)}
                </div>
                <button onclick="reviewManager.deleteReview(${review.id})">Удалить</button>
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
}

window.addEventListener('load', () => {
    window.reviewManager = new ReviewManager();
});