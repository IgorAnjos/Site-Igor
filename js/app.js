/**
 * Portfolio - Modern JavaScript with Best Practices
 * @author Igor Macedo
 * @version 2.0
 */

'use strict';

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const CONFIG = {
    THEME_STORAGE_KEY: 'portfolio-theme',
    SCROLL_OFFSET: 80,
    DEBOUNCE_DELAY: 150,
    ANIMATION_THRESHOLD: 0.1,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait = CONFIG.DEBOUNCE_DELAY) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit = CONFIG.DEBOUNCE_DELAY) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Get an element safely with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null} The element or null
 */
const getElement = (selector) => {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.error(`Error selecting element: ${selector}`, error);
        return null;
    }
};

/**
 * Get all elements safely with error handling
 * @param {string} selector - CSS selector
 * @returns {NodeList} NodeList of elements
 */
const getAllElements = (selector) => {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.error(`Error selecting elements: ${selector}`, error);
        return [];
    }
};

// ============================================
// THEME MANAGER
// ============================================

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
        this.themeToggle = null;
        this.init();
    }

    /**
     * Initialize theme manager
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
        this.watchSystemTheme();
    }

    /**
     * Get stored theme from localStorage
     * @returns {string|null} Stored theme or null
     */
    getStoredTheme() {
        try {
            return localStorage.getItem(CONFIG.THEME_STORAGE_KEY);
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            return null;
        }
    }

    /**
     * Get user's preferred theme from system
     * @returns {string} 'dark' or 'light'
     */
    getPreferredTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    /**
     * Apply theme to document
     * @param {string} theme - 'dark' or 'light'
     */
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.updateToggleIcon(theme);
        
        try {
            localStorage.setItem(CONFIG.THEME_STORAGE_KEY, theme);
        } catch (error) {
            console.error('Error saving theme to localStorage:', error);
        }
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    /**
     * Setup theme toggle button
     */
    setupThemeToggle() {
        this.themeToggle = getElement('.theme-toggle');
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            this.themeToggle.setAttribute('aria-label', 'Toggle theme');
            this.themeToggle.setAttribute('role', 'button');
        }
    }

    /**
     * Update toggle button icon
     * @param {string} theme - Current theme
     */
    updateToggleIcon(theme) {
        if (!this.themeToggle) return;

        const icon = theme === 'dark' 
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>';
        
        this.themeToggle.innerHTML = icon;
    }

    /**
     * Watch for system theme changes
     */
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// ============================================
// NAVIGATION MANAGER
// ============================================

class NavigationManager {
    constructor() {
        this.navbar = null;
        this.navLinks = [];
        this.mobileMenuToggle = null;
        this.navMenu = null;
        this.isMenuOpen = false;
        this.init();
    }

    /**
     * Initialize navigation
     */
    init() {
        this.navbar = getElement('.navbar');
        this.navLinks = Array.from(getAllElements('.nav-link'));
        this.mobileMenuToggle = getElement('.mobile-menu-toggle');
        this.navMenu = getElement('.nav-menu');

        this.setupScrollBehavior();
        this.setupSmoothScroll();
        this.setupActiveLink();
        this.setupMobileMenu();
    }

    /**
     * Setup navbar scroll behavior
     */
    setupScrollBehavior() {
        if (!this.navbar) return;

        const handleScroll = throttle(() => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    /**
     * Setup smooth scroll for navigation links
     */
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = getElement(href);
                    
                    if (target) {
                        const offset = CONFIG.SCROLL_OFFSET;
                        const targetPosition = target.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Close mobile menu if open
                        if (this.isMenuOpen) {
                            this.closeMobileMenu();
                        }
                    }
                }
            });
        });
    }

    /**
     * Setup active link highlighting on scroll
     */
    setupActiveLink() {
        const handleScroll = debounce(() => {
            const sections = this.navLinks
                .map(link => getElement(link.getAttribute('href')))
                .filter(section => section !== null);

            const scrollPosition = window.scrollY + CONFIG.SCROLL_OFFSET + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    this.navLinks[index]?.classList.add('active');
                }
            });
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
        if (!this.mobileMenuToggle || !this.navMenu) return;

        this.mobileMenuToggle.addEventListener('click', () => {
            this.isMenuOpen ? this.closeMobileMenu() : this.openMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        this.navMenu?.classList.add('active');
        this.mobileMenuToggle?.classList.add('active');
        this.isMenuOpen = true;
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.mobileMenuToggle?.classList.remove('active');
        this.isMenuOpen = false;
        document.body.style.overflow = '';
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

class ScrollReveal {
    constructor() {
        this.elements = [];
        this.observer = null;
        this.init();
    }

    /**
     * Initialize scroll reveal
     */
    init() {
        this.elements = Array.from(getAllElements('.reveal'));
        
        if ('IntersectionObserver' in window) {
            this.setupObserver();
        } else {
            // Fallback: show all elements
            this.elements.forEach(el => el.classList.add('active'));
        }
    }

    /**
     * Setup Intersection Observer
     */
    setupObserver() {
        const options = {
            root: null,
            threshold: CONFIG.ANIMATION_THRESHOLD,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ============================================
// FORM HANDLER
// ============================================

class FormHandler {
    constructor(formSelector) {
        this.form = getElement(formSelector);
        this.init();
    }

    /**
     * Initialize form handling
     */
    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.form);
        const submitButton = this.form.querySelector('[type="submit"]');
        
        try {
            // Disable submit button
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }

            // Submit form (you can customize this based on your backend)
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                this.showSuccess('Mensagem enviada com sucesso!');
                this.form.reset();
            } else {
                throw new Error('Erro ao enviar formulário');
            }
        } catch (error) {
            this.showError('Erro ao enviar mensagem. Por favor, tente novamente.');
            console.error('Form submission error:', error);
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar';
            }
        }
    }

    /**
     * Setup real-time validation
     */
    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    /**
     * Validate entire form
     * @returns {boolean} Is form valid
     */
    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate individual field
     * @param {HTMLElement} field - Form field to validate
     * @returns {boolean} Is field valid
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido';
            }
        }

        // Phone validation
        if (type === 'number' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Por favor, insira um telefone válido';
            }
        }

        // Update field UI
        if (isValid) {
            field.classList.remove('error');
            this.removeError(field);
        } else {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Show field error message
     * @param {HTMLElement} field - Form field
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        this.removeError(field);
        
        const error = document.createElement('span');
        error.className = 'field-error';
        error.textContent = message;
        error.style.color = 'var(--color-error)';
        error.style.fontSize = 'var(--font-size-sm)';
        error.style.marginTop = 'var(--space-xs)';
        error.style.display = 'block';
        
        field.parentElement.appendChild(error);
    }

    /**
     * Remove error message from field
     * @param {HTMLElement} field - Form field
     */
    removeError(field) {
        const error = field.parentElement.querySelector('.field-error');
        if (error) {
            error.remove();
        }
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccess(message) {
        // You can implement a toast/notification system here
        alert(message);
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        // You can implement a toast/notification system here
        alert(message);
    }
}

// ============================================
// APPLICATION INITIALIZATION
// ============================================

class App {
    constructor() {
        this.themeManager = null;
        this.navigationManager = null;
        this.scrollReveal = null;
        this.formHandler = null;
    }

    /**
     * Initialize application
     */
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Setup all components
     */
    setup() {
        try {
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.scrollReveal = new ScrollReveal();
            this.formHandler = new FormHandler('#contact-form');

            console.log('✅ Portfolio initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
        }
    }
}

// ============================================
// START APPLICATION
// ============================================

const app = new App();
app.init();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, ThemeManager, NavigationManager, ScrollReveal, FormHandler };
}
