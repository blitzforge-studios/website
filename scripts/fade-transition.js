document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".page-transition-overlay");

    function fadeTransition(targetUrl) {
        if (targetUrl.includes("game.html")) {
            const fadeTimeline = gsap.timeline({
                defaults: {
                    ease: "power2.inOut",
                },
                onComplete: () => {
                    window.location.href = targetUrl;
                },
            });

            fadeTimeline.to(overlay, {
                opacity: 1,
                duration: 1.2,
            });

            return true;
        }
        return false;
    }

    function animateFadeEntrance() {
        if (window.location.pathname.includes("game.html")) {
            gsap.set(overlay, { opacity: 1 });

            const entranceTimeline = gsap.timeline({
                defaults: {
                    ease: "power2.inOut",
                },
            });

            entranceTimeline.to(overlay, {
                opacity: 0,
                duration: 1.2,
            });

            return entranceTimeline;
        }
        return null;
    }

    window.portalTransition = fadeTransition;
    window.animatePortalEntrance = animateFadeEntrance;
});
