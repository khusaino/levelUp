// слайдер

const swiper = new Swiper('.swiper-container',{
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
  },
  breakpoints: {
    575: {
      slidesPerView: 2,
    },
    1024:{
      slidesPerView: 3,
    }
  }


});


// таймер

const getTimeRemaining = (endtime) => {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
 
const initializeClock = (className, endtime) => {
  let clock = document.querySelector(className);
  let daysSpan = clock.querySelector('.days');
  let hoursSpan = clock.querySelector('.hours');
  let minutesSpan = clock.querySelector('.minutes');
  let secondsSpan = clock.querySelector('.seconds');
 
  const updateClock = () => {
    let t = getTimeRemaining(endtime);
 
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
 
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
 
  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}
 
let deadline = new Date(Date.parse(new Date()) + 2 * 20 * 60 * 60 * 1000); 
initializeClock('.footer__timer', deadline);

// скролл

const scroll = (startElements, finishElement) => {
  let start = document.querySelectorAll(startElements);
  let finish = document.querySelector(finishElement);
  console.log(finish)
  let result;

  start.forEach(elem => {
    elem.addEventListener('click', function(){
      console.dir(this)
      result = finish.offsetTop - this.offsetTop + window.innerHeight;
      window.scrollBy({
        top: result,
        behavior: 'smooth',
      })
    })
  })
}
scroll('.order', ".form")

// focus
const focusVisible = (selectorFocusElements, selectorHiddenElements) => {
  const focusElements = document.querySelectorAll(selectorFocusElements);
  const hiddenElements = document.querySelectorAll(selectorHiddenElements)

  for(let i = 0; i < focusElements.length; i++){
    focusElements[i].addEventListener('focus', function(){
      hiddenElements[i].classList.add('form__prompt--active')
      console.dir(hiddenElements[i])
    })
    focusElements[i].addEventListener('blur', function(){
      hiddenElements[i].classList.remove('form__prompt--active')
    })
  }

}
focusVisible('.form__input', '.form__prompt')

// валидация номера

const phone = document.querySelector('.form__phone')
phone.addEventListener('input', function(){
  this.value = this.value.replace(/[^\d.]/g, '')
})