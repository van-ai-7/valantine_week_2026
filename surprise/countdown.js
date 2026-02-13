/**
 * Countdown-to-Confession Effect
 * Creates a cinematic prelude with a countdown before revealing the main question.
 */

(function () {
    // 1. Inject CSS for the Countdown Overlay
    const style = document.createElement('style');
    style.innerHTML = `
        /* --- Countdown Overlay --- */
        #countdown-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #ffd1ff);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite; /* Match main BG */
            z-index: 2000; /* Above everything */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: opacity 1.5s ease-out, visibility 1.5s;
        }

        .night-mode #countdown-overlay {
            background: linear-gradient(-45deg, #2d1b4e, #431238, #1a0b2e);
        }

        #countdown-text {
            font-family: 'Pacifico', cursive;
            font-size: 2.5rem;
            color: #fff;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            opacity: 0;
            transform: scale(0.9);
            transition: all 1s ease-out;
            margin-bottom: 2rem;
            text-align: center;
        }

        #countdown-number {
            font-family: 'Nunito', sans-serif;
            font-size: 6rem;
            font-weight: 800;
            color: #fff;
            text-shadow: 0 4px 15px rgba(255, 105, 180, 0.6);
            opacity: 0;
            transform: scale(0.5);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        }

        /* --- Animations --- */
        .fade-in-up {
            opacity: 1 !important;
            transform: scale(1) translateY(0) !important;
        }

        .fade-out {
            opacity: 0 !important;
            transform: scale(1.1) translateY(-20px) !important;
        }

        .pulse-anim {
            animation: pulseHeartbeat 0.8s ease-in-out forwards;
        }

        @keyframes pulseHeartbeat {
            0% { transform: scale(1); opacity: 0; }
            20% { transform: scale(1.3); opacity: 1; }
            40% { transform: scale(1); opacity: 1; }
            60% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        /* Main Content Hide/Show */
        .glass-card {
            transition: opacity 1.5s ease-out, transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .content-hidden {
            opacity: 0 !important;
            transform: scale(0.9) !important;
        }

        .content-visible {
            opacity: 1 !important;
            transform: scale(1) !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Setup
    const mainCard = document.querySelector('.glass-card');
    if (mainCard) mainCard.classList.add('content-hidden');

    const overlay = document.createElement('div');
    overlay.id = 'countdown-overlay';

    // Message
    const text = document.createElement('div');
    text.id = 'countdown-text';
    text.innerText = "Something special is loading...";

    // Number Container
    const number = document.createElement('div');
    number.id = 'countdown-number';

    overlay.appendChild(text);
    overlay.appendChild(number);
    document.body.appendChild(overlay);

    // 3. Execution Sequence
    const runSequence = async () => {
        // A. Show intro text
        await new Promise(r => setTimeout(r, 500));
        text.classList.add('fade-in-up');

        await new Promise(r => setTimeout(r, 2000)); // Read time

        // B. Hide text
        text.classList.remove('fade-in-up');
        text.classList.add('fade-out');
        await new Promise(r => setTimeout(r, 800));
        text.style.display = 'none';

        // C. Countdown
        const steps = ['3', '2', '1', '💖'];

        for (let i = 0; i < steps.length; i++) {
            number.innerText = steps[i];

            // Reset for animation re-trigger
            number.style.animation = 'none';
            number.offsetHeight; /* trigger reflow */
            number.style.animation = null;

            number.classList.add('pulse-anim');

            // Wait for next beat
            await new Promise(r => setTimeout(r, 1000));

            number.classList.remove('pulse-anim');
        }

        // D. Flash & Fade Out Overlay
        overlay.style.background = '#fff'; // Flash white
        overlay.style.transition = 'opacity 1s ease, background 0.5s ease';

        // Brief white flash hold
        await new Promise(r => setTimeout(r, 100));

        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';

        // E. Reveal Main Content
        if (mainCard) {
            setTimeout(() => {
                mainCard.classList.remove('content-hidden');
                mainCard.classList.add('content-visible');
            }, 300);
        }

        // Cleanup DOM
        setTimeout(() => {
            overlay.remove();
        }, 2000);
    };

    // Start when page is essentially ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runSequence);
    } else {
        runSequence();
    }

})();
