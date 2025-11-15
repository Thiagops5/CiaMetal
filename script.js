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

updateCarousel();

function updateCarousel() {
    if (items.length === 0) return;
    const itemWidth = items[0].offsetWidth;
    if (carouselContent) {
        carouselContent.style.transform = `translateX(-${window.currentIndex * itemWidth}px)`;
    }
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        // Descobre quantos itens estão visíveis (1, 2, ou 3)
        const containerWidth = document.querySelector('.carousel').offsetWidth;
        const itemWidth = items[0].offsetWidth;
        const itemsPerPage = (itemWidth > 0) ? Math.round(containerWidth / itemWidth) : 1;
        
        // Calcula qual é o último índice "completo"
        const maxIndex = Math.max(0, window.totalItems - itemsPerPage);
        
        if (window.currentIndex >= maxIndex) {
            window.currentIndex = 0; // Se estiver no fim, volta ao início
        } else {
            window.currentIndex = window.currentIndex + 1; // Avança
        }
        updateCarousel();
    });
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        if (window.currentIndex === 0) {
            // Descobre quantos itens estão visíveis
            const containerWidth = document.querySelector('.carousel').offsetWidth;
            const itemWidth = items[0].offsetWidth;
            const itemsPerPage = (itemWidth > 0) ? Math.round(containerWidth / itemWidth) : 1;
            
            // Calcula qual é o último índice "completo"
            const maxIndex = Math.max(0, window.totalItems - itemsPerPage);
            window.currentIndex = maxIndex; // Se estiver no início, vai para o fim
        } else {
            window.currentIndex = window.currentIndex - 1; // Recua
        }
        updateCarousel();
    });
}

// Lógica de Swipe 
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50; // Mínimo de 50px de "arrasto" para mudar

if (carouselContent) {
    carouselContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true }); // {passive: true} melhora a performance no mobile

    carouselContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    // Swipe para a esquerda (próxima imagem)
    if (touchStartX - touchEndX > swipeThreshold) {
        if (nextButton) nextButton.click();
    }

    // Swipe para a direita (imagem anterior)
    if (touchEndX - touchStartX > swipeThreshold) {
        if (prevButton) prevButton.click();
    }
}
//FIM: Lógica de Swipe

window.addEventListener('resize', updateCarousel);


document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


// --- INÍCIO: LÓGICA DO TOGGLE DE TEMA ---

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle-button');
    const mobileToggleButton = document.getElementById('theme-toggle-button-mobile');
    
    // Ícones de Sol e Lua (SVG)
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const mobileTextLight = 'Mudar para Modo Escuro';
    const mobileTextDark = 'Mudar para Modo Claro';

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if(toggleButton) toggleButton.innerHTML = moonIcon;
            if(mobileToggleButton) mobileToggleButton.innerHTML = mobileTextDark;
        } else {
            document.body.removeAttribute('data-theme');
            if(toggleButton) toggleButton.innerHTML = sunIcon;
            if(mobileToggleButton) mobileToggleButton.innerHTML = mobileTextLight;
        }
    }

    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    // Define o tema inicial
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Adiciona os eventos de clique
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }
    if (mobileToggleButton) {
        mobileToggleButton.addEventListener('click', () => {
             toggleTheme();
             // Também fecha o menu mobile ao clicar
             if(mobileMenu) mobileMenu.classList.remove('open');
        });
    }

    // Ouve mudanças no sistema operacional
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        // Só muda se o usuário não tiver uma preferência salva
        if (!localStorage.getItem('theme')) {
            applyTheme(newTheme);
        }
    });
});

// --- FIM: LÓGICA DO TOGGLE DE TEMA ---