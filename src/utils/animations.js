// ===========================
// ANIMATIONS
// 14 animation utilities —
// AOS setup, scroll parallax,
// hero background, card reveals,
// smooth anchors, reduced-motion
// ===========================

import { AOS_CONFIG } from '../config/constants.js';
import { qs, qsa } from './dom.js';
import { debounce, rafThrottle } from './helpers.js';

// ===========================
// 1. INIT AOS
// ===========================

/**
 * Initialise Animate-On-Scroll library with project defaults.
 * Safe to call multiple times (no-op when AOS is absent).
 */
export function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
        ...AOS_CONFIG,
        disable() {
            // Disable on small mobiles that prefer reduced motion
            return (
                window.innerWidth < 768 &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
            );
        },
    });
}

/**
 * Re-scan the DOM for new AOS attributes (call after dynamic renders).
 */
export function refreshAOS() {
    if (typeof AOS !== 'undefined') AOS.refresh();
}

// ===========================
// 2. HERO BACKGROUND
// ===========================

/**
 * Attach mouse-parallax to `.animated-shape` elements and
 * twinkling opacity to `.dot` elements.
 */
export function initHeroBackground() {
    const shapes = qsa('.animated-shape');

    if (shapes.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Twinkling dots
    qsa('.dot').forEach((dot, index) => {
        setInterval(() => {
            dot.style.opacity = (Math.random() * 0.6 + 0.2).toString();
        }, 2000 + index * 500);
    });
}

// ===========================
// 3. PAGE-HEADER PARALLAX
// ===========================

/**
 * Attach scroll-parallax + fade-out to `.page-header`.
 * Cleans up automatically when the header scrolls out of range.
 */
export function initHeaderParallax() {
    const pageHeader = qs('.page-header');
    if (!pageHeader) return;

    const onScroll = rafThrottle(() => {
        const scrolled = window.pageYOffset;
        if (scrolled >= 800) return;

        pageHeader.style.transform = `translateY(${scrolled * 0.5}px)`;
        pageHeader.style.opacity  = Math.max(0, 1 - scrolled / 800).toString();

        qsa('.animated-shape', pageHeader).forEach((shape, i) => {
            shape.style.transform = `translateY(${scrolled * (0.2 + i * 0.1)}px)`;
        });

        const grid = qs('.animated-grid', pageHeader);
        if (grid) {
            grid.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
        }
    });

    window.addEventListener('scroll', onScroll, { passive: true });
}

// ===========================
// 4. CARD SCROLL REVEALS
// ===========================

/**
 * Apply AOS `fade-up` to all card-like elements that haven't
 * been annotated yet (useful after dynamic renders).
 */
export function addCardAnimations() {
    const selector = [
        '.project-card',
        '.skill-card',
        '.services-card',
        '.education-item',
        '.competency-item',
    ].join(', ');

    qsa(selector).forEach((card, index) => {
        if (card.hasAttribute('data-aos')) return;
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', String((index % 6) * 100));
        card.setAttribute('data-aos-duration', '600');
    });

    refreshAOS();
}

// ===========================
// 5. EDUCATION ITEM ANIMATIONS
// ===========================

/**
 * Add AOS attributes and hover scale to `.education-item` elements.
 */
export function addEducationAnimations() {
    qsa('.education-item').forEach((item, index) => {
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', String(index * 100));
        item.setAttribute('data-aos-duration', '600');

        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(8px) scale(1.02)';
        });
        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(6px) scale(1)';
        });
    });

    refreshAOS();
}

// ===========================
// 6. SECTION INTERSECTION OBSERVER
// ===========================

/**
 * Watch `section` elements and add `.section-visible` when they
 * enter the viewport; also stagger-reveal child cards.
 */
export function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('section-visible');

                qsa('.competency-item, .education-item', entry.target)
                    .forEach((child, i) => {
                        setTimeout(() => {
                            child.style.opacity   = '1';
                            child.style.transform = 'translateY(0)';
                        }, i * 50);
                    });
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    qsa('section').forEach((s) => observer.observe(s));
}

// ===========================
// 7. SKILL-CARD STAGGER REVEAL
// ===========================

/**
 * Hide skill cards then stagger-reveal them via IntersectionObserver.
 * @param {Element} [ctx=document]
 */
export function initSkillCardAnimations(ctx = document) {
    _staggerReveal('.skill-card', ctx);
}

// ===========================
// 8. SERVICE-CARD STAGGER REVEAL
// ===========================

/**
 * Hide service cards then stagger-reveal them via IntersectionObserver.
 * @param {Element} [ctx=document]
 */
export function initServiceCardAnimations(ctx = document) {
    _staggerReveal('.services-card', ctx);
}

// ===========================
// 9. PROJECT CARD STAGGER
// ===========================

/**
 * Stagger-reveal all `.project-card` elements on the page.
 */
export function initProjectCardAnimations() {
    qsa('.project-card').forEach((card, index) => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
        }, index * 100);
    });
}

// ===========================
// 10. COMPETENCY HOVER EFFECTS
// ===========================

/**
 * Pulse-click reset for competency items.
 */
export function addCompetencyEffects() {
    qsa('.competency-item').forEach((item) => {
        item.addEventListener('click', function () {
            this.style.animation = 'none';
            setTimeout(() => { this.style.animation = ''; }, 10);
        });
    });
}

// ===========================
// 11. CONTACT LINK HOVER EFFECTS
// ===========================

export function addContactLinkEffects() {
    qsa('.contact-link').forEach((link) => {
        const icon = link.querySelector('.contact-icon');
        if (!icon) return;
        link.addEventListener('mouseenter', () => {
            icon.style.transform  = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        link.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ===========================
// 12. SMOOTH ANCHOR LINKS
// ===========================

/**
 * Attach smooth-scroll behaviour to all `a[href^="#"]` links.
 * @param {number} [offset=80]  navbar height offset
 */
export function initSmoothAnchors(offset = 80) {
    qsa('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = qs(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

// ===========================
// 13. RESIZE HANDLER
// ===========================

/**
 * Refresh AOS on window resize (debounced 250 ms).
 */
export function initResizeHandler() {
    window.addEventListener('resize', debounce(refreshAOS, 250));
}

// ===========================
// 14. REDUCED-MOTION HANDLING
// ===========================

/**
 * Respect `prefers-reduced-motion`.
 * Disables complex animations and re-inits AOS in no-op mode.
 */
export function initReducedMotion() {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = (reduced) => {
        document.documentElement.style.setProperty(
            '--transition-duration',
            reduced ? '0.01s' : '0.3s',
        );
        if (typeof AOS !== 'undefined') {
            if (reduced) {
                AOS.init({ duration: 0, once: true, disable: true });
            } else {
                initAOS();
            }
        }
    };

    apply(mq.matches);
    mq.addEventListener('change', (e) => apply(e.matches));
}

// ===========================
// PRIVATE — SHARED STAGGER HELPER
// ===========================

/**
 * Hide matching cards, then reveal each one with a stagger delay
 * as it enters the viewport (IntersectionObserver).
 * Cards already in view fire immediately.
 * @param {string}  selector  CSS selector for the cards
 * @param {Element} ctx       Root element to search within
 */
function _staggerReveal(selector, ctx = document) {
    const cards = qsa(selector, ctx);
    if (!cards.length) return;

    // Set initial hidden state
    cards.forEach((card) => {
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Observe each card and reveal on entry
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const card  = entry.target;
                const index = cards.indexOf(card);
                setTimeout(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 80);
                obs.unobserve(card);
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    cards.forEach((card) => observer.observe(card));
}