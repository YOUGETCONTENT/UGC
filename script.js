// ===== PAGE LOAD ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to body for stagger effects
    document.body.classList.add('loaded');
    
    // Initialize all interactive features
    initializeNavigation();
    initializeButtons();
    initializeScrollAnimations();
    initializeHoverEffects();
    trackPageView();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#contact' && href !== '#') {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    // Add scroll animation
                    section.scrollIntoView({ behavior: 'smooth' });
                    
                    // Add pulse effect to section
                    section.style.animation = 'pulse 0.5s ease-out';
                }
            }
        });
    });
}

// ===== BUTTON INTERACTIONS =====
function initializeButtons() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(e, this);
            
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('contact') || buttonText.includes('book')) {
                handleCTA('Contact inquiry from button click');
            } else if (buttonText.includes('apply')) {
                handleCTA('Creator application');
            } else if (buttonText.includes('see our work')) {
                handleCTA('Portfolio view request');
            } else if (buttonText.includes('get started') || buttonText.includes("let's talk")) {
                handleCTA('Pricing package interest');
            }
        });
        
        // Add hover animation to buttons
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
}

// ===== RIPPLE EFFECT FOR BUTTONS =====
function createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;
    
    if (!button.style.position || button.style.position === 'static') {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    }
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible animation class
                entry.target.classList.add('animate-in');
                
                // Add staggered animations to children
                if (entry.target.children.length > 0) {
                    Array.from(entry.target.children).forEach((child, index) => {
                        child.style.animationDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);

    // Observe various elements
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .pricing-card, .step, .hero-text, .creators-text'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// ===== HOVER EFFECTS =====
function initializeHoverEffects() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(255, 85, 68, 0.2)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Pricing cards hover effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px)';
            }
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// ===== CTA HANDLER =====
function handleCTA(action) {
    console.log('User action:', action);
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'user_action', {
            'action_type': action
        });
    }
    
    // Show notification
    showNotification('Thank you! We\'ll be in touch shortly.');
}

// ===== PAGE VIEW TRACKING =====
function trackPageView() {
    console.log('Page view tracked');
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view');
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF5544 0%, #e63d2f 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 10px 30px rgba(255, 85, 68, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals/notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// ===== RESIZE HANDLER FOR RESPONSIVE ANIMATIONS =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Window resized - animations adjusted');
    }, 250);
});

// ===== PERFORMANCE MONITORING =====
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    }
}

// Log performance after page load
window.addEventListener('load', logPerformance);
