/**
 * BlitzForge Studios - Scroll Animations
 * This file contains GSAP animations for page load and scroll effects
 */

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobileOrTablet = () => {
        return (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            ) || window.innerWidth <= 1024
        );
    };

    const isHomePage = !window.location.pathname.includes("/pages/");

    if (isHomePage) {
        gsap.set("h1", { opacity: 0, y: -20 });
        gsap.set(".subtitle", { opacity: 0, y: 20 });
        gsap.set(".second-paragraph", { opacity: 0, y: 20 });
        gsap.set(".cta-buttons", { opacity: 0, y: 20 });

        const initialAnimation = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "power2.out",
            },
        });

        initialAnimation
            .to("h1", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            })
            .to(
                ".subtitle",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.4"
            )
            .to(
                ".second-paragraph",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.4"
            )
            .to(
                ".cta-buttons",
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                },
                "-=0.4"
            );
    }

    if (isHomePage) {
        const assetsRowImages = document.querySelectorAll(".assets-row img");

        assetsRowImages.forEach((img, index) => {
            gsap.fromTo(
                img,
                {
                    opacity: 0,
                    y: 50,
                    rotateZ: index % 2 === 0 ? -5 : 5,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateZ: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".assets-row",
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1,
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        gsap.fromTo(
            ".team",
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".team",
                    start: "top 80%",
                    end: "top 40%",
                    scrub: 1,
                    toggleActions: "play none none reverse",
                },
            }
        );

        const teamMembers = document.querySelectorAll(".team-member");

        teamMembers.forEach((member, index) => {
            gsap.fromTo(
                member,
                {
                    opacity: 0,
                    y: 30,
                    rotateZ: index % 2 === 0 ? -8 : 8,
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateZ: index % 2 === 0 ? 5 : -5,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: ".team-members",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        gsap.fromTo(
            ".contributors h3",
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".contributors",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );

        const contributorImages =
            document.querySelectorAll(".contributor-image");
        const contributorInfos = document.querySelectorAll(".contributor-info");

        contributorImages.forEach((img, index) => {
            const info = contributorInfos[index];

            gsap.fromTo(
                [img, info],
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.2 + index * 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".future-contributors",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );

            if (!isMobileOrTablet()) {
                img.addEventListener("mouseenter", () => {
                    gsap.to(img, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                    gsap.to(info, {
                        opacity: 1,
                        y: -5,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                });

                img.addEventListener("mouseleave", () => {
                    gsap.to(img, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power1.in",
                    });
                    gsap.to(info, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power1.in",
                    });
                });
            }
        });

        gsap.fromTo(
            "footer",
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "footer",
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            }
        );

        gsap.fromTo(
            ".footer-column",
            {
                opacity: 0,
                y: 20,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".footer-links",
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            }
        );
    }
});
