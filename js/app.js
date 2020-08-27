/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/*
 * init
*/

/**
 * Define Global Variables
 * 
*/

const navbar__menu = document.querySelector('.navbar__menu');
const navbar__list = document.getElementById('navbar__list');
const landing_img = document.querySelectorAll('.landing_img');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const fragment = document.createDocumentFragment();
const main = document.getElementById('main');
const goToTopButton = document.querySelector('.goToTopButton');

let lastScrollTop = 0;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

const nav_list_item = ['ORNN','MAOKAI','SHEN'];
const images = ['./img/Ornn.jpg','./img/Maokai.jpg','./img/Shen.jpg'];

initNav();
initImg();
initSectionEvent();

// build the nav
function initNav() {

    // nav_list_item.forEach(function(nav_item) {
    for (let index = 0; index < nav_list_item.length; index++) {
        const li = document.createElement('li');
        const alink = document.createElement('a');
        alink.href = `#section${index+1}`;
        alink.textContent = nav_list_item[index];
        alink.style.textDecoration = 'none';
        alink.style.color = 'white';
        li.classList.add('navitem_style');
        li.appendChild(alink);
        fragment.appendChild(li);
    }
    navbar__list.appendChild(fragment);
}

function initImg() {
    
    for (let index = 0; index < landing_img.length; index++) {
        const image_item = document.createElement('img');
        image_item.classList.add('image_style_item');
        image_item.src = `${images[index]}`;
        landing_img[index].appendChild(image_item);
    }
}

function initSectionEvent() {
    section1.addEventListener('click',function() {
        smoothScroll('section1', 1000);
    });
    section2.addEventListener('click',function() {
        smoothScroll('section2', 1000);
    });
    section3.addEventListener('click',function() {
        smoothScroll('section3', 1000);
    });
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

smoothScroll('section1',1000);

window.addEventListener("scroll", function(){

    let scrollTop = window.pageXOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // navbar__menu.style.top = "-80";
        navbar__menu.classList.add('hide');
        navbar__menu.classList.remove('show');
        goToTopButton.classList.add("active");
    } else {
        // navbar__menu.style.top = "0";
        navbar__menu.classList.remove('hide');
        navbar__menu.classList.add('show');
        goToTopButton.classList.remove("active");
    }
    lastScrollTop = scrollTop;
});

// Scroll to section on link click

function smoothScroll(target,duration) {
    const sectiontarget = document.getElementById(target);
    const targetPosition = sectiontarget.getBoundingClientRect();
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime; 
        let run = ease(timeElapsed, startPosition,distance,duration);   
        window.scrollTo(0,run);
        if(timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t,b,c,d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}

smoothScroll('section3',1000);

/*
    Delay load until all of conetent are loaded ???
*/

// document.addEventListener('DOMContentLoaded', init);