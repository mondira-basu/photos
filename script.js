/* ============================================
   MONDIRA BASU — Interactive Scripts
   Scroll reveals, parallax, lightbox, particles
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Floating Particles ===
    const particlesContainer = document.getElementById('particles');
    const particleColors = ['#c9a96e', '#b5624e', '#dfc89d', '#f0e0d6', '#6b6346'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 12;
        const delay = Math.random() * 8;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        particlesContainer.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 25; i++) {
        createParticle();
    }

    // Continuously create particles
    setInterval(createParticle, 2000);


    // === Navigation Scroll Effect ===
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });


    // === Scroll Reveal Animation ===
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay * 120);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // === Timeline Line Growth ===
    const timelineLine = document.getElementById('timeline-line');

    if (timelineLine) {
        const tlObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineLine.style.height = '120px';
                    tlObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        tlObserver.observe(timelineLine);
    }


    // === Hero Image Parallax ===
    const heroImage = document.getElementById('hero-image');

    window.addEventListener('scroll', () => {
        if (heroImage) {
            const scrollY = window.pageYOffset;
            const rate = scrollY * 0.15;
            heroImage.style.transform = `translateY(${rate}px) scale(1)`;
        }
    });


    // === Lightbox ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });


    // === Smooth Scroll for Nav Links ===
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // === Subtle Mouse Parallax on Hero ===
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const imageFrame = hero.querySelector('.hero-image-frame');
            if (imageFrame) {
                imageFrame.style.transform = `
                    perspective(1000px)
                    rotateY(${x * 3}deg)
                    rotateX(${-y * 3}deg)
                `;
            }
        });

        hero.addEventListener('mouseleave', () => {
            const imageFrame = hero.querySelector('.hero-image-frame');
            if (imageFrame) {
                imageFrame.style.transition = 'transform 0.6s ease';
                imageFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
                setTimeout(() => {
                    imageFrame.style.transition = '';
                }, 600);
            }
        });
    }

});
