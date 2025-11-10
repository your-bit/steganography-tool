// Theme initialization and effects
class ThemeManager {
    constructor() {
        this.initSmoothScrolling();
        this.initLoadingStates();
        this.initMethodCards();
    }

    initSmoothScrolling() {
        // Smooth scrolling for navigation links
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
    }

    initLoadingStates() {
        // Add loading states to buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('primary-btn') || 
                e.target.closest('.primary-btn') ||
                e.target.classList.contains('secondary-btn') ||
                e.target.closest('.secondary-btn')) {
                this.addRippleEffect(e);
            }
        });
    }

    initMethodCards() {
        // Add hover effects to method cards
        const methodCards = document.querySelectorAll('.method-card');
        methodCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('active')) {
                    card.style.transform = 'translateY(-5px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    card.style.transform = 'translateY(0)';
                }
            });
        });
    }

    addRippleEffect(event) {
        const button = event.target.closest('.primary-btn, .secondary-btn');
        if (!button) return;

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (circle.parentElement === button) {
                button.removeChild(circle);
            }
        }, 600);
    }
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 600ms linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .primary-btn, .secondary-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
