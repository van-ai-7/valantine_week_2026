/**
 * Valentine's Week Website - Core Logic
 * Handles date detection, theme switching, and animations.
 */

// Configuration
const CONFIG = {
    DEV_MODE: true,

    schedule: {
        'rose': '2026-02-07',
        'propose': '2026-02-08',
        'chocolate': '2026-02-09',
        'teddy': '2026-02-10',
        'promise': '2026-02-11',
        'hug': '2026-02-12',
        'kiss': '2026-02-13',
        'valentine': '2026-02-14'
    },

    themes: {
        'rose': {
            title: "Rose Day",
            icon: "🌹",
            bgElements: [], // Custom handled by controller
            message: "", // Handled by typewriter
            interaction: "🌹"
        },
        'propose': {
            title: "Propose Day",
            icon: "💍",
            bgElements: ["💍", "💎", "✨"],
            message: "A question that changes everything forever.",
            interaction: "💍"
        },
        'chocolate': {
            title: "Chocolate Day",
            icon: "🍫",
            bgElements: ["🍫", "🍬", "🍪"],
            message: "Life is like a chocolate box, sweet and full of surprises.",
            interaction: "🍫"
        },
        'teddy': {
            title: "Teddy Day",
            icon: "🧸",
            bgElements: ["🧸", "🎀", "☁️"],
            message: "Soft hugs and warm memories.",
            interaction: "🧸"
        },
        'promise': {
            title: "Promise Day",
            icon: "🤞",
            bgElements: ["🤞", "✨", "🔒"],
            message: "Promises are the glue of love.",
            interaction: "🤝"
        },
        'hug': {
            title: "Hug Day",
            icon: "🤗",
            bgElements: ["🤗", "🧡", "✨"],
            message: "Sometimes a hug is all the medicine one needs.",
            interaction: "🤗"
        },
        'kiss': {
            title: "Kiss Day",
            icon: "💋",
            bgElements: ["💋", "❤️", "💄"],
            message: "The language of love is spoken in silence.",
            interaction: "💋"
        },
        'valentine': {
            title: "Valentine's Day",
            icon: "💝",
            bgElements: ["💝", "❤️", "💖", "✨"],
            message: "You are my forever and always.",
            interaction: "💝"
        }
    }
};

// DOM Elements
const body = document.body;
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const contentLayer = document.getElementById('content-layer');
const bgLayer = document.getElementById('background-layer');
const interactionPlaceholder = document.getElementById('interaction-placeholder');
const messagePlaceholder = document.querySelector('.message-placeholder');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// State
let currentTheme = 'rose';
let currentController = null;

// ----------------------------------------------------------------------
// 🌹 Rose Day Specific Controller
// ----------------------------------------------------------------------
const RoseDayController = {
    intervals: [],

    init: function () {
        console.log("🌹 Initializing Rose Day Garden...");
        this.setTimeBasedAtmosphere();
        this.startPetalRain();
        this.createInteractiveBlooms();
        this.startFloatingMessages();
        this.typeMainMessage();

        // Global Click Burst
        this.clickBurstHandler = (e) => this.createBloomBurst(e.clientX, e.clientY);
        window.addEventListener('click', this.clickBurstHandler);

        document.body.classList.add('rose-day-active');
    },

    cleanup: function () {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
        gsap.killTweensOf(".rose-petal");
        gsap.killTweensOf(".floating-text-petal");

        if (this.clickBurstHandler) {
            window.removeEventListener('click', this.clickBurstHandler);
        }

        document.body.classList.remove('rose-day-active');

        // Clean up background petals
        const petals = document.querySelectorAll('.rose-petal, .floating-text-petal');
        petals.forEach(p => p.remove());
    },

    setTimeBasedAtmosphere: function () {
        const hour = new Date().getHours();
        let startColor, endColor;

        if (hour >= 6 && hour < 17) {
            startColor = "#fff0f3";
            endColor = "#ffccd5";
        } else if (hour >= 17 && hour < 20) {
            startColor = "#feced2";
            endColor = "#ffb3c1";
        } else {
            startColor = "#fbe7eb";
            endColor = "#e8c1c7";
        }

        document.documentElement.style.setProperty('--rose-bg-start', startColor);
        document.documentElement.style.setProperty('--rose-bg-end', endColor);
    },

    startPetalRain: function () {
        const createPetal = () => {
            if (!document.body.classList.contains('rose-day-active')) return;

            const petal = document.createElement('div');
            petal.classList.add('rose-petal');

            const size = Math.random() * 15 + 10;
            const startLeft = Math.random() * 100;
            const duration = Math.random() * 5 + 5;

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${startLeft}%`;
            petal.style.top = `-20px`;

            bgLayer.appendChild(petal);
            // Animate
            gsap.to(petal, {
                y: window.innerHeight + 100,
                x: `+=${Math.random() * 100 - 50}`, // Drift
                rotation: Math.random() * 360,
                duration: duration,
                ease: "none",
                onComplete: () => petal.remove()
            });

            // Interaction: Wind Effect on Hover
            petal.addEventListener('mouseenter', () => {
                gsap.to(petal, {
                    x: `+=${Math.random() * 200 - 100}`, // Blow away horizontally
                    y: `-=${Math.random() * 50}`, // Lift up slightly
                    rotation: `+=${Math.random() * 360}`, // Spin
                    duration: 0.8,
                    perspective: 500,
                    rotationX: Math.random() * 360,
                    ease: "power2.out"
                });
            });
        };

        for (let i = 0; i < 40; i++) setTimeout(createPetal, Math.random() * 2000);
        this.intervals.push(setInterval(createPetal, 200));
    },

    createInteractiveBlooms: function () {
        const container = document.querySelector('.interactive-area');
        if (!container) return;

        // Force clear and rebuild
        container.innerHTML = '';
        container.style.opacity = 1; // Ensure it's visible

        for (let i = 0; i < 3; i++) {
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            wrapper.style.margin = "0 15px";

            const rose = document.createElement('div');
            rose.classList.add('interactive-bloom');
            rose.style.position = 'relative'; // Override absolute for inline flow
            rose.style.fontSize = '3.5rem';
            rose.innerHTML = `🌹<div class="bloom-glow"></div>`;

            // Interaction for mobile & Desktop Click
            const bloomAction = (e) => {
                if (!rose.classList.contains('bloomed')) {
                    rose.classList.add('bloomed');
                    this.showBloomMessage(i);
                }
                // Trigger Burst on every click even if already bloomed
                this.createBloomBurst(e.clientX, e.clientY);
            };

            rose.addEventListener('mouseenter', () => {
                if (!rose.classList.contains('bloomed')) {
                    rose.classList.add('bloomed');
                    this.showBloomMessage(i);
                }
            });
            rose.addEventListener('click', bloomAction);
            rose.addEventListener('touchstart', bloomAction, { passive: true });

            wrapper.appendChild(rose);
            container.appendChild(wrapper);
        }
    },

    createBloomBurst: function (x, y) {
        const particles = ['❤️', '🌹', '✨', '💖', '🌸'];
        for (let i = 0; i < 12; i++) {
            const p = document.createElement('div');
            p.innerText = particles[Math.floor(Math.random() * particles.length)];
            p.style.position = 'fixed';
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            p.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
            p.style.pointerEvents = 'none';
            p.style.zIndex = 100;
            document.body.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 200 + 50;

            gsap.to(p, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                duration: 2 + Math.random(),
                ease: "power2.out",
                onComplete: () => p.remove()
            });
        }
    },

    showBloomMessage: function (index) {
        // Optional: Reveal specific text when a rose blooms
        const extras = ["[Confidence]", "[Passion]", "[Care]"];
        const msg = document.createElement('div');
        msg.innerText = extras[index] || "❤️";
        msg.style.position = 'absolute';
        msg.style.top = '-20px';
        msg.style.left = '50%';
        msg.style.transform = 'translateX(-50%)';
        msg.style.fontSize = '1rem';
        msg.style.color = 'var(--primary-color)';
        msg.style.opacity = 0;

        // Find the specific rose wrapper to append to
        const wrappers = document.querySelectorAll('.interactive-area > div');
        if (wrappers[index]) {
            wrappers[index].appendChild(msg);
            gsap.to(msg, { y: -10, opacity: 1, duration: 0.5 });
        }
    },

    startFloatingMessages: function () {
        const messages = [
            "You are my garden",
            "Blooming only for you",
            "Every petal tells a story",
            "Soft as a rose, strong as love",
            "In a field of roses, I found you",
            "Love grows here",
            "My heart beats for you",
            "Forever yours",
            "You are my sunshine"
        ];

        const showMessage = () => {
            if (!document.body.classList.contains('rose-day-active')) return;

            const msg = document.createElement('div');
            msg.classList.add('floating-text-petal');
            msg.innerText = messages[Math.floor(Math.random() * messages.length)];

            // Spawn logic: Avoid the center 50% where the glass card sits
            // Zones: 0-25% (Left) or 75-100% (Right)
            const side = Math.random() > 0.5 ? 'left' : 'right';
            const randomX = Math.random() * 20; // 0-20%

            msg.style.left = side === 'left' ? `${randomX}%` : `${80 + randomX}%`;
            msg.style.top = `${Math.random() * 80 + 10}%`; // Vertical range

            bgLayer.appendChild(msg);

            gsap.fromTo(msg,
                { opacity: 0, scale: 0.8, y: 30 },
                {
                    opacity: 0.7, // Slightly lower max opacity to not be distracting
                    scale: 1,
                    y: 0,
                    duration: 3,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(msg, {
                            opacity: 0,
                            y: -30,
                            delay: 2,
                            duration: 2,
                            onComplete: () => msg.remove()
                        });
                    }
                }
            );
        };

        this.intervals.push(setInterval(showMessage, 3000));
    },

    typeMainMessage: function () {
        const typeContainer = document.querySelector('.message-placeholder .placeholder-text');
        const secondaryContainer = document.querySelector('.message-placeholder .placeholder-text.small');
        const footerNote = document.querySelector('.footer-note'); // Target footer

        if (!typeContainer) return;

        // Initial setup
        typeContainer.innerHTML = '';
        typeContainer.style.opacity = 1;

        // More content in secondary container
        if (secondaryContainer) {
            secondaryContainer.innerHTML = `
                <br>
                <span style="font-size: 1.2rem; display:block; margin-bottom:10px;">🌹 Happy Rose Day 🌹</span>
                Every petal of these roses represents a moment I realized I love you.<br>
                Hover over them to see my love bloom.
            `;
            secondaryContainer.style.opacity = 0.9;
        }

        // Set Real Footer Message
        if (footerNote) {
            footerNote.innerText = "You are the most beautiful flower in my garden of life.";
            gsap.fromTo(footerNote, { opacity: 0 }, { opacity: 1, duration: 2, delay: 3 });
        }

        const text = "To the one who makes my world beautiful... You are softer than a petal, and your love is more precious than the rarest rose.";
        let i = 0;

        const type = () => {
            // Stop if we navigated away
            if (!document.body.classList.contains('rose-day-active')) return;

            if (i < text.length) {
                // Check if current char is a tag start
                typeContainer.innerHTML = text.substring(0, i + 1) + '<span class="typewriter-cursor">|</span>';
                i++;
                setTimeout(type, 60); // Slightly faster typing
            } else {
                typeContainer.innerHTML = text + '<span class="typewriter-cursor">|</span>';
            }
        };

        setTimeout(type, 500);
    }
};



// ----------------------------------------------------------------------
// 💍 Propose Day Specific Controller (Hold Interaction & Heartbeat)
// ----------------------------------------------------------------------
const ProposeDayController = {
    heartbeatInterval: null,
    holdTimer: null,
    isHolding: false,
    hasConfessed: false,
    heartbeatRate: 1.5, // Seconds per beat (Regular)

    init: function () {
        console.log("💍 Initializing Propose Day...");
        // Reset State
        this.hasConfessed = false;
        this.isHolding = false;
        this.heartbeatRate = 1.5;

        this.createAtmosphere();
        this.createFocusArea();
        this.startHeartbeat();
        this.setupInteractions();

        document.body.classList.add('propose-day-active');
    },

    cleanup: function () {
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        if (this.holdTimer) clearTimeout(this.holdTimer);

        // Remove Global Listener
        if (this.mouseMoveHandler) {
            document.removeEventListener('mousemove', this.mouseMoveHandler);
            this.mouseMoveHandler = null;
        }

        document.querySelector('.emotional-fog')?.remove();
        document.querySelector('.vignette-overlay')?.remove();
        document.querySelector('.heartbeat-ring')?.remove();
        document.querySelector('.propose-container')?.remove();

        document.body.classList.remove('propose-day-active');

        // Reset Cursor
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    },

    createAtmosphere: function () {
        // Fog
        const fog = document.createElement('div');
        fog.classList.add('emotional-fog');
        document.body.appendChild(fog);

        // Vignette
        const vignette = document.createElement('div');
        vignette.classList.add('vignette-overlay');
        document.body.appendChild(vignette);

        // Heartbeat Ring
        const ring = document.createElement('div');
        ring.classList.add('heartbeat-ring');
        document.body.appendChild(ring);
    },

    createFocusArea: function () {
        // Hide standard placeholder
        const standardContainer = document.querySelector('.glass-container');
        if (standardContainer) standardContainer.style.display = 'none';

        const container = document.createElement('div');
        container.classList.add('propose-container');

        // Confession Text (Hidden)
        const text = document.createElement('div');
        text.classList.add('confession-text');
        container.appendChild(text);

        // Hold Button
        const btn = document.createElement('div');
        btn.classList.add('hold-button');
        btn.innerText = "Hold to confess...";
        container.appendChild(btn);

        document.body.appendChild(container);
    },

    startHeartbeat: function () {
        const ring = document.querySelector('.heartbeat-ring');

        const beat = () => {
            // Beat intensity based on rate
            const scale = this.heartbeatRate < 1 ? 1.2 : 1.08;

            gsap.to(ring, {
                scale: scale,
                opacity: 0.8,
                duration: 0.15,
                ease: "power1.out",
                yoyo: true,
                repeat: 1
            });

            // Re-trigger based on current rate
            if (document.body.classList.contains('propose-day-active') && !this.hasConfessed) {
                this.heartbeatInterval = setTimeout(beat, this.heartbeatRate * 1000);
            }
        };

        beat();
    },

    setupInteractions: function () {
        const btn = document.querySelector('.hold-button');
        const ring = document.querySelector('.heartbeat-ring');
        const fog = document.querySelector('.emotional-fog');

        // Mouse Approach (Accelerate Heartbeat)
        this.mouseMoveHandler = (e) => {
            if (this.hasConfessed) return;

            const dist = Math.hypot(e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2);
            const maxDist = window.innerWidth / 2;

            // Map distance to heartbeat rate (Closer = Faster)
            // Range: 2.0s (Far) -> 0.6s (Close)
            const speed = 0.6 + (dist / maxDist) * 1.4;
            this.heartbeatRate = Math.max(0.4, Math.min(speed, 2.0));
        };
        document.addEventListener('mousemove', this.mouseMoveHandler);

        // Hold Interaction
        const startHold = () => {
            if (this.hasConfessed) return;
            this.isHolding = true;
            btn.classList.add('holding');
            btn.innerText = "Hold to say it...";

            // Rapid Heartbeat
            this.heartbeatRate = 0.25;

            // Animate Button Fill
            gsap.to(btn, {
                '--fill-width': '100%',
                duration: 3,
                ease: "linear",
                onUpdate: function () {
                    // Update pseudo element width via CSS variable if possible, 
                    // or just use direct style on the element for simplicity
                    btn.style.setProperty('--fill-width', (this.progress() * 100) + '%');

                    // Shake effect as it gets closer
                    if (this.progress() > 0.7) {
                        gsap.to(btn, { x: Math.random() * 4 - 2, duration: 0.05 });
                    }
                },
                onComplete: () => this.triggerConfession()
            });

            // Focus Tunnel Effect
            gsap.to(fog, { opacity: 0.8, duration: 3 }); // Darken world
            gsap.to('.nav-item', { opacity: 0, duration: 0.5 }); // Hide UI
        };

        const endHold = () => {
            if (this.hasConfessed) return;
            this.isHolding = false;
            btn.classList.remove('holding');
            btn.innerText = "Almost...";

            gsap.killTweensOf(btn);
            btn.style.setProperty('--fill-width', '0%');
            gsap.to(btn, { x: 0 }); // Reset shake

            // Restore World
            gsap.to(fog, { opacity: 0.4, duration: 1 });
            gsap.to('.nav-item', { opacity: 1, duration: 1 });

            setTimeout(() => {
                if (!this.isHolding) btn.innerText = "Hold to confess...";
            }, 2000);
        };

        // Needs to override CSS pseudo via JS for animation
        const styleSheet = document.createElement("style");
        styleSheet.innerText = ".hold-button::before { width: var(--fill-width, 0%); }";
        document.head.appendChild(styleSheet);

        btn.addEventListener('mousedown', startHold);
        btn.addEventListener('mouseup', endHold);
        btn.addEventListener('mouseleave', endHold);
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); startHold(); });
        btn.addEventListener('touchend', endHold);
    },

    triggerConfession: function () {
        this.hasConfessed = true;
        const btn = document.querySelector('.hold-button');
        const text = document.querySelector('.confession-text');
        const fog = document.querySelector('.emotional-fog');

        // 1. Silence
        gsap.to(btn, { opacity: 0, scale: 0.8, duration: 0.5, onComplete: () => btn.remove() });
        document.querySelector('.heartbeat-ring').style.opacity = 0; // Stop visible ring
        clearTimeout(this.heartbeatInterval);

        // 2. Clear Fog
        gsap.to(fog, { opacity: 0, duration: 2 });

        // 3. Reveal Message
        setTimeout(() => {
            text.style.opacity = 1;
            const message = "I have loved you in silence 🤍,<br>in the quiet moments where my heart learned to speak your name without a sound 🌙💞.<br>And I have loved you loudly ❤️,<br>in the moments where my soul could no longer hide what it felt for you ✨🥹.<br><br>I have loved you in your calm 🌸,<br>and in your chaos 🌊, loving every part of you in between 🤍.<br>In the ordinary days that passed gently 🌙,<br>and in the extraordinary ones that changed my heart forever 🌟💫.<br><br>With you, love has never been just a feeling 💗—<br>it has been a choice I make every day 🤝, a comfort that feels like warmth 🫶, a home my heart always returns to 🏡🤍.<br>You are where my heart finds its deepest peace 🕊️💖<br>and where my forever begins to make sense 🌈✨.<br><br>So today, with everything I am 🤍<br>and everything I hope to become for you 🌱💞,<br>I ask you this—not just for now 🫶,<br>but for every tomorrow my heart dreams of ♾️💑:<br><br>Will you be mine, forever? ❤️🥹✨";
            this.typeWriterEffect(text, message);
        }, 1000);
    },

    typeWriterEffect: function (container, message) {
        let i = 0;
        container.innerHTML = '<span class="propose-cursor"></span>';

        // Handle HTML tags in message
        const plainText = message.replace(/<br>/g, '\n');

        const type = () => {
            if (i < message.length) {
                // If we encounter a tag, append it whole
                if (message.substring(i).startsWith('<br>')) {
                    container.innerHTML = message.substring(0, i + 4) + '<span class="propose-cursor"></span>';
                    i += 4;
                } else {
                    container.innerHTML = message.substring(0, i + 1) + '<span class="propose-cursor"></span>';
                    i++;
                }
                setTimeout(type, Math.random() * 30 + 20); // Faster typing for long poem
            } else {
                // Done Typing - Restore Nav
                gsap.to('.nav-item', { opacity: 1, duration: 2, delay: 1 });
            }
        };
        type();
    }
};

// ----------------------------------------------------------------------
// Main Application Logic
// ----------------------------------------------------------------------

/**
 * Initialize Application
 */
function init() {
    setupNavigation();
    setupCursor();
    checkDateAccess();

    const activeDay = getActiveDay();
    loadTheme(activeDay);
}

function getActiveDay() {
    const todayStr = new Date().toISOString().split('T')[0];
    for (const [day, dateStr] of Object.entries(CONFIG.schedule)) {
        if (dateStr === todayStr) return day;
    }
    return 'rose'; // Default
}

function checkDateAccess() {
    const today = new Date().toISOString().split('T')[0];

    navItems.forEach(item => {
        const dayDate = item.dataset.date;
        if (CONFIG.DEV_MODE) {
            unlockTab(item);
        } else if (dayDate > today) {
            lockTab(item);
        } else {
            unlockTab(item);
            if (dayDate < today) item.style.opacity = '0.6';
        }
    });
}

function lockTab(item) {
    item.classList.add('locked');
    item.classList.remove('active');
    item.setAttribute('data-tooltip', `Coming Soon on ${item.dataset.date}`);
}

function unlockTab(item) {
    item.classList.remove('locked');
}

function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('locked')) return;
            const selectedDay = item.dataset.day;
            if (selectedDay !== currentTheme) {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                loadTheme(selectedDay);
            }
        });
    });
}

function loadTheme(day) {
    // 1. Cleanup Previous
    if (currentController && currentController.cleanup) {
        currentController.cleanup();
        currentController = null;
    }

    currentTheme = day;
    const themeData = CONFIG.themes[day];

    // 2. Transition Out
    gsap.to([contentLayer, bgLayer], {
        opacity: 0,
        y: 20,
        duration: 0.4,
        onComplete: () => {
            // 3. Update DOM
            body.setAttribute('data-theme', day);
            pageTitle.innerText = themeData.title;
            document.querySelector('.footer-note').innerText = `[${themeData.title.toUpperCase()}_FOOTER_MESSAGE]`;

            // Standard Reset
            if (day !== 'rose') {
                // Reset standard placeholder if not Rose Day (Rose day does its own typing)
                document.querySelector('.placeholder-text').innerHTML = '[ROMANTIC_MESSAGE_1]';
                interactionPlaceholder.innerHTML = `<span class="interaction-icon">${themeData.interaction}</span>`;
                generateBackground(themeData.bgElements);
            } else {
                // Clear for Rose Day Controller to take over
                document.querySelector('.placeholder-text').innerHTML = '';
            }

            // 4. Transition In
            gsap.to([contentLayer, bgLayer], { opacity: 1, y: 0, duration: 0.6 });

            // 5. Initialize Specific Controller
            if (day === 'rose') {
                currentController = RoseDayController;
                RoseDayController.init();
            } else if (day === 'propose') {
                currentController = ProposeDayController;
                ProposeDayController.init();
            }
        }
    });

    // Update Nav Active State
    navItems.forEach(nav => {
        if (nav.dataset.day === day) nav.classList.add('active');
        else nav.classList.remove('active');
    });
}

function generateBackground(elements) {
    bgLayer.innerHTML = '';
    if (!elements || elements.length === 0) return;

    const count = 20;
    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.classList.add('bg-item');
        span.innerText = elements[Math.floor(Math.random() * elements.length)];

        const left = Math.random() * 100;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        const size = 1 + Math.random() * 2;

        span.style.left = `${left}%`;
        span.style.fontSize = `${size}rem`;
        span.style.setProperty('--duration', `${duration}s`);
        span.style.setProperty('--sway-duration', `${3 + Math.random() * 2}s`);
        span.style.animationDelay = `-${delay}s`;

        bgLayer.appendChild(span);
    }
}

function setupCursor() {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;

        gsap.to(cursorOutline, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: "power2.out"
        });

        // 🌹 Rose Day Garden Trail (Replaces simple sparkle)
        if (currentTheme === 'rose' && Math.random() > 0.85) {
            const flower = document.createElement('div');
            const blooms = ['🌹', '🌷', '🌸', '🌺', '🌻', '🌼'];
            flower.innerText = blooms[Math.floor(Math.random() * blooms.length)];

            flower.style.position = 'fixed';
            flower.style.left = `${e.clientX}px`;
            flower.style.top = `${e.clientY}px`;
            flower.style.fontSize = '1.2rem';
            flower.style.pointerEvents = 'none';
            flower.style.zIndex = '9998';
            flower.style.textShadow = '0 0 5px rgba(255,255,255,0.5)';
            document.body.appendChild(flower);

            gsap.fromTo(flower,
                { scale: 0, rotation: 0 },
                {
                    scale: 1,
                    rotation: Math.random() * 90 - 45,
                    y: 20, // Float down slightly
                    opacity: 0,
                    duration: 1.5,
                    ease: "power1.out",
                    onComplete: () => flower.remove()
                }
            );
        }
    });

    document.querySelectorAll('a, .nav-item, .interactive-bloom').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--secondary-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
    });
}

document.addEventListener('DOMContentLoaded', init);
