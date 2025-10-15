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

 const phoneNumber = "254745100005"; 

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



// ========== HOME PAGE HERO SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.querySelector('.hero-slider');
    const backgroundSlides = document.querySelectorAll('.slide-background');
    const prevBtn = document.querySelector('.hero-slider .prev-btn');
    const nextBtn = document.querySelector('.hero-slider .next-btn');
    const indicatorsContainer = document.querySelector('.hero-slider .slide-indicators');

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;

    function createIndicators() {
        backgroundSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    function goToSlide(index) {
        backgroundSlides[currentSlide].classList.remove('active');
        const currentIndicator = indicatorsContainer.children[currentSlide];
        if (currentIndicator) {
            currentIndicator.classList.remove('active');
        }
        
        currentSlide = index;
        
        backgroundSlides[currentSlide].classList.add('active');
        const newIndicator = indicatorsContainer.children[currentSlide];
        if (newIndicator) {
            newIndicator.classList.add('active');
        }
    }

    function nextSlide() {
        const next = (currentSlide + 1) % backgroundSlides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + backgroundSlides.length) % backgroundSlides.length;
        goToSlide(prev);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

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

    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);

        heroSlider.addEventListener('touchstart', stopSlideShow);
        heroSlider.addEventListener('touchend', () => {
            setTimeout(startSlideShow, intervalTime);
        });
    }

    createIndicators();
    startSlideShow();
});



// ========== ABOUT US PAGE HERO SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.querySelector('#homeOurStory.hero-slider');
    const backgroundSlides = document.querySelectorAll('#homeOurStory .slide-background');
    const prevBtn = document.querySelector('#homeOurStory .prev-btn');
    const nextBtn = document.querySelector('#homeOurStory .next-btn');
    const indicatorsContainer = document.querySelector('#homeOurStory .slide-indicators');

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;

    function createIndicators() {
        backgroundSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    function goToSlide(index) {
        backgroundSlides[currentSlide].classList.remove('active');
        const currentIndicator = indicatorsContainer.children[currentSlide];
        if (currentIndicator) {
            currentIndicator.classList.remove('active');
        }
        
        currentSlide = index;
        
        backgroundSlides[currentSlide].classList.add('active');
        const newIndicator = indicatorsContainer.children[currentSlide];
        if (newIndicator) {
            newIndicator.classList.add('active');
        }
    }

    function nextSlide() {
        const next = (currentSlide + 1) % backgroundSlides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + backgroundSlides.length) % backgroundSlides.length;
        goToSlide(prev);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

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

    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);

        heroSlider.addEventListener('touchstart', stopSlideShow);
        heroSlider.addEventListener('touchend', () => {
            setTimeout(startSlideShow, intervalTime);
        });
    }

    createIndicators();
    startSlideShow();
});



// ========== FACILITIES PAGE HERO SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.querySelector('#homeFacilities.hero-slider');
    const backgroundSlides = document.querySelectorAll('#homeFacilities .slide-background');
    const prevBtn = document.querySelector('#homeFacilities .prev-btn');
    const nextBtn = document.querySelector('#homeFacilities .next-btn');
    const indicatorsContainer = document.querySelector('#homeFacilities .slide-indicators');

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;

    function createIndicators() {
        backgroundSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    function goToSlide(index) {
        backgroundSlides[currentSlide].classList.remove('active');
        const currentIndicator = indicatorsContainer.children[currentSlide];
        if (currentIndicator) {
            currentIndicator.classList.remove('active');
        }
        
        currentSlide = index;
        
        backgroundSlides[currentSlide].classList.add('active');
        const newIndicator = indicatorsContainer.children[currentSlide];
        if (newIndicator) {
            newIndicator.classList.add('active');
        }
    }

    function nextSlide() {
        const next = (currentSlide + 1) % backgroundSlides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + backgroundSlides.length) % backgroundSlides.length;
        goToSlide(prev);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

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

    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);

        heroSlider.addEventListener('touchstart', stopSlideShow);
        heroSlider.addEventListener('touchend', () => {
            setTimeout(startSlideShow, intervalTime);
        });
    }

    createIndicators();
    startSlideShow();
});





// ========== APPLICATION PAGE HERO SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = document.querySelector('#homeApp.hero-slider');
    const backgroundSlides = document.querySelectorAll('#homeApp .slide-background');
    const prevBtn = document.querySelector('#homeApp .prev-btn');
    const nextBtn = document.querySelector('#homeApp .next-btn');
    const indicatorsContainer = document.querySelector('#homeApp .slide-indicators');

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;

    function createIndicators() {
        backgroundSlides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    function goToSlide(index) {
        backgroundSlides[currentSlide].classList.remove('active');
        const currentIndicator = indicatorsContainer.children[currentSlide];
        if (currentIndicator) {
            currentIndicator.classList.remove('active');
        }
        
        currentSlide = index;
        
        backgroundSlides[currentSlide].classList.add('active');
        const newIndicator = indicatorsContainer.children[currentSlide];
        if (newIndicator) {
            newIndicator.classList.add('active');
        }
    }

    function nextSlide() {
        const next = (currentSlide + 1) % backgroundSlides.length;
        goToSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + backgroundSlides.length) % backgroundSlides.length;
        goToSlide(prev);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

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

    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);

        heroSlider.addEventListener('touchstart', stopSlideShow);
        heroSlider.addEventListener('touchend', () => {
            setTimeout(startSlideShow, intervalTime);
        });
    }

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



// ========== ABOUT PAGE IMAGE SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const aboutImageSlider = document.querySelector('.about-img-slider');
    const aboutImageSlides = document.querySelectorAll('.about-img-slide');
    const aboutImagePrevBtn = document.querySelector('.about-img-prev-btn');
    const aboutImageNextBtn = document.querySelector('.about-img-next-btn');
    const aboutImageIndicatorsContainer = document.querySelector('.about-img-indicators');

    // Only initialize if about image slider exists
    if (aboutImageSlides.length > 0) {
        let aboutImageCurrentSlide = 0;
        let aboutImageSlideInterval;
        const aboutImageIntervalTime = 4000; // 4 seconds between auto-slides

        // Create about image slide indicators
        function createAboutImageIndicators() {
            aboutImageSlides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('about-img-indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => aboutImageGoToSlide(index));
                aboutImageIndicatorsContainer.appendChild(indicator);
            });
        }

        // Function to show specific about image slide
        function aboutImageGoToSlide(index) {
            // Remove active class from current slide and indicator
            aboutImageSlides[aboutImageCurrentSlide].classList.remove('active');
            const currentIndicator = aboutImageIndicatorsContainer.children[aboutImageCurrentSlide];
            if (currentIndicator) {
                currentIndicator.classList.remove('active');
            }
            
            // Update current slide index
            aboutImageCurrentSlide = index;
            
            // Add active class to new slide and indicator
            aboutImageSlides[aboutImageCurrentSlide].classList.add('active');
            const newIndicator = aboutImageIndicatorsContainer.children[aboutImageCurrentSlide];
            if (newIndicator) {
                newIndicator.classList.add('active');
            }
        }

        // Next slide function
        function aboutImageNextSlide() {
            const next = (aboutImageCurrentSlide + 1) % aboutImageSlides.length;
            aboutImageGoToSlide(next);
        }

        // Previous slide function
        function aboutImagePrevSlide() {
            const prev = (aboutImageCurrentSlide - 1 + aboutImageSlides.length) % aboutImageSlides.length;
            aboutImageGoToSlide(prev);
        }

        // Start auto-sliding
        function aboutImageStartSlideShow() {
            aboutImageSlideInterval = setInterval(aboutImageNextSlide, aboutImageIntervalTime);
        }

        // Stop auto-sliding
        function aboutImageStopSlideShow() {
            clearInterval(aboutImageSlideInterval);
        }

        // Event listeners for manual controls
        if (aboutImagePrevBtn) {
            aboutImagePrevBtn.addEventListener('click', () => {
                aboutImagePrevSlide();
                aboutImageStopSlideShow();
                setTimeout(aboutImageStartSlideShow, aboutImageIntervalTime);
            });
        }

        if (aboutImageNextBtn) {
            aboutImageNextBtn.addEventListener('click', () => {
                aboutImageNextSlide();
                aboutImageStopSlideShow();
                setTimeout(aboutImageStartSlideShow, aboutImageIntervalTime);
            });
        }

        // Pause on hover
        if (aboutImageSlider) {
            aboutImageSlider.addEventListener('mouseenter', aboutImageStopSlideShow);
            aboutImageSlider.addEventListener('mouseleave', aboutImageStartSlideShow);

            // Pause on touch for mobile devices
            aboutImageSlider.addEventListener('touchstart', aboutImageStopSlideShow);
            aboutImageSlider.addEventListener('touchend', () => {
                setTimeout(aboutImageStartSlideShow, aboutImageIntervalTime);
            });
        }

        // Initialize the about image slider
        createAboutImageIndicators();
        aboutImageStartSlideShow();
    }
});



// ========== LEARN IMAGE SLIDER FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', () => {
    const learnImageSlider = document.querySelector('.learn-img-slider');
    const learnImageSlides = document.querySelectorAll('.learn-img-slide');
    const learnImagePrevBtn = document.querySelector('.learn-img-prev-btn');
    const learnImageNextBtn = document.querySelector('.learn-img-next-btn');
    const learnImageIndicatorsContainer = document.querySelector('.learn-img-indicators');

    // Only initialize if learn image slider exists
    if (learnImageSlides.length > 0) {
        let learnImageCurrentSlide = 0;
        let learnImageSlideInterval;
        const learnImageIntervalTime = 4000; // 4 seconds between auto-slides

        // Create learn image slide indicators
        function createLearnImageIndicators() {
            learnImageSlides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('learn-img-indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => learnImageGoToSlide(index));
                learnImageIndicatorsContainer.appendChild(indicator);
            });
        }

        // Function to show specific learn image slide
        function learnImageGoToSlide(index) {
            // Remove active class from current slide and indicator
            learnImageSlides[learnImageCurrentSlide].classList.remove('active');
            const currentIndicator = learnImageIndicatorsContainer.children[learnImageCurrentSlide];
            if (currentIndicator) {
                currentIndicator.classList.remove('active');
            }
            
            // Update current slide index
            learnImageCurrentSlide = index;
            
            // Add active class to new slide and indicator
            learnImageSlides[learnImageCurrentSlide].classList.add('active');
            const newIndicator = learnImageIndicatorsContainer.children[learnImageCurrentSlide];
            if (newIndicator) {
                newIndicator.classList.add('active');
            }
        }

        // Next slide function
        function learnImageNextSlide() {
            const next = (learnImageCurrentSlide + 1) % learnImageSlides.length;
            learnImageGoToSlide(next);
        }

        // Previous slide function
        function learnImagePrevSlide() {
            const prev = (learnImageCurrentSlide - 1 + learnImageSlides.length) % learnImageSlides.length;
            learnImageGoToSlide(prev);
        }

        // Start auto-sliding
        function learnImageStartSlideShow() {
            learnImageSlideInterval = setInterval(learnImageNextSlide, learnImageIntervalTime);
        }

        // Stop auto-sliding
        function learnImageStopSlideShow() {
            clearInterval(learnImageSlideInterval);
        }

        // Event listeners for manual controls
        if (learnImagePrevBtn) {
            learnImagePrevBtn.addEventListener('click', () => {
                learnImagePrevSlide();
                learnImageStopSlideShow();
                setTimeout(learnImageStartSlideShow, learnImageIntervalTime);
            });
        }

        if (learnImageNextBtn) {
            learnImageNextBtn.addEventListener('click', () => {
                learnImageNextSlide();
                learnImageStopSlideShow();
                setTimeout(learnImageStartSlideShow, learnImageIntervalTime);
            });
        }

        // Pause on hover
        if (learnImageSlider) {
            learnImageSlider.addEventListener('mouseenter', learnImageStopSlideShow);
            learnImageSlider.addEventListener('mouseleave', learnImageStartSlideShow);

            // Pause on touch for mobile devices
            learnImageSlider.addEventListener('touchstart', learnImageStopSlideShow);
            learnImageSlider.addEventListener('touchend', () => {
                setTimeout(learnImageStartSlideShow, learnImageIntervalTime);
            });
        }

        // Initialize the learn image slider
        createLearnImageIndicators();
        learnImageStartSlideShow();
    }
});


// ========== PROGRAMMES IMAGE SLIDER FUNCTIONALITY ==========
function initializeProgrammesSlider() {
    const programmesImageSlider = document.querySelector('.programmes-img-slider');
    const programmesImageSlides = document.querySelectorAll('.programmes-img-slide');
    const programmesImagePrevBtn = document.querySelector('.programmes-img-prev-btn');
    const programmesImageNextBtn = document.querySelector('.programmes-img-next-btn');
    const programmesImageIndicatorsContainer = document.querySelector('.programmes-img-indicators');

    if (programmesImageSlides.length > 0) {
        let programmesImageCurrentSlide = 0;
        let programmesImageSlideInterval;
        const programmesImageIntervalTime = 4000;

        function createProgrammesImageIndicators() {
            programmesImageSlides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('programmes-img-indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => programmesImageGoToSlide(index));
                programmesImageIndicatorsContainer.appendChild(indicator);
            });
        }

        function programmesImageGoToSlide(index) {
            programmesImageSlides[programmesImageCurrentSlide].classList.remove('active');
            const currentIndicator = programmesImageIndicatorsContainer.children[programmesImageCurrentSlide];
            if (currentIndicator) {
                currentIndicator.classList.remove('active');
            }
            
            programmesImageCurrentSlide = index;
            
            programmesImageSlides[programmesImageCurrentSlide].classList.add('active');
            const newIndicator = programmesImageIndicatorsContainer.children[programmesImageCurrentSlide];
            if (newIndicator) {
                newIndicator.classList.add('active');
            }
        }

        function programmesImageNextSlide() {
            const next = (programmesImageCurrentSlide + 1) % programmesImageSlides.length;
            programmesImageGoToSlide(next);
        }

        function programmesImagePrevSlide() {
            const prev = (programmesImageCurrentSlide - 1 + programmesImageSlides.length) % programmesImageSlides.length;
            programmesImageGoToSlide(prev);
        }

        function programmesImageStartSlideShow() {
            programmesImageSlideInterval = setInterval(programmesImageNextSlide, programmesImageIntervalTime);
        }

        function programmesImageStopSlideShow() {
            clearInterval(programmesImageSlideInterval);
        }

        if (programmesImagePrevBtn) {
            programmesImagePrevBtn.addEventListener('click', () => {
                programmesImagePrevSlide();
                programmesImageStopSlideShow();
                setTimeout(programmesImageStartSlideShow, programmesImageIntervalTime);
            });
        }

        if (programmesImageNextBtn) {
            programmesImageNextBtn.addEventListener('click', () => {
                programmesImageNextSlide();
                programmesImageStopSlideShow();
                setTimeout(programmesImageStartSlideShow, programmesImageIntervalTime);
            });
        }

        if (programmesImageSlider) {
            programmesImageSlider.addEventListener('mouseenter', programmesImageStopSlideShow);
            programmesImageSlider.addEventListener('mouseleave', programmesImageStartSlideShow);

            programmesImageSlider.addEventListener('touchstart', programmesImageStopSlideShow);
            programmesImageSlider.addEventListener('touchend', () => {
                setTimeout(programmesImageStartSlideShow, programmesImageIntervalTime);
            });
        }

        createProgrammesImageIndicators();
        programmesImageStartSlideShow();
    }
}

// ========== EXTRACURRICULAR IMAGE SLIDER FUNCTIONALITY ==========
function initializeExtracurricularSlider() {
    const extracurricularImageSlider = document.querySelector('.extracurricular-img-slider');
    const extracurricularImageSlides = document.querySelectorAll('.extracurricular-img-slide');
    const extracurricularImagePrevBtn = document.querySelector('.extracurricular-img-prev-btn');
    const extracurricularImageNextBtn = document.querySelector('.extracurricular-img-next-btn');
    const extracurricularImageIndicatorsContainer = document.querySelector('.extracurricular-img-indicators');

    if (extracurricularImageSlides.length > 0) {
        let extracurricularImageCurrentSlide = 0;
        let extracurricularImageSlideInterval;
        const extracurricularImageIntervalTime = 4000;

        function createExtracurricularImageIndicators() {
            extracurricularImageSlides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('extracurricular-img-indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => extracurricularImageGoToSlide(index));
                extracurricularImageIndicatorsContainer.appendChild(indicator);
            });
        }

        function extracurricularImageGoToSlide(index) {
            extracurricularImageSlides[extracurricularImageCurrentSlide].classList.remove('active');
            const currentIndicator = extracurricularImageIndicatorsContainer.children[extracurricularImageCurrentSlide];
            if (currentIndicator) {
                currentIndicator.classList.remove('active');
            }
            
            extracurricularImageCurrentSlide = index;
            
            extracurricularImageSlides[extracurricularImageCurrentSlide].classList.add('active');
            const newIndicator = extracurricularImageIndicatorsContainer.children[extracurricularImageCurrentSlide];
            if (newIndicator) {
                newIndicator.classList.add('active');
            }
        }

        function extracurricularImageNextSlide() {
            const next = (extracurricularImageCurrentSlide + 1) % extracurricularImageSlides.length;
            extracurricularImageGoToSlide(next);
        }

        function extracurricularImagePrevSlide() {
            const prev = (extracurricularImageCurrentSlide - 1 + extracurricularImageSlides.length) % extracurricularImageSlides.length;
            extracurricularImageGoToSlide(prev);
        }

        function extracurricularImageStartSlideShow() {
            extracurricularImageSlideInterval = setInterval(extracurricularImageNextSlide, extracurricularImageIntervalTime);
        }

        function extracurricularImageStopSlideShow() {
            clearInterval(extracurricularImageSlideInterval);
        }

        if (extracurricularImagePrevBtn) {
            extracurricularImagePrevBtn.addEventListener('click', () => {
                extracurricularImagePrevSlide();
                extracurricularImageStopSlideShow();
                setTimeout(extracurricularImageStartSlideShow, extracurricularImageIntervalTime);
            });
        }

        if (extracurricularImageNextBtn) {
            extracurricularImageNextBtn.addEventListener('click', () => {
                extracurricularImageNextSlide();
                extracurricularImageStopSlideShow();
                setTimeout(extracurricularImageStartSlideShow, extracurricularImageIntervalTime);
            });
        }

        if (extracurricularImageSlider) {
            extracurricularImageSlider.addEventListener('mouseenter', extracurricularImageStopSlideShow);
            extracurricularImageSlider.addEventListener('mouseleave', extracurricularImageStartSlideShow);

            extracurricularImageSlider.addEventListener('touchstart', extracurricularImageStopSlideShow);
            extracurricularImageSlider.addEventListener('touchend', () => {
                setTimeout(extracurricularImageStartSlideShow, extracurricularImageIntervalTime);
            });
        }

        createExtracurricularImageIndicators();
        extracurricularImageStartSlideShow();
    }
}

// ========== EVENTS IMAGE SLIDER FUNCTIONALITY ==========
function initializeEventsSlider() {
    const eventsImageSlider = document.querySelector('.events-img-slider');
    const eventsImageSlides = document.querySelectorAll('.events-img-slide');
    const eventsImagePrevBtn = document.querySelector('.events-img-prev-btn');
    const eventsImageNextBtn = document.querySelector('.events-img-next-btn');
    const eventsImageIndicatorsContainer = document.querySelector('.events-img-indicators');

    if (eventsImageSlides.length > 0) {
        let eventsImageCurrentSlide = 0;
        let eventsImageSlideInterval;
        const eventsImageIntervalTime = 4000;

        function createEventsImageIndicators() {
            eventsImageSlides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('events-img-indicator');
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => eventsImageGoToSlide(index));
                eventsImageIndicatorsContainer.appendChild(indicator);
            });
        }

        function eventsImageGoToSlide(index) {
            eventsImageSlides[eventsImageCurrentSlide].classList.remove('active');
            const currentIndicator = eventsImageIndicatorsContainer.children[eventsImageCurrentSlide];
            if (currentIndicator) {
                currentIndicator.classList.remove('active');
            }
            
            eventsImageCurrentSlide = index;
            
            eventsImageSlides[eventsImageCurrentSlide].classList.add('active');
            const newIndicator = eventsImageIndicatorsContainer.children[eventsImageCurrentSlide];
            if (newIndicator) {
                newIndicator.classList.add('active');
            }
        }

        function eventsImageNextSlide() {
            const next = (eventsImageCurrentSlide + 1) % eventsImageSlides.length;
            eventsImageGoToSlide(next);
        }

        function eventsImagePrevSlide() {
            const prev = (eventsImageCurrentSlide - 1 + eventsImageSlides.length) % eventsImageSlides.length;
            eventsImageGoToSlide(prev);
        }

        function eventsImageStartSlideShow() {
            eventsImageSlideInterval = setInterval(eventsImageNextSlide, eventsImageIntervalTime);
        }

        function eventsImageStopSlideShow() {
            clearInterval(eventsImageSlideInterval);
        }

        if (eventsImagePrevBtn) {
            eventsImagePrevBtn.addEventListener('click', () => {
                eventsImagePrevSlide();
                eventsImageStopSlideShow();
                setTimeout(eventsImageStartSlideShow, eventsImageIntervalTime);
            });
        }

        if (eventsImageNextBtn) {
            eventsImageNextBtn.addEventListener('click', () => {
                eventsImageNextSlide();
                eventsImageStopSlideShow();
                setTimeout(eventsImageStartSlideShow, eventsImageIntervalTime);
            });
        }

        if (eventsImageSlider) {
            eventsImageSlider.addEventListener('mouseenter', eventsImageStopSlideShow);
            eventsImageSlider.addEventListener('mouseleave', eventsImageStartSlideShow);

            eventsImageSlider.addEventListener('touchstart', eventsImageStopSlideShow);
            eventsImageSlider.addEventListener('touchend', () => {
                setTimeout(eventsImageStartSlideShow, eventsImageIntervalTime);
            });
        }

        createEventsImageIndicators();
        eventsImageStartSlideShow();
    }
}

// Initialize all sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProgrammesSlider();
    initializeExtracurricularSlider();
    initializeEventsSlider();
});







// SLIDER FUNCTIONALITY - Add to your existing script.js file

// Teaching & Learning Slider
let teachingSlideIndex = 0;
let teachingInterval;

function showTeachingSlides() {
    const slides = document.querySelectorAll('#teachingSlider .slide');
    const dots = document.querySelectorAll('#teachingSlider .dot');
    
    if (slides.length === 0) return;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Ensure index is within bounds
    if (teachingSlideIndex >= slides.length) teachingSlideIndex = 0;
    if (teachingSlideIndex < 0) teachingSlideIndex = slides.length - 1;
    
    // Show current slide and activate corresponding dot
    slides[teachingSlideIndex].classList.add('active');
    if (dots[teachingSlideIndex]) {
        dots[teachingSlideIndex].classList.add('active');
    }
}

function changeTeachingSlide(n) {
    teachingSlideIndex += n;
    showTeachingSlides();
    resetTeachingInterval();
}

function currentTeachingSlide(n) {
    teachingSlideIndex = n;
    showTeachingSlides();
    resetTeachingInterval();
}

function resetTeachingInterval() {
    clearInterval(teachingInterval);
    teachingInterval = setInterval(() => {
        teachingSlideIndex++;
        showTeachingSlides();
    }, 5000);
}

// Pastoral Care Slider
let pastoralSlideIndex = 0;
let pastoralInterval;

function showPastoralSlides() {
    const slides = document.querySelectorAll('#pastoralSlider .slide');
    const dots = document.querySelectorAll('#pastoralSlider .dot');
    
    if (slides.length === 0) return;
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    if (pastoralSlideIndex >= slides.length) pastoralSlideIndex = 0;
    if (pastoralSlideIndex < 0) pastoralSlideIndex = slides.length - 1;
    
    slides[pastoralSlideIndex].classList.add('active');
    if (dots[pastoralSlideIndex]) {
        dots[pastoralSlideIndex].classList.add('active');
    }
}

function changePastoralSlide(n) {
    pastoralSlideIndex += n;
    showPastoralSlides();
    resetPastoralInterval();
}

function currentPastoralSlide(n) {
    pastoralSlideIndex = n;
    showPastoralSlides();
    resetPastoralInterval();
}

function resetPastoralInterval() {
    clearInterval(pastoralInterval);
    pastoralInterval = setInterval(() => {
        pastoralSlideIndex++;
        showPastoralSlides();
    }, 5000);
}

// Extracurricular Activities Slider
let extracurricularSlideIndex = 0;
let extracurricularInterval;

function showExtracurricularSlides() {
    const slides = document.querySelectorAll('#extracurricularSlider .slide');
    const dots = document.querySelectorAll('#extracurricularSlider .dot');
    
    if (slides.length === 0) return;
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    if (extracurricularSlideIndex >= slides.length) extracurricularSlideIndex = 0;
    if (extracurricularSlideIndex < 0) extracurricularSlideIndex = slides.length - 1;
    
    slides[extracurricularSlideIndex].classList.add('active');
    if (dots[extracurricularSlideIndex]) {
        dots[extracurricularSlideIndex].classList.add('active');
    }
}

function changeExtracurricularSlide(n) {
    extracurricularSlideIndex += n;
    showExtracurricularSlides();
    resetExtracurricularInterval();
}

function currentExtracurricularSlide(n) {
    extracurricularSlideIndex = n;
    showExtracurricularSlides();
    resetExtracurricularInterval();
}

function resetExtracurricularInterval() {
    clearInterval(extracurricularInterval);
    extracurricularInterval = setInterval(() => {
        extracurricularSlideIndex++;
        showExtracurricularSlides();
    }, 5000);
}

// Community Engagement Slider
let communitySlideIndex = 0;
let communityInterval;

function showCommunitySlides() {
    const slides = document.querySelectorAll('#communitySlider .slide');
    const dots = document.querySelectorAll('#communitySlider .dot');
    
    if (slides.length === 0) return;
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    if (communitySlideIndex >= slides.length) communitySlideIndex = 0;
    if (communitySlideIndex < 0) communitySlideIndex = slides.length - 1;
    
    slides[communitySlideIndex].classList.add('active');
    if (dots[communitySlideIndex]) {
        dots[communitySlideIndex].classList.add('active');
    }
}

function changeCommunitySlide(n) {
    communitySlideIndex += n;
    showCommunitySlides();
    resetCommunityInterval();
}

function currentCommunitySlide(n) {
    communitySlideIndex = n;
    showCommunitySlides();
    resetCommunityInterval();
}

function resetCommunityInterval() {
    clearInterval(communityInterval);
    communityInterval = setInterval(() => {
        communitySlideIndex++;
        showCommunitySlides();
    }, 5000);
}

// Initialize all sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Teaching Slider
    showTeachingSlides();
    teachingInterval = setInterval(() => {
        teachingSlideIndex++;
        showTeachingSlides();
    }, 5000);
    
    // Initialize Pastoral Slider
    showPastoralSlides();
    pastoralInterval = setInterval(() => {
        pastoralSlideIndex++;
        showPastoralSlides();
    }, 5000);
    
    // Initialize Extracurricular Slider
    showExtracurricularSlides();
    extracurricularInterval = setInterval(() => {
        extracurricularSlideIndex++;
        showExtracurricularSlides();
    }, 5000);
    
    // Initialize Community Slider
    showCommunitySlides();
    communityInterval = setInterval(() => {
        communitySlideIndex++;
        showCommunitySlides();
    }, 5000);
    
    // Add touch swipe support for mobile
    initTouchSwiping();
});

// Touch swipe functionality for mobile
function initTouchSwiping() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        let startX = 0;
        let endX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe(slider, startX, endX);
        });
    });
}

function handleSwipe(slider, startX, endX) {
    const swipeThreshold = 50;
    
    if (startX - endX > swipeThreshold) {
        // Swipe left - next slide
        if (slider.id === 'teachingSlider') changeTeachingSlide(1);
        else if (slider.id === 'pastoralSlider') changePastoralSlide(1);
        else if (slider.id === 'extracurricularSlider') changeExtracurricularSlide(1);
        else if (slider.id === 'communitySlider') changeCommunitySlide(1);
    } else if (endX - startX > swipeThreshold) {
        // Swipe right - previous slide
        if (slider.id === 'teachingSlider') changeTeachingSlide(-1);
        else if (slider.id === 'pastoralSlider') changePastoralSlide(-1);
        else if (slider.id === 'extracurricularSlider') changeExtracurricularSlide(-1);
        else if (slider.id === 'communitySlider') changeCommunitySlide(-1);
    }
}