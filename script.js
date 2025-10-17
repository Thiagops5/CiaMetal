// Lógica do Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lógica do Menu Mobile
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (menuButton) {
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
}

const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// Lógica do Carrossel
const carouselContent = document.querySelector('.carousel-content');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const items = document.querySelectorAll('.carousel-item');

window.currentIndex = 0;
window.totalItems = items.length;

function updateCarousel() {
    if (items.length === 0) return;
    const itemWidth = items[0].offsetWidth;
    if (carouselContent) {
        carouselContent.style.transform = `translateX(-${window.currentIndex * itemWidth}px)`;
    }
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        window.currentIndex = (window.currentIndex + 1) % window.totalItems;
        updateCarousel();
    });
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        window.currentIndex = (window.currentIndex - 1 + window.totalItems) % window.totalItems;
        updateCarousel();
    });
}

// Opcional: auto-play e ajuste de resize
setInterval(() => {
    if (window.totalItems > 0) {
        window.currentIndex = (window.currentIndex + 1) % window.totalItems;
        updateCarousel();
    }
}, 5000);

window.addEventListener('resize', updateCarousel);