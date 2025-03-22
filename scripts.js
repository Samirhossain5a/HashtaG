// Initialize Vanilla Tilt for 3D hover effects
VanillaTilt.init(document.querySelectorAll(".grid-item"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
});

// Create floating particles
function createParticles() {
    const container = document.querySelector('.floating-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${5 + Math.random() * 5}s linear infinite;
        `;
        container.appendChild(particle);
    }
}

// Add floating particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Add interactive grid item effects
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
    });
});

// Modal functionality
const aboutLink = document.getElementById('about-link');
const contactLink = document.getElementById('contact-link');
const aboutModal = document.getElementById('about-modal');
const contactModal = document.getElementById('contact-modal');
const closeAbout = document.getElementById('close-about');
const closeContact = document.getElementById('close-contact');

// Function to open modal
function openModal(modal) {
    modal.style.display = 'block';
}

// Function to close modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// About modal events
aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(aboutModal);
});

closeAbout.addEventListener('click', () => {
    closeModal(aboutModal);
});

// Contact modal events
contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(contactModal);
});

closeContact.addEventListener('click', () => {
    closeModal(contactModal);
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        closeModal(aboutModal);
    }
    if (e.target === contactModal) {
        closeModal(contactModal);
    }
});