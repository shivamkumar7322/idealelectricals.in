document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // 1. Mobile Toggle Functionality
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Click ko bahar jane se roke
            navLinks.classList.toggle('active');
            console.log("Menu Toggle Clicked"); // Debugging ke liye
        });
    }

    // 2. Nav Links Click (Smooth Scroll + Auto Close Menu)
    const allNavLinks = document.querySelectorAll('.nav-links a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Mobile par menu band karein
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            // Smooth Scroll Logic
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);

                // Phone call link ko disturb na karein
                if (link.classList.contains('call-now')) return;

                e.preventDefault();
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // --- Baaki Counters aur Forms ka code niche waise hi rahega ---

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });

    // Founder Section Counter
    const expCounter = document.querySelector('.exp-num');
    if (expCounter) {
        let count = 0;
        const target = 18; // Aapke design mein 18+ hai
        const updateExp = () => {
            if (count < target) {
                count++;
                expCounter.innerText = count + "+";
                setTimeout(updateExp, 50);
            }
        };
        updateExp();
    }
});