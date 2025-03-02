window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
window.addEventListener('scroll', revealElements);

function revealElements() {
    const elements = document.querySelectorAll('.feature-card, .program-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if(elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial call to check elements on page load
revealElements();

// Main Carousel Functionality
const mainCarousel = {
    currentSlide: 0,
    slides: document.querySelectorAll('.carousel-slide'),
    nav: document.querySelector('.carousel-nav'),
    
    init() {
        // Create indicators
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-indicator');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.nav.appendChild(dot);
        });
        
        // Add button listeners
        document.querySelector('.carousel-button.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.carousel-button.next').addEventListener('click', () => this.nextSlide());
        
        // Start autoplay
        this.startAutoplay();
    },
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        document.querySelectorAll('.carousel-indicator')[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        document.querySelectorAll('.carousel-indicator')[this.currentSlide].classList.add('active');
    },
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    },
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    },
    
    startAutoplay() {
        setInterval(() => this.nextSlide(), 5000);
    }
};

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mainCarousel.init();
});


// Mobile Menu Functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close menu after clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});