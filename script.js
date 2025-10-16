// Global variables
let currentUser = null;
let currentAuthMode = 'login'; // 'login' or 'signup'
let currentOrder = {
    service: '',
    serviceRate: 0,
    quantity: 0,
    link: '',
    total: 0
};

// Service rates (per 1000 units)
const SERVICE_CATEGORIES = {
    instagram: {
        name: 'Instagram Services',
        services: {
            instagram_followers: {
                name: '14732 - Instagram Followers [ X ] | 100k/D | Non Refill | Max - 100k',
                rate: 200,
                min: 100,
                max: 100000
            }
        }
    },
    youtube: {
        name: 'YouTube Services', 
        services: {
            youtube_views: {
                name: '15842 - YouTube Views | Fast | Non Refill | Max - 500k',
                rate: 50,
                min: 100,
                max: 500000
            }
        }
    },
    jiohotstar: {
        name: 'JioHotstar Services',
        services: {
            jiohotstar_premium: {
                name: '16294 - JioHotstar Premium Boost | 24H | Refill 30D | Max - 50k',
                rate: 100,
                min: 1000,
                max: 50000
            }
        }
    }
};

const SERVICE_RATES = {
    instagram_followers: 70,
    youtube_views: 50,
    jiohotstar_premium: 100
};

const SERVICE_NAMES = {
    instagram_followers: 'Instagram Followers',
    youtube_views: 'YouTube Views',
    jiohotstar_premium: 'JioHotstar Premium Boost'
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set up Firebase auth listener
    if (window.firebaseAuth) {
        window.firebaseAuth.onAuthStateChanged(user => {
            currentUser = user;
            updateUI();
        });
    }

    // Set up form listeners
    setupFormListeners();
    
    // Show home page by default
    showPage('home');
});

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update URL hash
    window.location.hash = pageId;

    // Protect dashboard and payment pages
    if ((pageId === 'dashboard' || pageId === 'payment') && !currentUser) {
        showPage('login');
        showToast('Please login to access this page', 'error');
        return;
    }

    // Reset mobile menu
    closeMobileMenu();
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    // If not on home page, navigate there first
    if (!document.getElementById('homePage').classList.contains('active')) {
        showPage('home');
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Update UI based on auth state
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileUserMenu = document.getElementById('mobileUserMenu');

    if (currentUser) {
        // Desktop
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        
        // Mobile
        mobileLoginBtn.style.display = 'none';
        mobileUserMenu.style.display = 'flex';
    } else {
        // Desktop
        loginBtn.style.display = 'inline-flex';
        userMenu.style.display = 'none';
        
        // Mobile
        mobileLoginBtn.style.display = 'block';
        mobileUserMenu.style.display = 'none';
    }
}

// Setup form listeners
function setupFormListeners() {
    // Auth form
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }

    // Category select
    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', updateCategory);
    }

    // Service select
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateService);
    }

    // Social link input
    const socialLink = document.getElementById('socialLink');
    if (socialLink) {
        socialLink.addEventListener('input', updateLink);
    }

    // Quantity input
    const quantity = document.getElementById('quantity');
    if (quantity) {
        quantity.addEventListener('input', calculatePrice);
    }
}

// Switch between login and signup modes
function switchAuthMode(mode) {
    currentAuthMode = mode;
    
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authButtonText = document.getElementById('authButtonText');
    const authSwitchText = document.getElementById('authSwitchText');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const passwordHelp = document.getElementById('passwordHelp');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    
    if (mode === 'login') {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        authTitle.textContent = 'Sign in to MeraSMM';
        authSubtitle.textContent = 'Access your dashboard to place orders';
        authButtonText.textContent = 'Sign In';
        authSwitchText.innerHTML = 'Don\'t have an account? <button type="button" class="link-button" onclick="switchAuthMode(\'signup\')">Sign up here</button>';
        confirmPasswordGroup.style.display = 'none';
        passwordHelp.style.display = 'none';
        authSubmitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span id="authButtonText">Sign In</span>';
        
        // Remove required attribute from confirm password
        document.getElementById('confirmPassword').removeAttribute('required');
    } else {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        authTitle.textContent = 'Create MeraSMM Account';
        authSubtitle.textContent = 'Sign up to start growing your social media';
        authButtonText.textContent = 'Create Account';
        authSwitchText.innerHTML = 'Already have an account? <button type="button" class="link-button" onclick="switchAuthMode(\'login\')">Sign in here</button>';
        confirmPasswordGroup.style.display = 'block';
        passwordHelp.style.display = 'block';
        authSubmitBtn.innerHTML = '<i class="fas fa-user-plus"></i> <span id="authButtonText">Create Account</span>';
        
        // Add required attribute to confirm password
        document.getElementById('confirmPassword').setAttribute('required', 'required');
    }
}

// Handle authentication (login or signup)
async function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Validate passwords match for signup
    if (currentAuthMode === 'signup' && password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    const loadingText = currentAuthMode === 'login' ? 
        '<i class="fas fa-spinner fa-spin"></i> Signing in...' : 
        '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    submitBtn.innerHTML = loadingText;
    submitBtn.disabled = true;

    try {
        if (currentAuthMode === 'login') {
            await window.firebaseAuth.signInWithEmailAndPassword(email, password);
            showToast('Login successful! Welcome to MeraSMM Dashboard', 'success');
        } else {
            await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
            showToast('Account created successfully! Welcome to MeraSMM', 'success');
        }
        showPage('dashboard');
        
        // Reset form
        e.target.reset();
    } catch (error) {
        showToast(error.message || 'Authentication failed. Please try again.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Handle Google Sign-In
async function signInWithGoogle() {
    const googleBtn = document.querySelector('.btn-google');
    const originalText = googleBtn.innerHTML;
    
    // Show loading state
    googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting to Google...';
    googleBtn.disabled = true;

    try {
        await window.firebaseAuth.signInWithGoogle();
        showToast('Google sign-in successful! Welcome to MeraSMM', 'success');
        showPage('dashboard');
        
        // Reset form
        const authForm = document.getElementById('authForm');
        if (authForm) {
            authForm.reset();
        }
    } catch (error) {
        showToast(error.message || 'Google sign-in failed. Please try again.', 'error');
    } finally {
        // Reset button
        googleBtn.innerHTML = originalText;
        googleBtn.disabled = false;
    }
}

// Handle logout
async function logout() {
    try {
        await window.firebaseAuth.signOut();
        showToast('Logged out successfully', 'info');
        showPage('home');
        
        // Reset order data
        currentOrder = {
            service: '',
            serviceRate: 0,
            quantity: 0,
            link: '',
            total: 0
        };
        
        // Reset form
        const orderForm = document.getElementById('orderForm');
        if (orderForm) {
            orderForm.reset();
        }
        
        // Hide price display
        const priceDisplay = document.getElementById('priceDisplay');
        if (priceDisplay) {
            priceDisplay.style.display = 'none';
        }
        
    } catch (error) {
        showToast('Logout failed', 'error');
    }
}

// Update category selection
function updateCategory() {
    const categorySelect = document.getElementById('categorySelect');
    const serviceSelect = document.getElementById('serviceSelect');
    const selectedCategory = categorySelect.value;
    
    // Clear service selection
    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    
    if (selectedCategory && SERVICE_CATEGORIES[selectedCategory]) {
        // Enable service dropdown
        serviceSelect.disabled = false;
        
        // Populate services for selected category
        const services = SERVICE_CATEGORIES[selectedCategory].services;
        Object.keys(services).forEach(serviceKey => {
            const option = document.createElement('option');
            option.value = serviceKey;
            option.textContent = services[serviceKey].name;
            serviceSelect.appendChild(option);
        });
    } else {
        // Disable other inputs
        serviceSelect.disabled = true;
        document.getElementById('socialLink').disabled = true;
        document.getElementById('quantity').disabled = true;
        document.getElementById('submitOrderBtn').disabled = true;
    }
}

// Update service selection
function updateService() {
    const serviceSelect = document.getElementById('serviceSelect');
    const selected = serviceSelect.value;
    
    if (selected) {
        // Find service in categories
        let serviceData = null;
        Object.keys(SERVICE_CATEGORIES).forEach(categoryKey => {
            const category = SERVICE_CATEGORIES[categoryKey];
            if (category.services[selected]) {
                serviceData = category.services[selected];
            }
        });
        
        if (serviceData) {
            currentOrder.service = selected;
            currentOrder.serviceRate = serviceData.rate;
            
            // Update min/max quantities
            document.getElementById('minQty').textContent = serviceData.min;
            document.getElementById('maxQty').textContent = serviceData.max;
            
            // Enable inputs
            document.getElementById('socialLink').disabled = false;
            document.getElementById('quantity').disabled = false;
            document.getElementById('quantity').min = serviceData.min;
            document.getElementById('quantity').max = serviceData.max;
            
            // Update link placeholder
            const linkInput = document.getElementById('socialLink');
            switch(selected) {
                case 'instagram_followers':
                    linkInput.placeholder = 'Enter your Instagram profile URL';
                    break;
                case 'youtube_views':
                    linkInput.placeholder = 'Enter your YouTube video URL';
                    break;
                case 'jiohotstar_premium':
                    linkInput.placeholder = 'Enter your JioHotstar profile URL';
                    break;
            }
            
            calculatePrice();
        }
    } else {
        currentOrder.service = '';
        currentOrder.serviceRate = 0;
        document.getElementById('socialLink').disabled = true;
        document.getElementById('quantity').disabled = true;
        document.getElementById('submitOrderBtn').disabled = true;
    }
}

// Update link
function updateLink() {
    const socialLink = document.getElementById('socialLink');
    currentOrder.link = socialLink.value;
    
    updateSubmitButton();
}

// Calculate price based on quantity and service
function calculatePrice() {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value) || 0;
    
    currentOrder.quantity = quantity;
    
    if (quantity > 0 && currentOrder.serviceRate > 0) {
        currentOrder.total = Math.round((quantity / 1000) * currentOrder.serviceRate);
        
        // Update price display
        const totalPrice = document.getElementById('totalPrice');
        if (totalPrice) {
            totalPrice.textContent = `₹${currentOrder.total.toFixed(2)}`;
        }
        
        // Enable submit button if all fields are filled
        updateSubmitButton();
    } else {
        currentOrder.total = 0;
        const totalPrice = document.getElementById('totalPrice');
        if (totalPrice) {
            totalPrice.textContent = '₹0.00';
        }
        updateSubmitButton();
    }
}

// Update submit button state
function updateSubmitButton() {
    const submitBtn = document.getElementById('submitOrderBtn');
    if (submitBtn) {
        const isValid = currentOrder.service && currentOrder.link && currentOrder.quantity > 0;
        submitBtn.disabled = !isValid;
    }
}

// Update proceed button state (for backward compatibility)
function updateProceedButton() {
    updateSubmitButton();
}

// Proceed to payment
function proceedToPayment() {
    if (!isOrderValid()) {
        showToast('Please complete all fields', 'error');
        return;
    }
    
    // Update payment page with order details
    document.getElementById('paymentService').textContent = SERVICE_NAMES[currentOrder.service];
    document.getElementById('paymentQuantity').textContent = currentOrder.quantity.toLocaleString();
    document.getElementById('paymentLink').textContent = currentOrder.link;
    document.getElementById('paymentTotal').textContent = `₹${currentOrder.total}`;
    document.getElementById('qrAmount').textContent = `₹${currentOrder.total}`;
    
    showPage('payment');
}

// Check if order is valid
function isOrderValid() {
    return currentOrder.service && currentOrder.link && currentOrder.quantity >= 100;
}

// Copy UPI ID
async function copyUPI() {
    const upiId = '9365519081@fam';
    
    try {
        await navigator.clipboard.writeText(upiId);
        showToast('UPI ID copied to clipboard!', 'success');
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('UPI ID copied to clipboard!', 'success');
    }
}

// Send order to admin via WhatsApp
function sendToAdmin() {
    const transactionId = document.getElementById('transactionId').value.trim();
    
    if (!transactionId) {
        showToast('Please enter your transaction ID', 'error');
        return;
    }
    
    const message = generateWhatsAppMessage(transactionId);
    const whatsappUrl = `https://wa.me/9365519081?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Navigate to thank you page
    showPage('thankYou');
}

// Generate WhatsApp message
function generateWhatsAppMessage(transactionId) {
    return `Hello Admin, I've paid ₹${currentOrder.total}
Transaction ID: ${transactionId}
Service: ${SERVICE_NAMES[currentOrder.service]}
Quantity: ${currentOrder.quantity}
Link: ${currentOrder.link}`;
}

// Contact admin
function contactAdmin() {
    const whatsappUrl = `https://wa.me/9365519081@fam?text=${encodeURIComponent('Hi, I need help with my order')}`;
    window.open(whatsappUrl, '_blank');
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    
    // Set icon based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    toastIcon.className = `toast-icon ${icons[type]}`;
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Handle browser back/forward
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash + 'Page')) {
        showPage(hash);
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const sectionId = e.target.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    }
});

// Add animation classes on scroll
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Initialize animations when page loads
window.addEventListener('load', addScrollAnimations);

// Hamburger animation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}
`;
document.head.appendChild(style);

