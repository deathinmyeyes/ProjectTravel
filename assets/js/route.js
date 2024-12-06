const dataContainer = document.getElementById('data');
const searchInput = document.getElementById('searchInput');
const loader = document.createElement('div');
const dropDown = document.getElementById('dropdown');
const wrapper = document.getElementById('wrapper');
const header = document.getElementById('header');
const footer = document.getElementById('footer');
const paginationContainer = document.getElementById('pagination');

loader.id = 'loader';
loader.innerHTML = "<img src='./img/25.gif' alt='loader'></img>";
dataContainer.appendChild(loader);

searchInput.style.display = 'none';
dropDown.style.display = 'none';
header.style.display = 'none';
footer.style.display = 'none';
document.getElementById('checkbox').style.display = 'none';

let allData = [];
let currentPage = 1;
let itemsPerPage = 10;
let sortBy = '';
let order = '';
let filterByDistrict = '';
let filterByType = '';

function fetchData(page, sortBy = '', order = '') {
    dataContainer.appendChild(loader);
    searchInput.style.display = 'none';
    dropDown.style.display = 'none';
    header.style.display = 'none';
    footer.style.display = 'none';
    document.getElementById('checkbox').style.display = 'none';

    const urlParams = new URLSearchParams();
    urlParams.append('page', page);
    urlParams.append('limit', itemsPerPage);
    if (sortBy && order) {
        urlParams.append('sortBy', sortBy);
        urlParams.append('order', order);
    }

    const url = `https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism?${urlParams.toString()}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                allData = data;
                displayData(allData);
                dataContainer.removeChild(loader);
                dataContainer.style.display = 'block';
                searchInput.style.display = 'block';
                dropDown.style.display = 'block';
                header.style.display = 'block';
                footer.style.display = 'block';
                document.getElementById('checkbox').style.display = 'block';
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
        prevPageButton.className = 'route__pagination-btn';
        prevPageButton.textContent = '<';
        prevPageButton.addEventListener('click', () => {
            currentPage--;
            fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
        });
        paginationContainer.appendChild(prevPageButton);
    }

    if (hasItems) {
        const nextPageButton = document.createElement('button');
        nextPageButton.className = 'route__pagination-btn';
        nextPageButton.textContent = '>';
        nextPageButton.addEventListener('click', () => {
            currentPage++;
            fetchData(currentPage, sortBy, order, filterByDistrict, filterByType);
        });
        paginationContainer.appendChild(nextPageButton);
    }
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const checkbox = document.getElementById('checkbox');

    let filteredData;
    if (checkbox.checked) {
        filteredData = allData.filter(item =>
            item.description.toLowerCase().includes(searchTerm) ||
            item.name.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredData = allData.filter(item =>
            item.name.toLowerCase().includes(searchTerm)
        );
    }

    displayData(filteredData);
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
    window.location.href = `?id=${itemId}`;
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
        `;
        dataContainer.appendChild(div);
    });
}

async function showDetails(attractionId) {
    const attractions = await fetchAttractions();
    const attraction = attractions.find(a => a.id === attractionId);

    if (attraction) {
        dataContainer.style.display = 'none';
        searchInput.style.display = 'none';
        dropDown.style.display = 'none';
        document.getElementById('checkbox').style.display = 'none';
        document.getElementById('pagination').style.display = 'none';
        const detailsContainer = document.getElementById('details');
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
        alert('error');
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

document.getElementById('burger').addEventListener('click', function() {
    const wrapper = document.querySelector('.header__wrapper');
    wrapper.classList.toggle('active');
    if (wrapper.classList.contains('active')) {
        document.querySelector('.route__input-wrapper').style.marginTop = '270px';
    } else {
        document.querySelector('.route__input-wrapper').style.marginTop = '0px';
    }
});