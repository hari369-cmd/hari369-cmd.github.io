/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
  const header = document.getElementbyId('header')
  //When scroll > 50 viewport height, add scroll-header class to the header tag
  if(this.scrollY >= 50) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER PUBLICATIONS ===============*/
let swiperPublications = new Swiper(".publications__container", {
  loop: false,
  direction: "vertical",
  slidesPerView: 2,
  spaceBetween: 30,
  freeMode: true,
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*=============== PUBLICATION MODEL ===============*/
const modelViews = document.querySelectorAll('.publications__model'),
      modelBtns = document.querySelectorAll('.publications__button'),
      modelClose = document.querySelectorAll('.publications__model-close')

let model = function(modelClick){
  modelViews[modelClick].classList.add("active-model")
}

modelBtns.forEach((mb, i) => {
  mb.addEventListener('click', () => {
    model(i)
  })
});

modelClose.forEach((mc, i) => {
  mc.addEventListener('click', () =>{
    modelViews.forEach((mv) => {
      mv.classList.remove('active-model')
    });
  })

});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]")

function scrollActive(){
  const scrollY = window.pageYOffset

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
    sectionTop = current.offsetTop - 58,
    sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
    }else{
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr= ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
})

sr.reveal(".home__data")
sr.reveal(".home__handle", {delay: 700})
sr.reveal(".home__social, .home__scroll", {delay: 900, origin: "bottom"})
