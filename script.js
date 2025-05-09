document.addEventListener("DOMContentLoaded", () => {
    const isSubpage = window.location.pathname.includes("/pages/");
    const videoBackground = document.getElementById("background-video");

    const isMobileOrTablet = () => {
        return (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            ) || window.innerWidth <= 1024
        );
    };

    let cursor;
    if (!isMobileOrTablet()) {
        cursor = document.createElement("div");
        cursor.classList.add("custom-cursor");
        cursor.style.opacity = 1;
        document.body.appendChild(cursor);
    }

    gsap.set(videoBackground, {
        scale: 1.3,
        transformOrigin: "center center",
    });

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let currentCursorX = 0;
    let currentCursorY = 0;

    const panIntensity = 100;
    const cursorLag = 0.15;
    const floatIntensity = 15;
    const floatSpeed = 3;

    if (!isMobileOrTablet()) {
        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
            cursorX = e.clientX;
            cursorY = e.clientY;
        });
    }

    gsap.to(videoBackground, {
        y: floatIntensity,
        duration: floatSpeed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });

    function animateVideo() {
        const targetX = mouseX * -1;
        const targetY = mouseY * -1;

        gsap.to(videoBackground, {
            duration: 1.5,
            x: targetX * panIntensity,
            y: targetY * panIntensity * 1.5,
            ease: "power1.out",
        });

        if (!isMobileOrTablet() && cursor) {
            currentCursorX += (cursorX - currentCursorX) * cursorLag;
            currentCursorY += (cursorY - currentCursorY) * cursorLag;
            cursor.style.transform = `translate(${currentCursorX}px, ${currentCursorY}px)`;
        }

        requestAnimationFrame(animateVideo);
    }

    const scanlines = document.createElement("div");
    scanlines.classList.add("scanlines");
    document.body.appendChild(scanlines);

    const flicker = document.createElement("div");
    flicker.classList.add("flicker");
    document.body.appendChild(flicker);

    animateVideo();

    function updateCursorVisibility() {
        if (isMobileOrTablet()) {
            document.body.classList.remove("cursor-hidden");
            if (cursor) cursor.style.display = "none";
        } else if (!isSubpage) {
            document.body.classList.add("cursor-hidden");
            if (cursor) cursor.style.display = "block";
        } else {
            document.body.classList.remove("cursor-hidden");
        }
    }

    updateCursorVisibility();

    window.addEventListener("resize", updateCursorVisibility);
});

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1,
        },
    });

    const heading = document.querySelector("#hero h1");

    heading.innerHTML = `
        <span class="word">Imagine</span>
        <span class="word">a</span>
        <span class="word">team</span>
        <span class="word">that</span><br>
        <span class="word">brings</span>
        <span class="word retro-emphasis"><em>memories</em></span><br>
        <span class="word">back.</span>
    `;

    const glitchEffect = document.createElement("div");
    glitchEffect.classList.add("glitch-effect");
    document.body.appendChild(glitchEffect);

    const trackingLines = document.createElement("div");
    trackingLines.classList.add("tracking-lines");
    document.body.appendChild(trackingLines);

    gsap.set("#hero .text", { opacity: 0 });
    gsap.set("#hero .project", { opacity: 0 });
    gsap.set(".word", { opacity: 0, y: 20 });
    gsap.set(".glitch-effect", { opacity: 0 });
    gsap.set(".tracking-lines", { opacity: 0.3 });

    heroTimeline
        .to(".glitch-effect", {
            opacity: 0.8,
            duration: 0.1,
            delay: 0.2,
        })
        .to(".glitch-effect", {
            opacity: 0,
            duration: 0.1,
        })
        .to("#hero .text", {
            opacity: 1,
            duration: 0.5,
            x: 0,
        })
        .to(".word", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "back.out(1.2)",
            onComplete: () => {
                gsap.to(".retro-emphasis", {
                    opacity: 0.7,
                    duration: 0.1,
                    repeat: 3,
                    yoyo: true,
                    ease: "none",
                });
            },
        })
        .to(
            "#hero .project",
            {
                opacity: 1,
                duration: 0.8,
            },
            "-=0.3"
        )
        .from(
            "#hero .project li",
            {
                x: -30,
                opacity: 0,
                stagger: 0.15,
                duration: 0.6,
                ease: "back.out(1.2)",
            },
            "-=0.5"
        );

    function randomGlitch() {
        const glitchTimeline = gsap.timeline();

        glitchTimeline
            .to(".glitch-effect", {
                opacity: Math.random() * 0.5,
                duration: 0.1,
            })
            .to(".glitch-effect", {
                opacity: 0,
                duration: 0.1,
            });

        if (Math.random() > 0.7) {
            const allWords = gsap.utils.toArray(".word");
            const randomWord =
                allWords[Math.floor(Math.random() * allWords.length)];

            if (randomWord) {
                glitchTimeline
                    .to(randomWord, {
                        x: (Math.random() - 0.5) * 10,
                        y: (Math.random() - 0.5) * 5,
                        skewX: (Math.random() - 0.5) * 10,
                        duration: 0.1,
                    })
                    .to(randomWord, {
                        x: 0,
                        y: 0,
                        skewX: 0,
                        duration: 0.1,
                    });
            }
        }

        gsap.delayedCall(Math.random() * 5 + 2, randomGlitch);
    }

    gsap.delayedCall(3, randomGlitch);

    gsap.utils.toArray(".section-link").forEach((link) => {
        link.addEventListener("mouseenter", () => {
            gsap.to(link, {
                color: "#6f889e",
                textShadow: "2px 2px 8px rgb(52, 67, 80)",
                duration: 0.3,
            });

            gsap.to(".glitch-effect", {
                opacity: 0.3,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
            });
        });

        link.addEventListener("mouseleave", () => {
            gsap.to(link, {
                color: "var(--white-tone-1)",
                textShadow: "none",
                duration: 0.3,
            });
        });
    });

    gsap.to(".tracking-lines", {
        backgroundPosition: "0 100%",
        duration: 10,
        repeat: -1,
        ease: "none",
    });
});
