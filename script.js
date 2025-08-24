// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and feature items
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.course-card, .product-card, .feature-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form Submission Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const option = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !option) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! We\'ll contact you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', { name, email, option, message });
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Counter Animation for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when hero section is visible
document.addEventListener('DOMContentLoaded', function() {
    const heroCard = document.querySelector('.hero-card h3');
    if (heroCard) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(heroCard, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(heroCard);
    }
});

// Add hover effects for course cards
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Handle successful load
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
            this.style.opacity = '1';
        });
        
        // Handle load errors
        img.addEventListener('error', function() {
            console.error('Image failed to load:', this.src);
            this.style.display = 'none';
            // Create a placeholder
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6b7280;
                font-size: 14px;
                background: #f3f4f6;
                border: 2px dashed #d1d5db;
            `;
            placeholder.textContent = 'Image not found';
            this.parentElement.appendChild(placeholder);
        });
        
        // Force opacity to 1 after a delay if image is already loaded
        setTimeout(() => {
            if (img.complete && img.naturalHeight !== 0) {
                img.style.opacity = '1';
            }
        }, 100);
    });
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #fbbf24, #2563eb);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Modern Hero Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Particle Animation System
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        // Resize canvas to match window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Create particles
        const createParticles = () => {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        // Animate particles
        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off boundaries
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
                ctx.fill();
            });
            
            animationId = requestAnimationFrame(animateParticles);
        };

        // Initialize particle system
        resizeCanvas();
        createParticles();
        animateParticles();

        // Handle window resize
        window.addEventListener('resize', resizeCanvas);
    }

    // Progress Popup System
    const progressPopup = document.getElementById('progressPopup');
    if (progressPopup) {
        // Show popup after 3 seconds
        setTimeout(() => {
            progressPopup.classList.add('show');
            // Hide popup after 4 seconds
            setTimeout(() => {
                progressPopup.classList.remove('show');
            }, 4000);
        }, 3000);
    }

    // Form Wizard System
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const progressFill = document.getElementById('progressFill');
    const currentStepSpan = document.getElementById('currentStep');
    const progressPercent = document.getElementById('progressPercent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentStep = 0;
    const totalSteps = wizardSteps.length;

    // Form data storage
    const formData = {
        industry: '',
        problem: '',
        target: '',
        solution: ''
    };

    // Initialize wizard
    const initWizard = () => {
        updateProgress();
        updateNavigation();
    };

    // Update progress bar and info
    const updateProgress = () => {
        const progress = ((currentStep + 1) / totalSteps) * 100;
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (currentStepSpan) currentStepSpan.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
        if (progressPercent) progressPercent.textContent = `${Math.round(progress)}%`;
    };

    // Update navigation buttons
    const updateNavigation = () => {
        if (prevBtn) prevBtn.disabled = currentStep === 0;
        
        if (currentStep < totalSteps - 1) {
            if (nextBtn) {
                nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                nextBtn.className = 'btn btn-primary';
            }
        } else if (currentStep === totalSteps - 1) {
            if (nextBtn) {
                nextBtn.innerHTML = '<span>Generate Summary</span><i class="fas fa-magic"></i>';
                nextBtn.className = 'btn btn-primary';
            }
        } else {
            if (nextBtn) {
                nextBtn.innerHTML = '<span>Start Over</span><i class="fas fa-redo"></i>';
                nextBtn.className = 'btn btn-primary';
            }
        }
    };

    // Show step
    const showStep = (stepIndex) => {
        wizardSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;
        updateProgress();
        updateNavigation();
    };

    // Next step
    const nextStep = () => {
        if (currentStep < totalSteps - 1) {
            // Validate current step
            const currentStepElement = wizardSteps[currentStep];
            const input = currentStepElement.querySelector('input, select');
            
            if (input && !input.value.trim()) {
                showNotification('Please fill in this field to continue.', 'error');
                return;
            }
            
            // Store data
            if (input) {
                formData[input.id.replace('Input', '').replace('Select', '')] = input.value;
            }
            
            showStep(currentStep + 1);
        } else if (currentStep === totalSteps - 1) {
            // Generate summary
            generateSummary();
            showStep(currentStep + 1);
        } else {
            // Start over
            showStep(0);
            resetForm();
        }
    };

    // Previous step
    const prevStep = () => {
        if (currentStep > 0) {
            showStep(currentStep - 1);
        }
    };

    // Generate startup summary
    const generateSummary = () => {
        const summaryElement = document.getElementById('startupSummary');
        if (summaryElement) {
            const { industry, problem, target, solution } = formData;
            const summary = `A ${industry} startup that solves ${problem} for ${target} by ${solution}.`;
            summaryElement.textContent = summary;
        }
    };

    // Reset form
    const resetForm = () => {
        Object.keys(formData).forEach(key => {
            formData[key] = '';
        });
        
        // Clear inputs
        document.querySelectorAll('.wizard-input').forEach(input => {
            input.value = '';
        });
    };

    // Event listeners for wizard
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }

    // Initialize wizard
    if (wizardSteps.length > 0) {
        initWizard();
    }

    // Input change handlers for form validation
    document.querySelectorAll('.wizard-input').forEach(input => {
        input.addEventListener('input', function() {
            // Enable next button if input has value
            if (this.value.trim()) {
                if (nextBtn) nextBtn.disabled = false;
            } else {
                if (nextBtn) nextBtn.disabled = true;
            }
        });
    });
});

// Razorpay Payment Gateway Integration
const RAZORPAY_KEY_ID = 'rzp_live_SU1WH99Cd7PMny';
const RAZORPAY_KEY_SECRET = 'aZKKjeUvoxKQHCXg12w1AP0G';



// Function to open Razorpay payment
function openRazorpay(productType, amount, productName) {
    // Create order options
    const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'StartupBuilder',
        description: productName,
        image: 'https://via.placeholder.com/150x50/2563eb/ffffff?text=StartupBuilder',
        handler: function(response) {
            // Payment successful
            handlePaymentSuccess(response, productType, amount, productName);
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        notes: {
            product_type: productType,
            product_name: productName
        },
        theme: {
            color: '#fbbf24'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment modal closed');
            }
        },
        // Add error handling
        onError: function(error) {
            console.error('Payment failed:', error);
            showPaymentError(error);
        }
    };

    // Create Razorpay instance and open
    try {
        // Check if Razorpay is loaded
        if (typeof Razorpay === 'undefined') {
            throw new Error('Razorpay SDK not loaded');
        }
        
        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error('Error creating Razorpay instance:', error);
        showPaymentError({ description: 'Failed to initialize payment gateway. Please try again later.' });
    }
}





// Show payment error
function showPaymentError(error) {
    const errorModal = document.createElement('div');
    errorModal.className = 'payment-error-modal';
    errorModal.innerHTML = `
        <div class="modal-content">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Payment Failed</h2>
            <p>Sorry, something went wrong with your payment.</p>
            <div class="error-details">
                <p><strong>Error:</strong> ${error.description || 'Unknown error occurred'}</p>
            </div>
            <p class="error-message">Please try again or contact support if the problem persists.</p>
            <div class="error-actions">
                <button class="btn btn-primary" onclick="closePaymentError()">Try Again</button>
                <button class="btn btn-outline" onclick="closePaymentError()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(errorModal);
    
    // Add CSS for error modal
    if (!document.getElementById('payment-error-styles')) {
        const styles = document.createElement('style');
        styles.id = 'payment-error-styles';
        styles.textContent = `
            .payment-error-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .error-icon {
                font-size: 80px;
                color: #ef4444;
                margin-bottom: 20px;
                animation: shake 0.6s ease;
            }
            
            .error-actions {
                display: flex;
                gap: 12px;
                justify-content: center;
                margin-top: 20px;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Close payment error modal
function closePaymentError() {
    const modal = document.querySelector('.payment-error-modal');
    if (modal) {
        modal.remove();
    }
}





// Handle successful payment
function handlePaymentSuccess(response, productType, amount, productName) {
    console.log('Payment successful:', response);
    
    // Show success message
    showPaymentSuccess(productType, amount, productName);
    
    // Here you would typically send the payment details to your backend
    // to verify the payment and process the order
    
    // For now, we'll just log the details
    const paymentDetails = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        product_type: productType,
        product_name: productName,
        amount: amount,
        currency: 'INR',
        timestamp: new Date().toISOString()
    };
    
    console.log('Payment Details:', paymentDetails);
    
    // You can send this to your backend API
    // sendPaymentToBackend(paymentDetails);
}

// Show payment success message
function showPaymentSuccess(productType, amount, productName) {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.className = 'payment-success-modal';
    successModal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Payment Successful!</h2>
            <p>Thank you for purchasing <strong>${productName}</strong></p>
            <div class="payment-details">
                <p><strong>Amount:</strong> ₹${amount}</p>
                <p><strong>Product:</strong> ${productName}</p>
            </div>
            <p class="success-message">You will receive access details via email shortly.</p>
            <button class="btn btn-primary" onclick="closePaymentSuccess()">Continue</button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Add CSS for the modal
    if (!document.getElementById('payment-success-styles')) {
        const styles = document.createElement('style');
        styles.id = 'payment-success-styles';
        styles.textContent = `
            .payment-success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
            }
            
            .success-icon {
                font-size: 80px;
                color: #10b981;
                margin-bottom: 20px;
                animation: bounce 0.6s ease;
            }
            
            .modal-content h2 {
                color: #1f2937;
                margin-bottom: 16px;
                font-size: 28px;
            }
            
            .modal-content p {
                color: #6b7280;
                margin-bottom: 12px;
                font-size: 16px;
            }
            
            .payment-details {
                background: #f9fafb;
                padding: 20px;
                border-radius: 12px;
                margin: 20px 0;
                border: 1px solid #e5e7eb;
            }
            
            .payment-details p {
                margin: 8px 0;
                color: #374151;
            }
            
            .success-message {
                color: #059669;
                font-weight: 600;
                margin: 20px 0;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-20px); }
                60% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Close payment success modal
function closePaymentSuccess() {
    const modal = document.querySelector('.payment-success-modal');
    if (modal) {
        modal.remove();
    }
}

// Function to send payment details to backend (implement as needed)
function sendPaymentToBackend(paymentDetails) {
    // Example implementation - replace with your actual backend API
    fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Payment verified with backend:', data);
    })
    .catch(error => {
        console.error('Error sending payment to backend:', error);
    });
}
