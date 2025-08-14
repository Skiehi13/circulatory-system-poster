// Veterinary Science Poster Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for any anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Add intersection observer for sections to highlight active section
    function initSectionObserver() {
        const sections = document.querySelectorAll('.species-section');
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -20% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, options);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Add hover effects for images
    function initImageEffects() {
        const images = document.querySelectorAll('.species-image, .diagram-image');
        
        images.forEach(image => {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Add loading animation
    function initLoadingAnimation() {
        const sections = document.querySelectorAll('.species-section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Add print functionality
    function initPrintButton() {
        // Create print button
        const printButton = document.createElement('button');
        printButton.textContent = 'Print Poster';
        printButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            z-index: 1000;
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
    }
    
    // Initialize all features
    initSmoothScrolling();
    initSectionObserver();
    initImageEffects();
    initLoadingAnimation();
    initPrintButton();

    // Fullscreen and scroll toggle button functionality
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const scrollToggleBtn = document.getElementById('scroll-toggle-btn');
    const posterContainer = document.querySelector('.poster-container');

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                fullscreenBtn.textContent = 'Exit Fullscreen';
            }).catch(err => {
                alert(`Error entering fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen().then(() => {
                fullscreenBtn.textContent = 'Enter Fullscreen';
            });
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            fullscreenBtn.textContent = 'Enter Fullscreen';
        }
    });

    // Scroll toggle
    scrollToggleBtn.addEventListener('click', () => {
        if (posterContainer.classList.contains('no-scroll')) {
            posterContainer.classList.remove('no-scroll');
            scrollToggleBtn.textContent = 'Disable Scroll';
        } else {
            posterContainer.classList.add('no-scroll');
            scrollToggleBtn.textContent = 'Enable Scroll';
        }
    });

    // Initialize scroll toggle button text
    posterContainer.classList.remove('no-scroll');
    scrollToggleBtn.textContent = 'Disable Scroll';

    // Image click-to-enlarge overlay
    const overlay = document.createElement('div');
    overlay.classList.add('image-overlay');
    document.body.appendChild(overlay);

    const enlargedImg = document.createElement('img');
    overlay.appendChild(enlargedImg);

    // Show overlay with clicked image
    function showOverlay(e) {
        enlargedImg.src = e.target.src;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    // Hide overlay on click
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
    });

    // Add click event to all species and diagram images
    const images = document.querySelectorAll('.species-image, .diagram-image');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', showOverlay);
    });

    // Console log for debugging
    console.log('Veterinary Science Poster loaded successfully with fullscreen and image enlarge features!');
});
