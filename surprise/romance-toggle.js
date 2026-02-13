/**
 * Day/Night Romance Toggle Feature
 * Adds a premium toggle to switch between a playful Day mode and a romantic Night mode.
 */

(function () {
    // 1. Inject CSS for the Toggle and Night Mode
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- Toggle Switch Styles --- */
        .romance-toggle-wrapper {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Nunito', sans-serif;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .romance-toggle-wrapper:hover {
            transform: scale(1.05);
        }

        .toggle-track {
            width: 60px;
            height: 30px;
            background: linear-gradient(to right, #4facfe, #00f2fe);
            border-radius: 30px;
            position: relative;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: background 0.8s ease;
        }

        .night-mode .toggle-track {
            background: linear-gradient(to right, #2c3e50, #4ca1af);
        }

        .toggle-knob {
            width: 26px;
            height: 26px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        .night-mode .toggle-knob {
            transform: translateX(30px);
            background: #fdfbf7;
        }

        .toggle-label {
            font-weight: 700;
            color: #ff6b81;
            text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
            transition: color 0.5s ease;
            display: none; /* Hidden on small screens, optional */
        }
        
        @media (min-width: 768px) {
            .toggle-label { display: block; }
        }

        .night-mode .toggle-label {
            color: #e0aaff;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        /* --- Night Mode Theme Overrides --- */
        body {
            transition: background-color 0.8s ease, color 0.8s ease;
        }

        /* Background Transition */
        .night-mode .animated-bg {
            background: linear-gradient(-45deg, #2d1b4e, #431238, #1a0b2e, #521c45) !important;
            background-size: 400% 400%;
        }

        /* Glass Card Transition */
        .night-mode .glass-card {
            background: rgba(30, 10, 40, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(186, 85, 211, 0.2); /* Purple glow */
        }
        
        .night-mode .title-font {
            color: #ffb7b2 !important; /* Softer pink text */
            text-shadow: 0 0 10px rgba(255, 183, 178, 0.4);
        }

        .night-mode .btn-shadow {
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        /* Slow down hearts in night mode */
        .night-mode .float-item {
            animation-duration: 15s !important; /* Slower */
            opacity: 0.4 !important; /* Dimmer */
            filter: blur(1px);
        }

        /* --- Stars Layer --- */
        .stars-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1; /* Behind hearts */
            opacity: 0;
            transition: opacity 1s ease;
        }

        .night-mode .stars-container {
            opacity: 1;
        }

        .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 4px white;
            animation: twinkle var(--duration) ease-in-out infinite;
            opacity: var(--opacity);
        }

        @keyframes twinkle {
            0%, 100% { opacity: var(--opacity); transform: scale(1); }
            50% { opacity: 0.1; transform: scale(0.6); }
        }
    `;
    document.head.appendChild(style);

    // 2. HTML Structure for Toggle
    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'romance-toggle-wrapper';
    toggleWrapper.innerHTML = `
        <span class="toggle-label">Day Mode</span>
        <div class="toggle-track">
            <div class="toggle-knob">🌞</div>
        </div>
    `;

    document.body.appendChild(toggleWrapper);

    // 3. Logic
    const body = document.body;
    const knob = toggleWrapper.querySelector('.toggle-knob');
    const label = toggleWrapper.querySelector('.toggle-label');
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.insertBefore(starsContainer, document.body.firstChild); // Very back

    // Generate Stars
    function createStars() {
        if (starsContainer.children.length > 0) return; // Already created

        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Random properties
            const size = Math.random() * 3 + 1; // 1-4px
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 3 + 2; // 2-5s
            const opacity = Math.random() * 0.7 + 0.3;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.setProperty('--opacity', opacity);

            starsContainer.appendChild(star);
        }
    }
    createStars(); // Pre-generate

    // Toggle Handler
    let isNight = false;
    toggleWrapper.addEventListener('click', () => {
        isNight = !isNight;

        if (isNight) {
            body.classList.add('night-mode');
            knob.innerHTML = '🌙'; // Moon
            label.innerText = 'Night Love';
        } else {
            body.classList.remove('night-mode');
            knob.innerHTML = '🌞'; // Sun
            label.innerText = 'Day Mode';
        }
    });

})();
