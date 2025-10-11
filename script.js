// ========== DOM ELEMENTS ==========
const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// ========== OPEN MOBILE MENU ==========
openMenu.addEventListener('click', () => {
    navLinks.classList.add('active');
    overlay.classList.add('active');
    openMenu.classList.add('hidden');
    document.body.style.overflow = 'hidden';
});

// ========== CLOSE MOBILE MENU ==========
function closeNavMenu() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    openMenu.classList.remove('hidden');
    document.body.style.overflow = '';
}

closeMenu.addEventListener('click', closeNavMenu);
overlay.addEventListener('click', closeNavMenu);

// ========== MOBILE DROPDOWN TOGGLE ==========
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only handle on mobile screens
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const dropdown = toggle.nextElementSibling;
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    });
});

// ========== CLOSE MENU ON LINK CLICK (MOBILE) ==========
const navLinkItems = document.querySelectorAll('.nav-link-item a:not(.dropdown-toggle)');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            closeNavMenu();
        }
    });
});

// ========== RESET MOBILE MENU ON RESIZE ==========
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        closeNavMenu();
        // Reset all mobile dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// ========== CLOSE DROPDOWNS WHEN CLICKING OUTSIDE ==========
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-link-item')) {
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});





const whatsappBtn = document.querySelector(".whatsapp-btn");
const popup = document.getElementById("whatsappPopup");
const closePopup = document.getElementById("closePopup");
const sendMessage = document.getElementById("sendMessage");
const messageBox = document.getElementById("whatsappMessage");

 const phoneNumber = "254725494561"; 

  // Toggle popup
  whatsappBtn.addEventListener("click", () => {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  });

  // Close popup
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Send message
  sendMessage.addEventListener("click", () => {
    let message = messageBox.value.trim();
    if (message) {
      let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      messageBox.value = "";
      popup.style.display = "none";
    }
  });





   const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach(header => {
    header.addEventListener("click", () => {
      const openItem = document.querySelector(".accordion-header.active");
      if (openItem && openItem !== header) {
        openItem.classList.remove("active");
        openItem.nextElementSibling.style.maxHeight = null;
        openItem.nextElementSibling.classList.remove("open");
        openItem.querySelector(".icon").textContent = "+";
      }

      header.classList.toggle("active");
      const content = header.nextElementSibling;
      const icon = header.querySelector(".icon");

      if (header.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
        icon.textContent = "–";
      } else {
        content.style.maxHeight = null;
        content.classList.remove("open");
        icon.textContent = "+";
      }
    });
  });




  // ========== HERO BACKGROUND SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.querySelector('.hero-slider');
    const backgroundSlides = document.querySelectorAll('.slide-background');
    const prevBtn = document.querySelector('.hero-slider .prev-btn');
    const nextBtn = document.querySelector('.hero-slider .next-btn');
    const indicatorsContainer = document.querySelector('.hero-slider .slide-indicators');

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds between auto-slides

    // Create slide indicators
    function createIndicators() {
        backgroundSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Function to show specific slide
    function goToSlide(index) {
        // Remove active class from current slide and indicator
        backgroundSlides[currentSlide].classList.remove('active');
        const currentIndicator = indicatorsContainer.children[currentSlide];
        if (currentIndicator) {
            currentIndicator.classList.remove('active');
        }
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and indicator
        backgroundSlides[currentSlide].classList.add('active');
        const newIndicator = indicatorsContainer.children[currentSlide];
        if (newIndicator) {
            newIndicator.classList.add('active');
        }
    }

    // Next slide function
    function nextSlide() {
        const next = (currentSlide + 1) % backgroundSlides.length;
        goToSlide(next);
    }

    // Previous slide function
    function prevSlide() {
        const prev = (currentSlide - 1 + backgroundSlides.length) % backgroundSlides.length;
        goToSlide(prev);
    }

    // Start auto-sliding
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Stop auto-sliding
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners for manual controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            setTimeout(startSlideShow, intervalTime);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            setTimeout(startSlideShow, intervalTime);
        });
    }

    // Pause on hover
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);

        // Pause on touch for mobile devices
        heroSlider.addEventListener('touchstart', stopSlideShow);
        heroSlider.addEventListener('touchend', () => {
            setTimeout(startSlideShow, intervalTime);
        });
    }

    // Initialize the slider
    createIndicators();
    startSlideShow();
});

// ========== END HERO BACKGROUND SLIDER FUNCTIONALITY ==========





// ========== WELCOME IMAGE SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const welcomeImageSlider = document.querySelector('.welcome-image-slider');
    const welcomeImageSlides = document.querySelectorAll('.welcome-image-slide');
    const welcomeImagePrevBtn = document.querySelector('.welcome-image-prev-btn');
    const welcomeImageNextBtn = document.querySelector('.welcome-image-next-btn');
    const welcomeImageIndicatorsContainer = document.querySelector('.welcome-image-indicators');

    // Only initialize if welcome image slider exists
    if (welcomeImageSlides.length > 0) {
        let welcomeImageCurrentSlide = 0;
        let welcomeImageSlideInterval;
        const welcomeImageIntervalTime = 4000; // 4 seconds between auto-slides

        // Create welcome image slide indicators
        function createWelcomeImageIndicators() {
            welcomeImageSlides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('welcome-image-indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => welcomeImageGoToSlide(index));
                welcomeImageIndicatorsContainer.appendChild(indicator);
            });
        }

        // Function to show specific welcome image slide
        function welcomeImageGoToSlide(index) {
            // Remove active class from current slide and indicator
            welcomeImageSlides[welcomeImageCurrentSlide].classList.remove('active');
            const currentIndicator = welcomeImageIndicatorsContainer.children[welcomeImageCurrentSlide];
            if (currentIndicator) {
                currentIndicator.classList.remove('active');
            }
            
            // Update current slide index
            welcomeImageCurrentSlide = index;
            
            // Add active class to new slide and indicator
            welcomeImageSlides[welcomeImageCurrentSlide].classList.add('active');
            const newIndicator = welcomeImageIndicatorsContainer.children[welcomeImageCurrentSlide];
            if (newIndicator) {
                newIndicator.classList.add('active');
            }
        }

        // Next slide function
        function welcomeImageNextSlide() {
            const next = (welcomeImageCurrentSlide + 1) % welcomeImageSlides.length;
            welcomeImageGoToSlide(next);
        }

        // Previous slide function
        function welcomeImagePrevSlide() {
            const prev = (welcomeImageCurrentSlide - 1 + welcomeImageSlides.length) % welcomeImageSlides.length;
            welcomeImageGoToSlide(prev);
        }

        // Start auto-sliding
        function welcomeImageStartSlideShow() {
            welcomeImageSlideInterval = setInterval(welcomeImageNextSlide, welcomeImageIntervalTime);
        }

        // Stop auto-sliding
        function welcomeImageStopSlideShow() {
            clearInterval(welcomeImageSlideInterval);
        }

        // Event listeners for manual controls
        if (welcomeImagePrevBtn) {
            welcomeImagePrevBtn.addEventListener('click', () => {
                welcomeImagePrevSlide();
                welcomeImageStopSlideShow();
                setTimeout(welcomeImageStartSlideShow, welcomeImageIntervalTime);
            });
        }

        if (welcomeImageNextBtn) {
            welcomeImageNextBtn.addEventListener('click', () => {
                welcomeImageNextSlide();
                welcomeImageStopSlideShow();
                setTimeout(welcomeImageStartSlideShow, welcomeImageIntervalTime);
            });
        }

        // Pause on hover
        if (welcomeImageSlider) {
            welcomeImageSlider.addEventListener('mouseenter', welcomeImageStopSlideShow);
            welcomeImageSlider.addEventListener('mouseleave', welcomeImageStartSlideShow);

            // Pause on touch for mobile devices
            welcomeImageSlider.addEventListener('touchstart', welcomeImageStopSlideShow);
            welcomeImageSlider.addEventListener('touchend', () => {
                setTimeout(welcomeImageStartSlideShow, welcomeImageIntervalTime);
            });
        }

        // Initialize the welcome image slider
        createWelcomeImageIndicators();
        welcomeImageStartSlideShow();
    }
});

// ========== END WELCOME IMAGE SLIDER FUNCTIONALITY ==========
