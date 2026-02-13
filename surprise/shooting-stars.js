/**
 * Shooting Stars Feature
 * Adds subtle, random shooting stars only when Night Mode is active.
 */

(function () {
    // 1. Inject CSS for Shooting Stars
    const style = document.createElement('style');
    style.innerHTML = `
        .shooting-star-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0; /* Behind glass card (z-index 10) but above backdrop */
            overflow: hidden;
        }

        .shooting-star {
            position: absolute;
            height: 2px;
            background: linear-gradient(-45deg, rgba(255, 182, 193, 1), rgba(0, 0, 0, 0));
            border-radius: 999px;
            filter: drop-shadow(0 0 6px rgba(255, 235, 238, 0.8));
            opacity: 0;
        }

        .shooting-star::before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 300px;
            height: 1px;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.5), transparent);
        }

        .shooting-star::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0; 
            transform: translateY(-50%);
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.6);
        }

        @keyframes shoot {
            0% {
                transform: rotate(-135deg) translateX(0);
                opacity: 1;
            }
            70% {
                opacity: 1;
            }
            100% {
                transform: rotate(-135deg) translateX(-300px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Create Container
    const container = document.createElement('div');
    container.className = 'shooting-star-container';
    document.body.appendChild(container);

    // 3. Logic to Spawn Star
    function spawnShootingStar() {
        // Only trigger if in Night Mode
        if (!document.body.classList.contains('night-mode')) return;

        const star = document.createElement('div');
        star.className = 'shooting-star';

        // Randomize
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.4); // Top 40%
        const length = Math.random() * 100 + 150; // 150px - 250px
        const duration = Math.random() * 0.4 + 0.8; // 0.8s - 1.2s

        // Position
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        star.style.width = `${length}px`;
        star.style.animation = `shoot ${duration}s ease-out forwards`;

        container.appendChild(star);

        // Cleanup
        setTimeout(() => {
            star.remove();
        }, duration * 1000 + 100);
    }

    // 4. Scheduling Loop
    function scheduleNextStar() {
        const nextTime = Math.random() * 5000 + 5000; // 5s to 10s
        setTimeout(() => {
            spawnShootingStar();
            scheduleNextStar();
        }, nextTime);
    }

    // Start Loop
    spawnShootingStar();
    scheduleNextStar();

})();
