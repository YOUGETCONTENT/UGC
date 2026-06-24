// Smooth scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target);
            entry.target.style.animationDelay = `${delay * 0.1}s`;
            entry.target.classList.add('reveal-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with reveal-animate class
document.querySelectorAll('.reveal-animate').forEach(el => {
    observer.observe(el);
});

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Counter animation for stats
const counterElements = document.querySelectorAll('.counter');
const startCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

// Scroll animations for interactive elements
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const phone = document.querySelector('.floating-phone');
    if (phone) {
        phone.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation delay to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Add animation delay to pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Add animation delay to why cards
const whyCards = document.querySelectorAll('.why-card');
whyCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// Hover effect for interactive elements
const interactiveElements = document.querySelectorAll('.btn, .service-card, .pricing-card, .why-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Mobile menu toggle (if needed in future)
const handleMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
};

window.addEventListener('resize', handleMobileMenu);
handleMobileMenu();

// Intersection observer for lazy loading animations
const lazyElements = document.querySelectorAll('[class*="reveal"]');
const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

lazyElements.forEach(el => lazyObserver.observe(el));

// Performance optimization - throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll animations
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('UGC Landing Page Loaded');
    
    // Trigger initial animations
    document.querySelectorAll('.reveal-animate').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});