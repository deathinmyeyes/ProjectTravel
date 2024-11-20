const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');

btn1.onclick = function () {
  localStorage.setItem('Кнопка 1', 'Сказ об Урале');
  document.querySelector('.route__card').style.display = 'block';
  document.querySelector('.route__card1').style.display = 'none';
  document.querySelector('.route__card2').style.display = 'none';
  document.querySelector('.route__card3').style.display = 'none';
};

btn2.onclick = function () {
  localStorage.setItem('Кнопка 2', 'Исторический музей');
  document.querySelector('.route__card').style.display = 'none';
  document.querySelector('.route__card1').style.display = 'block';
  document.querySelector('.route__card2').style.display = 'none';
  document.querySelector('.route__card3').style.display = 'none';
};

btn3.onclick = function () {
  localStorage.setItem('Кнопка 3', 'Академический театр');
  document.querySelector('.route__card').style.display = 'none';
  document.querySelector('.route__card1').style.display = 'none';
  document.querySelector('.route__card2').style.display = 'block';
  document.querySelector('.route__card3').style.display = 'none';
};

btn4.onclick = function () {
  localStorage.setItem('Кнопка 4', 'Кировка');
  document.querySelector('.route__card').style.display = 'none';
  document.querySelector('.route__card1').style.display = 'none';
  document.querySelector('.route__card2').style.display = 'none';
  document.querySelector('.route__card3').style.display = 'block';
};

const btn_2 = document.querySelector('#btn-2');
const btn_1 = document.querySelector('#btn-1');
btn_2.onclick = function () {
  localStorage.setItem('Отображать 2 карточки', '1');
  if (window.matchMedia('(max-width: 414px)').matches)
    document.querySelector('.route__card').style.marginTop = '-270px'
  if (window.matchMedia('(max-width: 414px)').matches)
    document.querySelector('.route__card-wrapper').style.marginTop = '0'   
  document.querySelector('.route__card').style.display = 'block';
  document.querySelector('.route__card1').style.display = 'block';
  document.querySelector('.route__card2').style.display = 'none';
  document.querySelector('.route__card3').style.display = 'none';
  btn1.style.display = 'block'
  btn2.style.display = 'block'
  btn3.style.display = 'none'
  btn4.style.display = 'none'
  btn1.onclick = function () {
    localStorage.setItem('Отображать 2 карточки (1)', 'Сказ об Урале, Исторический музей');
    document.querySelector('.route__card').style.display = 'block';
    document.querySelector('.route__card1').style.display = 'block';
    document.querySelector('.route__card2').style.display = 'none';
    document.querySelector('.route__card3').style.display = 'none';
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card').style.marginTop = '-270px'
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card-wrapper').style.marginTop = '0'   
  }
  btn2.onclick = function () {
    localStorage.setItem('Отображать 2 карточки (2)', 'Академический театр, Кировка');
    document.querySelector('.route__card').style.display = 'none';
    document.querySelector('.route__card1').style.display = 'none';
    document.querySelector('.route__card2').style.display = 'block';
    document.querySelector('.route__card3').style.display = 'block';
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card2').style.marginTop = '-270px'
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card-wrapper').style.marginTop = '0'   
  }
  if (!cardName.includes(searchValue)) {
    document.querySelector('.route__pagination').style.display = "none";    
  } else {
    document.querySelector('.route__pagination').style.display = "block";
  }   
}


btn_1.onclick = function () {
  localStorage.setItem('Отоброжать по 1 карточке', '1')
  if (window.matchMedia('(max-width: 414px)').matches)
    document.querySelector('.route__card').style.marginTop = '-95px'
  if (window.matchMedia('(max-width: 414px)').matches)
    document.querySelector('.route__card-wrapper').style.marginTop = '0'   
  document.querySelector('.route__card').style.display = 'block'
  document.querySelector('.route__card1').style.display = 'none'
  document.querySelector('.route__card2').style.display = 'none'
  document.querySelector('.route__card3').style.display = 'none'
  btn1.style.display = 'block'
  btn2.style.display = 'block'
  btn3.style.display = 'block'
  btn4.style.display = 'block'
  btn1.onclick = function () {
    localStorage.setItem('Кнопка 1', 'Сказ об Урале');
    document.querySelector('.route__card').style.display = 'block';
    document.querySelector('.route__card1').style.display = 'none';
    document.querySelector('.route__card2').style.display = 'none';
    document.querySelector('.route__card3').style.display = 'none';
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card').style.marginTop = '-95px'
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card-wrapper').style.marginTop = '0'
    if (!cardName.includes(searchValue)) {
      document.querySelector('.route__pagination').style.display = "none";    
    } else {
      document.querySelector('.route__pagination').style.display = "block";
    }   
  };
  
  btn2.onclick = function () {
    localStorage.setItem('Кнопка 2', 'Исторический музей');
    document.querySelector('.route__card').style.display = 'none';
    document.querySelector('.route__card1').style.display = 'block';
    document.querySelector('.route__card2').style.display = 'none';
    document.querySelector('.route__card3').style.display = 'none';
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card1').style.marginTop = '-95px'
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card-wrapper').style.marginTop = '0'   
  };
  
  btn3.onclick = function () {
    localStorage.setItem('Кнопка 3', 'Академический театр');
    document.querySelector('.route__card').style.display = 'none';
    document.querySelector('.route__card1').style.display = 'none';
    document.querySelector('.route__card2').style.display = 'block';
    document.querySelector('.route__card3').style.display = 'none';
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card2').style.marginTop = '-95px'
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card-wrapper').style.marginTop = '0'   
  };
  
  btn4.onclick = function () {
    localStorage.setItem('Кнопка 4', 'Кировка');
    document.querySelector('.route__card').style.display = 'none';
    document.querySelector('.route__card1').style.display = 'none';
    document.querySelector('.route__card2').style.display = 'none';
    document.querySelector('.route__card3').style.display = 'block';
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card3').style.marginTop = '-95px'
    if (window.matchMedia('(max-width: 414px)').matches)
      document.querySelector('.route__card-wrapper').style.marginTop = '0'   
  };
}

const btn_reset = document.querySelector('#btn-reset')

btn_reset.onclick = function () {
  localStorage.setItem('Сбросить', '1')
  btn1.style.display = 'none'
  btn2.style.display = 'none'
  btn3.style.display = 'none'
  btn4.style.display = 'none'
  document.querySelector('.route__card').style.display = 'block'
  document.querySelector('.route__card1').style.display = 'block'
  document.querySelector('.route__card2').style.display = 'block'
  document.querySelector('.route__card3').style.display = 'block'
  if (window.matchMedia('(max-width: 414px)').matches)
    document.querySelector('.route__card-wrapper').style.marginTop = '-600px'
  if (window.matchMedia('(max-width: 414px)').matches)
    document.querySelector('.route__card').style.marginTop = '0'
  if (window.matchMedia('(max-width: 414px)').matches)
    document.querySelector('.route__card2').style.marginTop = '100'                        
}


const searchBar = document.getElementById('input-text');
const cards = document.querySelectorAll('.route__card, .route__card1, .route__card2, .route__card3');
searchBar.addEventListener('input', function() {
const searchValue = searchBar.value.toLowerCase();

if (document.querySelector('.route__card').style.display = 'block')
  document.querySelector('.route__card').style.marginTop = '100px' 

cards.forEach(card => {
    const cardName = card.querySelector('#card_name').textContent.toLowerCase();
    if (!cardName.includes(searchValue)) {                                     
        card.style.display = 'none';
      } 
    else {
        card.style.display = "block";
        if (window.matchMedia('(max-width: 414px)').matches)
          document.querySelector('.route__card-wrapper').style.marginTop = '0'     
    }
    if (!cardName.includes(searchValue)) {
      document.querySelector('.route__sorted').style.display = "none";    
    } else {
      document.querySelector('.route__sorted').style.display = "block";
    }
});
});