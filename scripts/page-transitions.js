document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".page-transition-overlay");

    function animatePageEntrance() {
        const portalEntrance = window.animatePortalEntrance
            ? window.animatePortalEntrance()
            : null;

        if (portalEntrance) {
            return portalEntrance;
        }

        gsap.set(overlay, { opacity: 1 });

        const entranceTimeline = gsap.timeline({
            defaults: {
                ease: "power2.inOut",
            },
        });

        entranceTimeline.to(overlay, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                overlay.style.pointerEvents = "none";
            },
        });

        return entranceTimeline;
    }

    function animatePageExit(targetUrl) {
        if (window.portalTransition && window.portalTransition(targetUrl)) {
            return new Promise((resolve) => {});
        }

        const exitTimeline = gsap.timeline({
            defaults: {
                ease: "power2.inOut",
            },
        });

        overlay.style.pointerEvents = "all";

        exitTimeline.to(overlay, {
            opacity: 1,
            duration: 0.8,
        });

        return exitTimeline;
    }

    animatePageEntrance();

    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");

        if (
            link &&
            link.href &&
            link.href.startsWith(window.location.origin) &&
            !link.target &&
            !e.ctrlKey &&
            !e.metaKey
        ) {
            e.preventDefault();

            const targetUrl = link.href;

            animatePageExit(targetUrl).then(() => {
                window.location.href = targetUrl;
            });
        }
    });

    window.addEventListener("popstate", (e) => {
        animatePageExit().then(() => {});
    });
});
