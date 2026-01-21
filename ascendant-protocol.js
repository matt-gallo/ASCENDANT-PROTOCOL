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

    const APPLICATION_QUESTIONS = [
        { id: 'readiness_1', section: 'Readiness & Agency', statement: 'I take responsibility for the current state of my life and health.' },
        { id: 'readiness_2', section: 'Readiness & Agency', statement: 'I believe I have agency even when circumstances are difficult.' },
        { id: 'readiness_3', section: 'Readiness & Agency', statement: 'I am willing to act without guarantees.' },
        { id: 'readiness_4', section: 'Readiness & Agency', statement: 'I do not expect anyone else to motivate or rescue me.' },
        { id: 'readiness_5', section: 'Readiness & Agency', statement: 'Discomfort does not automatically mean something is wrong.' },
        { id: 'authority_1', section: 'Authority & Independent Thought', statement: 'I am comfortable questioning experts, institutions, and consensus views.' },
        { id: 'authority_2', section: 'Authority & Independent Thought', statement: 'I trust my lived experience as a valid source of information.' },
        { id: 'authority_3', section: 'Authority & Independent Thought', statement: 'I have changed my mind about something important in recent years.' },
        { id: 'authority_4', section: 'Authority & Independent Thought', statement: 'I can tolerate uncertainty without rushing to certainty.' },
        { id: 'authority_5', section: 'Authority & Independent Thought', statement: 'I do not confuse compliance with safety.' },
        { id: 'comfort_1', section: 'Comfort, Identity & Attachment', statement: 'I suspect some of my habits are harming me.' },
        { id: 'comfort_2', section: 'Comfort, Identity & Attachment', statement: 'I continue certain behaviors even though I know they don\'t serve me.' },
        { id: 'comfort_3', section: 'Comfort, Identity & Attachment', statement: 'I am willing to question parts of my identity if necessary.' },
        { id: 'comfort_4', section: 'Comfort, Identity & Attachment', statement: 'I do not need to be right to feel secure.' },
        { id: 'comfort_5', section: 'Comfort, Identity & Attachment', statement: 'I am open to dismantling patterns before replacing them.' },
        { id: 'pattern_1', section: 'Pattern Awareness & Responsibility', statement: 'I can identify repeating patterns in my life.' },
        { id: 'pattern_2', section: 'Pattern Awareness & Responsibility', statement: 'I am willing to examine my role in outcomes I don\'t like.' },
        { id: 'pattern_3', section: 'Pattern Awareness & Responsibility', statement: 'I notice when I rationalize behavior instead of changing it.' },
        { id: 'pattern_4', section: 'Pattern Awareness & Responsibility', statement: 'I can sit with uncomfortable truths without avoiding them.' },
        { id: 'pattern_5', section: 'Pattern Awareness & Responsibility', statement: 'I do not need to be a victim to feel justified.' },
        { id: 'selection_1', section: 'Explicit Self-Selection', statement: 'I understand this is not medical care or therapy.' },
        { id: 'selection_2', section: 'Explicit Self-Selection', statement: 'I am not looking to be told what to do.' },
        { id: 'selection_3', section: 'Explicit Self-Selection', statement: 'I understand there are no guaranteed outcomes.' },
        { id: 'selection_4', section: 'Explicit Self-Selection', statement: 'I am prepared for my beliefs to be challenged.' },
        { id: 'selection_5', section: 'Explicit Self-Selection', statement: 'I am choosing this voluntarily, not out of fear or desperation.' },
        { id: 'commitment', section: 'Commitment', statement: 'Knowing everything above, how committed are you to proceeding anyway?' }
    ];

    /**
     * Initialize all animations
     */
    function init() {
        const heroSection = document.querySelector('.hero-beam');

        if (heroSection) {
            document.body.style.overflow = 'hidden';
            initClickReveal();
        } else {
            document.body.style.overflow = 'auto';
        }

        initIntersectionObserver();
        initApplicationForm();
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
        const revealPrompt = document.querySelector('.reveal-prompt');

        if (!doorLeft || !doorRight || !initialBranding || !revealedContent || !heroSection) return;

        const openPassage = (event) => {
            if (doorOpened) return;
            if (event && event.target.closest('a')) {
                event.preventDefault();
            }

            doorLeft.classList.add('crumbling');
            doorRight.classList.add('crumbling');
            initialBranding.classList.add('fade-out');
            document.body.style.overflow = 'auto';

            setTimeout(() => {
                revealedContent.classList.add('visible');

                setTimeout(() => {
                    doorLeft.style.display = 'none';
                    doorRight.style.display = 'none';
                }, 1200);
            }, 300);

            doorOpened = true;
        };

        [heroSection, doorLeft, doorRight, initialBranding, revealPrompt]
            .filter(Boolean)
            .forEach(target => target.addEventListener('click', openPassage));

        heroSection.style.cursor = 'pointer';
    }

    /**
     * Intersection Observer for other sections
     * Animates elements as they come into viewport
     */
    function initIntersectionObserver() {
        // Elements to observe
        const observeElements = document.querySelectorAll(
            '.qual-point, .phase-layout, .framework-content, .cta-content'
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
                    // For phase layouts, add class (CSS handles animation)
                    if (entry.target.classList.contains('phase-layout')) {
                        entry.target.classList.add('in-view');
                    } else {
                        // For other elements, use inline styles
                        requestAnimationFrame(() => {
                            entry.target.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        });
                    }

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
     * Build and manage the self-disqualification application
     */
    function initApplicationForm() {
        const form = document.getElementById('ascendantApplication');
        if (!form) return;

        const stepsContainer = form.querySelector('.question-steps');
        if (!stepsContainer) return;

        const finalWarning = form.querySelector('.final-warning');
        const completeButton = form.querySelector('.complete-application');
        const feedback = form.querySelector('.submission-feedback');
        const steps = [];

        APPLICATION_QUESTIONS.forEach((question, index) => {
            const step = document.createElement('div');
            step.className = 'question-step';
            step.dataset.stepIndex = index;
            step.dataset.questionId = question.id;

            if (index === 0) {
                step.classList.add('active');
            }

            const label = `${question.section} question ${index + 1}`;
            step.innerHTML = `
                <div class="step-header">
                    <p class="block-label">${question.section}</p>
                    <p class="step-counter">${index + 1} / ${APPLICATION_QUESTIONS.length}</p>
                </div>
                <p class="step-statement">${question.statement}</p>
                <div class="rating-scale" role="radiogroup" aria-label="${label}" data-input="${question.id}"></div>
            `;

            stepsContainer.appendChild(step);
            steps.push(step);

            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = question.id;
            hiddenInput.id = question.id;
            hiddenInput.className = 'question-input';
            form.appendChild(hiddenInput);
        });

        buildRatingScales(form);

        let finalWarningShown = false;

        form.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.classList.contains('rating-option') || target.disabled) return;

            event.preventDefault();

            const scale = target.closest('.rating-scale');
            if (!scale) return;

            const inputId = scale.dataset.input;
            if (!inputId) return;

            const hiddenInput = form.querySelector(`#${inputId}`);
            if (!hiddenInput) return;

            selectScaleValue(scale, target, hiddenInput);
            handleStepProgress(scale);
        });

        form.addEventListener('keydown', (event) => {
            const target = event.target;
            if (!target.classList.contains('rating-option')) return;

            const scale = target.closest('.rating-scale');
            if (!scale) return;

            let nextValue;
            if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                nextValue = Math.min(10, Number(target.dataset.value) + 1);
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                nextValue = Math.max(1, Number(target.dataset.value) - 1);
            } else {
                return;
            }

            event.preventDefault();

            const nextOption = scale.querySelector(`.rating-option[data-value="${nextValue}"]`);
            if (nextOption && !nextOption.disabled) {
                nextOption.focus();
                const inputId = scale.dataset.input;
                const hiddenInput = form.querySelector(`#${inputId}`);
                if (hiddenInput) {
                    selectScaleValue(scale, nextOption, hiddenInput);
                    handleStepProgress(scale);
                }
            }
        });

        if (completeButton) {
            completeButton.addEventListener('click', () => {
                completeButton.disabled = true;
                completeButton.textContent = 'Application Recorded';
                form.querySelectorAll('.rating-option').forEach((option) => {
                    option.disabled = true;
                });

                if (feedback) {
                    feedback.classList.add('visible');
                }
            });
        }

        function handleStepProgress(scale) {
            const step = scale.closest('.question-step');
            if (!step || step.classList.contains('completed')) return;

            step.classList.remove('active');
            step.classList.add('completed');

            const nextIndex = Number(step.dataset.stepIndex) + 1;
            const nextStep = steps[nextIndex];

            if (nextStep) {
                nextStep.classList.add('active');
                nextStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (finalWarning && !finalWarningShown) {
                finalWarning.classList.add('visible');
                finalWarning.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (completeButton) {
                    completeButton.disabled = false;
                }
                finalWarningShown = true;
            }
        }
    }

    /**
     * Generate the 1-10 button set for each scale container
     */
    function buildRatingScales(form) {
        const scales = form.querySelectorAll('.rating-scale');
        if (!scales.length) return;

        scales.forEach((scale) => {
            if (scale.querySelector('.rating-option')) return;

            const inputId = scale.dataset.input;

            for (let value = 1; value <= 10; value += 1) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'rating-option';
                button.dataset.value = String(value);
                button.textContent = String(value);
                button.setAttribute('role', 'radio');
                button.setAttribute('aria-checked', 'false');
                button.setAttribute('aria-label', `${value} on the scale`);
                button.dataset.inputTarget = inputId || '';
                scale.appendChild(button);
            }
        });
    }

    /**
     * Handle selection state and persistence for a single scale
     */
    function selectScaleValue(scale, button, hiddenInput) {
        const value = button.dataset.value;
        if (!value) return;

        scale.querySelectorAll('.rating-option').forEach((option) => {
            option.classList.toggle('selected', option === button);
            option.setAttribute('aria-checked', option === button ? 'true' : 'false');
        });

        hiddenInput.value = value;
        scale.dataset.selected = value;
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
