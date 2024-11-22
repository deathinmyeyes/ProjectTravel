const dataContainer = document.getElementById('data'); //Создаем константу (неизменяемую переменную)
const searchInput = document.getElementById('searchInput'); //Создаем константу (неизменяемую переменную)
const loader = document.createElement('div'); //Создаем константу (неизменяемую переменную)
const dropDown = document.getElementById('dropdown'); //Создаем константу (неизменяемую переменную)
const wrapper = document.getElementById('route_wrap'); //Создаем константу (неизменяемую переменную)
const header = document.getElementById('header'); //Создаем константу (неизменяемую переменную)
const footer = document.getElementById('footer'); //Создаем константу (неизменяемую переменную)
loader.id = 'loader'; //Элементу loader добавляем айди loader
loader.innerHTML = "<img src='./25.gif' alt='img'></img>"; //Создаем html объект с элементом loader
dataContainer.appendChild(loader); //Добавляем loader в общий контейнер

searchInput.style.display = 'none'; //Прописываем стили для элементов во время отображения loader'a
dropDown.style.display = 'none'; //Прописываем стили для элементов во время отображения loader'a
header.style.display = 'none'; //Прописываем стили для элементов во время отображения loader'a
footer.style.display = 'none'; //Прописываем стили для элементов во время отображения loader'a
document.getElementById('checkbox').style.display = 'none'; //Прописываем стили для элементов во время отображения loader'a

let allData = []; //Создаем пустой массива (для будущего хранения всех данных)
let currentPage = 1; //Создаем изменяемую переменную "текущая страница" со значением 1 (для пагинации)
let itemsPerPage = 1; //Создаем изменяемую переменную "количество объектов на странице" со значением 1 (для пагинации)


fetch('https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism') //Запрос к API для получения данных
  .then(response => response.json()) //Преобразуем ответ в json
  .then(data => { //Обрабатываем результат
    allData = data; //Присваиваем результат переменной allData
    displayData(allData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)); //Отображаем данные, полученные от API

    dataContainer.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    searchInput.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    dropDown.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    header.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    footer.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    document.getElementById('checkbox').style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    document.getElementsByClassName('checkbox_description').style.display = 'block'; //Отображаем элемент на странице после загрузки данных

    setTimeout(() => {
      dropDown.classList.add('show'); //Добавляем класс show к выпадающему меню сортировки
    }, 10);
  })
  .catch(error => { 
    dataContainer.removeChild(loader); //Удаляем loader
    console.error('Error fetching data:', error); //Обрабатываем ошибки после fetch запроса
});


function displayData(data) { //Создаем функцию для отображения данных
    dataContainer.innerHTML = ''; //Очищаем контейнер
    data.forEach((item) => { //Перебираем элементы в списке data
        const itemElement = document.createElement("div"); //Создаем переменную, которой присваиваем созданный элемент div
        itemElement.className = 'route__card'; //Добавляем класс route__card для itemElement
        //Заполняем элемент route__card данными, которые получены с API
        itemElement.innerHTML = `
            <img src="${item.image}" alt="Image"></img>
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <a href="#" onclick="openDetailsWindow(${item.id})">Подробнее</a>
        `;
        dataContainer.appendChild(itemElement); //Добавляем route__card в общий контейнер
        setTimeout(() => {
            itemElement.classList.add('visible'); //Через 50 мс после добавления элемента в контейнер - добавляем класс visible для анимации
        }, 50); 
    });
    updatePagination(); //Вызываем функцию updatePagination для обновления пагинации
}


function updatePagination() { //Создаем функцию пагинации
  const paginationContainer = document.getElementById('pagination'); //Создаем неизменяемую переменную paginationContainer, которой присваиваем элемент pagination по айди
  const totalPages = Math.ceil(allData.length / itemsPerPage); //Расчитываем количество страниц путем деления количество всех элементов на количество элементов, размещенных на 1 странице

  paginationContainer.innerHTML = ''; //Обнуляем контейнер

  if (totalPages > 1) { //Если количество страниц > 1, то,
      for (let i = 1; i <= totalPages; i++) { //Запускаем цикл, который проходит от 1 до значения totalPages и создает кнопку для каждой страницы
          const pageButton = document.createElement('button'); //Создаем элемент button
          pageButton.className = 'route__pagination-btn'; //Добавляем класс элементу button (для стилизации)
          pageButton.textContent = i; //Добавляем текст элементу button, который зависит от переменной i из цикла for
          pageButton.addEventListener('click', () => { //Добавляем обработчик событий "click", который устанавливает currentPage значение i и вызывает функцию displayData
              currentPage = i; //Присваиваем currentPage значение i
              displayData(allData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)); //Отображаем соответствующие данные
          });
          paginationContainer.appendChild(pageButton); //Добавляем в контейнер пагинации кнопку
      }
  } else {
      paginationContainer.style.display = 'none'; //Если общее количество страниц <= 1, тогда скрываем контейнер с кнопками пагинации
  }
}
  

searchInput.addEventListener('input', () => { //Добавляем обработчик события input
  const searchTerm = searchInput.value.toLowerCase(); //Создаем переменную searchTerm, которая преобразует данные из поисковой строки в нижний регистр и возвращает значение
  const checkbox = document.getElementById('checkbox'); //Создаем переменную checkbox (для поиска), получив элемент с идентификатором checkbox по айди
  
  let filteredData; //Создаем переменную filteredData (для содержания отфильтрованных данных)
  if (checkbox.checked) { //Если чекбокс отмечен - тогда фильтрация (поиск) происходит по ключам name и description, которые получаем от API
    filteredData = allData.filter(item => //Фильтруем получаемые данные
      item.description.toLowerCase().includes(searchTerm) || //Проверяем, содержится ли значение из поисковой строки в значении по ключу description, получаемого от API
      item.name.toLowerCase().includes(searchTerm) //Проверяем, содержится ли значение из поисковой строки в значении по ключу name, получаемого от API
    );
  } else { //Если чекбокс не отмечен - тогда ищем только по ключу name
    filteredData = allData.filter(item => //Фильтруем получаемые данные
      item.name.toLowerCase().includes(searchTerm) //Проверяем, содержится ли значение из поисковой строки в значении по ключу name, получаемого от API
    );
  }

  displayData(filteredData); //Вызываем функцию displayData, для отображения отфильтрованных данных
});


function checkFluency() { //Создаем функцию checkFluency
  let checkBox_msg = document.getElementById('checkbox'); //Создаем переменную checkBox_msg, получив элемент с идентификатором checkbox по айди
  if (checkBox_msg.checked != false){ //Если отмечаем чекбокс - тогда отображаем всплывающее окно с текстом "Вы включили поиск по описанию"
    alert("Вы включили поиск по описанию")
  } else{ //Если убираем отметку с чекбокса - тогда отображаем всплывающее окно с текстом "Вы отключили поиск по описанию"
    alert("Вы отключили поиск по описанию");
  } 
}


function myFunction() { //Создаем функцию
  document.getElementById("myDropdown").classList.toggle("show"); //Элементу с идентификатором myDropDown добавляем/удаляем класс show методом toggle
}


const sortByCategoryBtn = document.getElementById('sortByCategory'); // Получаем элемент кнопки сортировки
sortByCategoryBtn.addEventListener('click', () => {  //Создаем обработчик событий по клику для функции
  localStorage.setItem('SortByCategory', 'True'); //Добавляем данные о сортировке в local storage
  itemsPerPage = 4; //Устанавливаем количество объектов на странице
  currentPage = 1 || 2 || 3 || 4; //Меняем значение текущей страницы для корректного отображения отфильтрованных данных
  const sortedData = [...allData].sort((a, b) => { //Создаем переменную sortedData, в которой содержится копия массива с оператором расширения (для того, что бы не изменять исходный массив), после сортируем элементы в массиве
    if (a.category < b.category) { //Если a < b, тогда возвращаем -1
      return -1;
    } else if (a.category > b.category) { //Иначе если a > b возвращаем 1
      return 1;
    } else { //В ином случае возвращаем 0
      return 0;
    }
  });
  displayData(sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)); //Вызываем функцию displayData, которая отображает отсортированные данные
});


const sortByRatingBtn = document.getElementById('sortByRating');  //Получаем элемент кнопки сортировки
sortByRatingBtn.addEventListener('click', () => { //Добавляем обработчик событий 
  localStorage.setItem('SortByRating', 'True'); //Добавляем данные о сортировке в local storage
  itemsPerPage = 4; //Изменяем количество элементов на странице
  currentPage = 1 || 2 || 3 || 4; //Изменяем значения текущей страницы для корректного отображения элементов
  const sortedData = [...allData].sort((a, b) => b.rating - a.rating); //Создаем копию массива, в котором сортируем элементы, после возвращаем элементы по убыванию
  displayData(sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)); //Вызываем функцию displayData, которая отображает отсортированные данные
});


function openDetailsWindow(itemId) { //Создаем функцию для создания ссылки, при нажатии на соответствующий элемент
  window.location.href = `?id=${itemId}`; //Переходи по ссылке типа ../routes.html?id=$, где $ - айди элемента, получаемого из API
}


async function fetchAttractions() { //Создаем асинхронную функцию
  const response = await fetch('https://672b170d976a834dd0258e17.mockapi.io/api/v1/test'); //Создаем переменную, которая ожидает запрос к API
  return response.json(); //Возвращаем ответ, который преобразован в json
}

function renderAttractions(attractions) { //Создаем функцию renderAttractions
  dataContainer.innerHTML = ''; //Очищаем dataContainer

  attractions.forEach(attraction => { //Перебираем массив attractions методом forEach
      const div = document.createElement('div'); //Создаем html элемент div
      div.classList.add('route__card'); //html элементу добавляем класс route__card
      //Ничего не добавляем в html элемент div
      div.innerHTML = `
          
      `;
      dataContainer.appendChild(div); //Добавляем div в общий контейнер
  });
}


async function showDetails(attractionId) { //Создаем асинхронную функцию для отображения элементов
  const attractions = await fetchAttractions(); //Ожидаем результат функции fetchAttractions
  const attraction = attractions.find(a => a.id === attractionId); //С помощью метода find ищем элемент в массиве, у которого id совпадает с переданным attractionId
  
  if (attraction) { //Если attraction не undefined, то
    dataContainer.style.display = 'none'; //Меняем стиль для общего контейнера (для корректности отображения передаваемых данных)
    searchInput.style.display = 'none'; //Меняем стиль для поисковой строки (для корректности отображения передаваемых данных)
    dropDown.style.display = 'none'; //Меняем стиль для кнопки сортировки (для корректности отображения передаваемых данных)
    document.getElementById('checkbox').style.display = 'none'; //Меняем стиль для чекбокса (для корректности отображения передаваемых данных)
    document.getElementById('pagination').style.display = 'none'; //Меняем стиль для контейнера пагинации (для корректности отображения передаваемых данных)
    const detailsContainer = document.getElementById('details');  //Создаем новый контейнер, в который будем добавлять html элементы
    //Добавляем html элементы в detailsContainer  
    detailsContainer.innerHTML = `
          <h2>${attraction.name}</h2>
          <div class='route__details-wrapper'>
          <p>${attraction.description1}</p>
          <img src="${attraction.images[0]}" alt="Image"></img>
          </div>
          <div class='route__details-wrapper'>
          <img src="${attraction.images[1]}" alt="Image"></img>
          <p>${attraction.description2}</p>
          </div>
          <h2>Мы на карте</h2>
          <iframe src="${attraction.location}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      `;
      detailsContainer.classList.remove('hidden'); //Удаляем класс hidden у недавно созданного контейнера для отображения на сайте
  }
}


window.onload = async () => { //Добавляем обработчик событий загрузки всех элементов на странице
  const attractions = await fetchAttractions(); //Ожидаем результата от асинхронной функции fetchAttractions
  renderAttractions(attractions); //Вызываем функцию, которая отображает данные, предварительно передав в функцию массив attractions
  const params = new URLSearchParams(window.location.search); //Создаем объект URLSearchParams для работы с параметрами запроса
  const attractionId = params.get('id'); //Возвращаем значение параметра id из URL, если его нет - возвращаем null
  if (attractionId) { //Если id присутствует (&& != null), тогда
      showDetails(Number(attractionId)); //Отображаем данные достопримечательности, в соответствии с id, предварительно преобразовав его в число
  }
};


fetch('https://672b170d976a834dd0258e17.mockapi.io/api/v1/tourism') //Запрос к API для получения данных (для корректности отображения данных)
  .then(response => response.json()) //Преобразуем ответ в json
  .then(data => { //Обрабатываем результат
    allData = data; //Присваиваем результат переменной allData
    displayData(allData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)); //Отображаем данные, полученные от API

    dataContainer.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    searchInput.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    dropDown.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    header.style.display = 'block'; //Отображаем элемент на странице после загрузки данных
    document.getElementById('checkbox').style.display = 'block'; //Отображаем элемент на странице после загрузки данных
  });


  document.getElementById('burger').addEventListener('click', function() { //Создаем событие по клику для элемента burger
    const wrapper = document.querySelector('.header__wrapper'); //Создаем переменную с html элементом .header__wrapper
    if (wrapper.classList.toggle('active')) {   //С помощью условия добавляем класс active элементу header__wrapper методом toggle
    document.querySelector('.route__input-wrapper').style.marginTop = '270px' //При открытом бургер меню - делаем отступ сверху 270px элементу route__input-wrapper
    } else {
      document.querySelector('.route__input-wrapper').style.marginTop = '0px' //При закрытом бургер меню - делаем отступ сверху 0px элементу route__input-wrapper
    }
    });