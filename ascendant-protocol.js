/**
 * ASCENDANT PROTOCOL - Scroll Reveal Animations
 * Handles vertical beam hero section scroll-based text reveal
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        observerOptions: {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        }
    };

    // State
    let doorOpened = false;

    /**
     * Initialize all animations
     */
    function init() {
        initClickReveal();
        initIntersectionObserver();
    }

    /**
     * Door crumbling effect on click anywhere
     */
    function initClickReveal() {
        const doorLeft = document.querySelector('.door-left');
        const doorRight = document.querySelector('.door-right');
        const initialBranding = document.querySelector('.initial-branding');
        const revealedContent = document.querySelector('.revealed-content');
        const heroSection = document.querySelector('.hero-beam');

        if (!doorLeft || !doorRight || !initialBranding || !revealedContent || !heroSection) return;

        // Listen for clicks anywhere in the hero section
        heroSection.addEventListener('click', () => {
            if (doorOpened) return;

            // Trigger crumbling animation
            doorLeft.classList.add('crumbling');
            doorRight.classList.add('crumbling');

            // Fade out branding
            initialBranding.classList.add('fade-out');

            // Show revealed content after brief delay
            setTimeout(() => {
                revealedContent.classList.add('visible');

                // After animation, remove doors from DOM
                setTimeout(() => {
                    doorLeft.style.display = 'none';
                    doorRight.style.display = 'none';
                }, 1200);
            }, 300);

            doorOpened = true;
        });

        // Also add cursor pointer style to hero when doors are closed
        heroSection.style.cursor = 'pointer';
    }

    /**
     * Intersection Observer for other sections
     * Animates elements as they come into viewport
     */
    function initIntersectionObserver() {
        // Elements to observe
        const observeElements = document.querySelectorAll(
            '.qual-point, .protocol-phase, .framework-content, .cta-content'
        );

        if (!observeElements.length) return;

        // Set initial state for qual-points
        document.querySelectorAll('.qual-point').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });

        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation
                    requestAnimationFrame(() => {
                        entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });

                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, CONFIG.observerOptions);

        // Observe all elements
        observeElements.forEach(el => observer.observe(el));
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Don't prevent default for empty hash
                if (href === '#') return;

                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Parallax effect for beam glow (subtle)
     */
    function initBeamParallax() {
        const beamGlow = document.querySelector('.beam-glow');
        if (!beamGlow) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.15;

            // Subtle parallax movement (very gentle)
            beamGlow.style.transform = `translate(-50%, ${scrolled * parallaxSpeed}px)`;
        });
    }

    /**
     * Performance optimization: Throttle scroll events
     */
    function throttle(func, wait) {
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

    /**
     * Add performance monitoring (optional - for debugging)
     */
    function addPerformanceMonitoring() {
        if (window.location.search.includes('debug')) {
            console.log('Ascendant Protocol - Debug Mode Enabled');
        }
    }

    /**
     * Initialize everything when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Initialize additional features
    initSmoothScroll();
    initBeamParallax();
    addPerformanceMonitoring();

})();
