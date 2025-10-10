// Authentication Modal JavaScript
let currentTab = 'login';
let isModalOpen = false;

// Open authentication modal
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.querySelector('.relative').classList.add('modal-enter');
        isModalOpen = true;
        
        // Focus on first input after animation
        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="email"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }
}

// Close authentication modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal && isModalOpen) {
        const modalContent = modal.querySelector('.relative');
        
        // Add exit animation
        modalContent.classList.remove('modal-enter');
        modalContent.classList.add('modal-exit');
        
        // Hide modal after animation
        setTimeout(() => {
            modal.classList.add('hidden');
            modalContent.classList.remove('modal-exit');
            isModalOpen = false;
        }, 300);
    }
}

// Switch between login and register tabs
function switchTab(tab) {
    currentTab = tab;
    
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (tab === 'login') {
        // Update tab buttons
        loginTab.classList.add('bg-white/40', 'text-black');
        loginTab.classList.remove('hover:bg-white/30', 'text-white');
        
        registerTab.classList.remove('bg-white/40', 'text-black');
        registerTab.classList.add('hover:bg-white/30', 'text-white');
        
        // Show/hide forms
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = loginForm.querySelector('input[type="email"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
        
    } else if (tab === 'register') {
        // Update tab buttons
        registerTab.classList.add('bg-white/40', 'text-black');
        registerTab.classList.remove('hover:bg-white/30', 'text-white');
        
        loginTab.classList.remove('bg-white/40', 'text-black');
        loginTab.classList.add('hover:bg-white/30', 'text-white');
        
        // Show/hide forms
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = registerForm.querySelector('input[type="email"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
}

// Handle login form submission
function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const rememberMe = loginForm.querySelector('input[type="checkbox"]').checked;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Lütfen tüm alanları doldurun.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Geçerli bir e-posta adresi girin.', 'error');
        return;
    }
    
    // Simulate login process
    console.log('Login attempt:', {
        email: email,
        password: password,
        rememberMe: rememberMe
    });
    
    // Show loading state
    const submitButton = loginForm.querySelector('button[onclick="handleLogin()"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Giriş yapılıyor...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Giriş başarılı! Hoş geldiniz.', 'success');
        
        // Close modal after success
        setTimeout(() => {
            closeAuthModal();
        }, 1500);
        
    }, 2000);
}

// Handle register form submission
function handleRegister() {
    const registerForm = document.getElementById('registerForm');
    const inputs = registerForm.querySelectorAll('input');
    const email = inputs[0].value;
    const password = inputs[1].value;
    const confirmPassword = inputs[2].value;
    const acceptTerms = inputs[3].checked;
    
    // Basic validation
    if (!email || !password || !confirmPassword) {
        showNotification('Lütfen tüm alanları doldurun.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Geçerli bir e-posta adresi girin.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Şifre en az 6 karakter olmalıdır.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Şifreler eşleşmiyor.', 'error');
        return;
    }
    
    if (!acceptTerms) {
        showNotification('Kullanım koşullarını kabul etmelisiniz.', 'error');
        return;
    }
    
    // Simulate registration process
    console.log('Registration attempt:', {
        email: email,
        password: password,
        acceptTerms: acceptTerms
    });
    
    // Show loading state
    const submitButton = registerForm.querySelector('button[onclick="handleRegister()"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Kayıt oluşturuluyor...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Kayıt başarılı! Hoş geldiniz.', 'success');
        
        // Close modal after success
        setTimeout(() => {
            closeAuthModal();
        }, 1500);
        
    }, 2000);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-[60] px-6 py-3 rounded-xl text-white font-medium shadow-lg transform transition-all duration-300 translate-x-full`;
    
    // Set color based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500');
    } else {
        notification.classList.add('bg-blue-500');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ESC key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (isForgotPasswordModalOpen) {
                closeForgotPasswordModal();
            } else if (isModalOpen) {
                closeAuthModal();
            }
        }
    });
    
    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('#authModal .relative');
    if (modalContent) {
        modalContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    
    // Form submission with Enter key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && isModalOpen) {
            event.preventDefault();
            
            if (currentTab === 'login') {
                const loginForm = document.getElementById('loginForm');
                const inputs = loginForm.querySelectorAll('input[required]');
                let allFilled = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        allFilled = false;
                    }
                });
                
                if (allFilled) {
                    handleLogin();
                }
            } else if (currentTab === 'register') {
                const registerForm = document.getElementById('registerForm');
                const inputs = registerForm.querySelectorAll('input[required]');
                let allFilled = true;
                
                inputs.forEach(input => {
                    if (input.type === 'checkbox' && !input.checked) {
                        allFilled = false;
                    } else if (input.type !== 'checkbox' && !input.value.trim()) {
                        allFilled = false;
                    }
                });
                
                if (allFilled) {
                    handleRegister();
                }
            }
        }
    });
    
    // Add input focus effects
    const inputs = document.querySelectorAll('#authModal input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('scale-[1.02]');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('scale-[1.02]');
        });
    });
    
    // Add smooth transitions to buttons
    const buttons = document.querySelectorAll('#authModal button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('transform', 'scale-105');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('scale-105');
        });
    });
});

// Social login handlers (placeholder functions)
function handleGoogleLogin() {
    console.log('Google login clicked');
    showNotification('Google ile giriş özelliği yakında aktif olacak.', 'info');
}

function handleFacebookLogin() {
    console.log('Facebook login clicked');
    showNotification('Facebook ile giriş özelliği yakında aktif olacak.', 'info');
}

// Forgot Password Modal Functions
let isForgotPasswordModalOpen = false;

// Open forgot password modal
function openForgotPasswordModal() {
    // Close auth modal first
    closeAuthModal();
    
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.querySelector('.relative').classList.add('modal-enter');
        isForgotPasswordModalOpen = true;
        
        // Reset form state
        const form = document.getElementById('forgotPasswordForm');
        const success = document.getElementById('forgotPasswordSuccess');
        form.classList.remove('hidden');
        success.classList.add('hidden');
        
        // Clear input
        const emailInput = document.getElementById('forgotEmail');
        if (emailInput) {
            emailInput.value = '';
        }
        
        // Focus on email input after animation
        setTimeout(() => {
            if (emailInput) {
                emailInput.focus();
            }
        }, 300);
    }
}

// Close forgot password modal
function closeForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal && isForgotPasswordModalOpen) {
        const modalContent = modal.querySelector('.relative');
        
        // Add exit animation
        modalContent.classList.remove('modal-enter');
        modalContent.classList.add('modal-exit');
        
        // Hide modal after animation
        setTimeout(() => {
            modal.classList.add('hidden');
            modalContent.classList.remove('modal-exit');
            isForgotPasswordModalOpen = false;
        }, 300);
    }
}

// Handle forgot password form submission
function handleForgotPassword() {
    const emailInput = document.getElementById('forgotEmail');
    const email = emailInput.value.trim();
    
    // Basic validation
    if (!email) {
        showNotification('Lütfen e-posta adresinizi girin.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Geçerli bir e-posta adresi girin.', 'error');
        return;
    }
    
    // Simulate forgot password process
    console.log('Forgot password request for:', email);
    
    // Show loading state
    const submitButton = document.querySelector('button[onclick="handleForgotPassword()"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Gönderiliyor...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success state
        const form = document.getElementById('forgotPasswordForm');
        const success = document.getElementById('forgotPasswordSuccess');
        
        form.classList.add('hidden');
        success.classList.remove('hidden');
        
        // Show success notification
        showNotification('Şifre sıfırlama bağlantısı gönderildi!', 'success');
        
    }, 2000);
}

// Back to login function
function backToLogin() {
    closeForgotPasswordModal();
    setTimeout(() => {
        openAuthModal();
    }, 300);
}

// Expose functions globally for onclick handlers
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchTab = switchTab;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleGoogleLogin = handleGoogleLogin;
window.handleFacebookLogin = handleFacebookLogin;
window.openForgotPasswordModal = openForgotPasswordModal;
window.closeForgotPasswordModal = closeForgotPasswordModal;
window.handleForgotPassword = handleForgotPassword;
window.backToLogin = backToLogin;
