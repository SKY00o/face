// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add click animation
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.5)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideInUp 0.6s ease-out';
        }
    });
}, observerOptions);

// Observe feature cards and service cards
document.querySelectorAll('.feature-card, .service-card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Counter animation for stats
const statsSection = document.querySelector('.stats-section');
let statsAnimated = false;

window.addEventListener('scroll', () => {
    if (statsSection && !statsAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animateCounters();
            statsAnimated = true;
        }
    }
});

function animateCounters() {
    const statCards = document.querySelectorAll('.stat-card h3');
    statCards.forEach(card => {
        const finalValue = parseInt(card.textContent);
        const isNumber = !isNaN(finalValue);
        
        if (isNumber) {
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    card.textContent = finalValue + '+';
                    clearInterval(interval);
                } else {
                    card.textContent = Math.floor(currentValue) + '+';
                }
            }, 30);
        }
    });
}

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Console message
console.log('%cWelcome to Our Website!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('Built with ❤️ using HTML, CSS & JavaScript');
