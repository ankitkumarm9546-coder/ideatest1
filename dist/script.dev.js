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
});
//# sourceMappingURL=script.dev.js.map
