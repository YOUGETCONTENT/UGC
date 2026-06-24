// Mobile Menu Toggle (if needed for smaller screens)
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior for nav links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#contact' && href !== '#') {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Button interactions
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
    });

    // Scroll animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.service-card, .pricing-card, .step');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Analytics tracking (basic example)
    trackPageView();
});

// CTA Handler
function handleCTA(action) {
    console.log('User action:', action);
    
    // Example: Send to analytics or API
    // You can integrate with Google Analytics, Mixpanel, or your own backend
    if (typeof gtag !== 'undefined') {
        gtag('event', 'user_action', {
            'action_type': action
        });
    }
    
    // Show feedback to user
    showNotification('Thank you! We\'ll be in touch shortly.');
}

// Page View Tracking
function trackPageView() {
    console.log('Page view tracked');
    // Integrate with your analytics tool
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view');
    }
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #FF5544;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
