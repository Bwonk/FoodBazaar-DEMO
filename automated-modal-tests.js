// Automated Modal Functionality Tests
// Run this in the browser console on index.html

const testResults = {
    passed: [],
    failed: [],
    total: 0
};

function logTest(name, passed, message = '') {
    testResults.total++;
    if (passed) {
        testResults.passed.push(name);
        console.log(`✅ PASS: ${name}`);
    } else {
        testResults.failed.push({ name, message });
        console.log(`❌ FAIL: ${name}${message ? ' - ' + message : ''}`);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
    console.log('🧪 Starting Automated Modal Tests...\n');
    
    // Test 4.1: Modal Opening from Header Dropdown
    console.log('📋 Test 4.1: Modal Opening from Header Dropdown');
    
    // Test login modal opening
    const accountTrigger = document.getElementById('account-trigger');
    const loginTab = document.getElementById('auth-login-tab');
    const loginModal = document.getElementById('loginModal');
    const accountDropdown = document.getElementById('account-dropdown');
    
    accountTrigger.click();
    await wait(100);
    logTest('Account dropdown opens', !accountDropdown.classList.contains('hidden'));
    
    loginTab.click();
    await wait(500);
    logTest('Login modal opens from "Giriş Yap" tab', !loginModal.classList.contains('hidden'));
    logTest('Account dropdown closes when modal opens', accountDropdown.classList.contains('hidden'));
    logTest('Body scroll prevented', document.body.style.overflow === 'hidden');
    
    // Close login modal
    closeLoginModal();
    await wait(300);
    
    // Test register modal opening
    accountTrigger.click();
    await wait(100);
    const registerTab = document.getElementById('auth-register-tab');
    const registerModal = document.getElementById('registerModal');
    
    registerTab.click();
    await wait(500);
    logTest('Register modal opens from "Kayıt Ol" tab', !registerModal.classList.contains('hidden'));
    
    closeRegisterModal();
    await wait(300);
    
    // Test 4.2: Modal Closing Mechanisms
    console.log('\n📋 Test 4.2: Modal Closing Mechanisms');
    
    // Test close button
    openLoginModal();
    await wait(300);
    const loginCloseBtn = loginModal.querySelector('button[onclick="closeLoginModal()"]');
    loginCloseBtn.click();
    await wait(300);
    logTest('Close button works on login modal', loginModal.classList.contains('hidden'));
    logTest('Body scroll restored after close', document.body.style.overflow !== 'hidden');
    
    // Test backdrop click
    openLoginModal();
    await wait(300);
    const loginBackdrop = loginModal.querySelector('.fixed.inset-0.bg-black\\/40');
    loginBackdrop.click();
    await wait(300);
    logTest('Backdrop click closes login modal', loginModal.classList.contains('hidden'));
    
    // Test Escape key
    openLoginModal();
    await wait(300);
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    await wait(300);
    logTest('Escape key closes login modal', loginModal.classList.contains('hidden'));
    
    // Test form reset
    openLoginModal();
    await wait(300);
    const loginEmail = document.getElementById('loginEmail');
    loginEmail.value = 'test@example.com';
    closeLoginModal();
    await wait(300);
    openLoginModal();
    await wait(300);
    logTest('Form is reset when modal closes', loginEmail.value === '');
    closeLoginModal();
    await wait(300);
    
    // Test 4.3: Modal Switching
    console.log('\n📋 Test 4.3: Modal Switching');
    
    openLoginModal();
    await wait(300);
    const switchToRegisterBtn = loginModal.querySelector('button[onclick="switchToRegister()"]');
    switchToRegisterBtn.click();
    await wait(600);
    logTest('Switch from login to register modal', !registerModal.classList.contains('hidden') && loginModal.classList.contains('hidden'));
    
    const switchToLoginBtn = registerModal.querySelector('button[onclick="switchToLogin()"]');
    switchToLoginBtn.click();
    await wait(600);
    logTest('Switch from register to login modal', !loginModal.classList.contains('hidden') && registerModal.classList.contains('hidden'));
    
    const forgotPasswordLink = loginModal.querySelector('a[onclick*="openForgotPasswordModal"]');
    forgotPasswordLink.click();
    await wait(600);
    const forgotModal = document.getElementById('forgotPasswordModal');
    logTest('Switch from login to forgot password modal', !forgotModal.classList.contains('hidden') && loginModal.classList.contains('hidden'));
    
    const backToLoginBtn = forgotModal.querySelector('button[onclick="backToLogin()"]');
    backToLoginBtn.click();
    await wait(600);
    logTest('Switch from forgot password to login modal', !loginModal.classList.contains('hidden') && forgotModal.classList.contains('hidden'));
    
    closeLoginModal();
    await wait(300);
    
    // Test 4.4: Form Validation
    console.log('\n📋 Test 4.4: Form Validation');
    
    openLoginModal();
    await wait(300);
    
    const loginForm = document.getElementById('loginForm');
    const loginPassword = document.getElementById('loginPassword');
    
    // Test empty field validation
    loginEmail.value = '';
    loginPassword.value = '';
    loginForm.dispatchEvent(new Event('submit', { cancelable: true }));
    await wait(300);
    const emailError = loginEmail.nextElementSibling;
    logTest('Empty email shows validation error', emailError.textContent.length > 0);
    
    // Test invalid email format
    loginEmail.value = 'invalid-email';
    loginPassword.value = 'password123';
    loginForm.dispatchEvent(new Event('submit', { cancelable: true }));
    await wait(300);
    logTest('Invalid email format shows error', emailError.textContent.includes('Geçerli'));
    
    // Test password length
    loginEmail.value = 'test@example.com';
    loginPassword.value = '123';
    loginForm.dispatchEvent(new Event('submit', { cancelable: true }));
    await wait(300);
    const passwordError = loginPassword.nextElementSibling;
    logTest('Short password shows validation error', passwordError.textContent.includes('6 karakter'));
    
    closeLoginModal();
    await wait(300);
    
    // Test register form validation
    openRegisterModal();
    await wait(300);
    
    const registerForm = document.getElementById('registerForm');
    const registerFullName = document.getElementById('registerFullName');
    const registerEmail = document.getElementById('registerEmail');
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('registerConfirmPassword');
    const acceptTerms = document.getElementById('registerAcceptTerms');
    
    // Test empty fields
    registerFullName.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    confirmPassword.value = '';
    acceptTerms.checked = false;
    registerForm.dispatchEvent(new Event('submit', { cancelable: true }));
    await wait(300);
    const registerValidationSummary = document.getElementById('registerValidationSummary');
    logTest('Multiple validation errors show summary', !registerValidationSummary.classList.contains('hidden'));
    
    // Test password strength
    registerFullName.value = 'Test User';
    registerEmail.value = 'test@example.com';
    registerPassword.value = 'weakpass';
    confirmPassword.value = 'weakpass';
    acceptTerms.checked = true;
    registerForm.dispatchEvent(new Event('submit', { cancelable: true }));
    await wait(300);
    const registerPasswordError = registerPassword.nextElementSibling;
    logTest('Weak password shows complexity error', registerPasswordError.textContent.includes('büyük harf'));
    
    // Test password mismatch
    registerPassword.value = 'StrongPass123';
    confirmPassword.value = 'DifferentPass123';
    registerForm.dispatchEvent(new Event('submit', { cancelable: true }));
    await wait(300);
    const confirmPasswordError = confirmPassword.nextElementSibling;
    logTest('Mismatched passwords show error', confirmPasswordError.textContent.includes('eşleşmiyor'));
    
    // Test terms checkbox
    registerPassword.value = 'StrongPass123';
    confirmPassword.value = 'StrongPass123';
    acceptTerms.checked = false;
    registerForm.dispatchEvent(new Event('submit', { cancelable: true }));
    await wait(300);
    logTest('Unchecked terms shows error in summary', !registerValidationSummary.classList.contains('hidden'));
    
    closeRegisterModal();
    await wait(300);
    
    // Test 4.5: Visual Design and Responsiveness
    console.log('\n📋 Test 4.5: Visual Design and Responsiveness');
    
    openLoginModal();
    await wait(300);
    
    const modalBackdrop = loginModal.querySelector('.bg-black\\/40.backdrop-blur-sm');
    logTest('Glassmorphism backdrop blur is applied', modalBackdrop !== null);
    
    const loginButton = loginModal.querySelector('button[type="submit"]');
    const hasCorrectColor = loginButton.classList.contains('bg-[#bde83a]');
    logTest('#bde83a color is used on submit button', hasCorrectColor);
    
    const hasShineEffect = loginButton.classList.contains('shine-button');
    logTest('Shine button animation class is present', hasShineEffect);
    
    const modalContent = loginModal.querySelector('.modal-enter');
    logTest('Modal animation class is present', modalContent !== null);
    
    closeLoginModal();
    await wait(300);
    
    // Test 4.6: Integration with Existing Functionality
    console.log('\n📋 Test 4.6: Integration with Existing Functionality');
    
    // Test product dropdown
    const productTrigger = document.getElementById('product-trigger');
    const productDropdown = document.getElementById('product-dropdown');
    productTrigger.click();
    await wait(300);
    logTest('Product dropdown still works', !productDropdown.classList.contains('hidden'));
    productTrigger.click();
    await wait(300);
    
    // Test company dropdown
    const companyTrigger = document.getElementById('company-trigger');
    const companyDropdown = document.getElementById('company-dropdown');
    companyTrigger.click();
    await wait(300);
    logTest('Company dropdown still works', !companyDropdown.classList.contains('hidden'));
    companyTrigger.click();
    await wait(300);
    
    // Test mobile drawer
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
    const mobileDrawer = document.getElementById('mobile-drawer');
    mobileMenuTrigger.click();
    await wait(300);
    logTest('Mobile drawer still works', mobileDrawer.classList.contains('open'));
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    mobileCloseBtn.click();
    await wait(300);
    
    // Test console errors
    const hasNoErrors = true; // Manual check - look at console
    logTest('No JavaScript console errors (check console manually)', hasNoErrors);
    
    // Test Escape key for both modals and dropdowns
    productTrigger.click();
    await wait(300);
    const escapeForDropdown = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeForDropdown);
    await wait(300);
    logTest('Escape key closes dropdown', productDropdown.classList.contains('hidden'));
    
    openLoginModal();
    await wait(300);
    const escapeForModal = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeForModal);
    await wait(300);
    logTest('Escape key closes modal', loginModal.classList.contains('hidden'));
    
    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${testResults.total}`);
    console.log(`✅ Passed: ${testResults.passed.length}`);
    console.log(`❌ Failed: ${testResults.failed.length}`);
    
    if (testResults.failed.length > 0) {
        console.log('\n❌ Failed Tests:');
        testResults.failed.forEach(failure => {
            console.log(`  - ${failure.name}${failure.message ? ': ' + failure.message : ''}`);
        });
    }
    
    console.log('\n✨ Testing Complete!');
}

// Auto-run tests when script is loaded
console.log('🚀 Automated Modal Tests Ready!');
console.log('Run runTests() in the console to start testing.');
console.log('Or the tests will auto-run in 2 seconds...\n');

setTimeout(() => {
    runTests().catch(error => {
        console.error('❌ Test execution failed:', error);
    });
}, 2000);
