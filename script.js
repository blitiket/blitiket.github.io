// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

mobileMenuBtn.addEventListener('click', () => {
    const isActive = mainNav.classList.contains('active');
    mobileMenuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (!isActive) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
    mainNav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lottie Animation (Simple placeholder - you can add lottie-web library for real animation)
const lottieContainer = document.getElementById('lottieAnimation');
if (lottieContainer) {
    // Create a simple forklift icon animation placeholder
    const iconSize = window.innerWidth <= 480 ? '90px' : window.innerWidth <= 768 ? '100px' : '120px';
    lottieContainer.innerHTML = `<i class="fas fa-forklift" style="font-size: ${iconSize}; color: white;"></i>`;
    
    // Add animation
    lottieContainer.style.animation = 'bounce 2s ease-in-out infinite';
    
    // Update size on resize
    window.addEventListener('resize', () => {
        const newSize = window.innerWidth <= 480 ? '90px' : window.innerWidth <= 768 ? '100px' : '120px';
        const icon = lottieContainer.querySelector('i');
        if (icon) icon.style.fontSize = newSize;
    });
}

// PDF Preview Renderer
function renderPDFPreview() {
    // Set worker path for PDF.js
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        const thumbnails = document.querySelectorAll('.katalog-thumbnail[data-pdf]');
        
        thumbnails.forEach(thumbnail => {
            const pdfPath = thumbnail.getAttribute('data-pdf');
            const canvas = thumbnail.querySelector('.pdf-canvas');
            const loading = thumbnail.querySelector('.pdf-loading');
            
            if (!canvas || !pdfPath) return;
            
            // Load PDF
            pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
                // Get first page
                return pdf.getPage(1);
            }).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });
                const context = canvas.getContext('2d');
                
                // Set canvas dimensions
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                // Render PDF page
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                return page.render(renderContext).promise;
            }).then(() => {
                // Hide loading spinner
                thumbnail.classList.add('loaded');
            }).catch(error => {
                console.error('Error loading PDF:', error);
                // Show error icon
                thumbnail.innerHTML = '<i class="fas fa-file-pdf"></i>';
            });
        });
    }
}

// Initialize PDF preview when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderPDFPreview();
});

// Katalog Carousel
const katalogTrack = document.getElementById('katalogTrack');
const prevKatalog = document.getElementById('prevKatalog');
const nextKatalog = document.getElementById('nextKatalog');

if (katalogTrack && prevKatalog && nextKatalog) {
    let currentPosition = 0;
    const itemWidth = katalogTrack.querySelector('.katalog-item').offsetWidth + 20; // width + gap
    const visibleItems = 4;
    const totalItems = katalogTrack.querySelectorAll('.katalog-item').length;
    const maxPosition = -(totalItems - visibleItems) * itemWidth;

    nextKatalog.addEventListener('click', () => {
        if (currentPosition > maxPosition) {
            currentPosition -= itemWidth;
            katalogTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    prevKatalog.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            katalogTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });
}

// WhatsApp Modal
const whatsappModal = document.getElementById('whatsappModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const openModalButtons = document.querySelectorAll('.open-whatsapp-modal');

// Open modal
openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        whatsappModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    whatsappModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && whatsappModal.classList.contains('active')) {
        closeModal();
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form removed - no form handling needed

// Animate on Scroll
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

// Elements to animate
const animateElements = document.querySelectorAll('.category-card, .product-card, .service-card, .article-card, .stat-card, .info-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const number = parseInt(target.replace(/\D/g, ''));
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < number) {
            element.textContent = Math.floor(current) + (isPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Product Card Hover Effect
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Category Card Hover Effect
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.category-icon');
        icon.style.transform = 'rotate(360deg) scale(1.1)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.category-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Remove duplicate header scroll effect (already added above)

// Lazy Loading for Images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Console welcome message
console.log('%c Welcome to Indonesia Forklift Website! ', 'background: #ff6b00; color: white; font-size: 16px; padding: 10px;');
console.log('%c Built with ❤️ using Native HTML, CSS, and JavaScript ', 'color: #666; font-size: 12px;');

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});
