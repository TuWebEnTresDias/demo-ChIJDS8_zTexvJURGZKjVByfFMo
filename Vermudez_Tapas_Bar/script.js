/* ==========================================
   VERMÚDEZ TAPAS BAR - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger
        const bars = this.querySelectorAll('.menu-bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            const bars = menuToggle.querySelectorAll('.menu-bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // MENU TABS
    // ==========================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            menuTabs.forEach(t => t.classList.remove('active'));
            menuContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            const content = document.getElementById(tabId);
            if (content) {
                content.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
    
    // ==========================================
    // FORM SUBMISSION TO WHATSAPP
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('es-AR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Build WhatsApp message
            let whatsappMessage = `Hola! Soy ${name} y quiero hacer una reserva:\n\n`;
            whatsappMessage += `📅 Fecha: ${formattedDate}\n`;
            whatsappMessage += `🕐 Hora: ${time}\n`;
            whatsappMessage += `👥 Personas: ${guests}\n`;
            
            if (message) {
                whatsappMessage += `📝 Mensaje: ${message}\n`;
            }
            
            whatsappMessage += `\nMi teléfono: ${phone}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp
            window.open(`https://wa.me/01166494513?text=${encodedMessage}`, '_blank');
        });
    }
    
    // ==========================================
    // LAZY LOADING FOR IMAGES
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==========================================
    // PARALLAX EFFECT ON HERO
    // ==========================================
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrolled < heroHeight) {
                heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // ==========================================
    // GALLERY HOVER EFFECT
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay').style.opacity = '0';
        });
    });
    
    // ==========================================
    // TESTIMONIALS CAROUSEL (Auto-rotate)
    // ==========================================
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = '0.5';
            testimonial.style.transform = 'scale(0.98)';
        });
        
        testimonials[currentTestimonial].style.opacity = '1';
        testimonials[currentTestimonial].style.transform = 'scale(1)';
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    
    // Initial state
    if (testimonials.length > 0) {
        testimonials[0].style.opacity = '1';
        testimonials[0].style.transform = 'scale(1)';
        
        // Auto-rotate every 5 seconds
        setInterval(rotateTestimonials, 5000);
    }
    
    // ==========================================
    // COUNTER ANIMATION FOR STATS
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString('es-AR');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('es-AR');
            }
        }
        
        updateCounter();
    }
    
    // ==========================================
    // TYPING EFFECT FOR HERO TITLE
    // ==========================================
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--color-secondary)';
        
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 40px;
        height: 40px;
        background-color: var(--color-secondary);
        color: var(--color-primary);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        font-size: 1.25rem;
        font-weight: bold;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ==========================================
    // PRELOADER
    // ==========================================
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
    
    // ==========================================
    // MENU ITEM HOVER SOUND EFFECT (Optional)
    // ==========================================
    // Uncomment to add subtle hover sounds
    /*
    const menuItems = document.querySelectorAll('.menu-item');
    const hoverSound = new Audio('data:audio/wav;base64,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";
    */
    
    // ==========================================
    // SMOOTH REVEAL ON SCROLL
    // ==========================================
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Add any scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    console.log('Vermúdez Tapas Bar - Landing Page initialized');
    
});