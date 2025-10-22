
class NavigationSystem {
    constructor() {
        this.currentOpenDropdown = null;
        this.isDrawerOpen = false;
        this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        this.init();
    }

    init() {
        this.setupDesktopDropdowns();
        this.setupMobileDrawer();
        this.setupKeyboardNavigation();
        this.setupClickOutside();
        this.setupEscapeKey();
    }

    setupDesktopDropdowns() {
        const productTrigger = document.getElementById('product-trigger');
        const productDropdown = document.getElementById('product-dropdown');
        const companyTrigger = document.getElementById('company-trigger');
        const companyDropdown = document.getElementById('company-dropdown');
        const accountTrigger = document.getElementById('account-trigger');
        const accountDropdown = document.getElementById('account-dropdown');

        productTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown('product', productTrigger, productDropdown);
        });

        companyTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown('company', companyTrigger, companyDropdown);
        });

        accountTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleDropdown('account', accountTrigger, accountDropdown);
        });

        this.setupDropdownKeyboardNavigation(productDropdown);
        this.setupDropdownKeyboardNavigation(companyDropdown);
        this.setupAccountDropdown();
    }

    toggleDropdown(dropdownName, trigger, dropdown) {
        const isCurrentlyOpen = !dropdown.classList.contains('hidden');
        
        this.closeAllDropdowns();
        
        if (!isCurrentlyOpen) {
            this.openDropdown(dropdownName, trigger, dropdown);
        }
    }

    openDropdown(dropdownName, trigger, dropdown) {
        dropdown.classList.remove('hidden');
        dropdown.classList.add('visible');
        trigger.setAttribute('aria-expanded', 'true');
        
        // Only rotate caret if it exists (not for account dropdown)
        const caret = trigger.querySelector('.caret');
        if (caret) {
            caret.classList.add('rotated');
        }
        
        this.currentOpenDropdown = dropdownName;
        
        setTimeout(() => {
            const firstFocusable = dropdown.querySelector(this.focusableElements);
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 50);
    }

    closeAllDropdowns() {
        const dropdowns = [
            { name: 'product', trigger: document.getElementById('product-trigger'), dropdown: document.getElementById('product-dropdown'), hasCaret: true },
            { name: 'company', trigger: document.getElementById('company-trigger'), dropdown: document.getElementById('company-dropdown'), hasCaret: true },
            { name: 'account', trigger: document.getElementById('account-trigger'), dropdown: document.getElementById('account-dropdown'), hasCaret: false }
        ];

        dropdowns.forEach(({ trigger, dropdown, hasCaret }) => {
            dropdown.classList.add('hidden');
            dropdown.classList.remove('visible');
            trigger.setAttribute('aria-expanded', 'false');
            if (hasCaret) {
                trigger.querySelector('.caret')?.classList.remove('rotated');
            }
        });

        this.currentOpenDropdown = null;
    }

    setupAccountDropdown() {
        const loginTab = document.getElementById('auth-login-tab');
        const registerTab = document.getElementById('auth-register-tab');
        const accountDropdown = document.getElementById('account-dropdown');

        // Tab switching with click
        loginTab.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchAuthTab('login');
        });

        registerTab.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchAuthTab('register');
        });

        // Keyboard navigation for tabs (Arrow keys)
        accountDropdown.addEventListener('keydown', (e) => {
            const tabs = [loginTab, registerTab];
            const currentTab = document.activeElement;
            const currentIndex = tabs.indexOf(currentTab);

            if (currentIndex !== -1) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        const prevTab = currentIndex > 0 ? tabs[currentIndex - 1] : tabs[tabs.length - 1];
                        prevTab.focus();
                        this.switchAuthTab(prevTab.id === 'auth-login-tab' ? 'login' : 'register');
                        break;
                    
                    case 'ArrowRight':
                        e.preventDefault();
                        const nextTab = currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : tabs[0];
                        nextTab.focus();
                        this.switchAuthTab(nextTab.id === 'auth-login-tab' ? 'login' : 'register');
                        break;
                }
            }
        });

        // Handle tab actions (open modals or navigate)
        loginTab.addEventListener('click', () => {
            // Open login modal or navigate to login page
            this.handleAuthAction('login');
        });

        registerTab.addEventListener('click', () => {
            // Open register modal or navigate to register page
            this.handleAuthAction('register');
        });
    }

    switchAuthTab(tabName) {
        const loginTab = document.getElementById('auth-login-tab');
        const registerTab = document.getElementById('auth-register-tab');

        if (tabName === 'login') {
            // Activate login tab
            loginTab.classList.add('bg-[#bde83a]', 'text-black', 'shadow-sm');
            loginTab.classList.remove('text-white/80', 'hover:text-white');
            loginTab.setAttribute('aria-selected', 'true');
            loginTab.setAttribute('tabindex', '0');

            // Deactivate register tab
            registerTab.classList.remove('bg-[#bde83a]', 'text-black', 'shadow-sm');
            registerTab.classList.add('text-white/80', 'hover:text-white');
            registerTab.setAttribute('aria-selected', 'false');
            registerTab.setAttribute('tabindex', '-1');
        } else {
            // Activate register tab
            registerTab.classList.add('bg-[#bde83a]', 'text-black', 'shadow-sm');
            registerTab.classList.remove('text-white/80', 'hover:text-white');
            registerTab.setAttribute('aria-selected', 'true');
            registerTab.setAttribute('tabindex', '0');

            // Deactivate login tab
            loginTab.classList.remove('bg-[#bde83a]', 'text-black', 'shadow-sm');
            loginTab.classList.add('text-white/80', 'hover:text-white');
            loginTab.setAttribute('aria-selected', 'false');
            loginTab.setAttribute('tabindex', '-1');
        }
    }

    handleAuthAction(action) {
        // Close the dropdown
        this.closeAllDropdowns();

        // Check if authRegister.html modals exist
        if (typeof openLoginModal === 'function' && action === 'login') {
            openLoginModal();
        } else if (typeof openRegisterModal === 'function' && action === 'register') {
            openRegisterModal();
        } else {
            // Fallback: navigate to auth pages
            if (action === 'login') {
                window.location.href = '/Account/Login';
            } else {
                window.location.href = '/Account/Register';
            }
        }
    }

    setupMobileDrawer() {
        const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
        const mobileDrawer = document.getElementById('mobile-drawer');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const mobileCloseBtn = document.getElementById('mobile-close-btn');
        const mobileProductTrigger = document.getElementById('mobile-product-trigger');
        const mobileProductContent = document.getElementById('mobile-product-content');
        const mobileCompanyTrigger = document.getElementById('mobile-company-trigger');
        const mobileCompanyContent = document.getElementById('mobile-company-content');

        mobileMenuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.openDrawer();
        });

        mobileCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeDrawer();
        });

        mobileOverlay.addEventListener('click', () => {
            this.closeDrawer();
        });

        mobileProductTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileAccordion(mobileProductTrigger, mobileProductContent);
        });

        mobileCompanyTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileAccordion(mobileCompanyTrigger, mobileCompanyContent);
        });
    }

    openDrawer() {
        const mobileDrawer = document.getElementById('mobile-drawer');
        const mobileOverlay = document.getElementById('mobile-overlay');
        
        mobileDrawer.classList.remove('closed');
        mobileDrawer.classList.add('open');
        mobileOverlay.classList.remove('hidden');
        mobileOverlay.classList.add('visible');
        this.isDrawerOpen = true;
        
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            const firstFocusable = mobileDrawer.querySelector(this.focusableElements);
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);
    }

    closeDrawer() {
        const mobileDrawer = document.getElementById('mobile-drawer');
        const mobileOverlay = document.getElementById('mobile-overlay');
        
        mobileDrawer.classList.remove('open');
        mobileDrawer.classList.add('closed');
        mobileOverlay.classList.remove('visible');
        mobileOverlay.classList.add('hidden');
        this.isDrawerOpen = false;
        
        document.body.style.overflow = '';
        
        document.getElementById('mobile-menu-trigger').focus();
    }

    toggleMobileAccordion(trigger, content) {
        const isOpen = !content.classList.contains('hidden');
        const caret = trigger.querySelector('.caret');
        
        if (isOpen) {
            content.classList.add('hidden');
            trigger.setAttribute('aria-expanded', 'false');
            caret.classList.remove('rotated');
        } else {
            content.classList.remove('hidden');
            trigger.setAttribute('aria-expanded', 'true');
            caret.classList.add('rotated');
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {

            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    setupDropdownKeyboardNavigation(dropdown) {
        dropdown.addEventListener('keydown', (e) => {
            const focusableElements = Array.from(dropdown.querySelectorAll(this.focusableElements));
            const currentIndex = focusableElements.indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
                    focusableElements[nextIndex].focus();
                    break;
                
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
                    focusableElements[prevIndex].focus();
                    break;
                
                case 'Home':
                    e.preventDefault();
                    focusableElements[0].focus();
                    break;
                
                case 'End':
                    e.preventDefault();
                    focusableElements[focusableElements.length - 1].focus();
                    break;
            }
        });
    }

    handleTabNavigation(e) {
        if (this.isDrawerOpen) {
            const drawer = document.getElementById('mobile-drawer');
            const focusableElements = Array.from(drawer.querySelectorAll(this.focusableElements));
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                // shift + tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            if (this.currentOpenDropdown) {
                const productDropdown = document.getElementById('product-dropdown');
                const companyDropdown = document.getElementById('company-dropdown');
                const accountDropdown = document.getElementById('account-dropdown');
                const productTrigger = document.getElementById('product-trigger');
                const companyTrigger = document.getElementById('company-trigger');
                const accountTrigger = document.getElementById('account-trigger');

                const isClickInsideProduct = productDropdown.contains(e.target) || productTrigger.contains(e.target);
                const isClickInsideCompany = companyDropdown.contains(e.target) || companyTrigger.contains(e.target);
                const isClickInsideAccount = accountDropdown.contains(e.target) || accountTrigger.contains(e.target);

                if (!isClickInsideProduct && !isClickInsideCompany && !isClickInsideAccount) {
                    this.closeAllDropdowns();
                }
            }
        });
    }

    setupEscapeKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isDrawerOpen) {
                    this.closeDrawer();
                } else if (this.currentOpenDropdown) {
                    const currentDropdown = this.currentOpenDropdown;
                    this.closeAllDropdowns();
                    
                    // Return focus to the trigger button
                    if (currentDropdown === 'product') {
                        document.getElementById('product-trigger').focus();
                    } else if (currentDropdown === 'company') {
                        document.getElementById('company-trigger').focus();
                    } else if (currentDropdown === 'account') {
                        document.getElementById('account-trigger').focus();
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NavigationSystem();
    setupScrollAwareNavbar();
});

function setupScrollAwareNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    let isScrolling = false;

    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            navbar.querySelector('div > div').style.background = 'rgba(255, 255, 255, 0.35)';
            navbar.querySelector('div > div').style.backdropFilter = 'blur(25px)';
        } else {

            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            navbar.querySelector('div > div').style.background = 'rgba(255, 255, 255, 0.30)';
            navbar.querySelector('div > div').style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }

    function handleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(updateNavbar);
            isScrolling = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    updateNavbar();
}

class NavigationUtils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

window.addEventListener('resize', NavigationUtils.debounce(() => {
    const navigation = window.navigationSystem;
    if (navigation && window.innerWidth >= 768 && navigation.isDrawerOpen) {
        navigation.closeDrawer();
    }
}, 250));

document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

class LoadingStates {
    static showLoading(element) {
        element.classList.add('opacity-50', 'pointer-events-none');
        element.setAttribute('aria-busy', 'true');
    }

    static hideLoading(element) {
        element.classList.remove('opacity-50', 'pointer-events-none');
        element.setAttribute('aria-busy', 'false');
    }
}

class AccessibilityAnnouncer {
    constructor() {
        this.createLiveRegion();
    }

    createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
}

const announcer = new AccessibilityAnnouncer();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NavigationSystem, NavigationUtils, LoadingStates, AccessibilityAnnouncer };
}
