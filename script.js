document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const header = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    // Uses Intersection Observer API to trigger animations when elements enter viewport
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Tab Switching Logic (Visual Only) ---
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            tab.classList.add('active');
            
            // Here you would typically fetch new data or filter the grid
            // For this demo, we just animate the cards slightly
            const cards = document.querySelectorAll('.activity-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        });
    });

    // --- Mobile Menu Toggle (Basic) ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        // Simple toggle for demo purposes
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            // Change text color for mobile menu
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => link.style.color = '#1a1a1a');
        }
    });
        // --- Hero Carousel Logic ---
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    };

    const startCarousel = () => {
        slideInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds
    };

    const stopCarousel = () => {
        clearInterval(slideInterval);
    };

    // Initialize carousel
    if (slides.length > 0) {
        startCarousel();

        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopCarousel(); // Stop auto-play when user interacts
                showSlide(index);
                startCarousel(); // Restart auto-play
            });
        });
    }
});
    // --- Itinerary Day Accordion ---
    const itineraryDays = document.querySelectorAll('.itinerary-day');

    itineraryDays.forEach(day => {
        const header = day.querySelector('.day-header');
        
        // Open the first day by default
        if (day === itineraryDays[0]) {
            day.classList.add('active');
        }
        
        header.addEventListener('click', () => {
            // Toggle current day
            day.classList.toggle('active');
        });
    });

    // --- Related Packages Horizontal Scroll ---
    const relatedScroll = document.getElementById('relatedScroll');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');

    if (relatedScroll && prevBtn && nextBtn) {
        const scrollAmount = 325; // Card width + gap

        prevBtn.addEventListener('click', () => {
            relatedScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            relatedScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Hide/show buttons based on scroll position
        const updateScrollButtons = () => {
            const scrollLeft = relatedScroll.scrollLeft;
            const maxScroll = relatedScroll.scrollWidth - relatedScroll.clientWidth;

            prevBtn.style.opacity = scrollLeft > 10 ? '1' : '0.5';
            prevBtn.style.pointerEvents = scrollLeft > 10 ? 'auto' : 'none';
            
            nextBtn.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0.5';
            nextBtn.style.pointerEvents = scrollLeft < maxScroll - 10 ? 'auto' : 'none';
        };

        relatedScroll.addEventListener('scroll', updateScrollButtons);
        updateScrollButtons(); // Initial check
    }

    // --- Sticky Price Card on Scroll ---
    const priceCard = document.querySelector('.overview-price-card');
    const overviewSection = document.querySelector('.package-overview-section');

    if (priceCard && overviewSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    priceCard.style.opacity = '0.9';
                } else {
                    priceCard.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });

        observer.observe(overviewSection);
    }