"use strict";

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  } // Close mobile menu when clicking on a link


  var navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}); // Smooth Scrolling for Navigation Links

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}); // Navbar Background Change on Scroll

window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.navbar');

  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
}); // Animate Elements on Scroll

var observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions); // Observe all cards and feature items

document.addEventListener('DOMContentLoaded', function () {
  var animatedElements = document.querySelectorAll('.course-card, .product-card, .feature-item');
  animatedElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}); // Form Submission Handling

document.addEventListener('DOMContentLoaded', function () {
  var contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Get form data

      var formData = new FormData(this);
      var name = this.querySelector('input[type="text"]').value;
      var email = this.querySelector('input[type="email"]').value;
      var option = this.querySelector('select').value;
      var message = this.querySelector('textarea').value; // Basic validation

      if (!name || !email || !option) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      } // Simulate form submission


      showNotification('Thank you! We\'ll contact you soon.', 'success'); // Reset form

      this.reset(); // Here you would typically send the data to your server

      console.log('Form submitted:', {
        name: name,
        email: email,
        option: option,
        message: message
      });
    });
  }
}); // Email validation

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} // Notification system


function showNotification(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  // Remove existing notifications
  var existingNotification = document.querySelector('.notification');

  if (existingNotification) {
    existingNotification.remove();
  } // Create notification element


  var notification = document.createElement('div');
  notification.className = "notification notification-".concat(type);
  notification.innerHTML = "\n        <div class=\"notification-content\">\n            <span class=\"notification-message\">".concat(message, "</span>\n            <button class=\"notification-close\">&times;</button>\n        </div>\n    "); // Add styles

  notification.style.cssText = "\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        background: ".concat(type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6', ";\n        color: white;\n        padding: 1rem 1.5rem;\n        border-radius: 10px;\n        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n        z-index: 10000;\n        transform: translateX(100%);\n        transition: transform 0.3s ease;\n        max-width: 400px;\n    "); // Add to page

  document.body.appendChild(notification); // Animate in

  setTimeout(function () {
    notification.style.transform = 'translateX(0)';
  }, 100); // Close button functionality

  var closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', function () {
    notification.style.transform = 'translateX(100%)';
    setTimeout(function () {
      return notification.remove();
    }, 300);
  }); // Auto-remove after 5 seconds

  setTimeout(function () {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(function () {
        return notification.remove();
      }, 300);
    }
  }, 5000);
} // Add CSS for notifications


var notificationStyles = document.createElement('style');
notificationStyles.textContent = "\n    .notification-content {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n    }\n    \n    .notification-close {\n        background: none;\n        border: none;\n        color: white;\n        font-size: 1.5rem;\n        cursor: pointer;\n        padding: 0;\n        line-height: 1;\n    }\n    \n    .notification-close:hover {\n        opacity: 0.8;\n    }\n";
document.head.appendChild(notificationStyles); // Counter Animation for Hero Stats

function animateCounter(element, target) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;
  var start = 0;
  var increment = target / (duration / 16);

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
} // Initialize counter animation when hero section is visible


document.addEventListener('DOMContentLoaded', function () {
  var heroCard = document.querySelector('.hero-card h3');

  if (heroCard) {
    var _observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(heroCard, 500);

          _observer.unobserve(entry.target);
        }
      });
    });

    _observer.observe(heroCard);
  }
}); // Add hover effects for course cards

document.addEventListener('DOMContentLoaded', function () {
  var courseCards = document.querySelectorAll('.course-card');
  courseCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}); // Add loading animation for images

document.addEventListener('DOMContentLoaded', function () {
  var images = document.querySelectorAll('img');
  images.forEach(function (img) {
    // Set initial state
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease'; // Handle successful load

    img.addEventListener('load', function () {
      console.log('Image loaded successfully:', this.src);
      this.style.opacity = '1';
    }); // Handle load errors

    img.addEventListener('error', function () {
      console.error('Image failed to load:', this.src);
      this.style.display = 'none'; // Create a placeholder

      var placeholder = document.createElement('div');
      placeholder.style.cssText = "\n                height: 100%;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: #6b7280;\n                font-size: 14px;\n                background: #f3f4f6;\n                border: 2px dashed #d1d5db;\n            ";
      placeholder.textContent = 'Image not found';
      this.parentElement.appendChild(placeholder);
    }); // Force opacity to 1 after a delay if image is already loaded

    setTimeout(function () {
      if (img.complete && img.naturalHeight !== 0) {
        img.style.opacity = '1';
      }
    }, 100);
  });
}); // Add scroll progress indicator

document.addEventListener('DOMContentLoaded', function () {
  var progressBar = document.createElement('div');
  progressBar.style.cssText = "\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 0%;\n        height: 3px;\n        background: linear-gradient(90deg, #fbbf24, #2563eb);\n        z-index: 10001;\n        transition: width 0.1s ease;\n    ";
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset;
    var docHeight = document.body.scrollHeight - window.innerHeight;
    var scrollPercent = scrollTop / docHeight * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}); // Modern Hero Section Functionality

document.addEventListener('DOMContentLoaded', function () {
  // Particle Animation System
  var canvas = document.getElementById('particleCanvas');

  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var animationId; // Resize canvas to match window size

    var resizeCanvas = function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }; // Create particles


    var createParticles = function createParticles() {
      particles = [];

      for (var i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }; // Animate particles


    var animateParticles = function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (particle) {
        particle.x += particle.vx;
        particle.y += particle.vy; // Bounce off boundaries

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1; // Draw particle

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, ".concat(particle.opacity, ")");
        ctx.fill();
      });
      animationId = requestAnimationFrame(animateParticles);
    }; // Initialize particle system


    resizeCanvas();
    createParticles();
    animateParticles(); // Handle window resize

    window.addEventListener('resize', resizeCanvas);
  } // Progress Popup System


  var progressPopup = document.getElementById('progressPopup');

  if (progressPopup) {
    // Show popup after 3 seconds
    setTimeout(function () {
      progressPopup.classList.add('show'); // Hide popup after 4 seconds

      setTimeout(function () {
        progressPopup.classList.remove('show');
      }, 4000);
    }, 3000);
  } // Form Wizard System


  var wizardSteps = document.querySelectorAll('.wizard-step');
  var progressFill = document.getElementById('progressFill');
  var currentStepSpan = document.getElementById('currentStep');
  var progressPercent = document.getElementById('progressPercent');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var currentStep = 0;
  var totalSteps = wizardSteps.length; // Form data storage

  var formData = {
    industry: '',
    problem: '',
    target: '',
    solution: ''
  }; // Initialize wizard

  var initWizard = function initWizard() {
    updateProgress();
    updateNavigation();
  }; // Update progress bar and info


  var updateProgress = function updateProgress() {
    var progress = (currentStep + 1) / totalSteps * 100;
    if (progressFill) progressFill.style.width = "".concat(progress, "%");
    if (currentStepSpan) currentStepSpan.textContent = "Step ".concat(currentStep + 1, " of ").concat(totalSteps);
    if (progressPercent) progressPercent.textContent = "".concat(Math.round(progress), "%");
  }; // Update navigation buttons


  var updateNavigation = function updateNavigation() {
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
  }; // Show step


  var showStep = function showStep(stepIndex) {
    wizardSteps.forEach(function (step, index) {
      step.classList.toggle('active', index === stepIndex);
    });
    currentStep = stepIndex;
    updateProgress();
    updateNavigation();
  }; // Next step


  var nextStep = function nextStep() {
    if (currentStep < totalSteps - 1) {
      // Validate current step
      var currentStepElement = wizardSteps[currentStep];
      var input = currentStepElement.querySelector('input, select');

      if (input && !input.value.trim()) {
        showNotification('Please fill in this field to continue.', 'error');
        return;
      } // Store data


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
  }; // Previous step


  var prevStep = function prevStep() {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  }; // Generate startup summary


  var generateSummary = function generateSummary() {
    var summaryElement = document.getElementById('startupSummary');

    if (summaryElement) {
      var industry = formData.industry,
          problem = formData.problem,
          target = formData.target,
          solution = formData.solution;
      var summary = "A ".concat(industry, " startup that solves ").concat(problem, " for ").concat(target, " by ").concat(solution, ".");
      summaryElement.textContent = summary;
    }
  }; // Reset form


  var resetForm = function resetForm() {
    Object.keys(formData).forEach(function (key) {
      formData[key] = '';
    }); // Clear inputs

    document.querySelectorAll('.wizard-input').forEach(function (input) {
      input.value = '';
    });
  }; // Event listeners for wizard


  if (nextBtn) {
    nextBtn.addEventListener('click', nextStep);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevStep);
  } // Initialize wizard


  if (wizardSteps.length > 0) {
    initWizard();
  } // Input change handlers for form validation


  document.querySelectorAll('.wizard-input').forEach(function (input) {
    input.addEventListener('input', function () {
      // Enable next button if input has value
      if (this.value.trim()) {
        if (nextBtn) nextBtn.disabled = false;
      } else {
        if (nextBtn) nextBtn.disabled = true;
      }
    });
  });
}); // Razorpay Payment Gateway Integration

var RAZORPAY_KEY_ID = 'rzp_live_SU1WH99Cd7PMny';
var RAZORPAY_KEY_SECRET = 'aZKKjeUvoxKQHCXg12w1AP0G'; // Function to open Razorpay payment

function openRazorpay(productType, amount, productName) {
  // Create order options
  var options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100,
    // Razorpay expects amount in paise
    currency: 'INR',
    name: 'StartupBuilder',
    description: productName,
    image: 'https://via.placeholder.com/150x50/2563eb/ffffff?text=StartupBuilder',
    handler: function handler(response) {
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
      ondismiss: function ondismiss() {
        console.log('Payment modal closed');
      }
    },
    // Add error handling
    onError: function onError(error) {
      console.error('Payment failed:', error);
      showPaymentError(error);
    }
  }; // Create Razorpay instance and open

  try {
    // Check if Razorpay is loaded
    if (typeof Razorpay === 'undefined') {
      throw new Error('Razorpay SDK not loaded');
    }

    var rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Error creating Razorpay instance:', error);
    showPaymentError({
      description: 'Failed to initialize payment gateway. Please try again later.'
    });
  }
} // Show payment error


function showPaymentError(error) {
  var errorModal = document.createElement('div');
  errorModal.className = 'payment-error-modal';
  errorModal.innerHTML = "\n        <div class=\"modal-content\">\n            <div class=\"error-icon\">\n                <i class=\"fas fa-exclamation-triangle\"></i>\n            </div>\n            <h2>Payment Failed</h2>\n            <p>Sorry, something went wrong with your payment.</p>\n            <div class=\"error-details\">\n                <p><strong>Error:</strong> ".concat(error.description || 'Unknown error occurred', "</p>\n            </div>\n            <p class=\"error-message\">Please try again or contact support if the problem persists.</p>\n            <div class=\"error-actions\">\n                <button class=\"btn btn-primary\" onclick=\"closePaymentError()\">Try Again</button>\n                <button class=\"btn btn-outline\" onclick=\"closePaymentError()\">Close</button>\n            </div>\n        </div>\n    ");
  document.body.appendChild(errorModal); // Add CSS for error modal

  if (!document.getElementById('payment-error-styles')) {
    var styles = document.createElement('style');
    styles.id = 'payment-error-styles';
    styles.textContent = "\n            .payment-error-modal {\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                background: rgba(0, 0, 0, 0.8);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                z-index: 10000;\n                animation: fadeIn 0.3s ease;\n            }\n            \n            .error-icon {\n                font-size: 80px;\n                color: #ef4444;\n                margin-bottom: 20px;\n                animation: shake 0.6s ease;\n            }\n            \n            .error-actions {\n                display: flex;\n                gap: 12px;\n                justify-content: center;\n                margin-top: 20px;\n            }\n            \n            @keyframes shake {\n                0%, 100% { transform: translateX(0); }\n                25% { transform: translateX(-10px); }\n                75% { transform: translateX(10px); }\n            }\n        ";
    document.head.appendChild(styles);
  }
} // Close payment error modal


function closePaymentError() {
  var modal = document.querySelector('.payment-error-modal');

  if (modal) {
    modal.remove();
  }
} // Handle successful payment


function handlePaymentSuccess(response, productType, amount, productName) {
  console.log('Payment successful:', response); // Show success message

  showPaymentSuccess(productType, amount, productName); // Here you would typically send the payment details to your backend
  // to verify the payment and process the order
  // For now, we'll just log the details

  var paymentDetails = {
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_signature: response.razorpay_signature,
    product_type: productType,
    product_name: productName,
    amount: amount,
    currency: 'INR',
    timestamp: new Date().toISOString()
  };
  console.log('Payment Details:', paymentDetails); // You can send this to your backend API
  // sendPaymentToBackend(paymentDetails);
} // Show payment success message


function showPaymentSuccess(productType, amount, productName) {
  // Create success modal
  var successModal = document.createElement('div');
  successModal.className = 'payment-success-modal';
  successModal.innerHTML = "\n        <div class=\"modal-content\">\n            <div class=\"success-icon\">\n                <i class=\"fas fa-check-circle\"></i>\n            </div>\n            <h2>Payment Successful!</h2>\n            <p>Thank you for purchasing <strong>".concat(productName, "</strong></p>\n            <div class=\"payment-details\">\n                <p><strong>Amount:</strong> \u20B9").concat(amount, "</p>\n                <p><strong>Product:</strong> ").concat(productName, "</p>\n            </div>\n            <p class=\"success-message\">You will receive access details via email shortly.</p>\n            <button class=\"btn btn-primary\" onclick=\"closePaymentSuccess()\">Continue</button>\n        </div>\n    ");
  document.body.appendChild(successModal); // Add CSS for the modal

  if (!document.getElementById('payment-success-styles')) {
    var styles = document.createElement('style');
    styles.id = 'payment-success-styles';
    styles.textContent = "\n            .payment-success-modal {\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                background: rgba(0, 0, 0, 0.8);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                z-index: 10000;\n                animation: fadeIn 0.3s ease;\n            }\n            \n            .modal-content {\n                background: white;\n                padding: 40px;\n                border-radius: 20px;\n                text-align: center;\n                max-width: 500px;\n                width: 90%;\n                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n                animation: slideUp 0.3s ease;\n            }\n            \n            .success-icon {\n                font-size: 80px;\n                color: #10b981;\n                margin-bottom: 20px;\n                animation: bounce 0.6s ease;\n            }\n            \n            .modal-content h2 {\n                color: #1f2937;\n                margin-bottom: 16px;\n                font-size: 28px;\n            }\n            \n            .modal-content p {\n                color: #6b7280;\n                margin-bottom: 12px;\n                font-size: 16px;\n            }\n            \n            .payment-details {\n                background: #f9fafb;\n                padding: 20px;\n                border-radius: 12px;\n                margin: 20px 0;\n                border: 1px solid #e5e7eb;\n            }\n            \n            .payment-details p {\n                margin: 8px 0;\n                color: #374151;\n            }\n            \n            .success-message {\n                color: #059669;\n                font-weight: 600;\n                margin: 20px 0;\n            }\n            \n            @keyframes fadeIn {\n                from { opacity: 0; }\n                to { opacity: 1; }\n            }\n            \n            @keyframes slideUp {\n                from { transform: translateY(50px); opacity: 0; }\n                to { transform: translateY(0); opacity: 1; }\n            }\n            \n            @keyframes bounce {\n                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n                40% { transform: translateY(-20px); }\n                60% { transform: translateY(-10px); }\n            }\n        ";
    document.head.appendChild(styles);
  }
} // Close payment success modal


function closePaymentSuccess() {
  var modal = document.querySelector('.payment-success-modal');

  if (modal) {
    modal.remove();
  }
} // Function to send payment details to backend (implement as needed)


function sendPaymentToBackend(paymentDetails) {
  // Example implementation - replace with your actual backend API
  fetch('/api/payment/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentDetails)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log('Payment verified with backend:', data);
  })["catch"](function (error) {
    console.error('Error sending payment to backend:', error);
  });
}
//# sourceMappingURL=script.dev.js.map
