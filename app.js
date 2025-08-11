// JavaScript for Comparative Circulatory Systems Poster

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeImageZoom();
    initializePrintFunctionality();
    initializeScrollEffects();
    initializeAccessibility();
});

// Image zoom functionality
function initializeImageZoom() {
    const diagrams = document.querySelectorAll('.anatomy-diagram');
    
    diagrams.forEach(diagram => {
        diagram.style.cursor = 'pointer';
        diagram.addEventListener('click', function() {
            zoomImage(this);
        });
    });
}

function zoomImage(img) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close image">&times;</button>
                <img src="${img.src}" alt="${img.alt}" class="zoomed-image">
                <p class="image-caption">${img.alt}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
    
    function closeModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }
    
    // Focus on close button for accessibility
    closeBtn.focus();
}

// Print functionality
function initializePrintFunctionality() {
    // Add print button to header
    const header = document.querySelector('.poster-header');
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn--secondary print-btn';
    printBtn.innerHTML = '🖨️ Print Poster';
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    header.appendChild(printBtn);
}

// Smooth scroll effects and animations
function initializeScrollEffects() {
    const cards = document.querySelectorAll('.species-card');
    
    // Add intersection observer for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.classList.add('fade-out');
        observer.observe(card);
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Add keyboard navigation for species cards
    const cards = document.querySelectorAll('.species-card');
    
    cards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        card.setAttribute('aria-label', `Species ${index + 1}: ${card.querySelector('.species-name').textContent}`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const diagram = card.querySelector('.anatomy-diagram');
                if (diagram) {
                    zoomImage(diagram);
                }
            }
        });
    });
    
    // Add skip link for better navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.addEventListener('focus', function() {
        this.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', function() {
        this.classList.add('sr-only');
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const main = document.querySelector('main');
    main.id = 'main-content';
}

// Utility function for smooth scrolling
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add dynamic styles for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
    
    .modal-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--space-20);
    }
    
    .modal-content {
        position: relative;
        background-color: var(--color-surface);
        border-radius: var(--radius-lg);
        padding: var(--space-24);
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: var(--shadow-lg);
    }
    
    .modal-close {
        position: absolute;
        top: var(--space-8);
        right: var(--space-8);
        background: none;
        border: none;
        font-size: var(--font-size-3xl);
        color: var(--color-text-secondary);
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-full);
        transition: background-color var(--duration-fast) var(--ease-standard);
    }
    
    .modal-close:hover {
        background-color: var(--color-secondary);
        color: var(--color-text);
    }
    
    .modal-close:focus {
        outline: var(--focus-outline);
    }
    
    .zoomed-image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
        border-radius: var(--radius-base);
        margin-bottom: var(--space-16);
    }
    
    .image-caption {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        text-align: center;
        margin: 0;
        font-style: italic;
    }
    
    .print-btn {
        margin-top: var(--space-16);
        font-size: var(--font-size-sm);
        padding: var(--space-6) var(--space-12);
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px;
        text-decoration: none;
        border-radius: var(--radius-sm);
        z-index: 1000;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    @media print {
        .print-btn {
            display: none;
        }
        
        .image-modal {
            display: none;
        }
    }
`;

document.head.appendChild(dynamicStyles);