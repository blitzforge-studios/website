document.addEventListener("DOMContentLoaded", () => {
    const videoBackground = document.getElementById("background-video");

    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    cursor.style.opacity = 1;
    document.body.appendChild(cursor);

    gsap.set(videoBackground, {
        scale: 1.1,
        transformOrigin: "center center",
    });

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    let cursorX = 0;
    let cursorY = 0;

    const panIntensity = 200;
    const cursorLag = 0.15;
    const floatIntensity = 15;
    const floatSpeed = 3;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;

        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    let currentCursorX = 0;
    let currentCursorY = 0;

    gsap.to(videoBackground, {
        y: floatIntensity,
        duration: floatSpeed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });

    function animateVideo() {
        targetX = mouseX * -1;
        targetY = mouseY * -1;

        gsap.to(videoBackground, {
            duration: 1.5,
            x: targetX * panIntensity,
            ease: "power1.out",
        });

        currentCursorX += (cursorX - currentCursorX) * cursorLag;
        currentCursorY += (cursorY - currentCursorY) * cursorLag;

        cursor.style.transform = `translate(${currentCursorX}px, ${currentCursorY}px)`;

        requestAnimationFrame(animateVideo);
    }

    const scanlines = document.createElement("div");
    scanlines.classList.add("scanlines");
    document.body.appendChild(scanlines);

    const flicker = document.createElement("div");
    flicker.classList.add("flicker");
    document.body.appendChild(flicker);

    animateVideo();

    document.body.style.cursor = "none";

    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
        element.style.cursor = "none";
    });
});
