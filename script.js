// ==========================================
// MODERN PORTFOLIO - GUSTAVO LIENDO
// Interactive JavaScript with Animations
// ==========================================

// ==========================================
// LOADING SCREEN
// ==========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                anime({
                    targets: loadingScreen,
                    opacity: [1, 0],
                    duration: 800,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        loadingScreen.style.display = 'none';
                        initAnimations();
                        AOS.init({
                            duration: 1000,
                            once: true,
                            offset: 100
                        });
                    }
                });
            }, 300);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
});

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrollTop > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// ==========================================
// MOBILE NAVIGATION
// ==========================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

// ==========================================
// 3D HERO CARD TILT EFFECT
// ==========================================
const heroCard = document.getElementById('heroCard');

if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        heroCard.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// ==========================================
// ANIME.JS SCROLL ANIMATIONS
// ==========================================
function initAnimations() {
    // Hero text animation
    anime({
        targets: '.hero-text h1 .title-line',
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(200),
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-subtitle',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 600,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.hero-stats',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 800,
        easing: 'easeOutExpo'
    });

    anime({
        targets: '.cta-buttons',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 1000,
        easing: 'easeOutExpo'
    });

    // Hero card animation
    anime({
        targets: '.hero-visual',
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: 400,
        easing: 'easeOutExpo'
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Stats counter animation
                if (target.classList.contains('stat-card') || target.classList.contains('stat-item')) {
                    const numberElements = target.querySelectorAll('.stat-number[data-target]');
                    numberElements.forEach(numberElement => {
                        const targetValue = parseInt(numberElement.getAttribute('data-target'));
                        
                        anime({
                            targets: numberElement,
                            innerHTML: [0, targetValue],
                            duration: 2000,
                            round: 1,
                            easing: 'easeOutExpo'
                        });
                    });

                    anime({
                        targets: target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }
                
                // Skill cards animation
                if (target.classList.contains('skill-card')) {
                    anime({
                        targets: target,
                        translateY: [80, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });

                    // Animate skill meter
                    const meterFill = target.querySelector('.meter-fill');
                    if (meterFill) {
                        const percent = meterFill.getAttribute('data-percent');
                        anime({
                            targets: meterFill,
                            width: [0, percent + '%'],
                            duration: 1500,
                            delay: 300,
                            easing: 'easeOutExpo'
                        });
                    }
                }

                // Project cards animation
                if (target.classList.contains('project-card')) {
                    anime({
                        targets: target,
                        translateY: [100, 0],
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                }

                // Timeline items animation
                if (target.classList.contains('timeline-item')) {
                    anime({
                        targets: target,
                        translateX: [-80, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                }

                // Generic data-animate elements
                if (target.hasAttribute('data-animate') && 
                    !target.classList.contains('stat-card') && 
                    !target.classList.contains('skill-card') && 
                    !target.classList.contains('project-card') &&
                    !target.classList.contains('timeline-item')) {
                    anime({
                        targets: target,
                        translateY: [60, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                }

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-animate], .stat-card, .stat-item, .skill-card, .project-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// FORM SUBMISSION WITH FORMSPREE
// ==========================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Get submit button
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        
        try {
            // Replace YOUR_FORM_ID with your actual Formspree form ID
            // To get a form ID: https://formspree.io/forms
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Hide form
                contactForm.style.display = 'none';
                
                // Show success message
                successMessage.style.display = 'block';
                
                anime({
                    targets: successMessage,
                    translateY: [-20, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutExpo'
                });
                
                // Reset form
                contactForm.reset();
                
                // Hide success message and show form again after 5 seconds
                setTimeout(() => {
                    anime({
                        targets: successMessage,
                        opacity: [1, 0],
                        duration: 400,
                        easing: 'easeOutExpo',
                        complete: () => {
                            successMessage.style.display = 'none';
                            contactForm.style.display = 'grid';
                            
                            // Reset button
                            submitBtn.disabled = false;
                            submitBtn.querySelector('span').textContent = originalText;
                            submitBtn.querySelector('i').className = 'fas fa-paper-plane';
                        }
                    });
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error sending form:', error);
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.querySelector('i').className = 'fas fa-paper-plane';
            
            // Show error message
            alert('There was an error sending your message. Please try again or contact me directly via email.');
        }
    });
}

// Alternative: If not using Formspree, you can use email mailto
// Uncomment this code and comment out the Formspree section above
/*
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const budget = document.getElementById('budget').value;
    const message = document.getElementById('message').value;
    
    const subject = encodeURIComponent(`Portfolio Contact: ${service}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Service: ${service}\n` +
        `Budget: ${budget}\n\n` +
        `Message:\n${message}`
    );
    
    window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
});
*/

// ==========================================
// VISITOR COUNTER
// ==========================================
function updateVisitorCount() {
    let visitors = parseInt(localStorage.getItem('visitorCount') || '0');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();
    
    // Count as new visit if more than 24 hours since last visit
    if (!lastVisit || (now - parseInt(lastVisit)) > 86400000) {
        visitors++;
        localStorage.setItem('visitorCount', visitors.toString());
        localStorage.setItem('lastVisit', now.toString());
    }
    
    // Animate the counter
    const visitorCountElement = document.getElementById('visitorCount');
    if (visitorCountElement) {
        anime({
            targets: visitorCountElement,
            innerHTML: [0, visitors],
            duration: 2000,
            round: 1,
            easing: 'easeOutExpo'
        });
    }
}

updateVisitorCount();

// ==========================================
// PARALLAX EFFECT ON SHAPES
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// TYPING EFFECT FOR CODE WINDOW
// ==========================================
function typeCode() {
    const codeElement = document.querySelector('.code-content code');
    if (!codeElement) return;
    
    const originalCode = codeElement.innerHTML;
    codeElement.innerHTML = '';
    
    let index = 0;
    const typingSpeed = 30;
    
    function type() {
        if (index < originalCode.length) {
            codeElement.innerHTML += originalCode.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start typing after page loads
    setTimeout(() => {
        type();
    }, 2000);
}

// Uncomment to enable typing effect
// typeCode();

// ==========================================
// PROJECT CARDS HOVER EFFECTS
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        anime({
            targets: this.querySelector('.project-gradient'),
            opacity: [0.9, 0.7],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });
    
    card.addEventListener('mouseleave', function() {
        anime({
            targets: this.querySelector('.project-gradient'),
            opacity: [0.7, 0.9],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });
});

// ==========================================
// SKILL CARDS INTERACTION
// ==========================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            anime({
                targets: icon,
                scale: [1, 1.1],
                rotate: [0, 10],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            anime({
                targets: icon,
                scale: [1.1, 1],
                rotate: [10, 0],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    });
});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==========================================
// EASTER EGG: KONAMI CODE
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Add some fun animation when Konami code is entered
    anime({
        targets: 'body',
        rotate: [0, 360],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
            alert('🎮 You found the secret! Keep being awesome! 🚀');
        }
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to heavy scroll operations
const debouncedParallax = debounce(() => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedParallax);

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log(
    '%c👋 Hey there, curious developer!',
    'color: #3b82f6; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cLike what you see? Let\'s connect!',
    'color: #8b5cf6; font-size: 14px;'
);
console.log(
    '%c🚀 GitHub: github.com/G-code7',
    'color: #10b981; font-size: 14px;'
);
console.log(
    '%c💼 LinkedIn: linkedin.com/in/gustavo-liendo-b5b668111',
    'color: #10b981; font-size: 14px;'
);

// ==========================================
// LOG LOADED STATUS
// ==========================================
console.log('%c✅ Portfolio Fully Loaded', 'color: #10b981; font-size: 16px; font-weight: bold;');