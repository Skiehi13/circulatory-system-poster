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
                this.style.transform = 'scale(1.05)';
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
    
    // Console log for debugging
    console.log('Veterinary Science Poster loaded successfully!');
});
