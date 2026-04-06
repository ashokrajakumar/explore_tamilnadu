/**
 * WoW Animations Engine (V2)
 * Handles GSAP ScrollTriggers, Magnetic Bento Cards, and Lenis Physics.
 */

const WoWEngine = (() => {
    let lenis;

    const init = () => {
        initLenis();
        initGSAP();
        initMagneticCards();
        initRevealAnimations();
    };

    const initLenis = () => {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            mouseMultiplier: 1,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    };

    const initGSAP = () => {
        gsap.registerPlugin(ScrollTrigger);
    };

    const initMagneticCards = () => {
        const cards = document.querySelectorAll('.bento-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xPct = (x / rect.width - 0.5) * 15; // 15 deg tilt
                const yPct = (y / rect.height - 0.5) * -15;
                
                gsap.to(card, {
                    rotateY: xPct,
                    rotateX: yPct,
                    scale: 1.02,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    };

    const initRevealAnimations = () => {
        // Reveal Bento Grid
        gsap.from(".bento-card", {
            scrollTrigger: {
                trigger: ".grid",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });

        // Reveal Section Headers
        gsap.utils.toArray("h2").forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 90%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });

        // Aura Background Floating Motion
        gsap.to(".aura-blob", {
            x: "random(-100, 100)",
            y: "random(-100, 100)",
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', WoWEngine.init);
