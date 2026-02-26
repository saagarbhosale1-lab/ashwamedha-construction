document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navigation ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Future implementation for mobile menu
            hamburger.classList.toggle('active');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // --- Portfolio Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Before/After Image Sliders ---
    const sliders = document.querySelectorAll('.before-after-container');

    sliders.forEach(slider => {
        const afterImg = slider.querySelector('.img-after');
        const handle = slider.querySelector('.slider-handle');

        // Initial setup
        const defaultPosition = 50;
        afterImg.style.clipPath = `polygon(0 0, ${defaultPosition}% 0, ${defaultPosition}% 100%, 0 100%)`;
        handle.style.left = `${defaultPosition}%`;

        let isDragging = false;

        const startDrag = (e) => {
            isDragging = true;
        };

        const stopDrag = () => {
            isDragging = false;
        };

        const handleDrag = (e) => {
            if (!isDragging) return;

            // Get mouse/touch x position relative to container
            let clientX = e.clientX;
            if (e.touches) {
                clientX = e.touches[0].clientX;
            }

            const rect = slider.getBoundingClientRect();
            let xPos = clientX - rect.left;

            // Constrain xPos to the container width
            if (xPos < 0) xPos = 0;
            if (xPos > rect.width) xPos = rect.width;

            // Calculate percentage
            const percentage = (xPos / rect.width) * 100;

            // Update clip-path and handle position
            // The before image is underneath. The after image will be clipped so that it reveals the before image on the right.
            // Actually, usually Before is left, After is right, OR vice versa.
            // Let's clip the AFTER image from the left.
            // polygon(x1 y1, x2 y2, x3 y3, x4 y4). Left portion is 0 to percentage.
            // Wait, standard before/after usually shows Before on left, After on right.
            // If After is on top (z-index 2), we clip it to show only the right side: percentage to 100%.
            // Our CSS: img-after has z-index 1, img-before has z-index 2, and img-before is clipped 0 to 50%.
            // Let's adjust the JS for the CSS.
            const beforeImg = slider.querySelector('.img-before');
            beforeImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
            handle.style.left = `${percentage}%`;
        };

        // Mouse Events
        slider.addEventListener('mousedown', startDrag);
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('mousemove', handleDrag);

        // Touch Events
        slider.addEventListener('touchstart', startDrag);
        window.addEventListener('touchend', stopDrag);
        window.addEventListener('touchmove', handleDrag);
    });

    // --- Multi-Step Form Logic ---
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.getElementById('progress-fill');

    let currentStep = 0;

    const updateFormSteps = () => {
        formSteps.forEach(step => {
            step.classList.remove('form-step-active');
        });
        formSteps[currentStep].classList.add('form-step-active');
    };

    const updateProgressBar = () => {
        progressSteps.forEach((step, idx) => {
            if (idx <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // 3 steps = 2 gaps. Step 0 is 0%, Step 1 is 50%, Step 2 is 100%
        const progressPercentage = (currentStep / (progressSteps.length - 1)) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    };

    const validateStep = (stepIndex) => {
        const step = formSteps[stepIndex];
        const requiredInputs = step.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';

                // Add an event listener to remove the red border when user types
                input.addEventListener('input', function () {
                    this.style.borderColor = 'rgba(255,255,255,0.1)';
                }, { once: true });
            }
        });

        return isValid;
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateFormSteps();
                updateProgressBar();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
            updateProgressBar();
        });
    });

    const form = document.getElementById('multi-step-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                // Here we would normally send the data to a server
                alert('Thank you! Your request has been submitted securely.');
                form.reset();
                currentStep = 0;
                updateFormSteps();
                updateProgressBar();
            }
        });
    }

});
