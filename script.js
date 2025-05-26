// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add typing effect to the main title
    const title = document.querySelector('.profile-info h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Add hover effects to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.addEventListener('mouseenter', () => {
            category.style.background = `linear-gradient(135deg, hsl(${index * 60}, 70%, 95%) 0%, hsl(${index * 60 + 30}, 70%, 90%) 100%)`;
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.background = 'white';
        });
    });

    // Add progress animation to education items
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.classList.add('animate-slide-in');
    });

    // Add click animations to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'scale(1.02)';
            }, 150);
        });
    });

    // Add scroll progress indicator
    const createScrollIndicator = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #3498db, #e74c3c);
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    createScrollIndicator();

    // Add contact link interactions
    const contactLinks = document.querySelectorAll('.contact-info a');
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            link.style.position = 'relative';
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add dynamic background to header
    const header = document.querySelector('header');
    if (header) {
        let mouseX = 0;
        let mouseY = 0;
        
        header.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            header.style.background = `linear-gradient(${mouseX * 360}deg, 
                hsl(${210 + mouseX * 30}, ${60 + mouseY * 20}%, ${25 + mouseY * 10}%) 0%, 
                hsl(${220 + mouseX * 20}, ${50 + mouseY * 15}%, ${30 + mouseY * 8}%) 100%)`;
        });
        
        header.addEventListener('mouseleave', () => {
            header.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        });
    }

    // Add certificate click tracking
    const certificationItems = document.querySelectorAll('.certifications li');
    certificationItems.forEach((cert, index) => {
        cert.addEventListener('click', () => {
            console.log(`Certification clicked: ${cert.textContent}`);
            // Add visual feedback
            cert.style.background = '#d4edda';
            setTimeout(() => {
                cert.style.background = 'white';
            }, 1000);
        });
    });

    // Add enhanced project interaction
    const techStacks = document.querySelectorAll('.tech-stack');
    techStacks.forEach(stack => {
        const technologies = stack.textContent.split('Tech Stack: ')[1].split(', ');
        
        stack.addEventListener('mouseenter', () => {
            stack.title = `Technologies used: ${technologies.join(', ')}`;
        });
    });

    // Performance optimization: Lazy load animations
    const lazyAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                lazyAnimationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Apply lazy animation to all animated elements
    document.querySelectorAll('.education-item, .project-item, .skill-category').forEach(el => {
        lazyAnimationObserver.observe(el);
    });
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .animate-slide-in {
        animation: slideInLeft 0.6s ease-out forwards;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
