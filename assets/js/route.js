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
    <a href="/assets/route/${item.id}" onclick="openDetailsWindow(${item.id})">Подробнее</a>
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
  history.pushState({ id: itemId }, '', `./${itemId}`);
  showDetails(itemId);
}

async function fetchAttractions() {
  const response = await fetch('https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism');
  return response.json();
}

function renderAttractions(attractions) {
  dataContainer.innerHTML = '';

  attractions.forEach(attraction => {
    const div = document.createElement('div');
    div.classList.add('route__card');
    div.innerHTML = `
      <img src="${attraction.image}" alt="Image"></img>
      <h2>${attraction.name}</h2>
      <p>${attraction.description}</p>
      <a href="?id=${attraction.id}">Подробнее</a>
    `;
    dataContainer.appendChild(div);
  });
}

async function showDetails(attractionId) {
  const attractions = await fetchAttractions();
  const attraction = attractions.find(a => a.id === attractionId);

  if (attraction) {
    searchInput.style.display = 'none';
    dropDown.style.display = 'none';
    document.getElementById('checkbox').style.display = 'none';
    document.getElementById('pagination').style.display = 'none';
    filterBlock.style.display = 'none';
    dataContainer.style.display = 'none';

    detailsContainer.innerHTML = `
      <h2>${attraction.name}</h2>
      <div class='route__details-wrapper'>
        <p>${attraction.descriptions[0]}</p>
        <img src="${attraction.images[0]}" alt="Image"></img>
      </div>
      <div class='route__details-wrapper'>
        <img src="${attraction.images[1]}" alt="Image"></img>
        <p>${attraction.descriptions[1]}</p>
      </div>
      <h2>Мы на карте</h2>
      ${attraction.location}
    `;
    detailsContainer.classList.remove('hidden');
  } else {
    alert('Достопримечательность не найдена');
  }
}

window.onload = async () => {
  fetchData(currentPage);
  const params = new URLSearchParams(window.location.search);
  const attractionId = params.get('id');
  if (attractionId) {
    showDetails(Number(attractionId));
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

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.getElementById('change_theme').classList.add('dark');
    document.getElementById('style_link').setAttribute('href', './css/routes_dark.css');
  } else {
    document.getElementById('change_theme').classList.remove('dark');
    document.getElementById('style_link').setAttribute('href', './css/routes.css');
  }
});

document.getElementById('change_theme').addEventListener('click', () => {
  const themeButton = document.getElementById('change_theme');
  const styleLink = document.getElementById('style_link');

  themeButton.classList.toggle('dark');

  if (themeButton.classList.contains('dark')) {
    styleLink.setAttribute('href', './css/routes_dark.css');
    localStorage.setItem('theme', 'dark'); 
  } else {
    styleLink.setAttribute('href', './css/routes.css');
    localStorage.setItem('theme', 'light'); 
  }
});