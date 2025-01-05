// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Initialize Particles.js
particlesJS('particles-js',
    {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#3b82f6", "#8b5cf6", "#60a5fa"]
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#60a5fa",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            }
        },
        "retina_detect": true
    }
);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Email forwarding setup
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// Optional: Add email notification when someone clicks the email link
const emailLink = document.querySelector('a[href^="mailto:"]');
emailLink.addEventListener('click', () => {
    // You can add analytics tracking here
    console.log('Email link clicked');
});

// Create pointer elements
const pointer = document.createElement('div');
pointer.className = 'custom-pointer';

const pointerBase = document.createElement('div');
pointerBase.className = 'pointer-base';

const pointerInner = document.createElement('div');
pointerInner.className = 'pointer-inner';

// Construct pointer
pointer.appendChild(pointerBase);
pointer.appendChild(pointerInner);
document.body.appendChild(pointer);

// Basic pointer movement
document.addEventListener('mousemove', (e) => {
    pointer.style.left = e.clientX + 'px';
    pointer.style.top = e.clientY + 'px';
});

// Special handling for buttons
const defaultCursorElements = document.querySelectorAll(`
    .btn-primary, 
    .btn-secondary,
    a[href*="resume.pdf"],
    a[href="#work"]
`);

defaultCursorElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        pointer.classList.add('button-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        pointer.classList.remove('button-hover');
    });
});

// Regular interactive elements
const interactiveElements = document.querySelectorAll('a:not([href*="resume.pdf"]):not([href="#work"]), button:not(.btn-primary):not(.btn-secondary)');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        pointer.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        pointer.classList.remove('hover');
    });
});

// Handle window events
document.addEventListener('mouseleave', () => {
    pointer.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    pointer.style.opacity = '1';
});

// Disable on touch devices
if ('ontouchstart' in window) {
    pointer.style.display = 'none';
    document.body.style.cursor = 'auto';
}