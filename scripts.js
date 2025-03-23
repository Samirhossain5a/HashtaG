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

// Contact Form Character Count
document.addEventListener('DOMContentLoaded', () => {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            charCount.textContent = length;
            
            if (length > 450) {
                charCount.style.color = '#ff9900';
            } else if (length > 490) {
                charCount.style.color = '#ff0000';
            } else {
                charCount.style.color = 'inherit';
            }
        });
    }
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const successMessage = document.querySelector('.form-success-message');
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message and show form after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    contactForm.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                }, 5000);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                alert('There was an error sending your message. Please try again.');
            }
        });
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccessMessage = document.querySelector('.form-success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to your server
        // For demo purposes, we'll just show the success message
        contactForm.style.display = 'none';
        formSuccessMessage.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccessMessage.style.display = 'none';
        }, 3000);
    });
}

// Chat Widget
const chatButton = document.getElementById('chatButton');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

if (chatButton && chatBox) {
    chatButton.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
    });

    closeChat.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! I'll get back to you soon.",
                    "I understand. Let me help you with that.",
                    "Great question! Let me find the answer for you.",
                    "I appreciate your patience. I'm working on your request."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse);
            }, 1000);
        }
    }

    sendMessage.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
}

// Google Maps Integration
function initMap() {
    // Replace with your desired coordinates
    const location = { lat: 23.8103, lng: 90.4125 }; // Example: Dhaka, Bangladesh
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#242f3e"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#242f3e"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#746855"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#17263c"}]
            }
        ]
    });

    new google.maps.Marker({
        position: location,
        map: map,
        title: 'Our Location'
    });
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }
});

// Smooth scroll for contact link
document.addEventListener('DOMContentLoaded', () => {
    const contactLink = document.getElementById('contact-link');
    
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            
            if (contactSection) {
                // If we're not on what.html, redirect to what.html#contact
                if (!window.location.pathname.includes('what.html')) {
                    window.location.href = 'what.html#contact';
                    return;
                }
                
                // Smooth scroll to contact section
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Login Modal Functionality
const loginIcon = document.querySelector('.login-icon');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const loginForm = document.getElementById('loginForm');
const togglePassword = document.querySelector('.toggle-password');
const loginPassword = document.getElementById('loginPassword');

if (loginIcon && loginModal) {
    loginIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginModal);
    });

    closeLogin.addEventListener('click', () => {
        closeModal(loginModal);
    });
}

if (togglePassword && loginPassword) {
    togglePassword.addEventListener('click', () => {
        const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPassword.setAttribute('type', type);
        togglePassword.querySelector('i').className = `fas fa-${type === 'password' ? 'eye' : 'eye-slash'}`;
    });
}

// Enhanced Login Form Handling
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const email = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        const rememberMe = document.getElementById('rememberMe');
        
        // Validate form
        let isValid = true;
        
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
        
        if (password.value.length < 6) {
            showError(password, 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading state
        const submitBtn = loginForm.querySelector('.login-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual authentication)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            submitBtn.classList.add('success');
            
            // Save login state and time
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('lastLogin', new Date().toISOString());
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            
        } catch (error) {
            // Show error state
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
            submitBtn.style.background = '#ff4444';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }
    });
}

// Social Login Functions
function signInWithGoogle() {
    // Initialize Google Sign-In
    const googleConfig = {
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        scope: 'email profile'
    };

    // Show loading state
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    button.disabled = true;

    // Simulate OAuth flow (replace with actual Google OAuth)
    setTimeout(() => {
        // Reset button and show success
        button.innerHTML = '<i class="fas fa-check"></i> Connected!';
        button.style.background = '#34A853';

        // Save login state and time
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('lastLogin', new Date().toISOString());

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 2000);
}

function signInWithFacebook() {
    // Initialize Facebook Sign-In
    const fbConfig = {
        appId: 'YOUR_FACEBOOK_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
    };

    // Show loading state
    const button = event.currentTarget;
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    button.disabled = true;

    // Simulate OAuth flow (replace with actual Facebook OAuth)
    setTimeout(() => {
        // Reset button and show success
        button.innerHTML = '<i class="fas fa-check"></i> Connected!';
        button.style.background = '#4267B2';

        // Save login state and time
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('lastLogin', new Date().toISOString());

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 2000);
}

// Handle social login buttons
document.addEventListener('DOMContentLoaded', () => {
    const socialButtons = document.querySelectorAll('.social-btn');
    if (socialButtons) {
        socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const platform = button.classList[1];
                if (platform === 'google') {
                    signInWithGoogle();
                } else if (platform === 'facebook') {
                    signInWithFacebook();
                }
            });
        });
    }
});

// Error Handling
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    // Create error message if it doesn't exist
    let errorMsg = formGroup.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        formGroup.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    
    // Remove error after 3 seconds
    setTimeout(() => {
        formGroup.classList.remove('error');
        errorMsg.remove();
    }, 3000);
}

// Update Login State
function updateLoginState(isLoggedIn) {
    const loginIcon = document.querySelector('.login-icon');
    if (isLoggedIn) {
        loginIcon.innerHTML = '<i class="fas fa-user-check"></i>';
        loginIcon.classList.add('logged-in');
    } else {
        loginIcon.innerHTML = '<i class="fas fa-user"></i>';
        loginIcon.classList.remove('logged-in');
    }
}

// Check if user was previously logged in
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        updateLoginState(true);
    }
});

// Switch between Login and Signup
const signupLink = document.querySelector('.signup-link');
const loginLink = document.querySelector('.login-link');
const signupModal = document.getElementById('signup-modal');

if (signupLink && loginLink && signupModal) {
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
    
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });
    
    document.getElementById('close-signup').addEventListener('click', () => {
        closeModal(signupModal);
    });
}

// Password visibility toggle for signup form
const signupPassword = document.getElementById('signupPassword');
const signupTogglePassword = document.querySelector('#signupForm .toggle-password');

if (signupPassword && signupTogglePassword) {
    signupTogglePassword.addEventListener('click', () => {
        const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        signupPassword.setAttribute('type', type);
        signupTogglePassword.querySelector('i').className = `fas fa-${type === 'password' ? 'eye' : 'eye-slash'}`;
    });
}

// Social Login Buttons
const socialButtons = document.querySelectorAll('.social-btn');
if (socialButtons) {
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would typically implement OAuth flow
            const platform = button.classList[1];
            if (platform === 'google') {
                signInWithGoogle();
            } else if (platform === 'facebook') {
                signInWithFacebook();
            }
            console.log(`Attempting to login with ${platform}`);
        });
    });
}

// Enhanced Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBox = document.querySelector('.search-box');
    const clearSearchBtn = document.querySelector('.clear-search');
    const suggestions = document.querySelector('.search-suggestions');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    let selectedSuggestionIndex = -1;

    // Show/hide clear button based on input
    searchInput.addEventListener('input', () => {
        clearSearchBtn.hidden = !searchInput.value;
        if (searchInput.value) {
            showSuggestions(searchInput.value);
        } else {
            hideSuggestions();
        }
    });

    // Clear search
    clearSearchBtn?.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.hidden = true;
        hideSuggestions();
        searchInput.focus();
    });

    // Handle search filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-checked', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-checked', 'true');
            currentFilter = btn.dataset.filter;
            if (searchInput.value) {
                showSuggestions(searchInput.value);
            }
        });
    });

    // Keyboard navigation for suggestions
    searchInput.addEventListener('keydown', (e) => {
        const suggestions = document.querySelectorAll('.suggestion-item');
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
                updateSelectedSuggestion(suggestions);
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
                updateSelectedSuggestion(suggestions);
                break;
            case 'Enter':
                if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                    e.preventDefault();
                    selectSuggestion(suggestions[selectedSuggestionIndex].textContent);
                }
                break;
            case 'Escape':
                hideSuggestions();
                searchInput.blur();
                break;
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target)) {
            hideSuggestions();
        }
    });

    function showSuggestions(query) {
        // Simulate API call for suggestions
        const mockSuggestions = getMockSuggestions(query, currentFilter);
        
        if (mockSuggestions.length > 0) {
            suggestions.innerHTML = mockSuggestions
                .map((item, index) => `
                    <div class="suggestion-item" 
                         role="option" 
                         aria-selected="${index === selectedSuggestionIndex}"
                         tabindex="-1">
                        <i class="fas ${item.icon}"></i>
                        ${item.text}
                    </div>
                `).join('');
            
            suggestions.hidden = false;
            searchInput.setAttribute('aria-expanded', 'true');
            
            // Add click handlers to suggestions
            document.querySelectorAll('.suggestion-item').forEach((item, index) => {
                item.addEventListener('click', () => selectSuggestion(item.textContent));
                item.addEventListener('mouseover', () => {
                    selectedSuggestionIndex = index;
                    updateSelectedSuggestion(document.querySelectorAll('.suggestion-item'));
                });
            });
        } else {
            hideSuggestions();
        }
    }

    function hideSuggestions() {
        suggestions.hidden = true;
        searchInput.setAttribute('aria-expanded', 'false');
        selectedSuggestionIndex = -1;
    }

    function updateSelectedSuggestion(suggestions) {
        suggestions.forEach((s, i) => {
            s.setAttribute('aria-selected', i === selectedSuggestionIndex);
        });
        
        if (selectedSuggestionIndex >= 0) {
            suggestions[selectedSuggestionIndex].scrollIntoView({
                block: 'nearest'
            });
        }
    }

    function selectSuggestion(text) {
        searchInput.value = text.trim();
        hideSuggestions();
        searchInput.focus();
    }

    function getMockSuggestions(query, filter) {
        query = query.toLowerCase();
        const allSuggestions = [
            { text: 'Popular Videos', icon: 'fa-video', type: 'videos' },
            { text: 'Latest Photos', icon: 'fa-image', type: 'photos' },
            { text: 'Featured Blogs', icon: 'fa-blog', type: 'blogs' },
            { text: 'Video Tutorials', icon: 'fa-graduation-cap', type: 'videos' },
            { text: 'Photo Gallery', icon: 'fa-images', type: 'photos' },
            { text: 'Blog Posts', icon: 'fa-newspaper', type: 'blogs' }
        ];

        return allSuggestions
            .filter(item => {
                const matchesQuery = item.text.toLowerCase().includes(query);
                const matchesFilter = filter === 'all' || item.type === filter;
                return matchesQuery && matchesFilter;
            })
            .slice(0, 6);
    }
});

// Advanced Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';
    let searchTimeout;

    // Sample data - replace with your actual data
    const sampleData = {
        videos: [
            { title: 'Introduction to Web Development', type: 'video' },
            { title: 'JavaScript Tutorial', type: 'video' },
            { title: 'CSS Animation Masterclass', type: 'video' }
        ],
        photos: [
            { title: 'Nature Photography', type: 'photo' },
            { title: 'Urban Landscapes', type: 'photo' },
            { title: 'Portrait Collection', type: 'photo' }
        ],
        blogs: [
            { title: 'Web Design Trends 2025', type: 'blog' },
            { title: 'The Future of AI', type: 'blog' },
            { title: 'UX Design Principles', type: 'blog' }
        ]
    };

    // Filter click handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            if (searchInput.value) {
                handleSearch(searchInput.value);
            }
        });
    });

    // Search input handler
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length === 0) {
            searchSuggestions.classList.remove('active');
            return;
        }

        // Debounce search to improve performance
        searchTimeout = setTimeout(() => {
            handleSearch(query);
        }, 300);
    });

    // Handle keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        const items = searchSuggestions.querySelectorAll('.suggestion-item');
        const activeItem = searchSuggestions.querySelector('.suggestion-item.active');
        let index = -1;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            if (activeItem) {
                index = Array.from(items).indexOf(activeItem);
                activeItem.classList.remove('active');
            }

            if (e.key === 'ArrowDown') {
                index = (index + 1) % items.length;
            } else {
                index = index <= 0 ? items.length - 1 : index - 1;
            }

            items[index].classList.add('active');
            items[index].scrollIntoView({ block: 'nearest' });
        }

        if (e.key === 'Enter' && activeItem) {
            e.preventDefault();
            window.location.href = activeItem.dataset.url;
        }
    });

    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            searchSuggestions.classList.remove('active');
        }
    });

    function handleSearch(query) {
        let results = [];
        const allData = [...sampleData.videos, ...sampleData.photos, ...sampleData.blogs];
        
        // Filter based on current filter and query
        if (currentFilter === 'all') {
            results = allData.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase())
            );
        } else {
            results = allData.filter(item => 
                item.type === currentFilter.slice(0, -1) && 
                item.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Display results
        displaySuggestions(results, query);
    }

    function displaySuggestions(results, query) {
        if (results.length === 0) {
            searchSuggestions.innerHTML = `
                <div class="suggestion-item">
                    <i class="fas fa-search"></i>
                    <span>No results found</span>
                </div>
            `;
        } else {
            searchSuggestions.innerHTML = results
                .slice(0, 5)
                .map(item => {
                    const highlightedTitle = highlightMatch(item.title, query);
                    const icon = getIconForType(item.type);
                    return `
                        <div class="suggestion-item" data-url="#">
                            <i class="${icon}"></i>
                            <span>${highlightedTitle}</span>
                        </div>
                    `;
                })
                .join('');
        }
        searchSuggestions.classList.add('active');
    }

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function getIconForType(type) {
        const icons = {
            video: 'fas fa-video',
            photo: 'fas fa-image',
            blog: 'fas fa-blog'
        };
        return icons[type] || 'fas fa-search';
    }

    // Mobile search toggle
    const searchToggle = document.createElement('button');
    searchToggle.className = 'search-toggle';
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
    searchToggle.setAttribute('aria-label', 'Toggle search');

    const navbar = document.querySelector('.navbar');
    const searchContainer = document.querySelector('.search-container');

    if (window.innerWidth <= 768) {
        navbar.insertBefore(searchToggle, navbar.querySelector('.nav-items'));
    }

    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        searchInput.focus();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!navbar.contains(searchToggle)) {
                navbar.insertBefore(searchToggle, navbar.querySelector('.nav-items'));
            }
        } else {
            searchToggle.remove();
            searchContainer.classList.remove('active');
        }
    });
});

// Enhanced Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-items a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll animations for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate-in');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
        element.classList.add('scroll-animate-init');
        scrollObserver.observe(element);
    });

    // Smooth scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                setTimeout(() => {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 0);
            }
        }
    });
});

// Mobile Navigation and Search
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');
    const mobileSearchToggle = document.querySelector('.mobile-search-toggle');
    const mobileSearchPanel = document.querySelector('.mobile-search-panel');
    const searchInput = document.querySelector('#searchInput');
    const mobileSearchInput = document.querySelector('#mobileSearchInput');
    const searchSuggestions = document.querySelector('.search-suggestions');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    let isSearching = false;

    // Hamburger menu toggle
    if (hamburger && navItems) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navItems.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            // Close search panel when opening menu
            mobileSearchPanel?.classList.remove('active');
        });
    }

    // Mobile search toggle
    if (mobileSearchToggle && mobileSearchPanel) {
        mobileSearchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileSearchPanel.classList.toggle('active');
            
            // Focus search input when opening
            if (mobileSearchPanel.classList.contains('active')) {
                mobileSearchInput?.focus();
                // Close menu if open
                hamburger?.classList.remove('active');
                navItems?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Handle search input
    const handleSearch = (input, isMobile = false) => {
        if (!input) return;
        
        const searchValue = input.value.trim().toLowerCase();
        if (searchValue.length < 2) {
            searchSuggestions?.classList.remove('active');
            return;
        }

        // Simulate search suggestions
        const suggestions = [
            'Popular searches...',
            'Recent content...',
            'Trending topics...'
        ].filter(item => item.toLowerCase().includes(searchValue));

        if (searchSuggestions && suggestions.length > 0) {
            searchSuggestions.innerHTML = suggestions
                .map(item => `<div class="suggestion-item">${item}</div>`)
                .join('');
            searchSuggestions.classList.add('active');
        }
    };

    // Search input handlers
    [searchInput, mobileSearchInput].forEach(input => {
        if (!input) return;
        
        input.addEventListener('input', () => {
            handleSearch(input, input === mobileSearchInput);
        });

        input.addEventListener('focus', () => {
            isSearching = true;
        });
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            if (filter === currentFilter) return;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = filter;

            // Simulate filter change
            console.log(`Filter changed to: ${filter}`);
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!isSearching) {
            const isClickInside = e.target.closest('.nav-items') || 
                                e.target.closest('.hamburger') ||
                                e.target.closest('.mobile-search-panel') ||
                                e.target.closest('.mobile-search-toggle');

            if (!isClickInside) {
                hamburger?.classList.remove('active');
                navItems?.classList.remove('active');
                mobileSearchPanel?.classList.remove('active');
                document.body.classList.remove('menu-open');
                searchSuggestions?.classList.remove('active');
            }
        }
        isSearching = false;
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger?.classList.remove('active');
            navItems?.classList.remove('active');
            mobileSearchPanel?.classList.remove('active');
            document.body.classList.remove('menu-open');
            searchSuggestions?.classList.remove('active');
        }
    });

    // Prevent body scroll when menu is open
    const preventScroll = (e) => {
        if (document.body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    };

    document.body.addEventListener('touchmove', preventScroll, { passive: false });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                hamburger?.classList.remove('active');
                navItems?.classList.remove('active');
                mobileSearchPanel?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }, 250);
    });

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLink = document.querySelector(`.nav-items a[href="${currentPage}"]`);
    currentLink?.classList.add('active');
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');
    const searchContainer = document.querySelector('.search-container');
    const searchToggle = document.querySelector('.search-toggle');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navItems.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-items') && 
            !e.target.closest('.hamburger') && 
            navItems.classList.contains('active')) {
            hamburger.classList.remove('active');
            navItems.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Handle mobile search toggle
    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                document.querySelector('#searchInput').focus();
            }
        });
    }

    // Close mobile menu on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                hamburger?.classList.remove('active');
                navItems?.classList.remove('active');
                document.body.classList.remove('menu-open');
                searchContainer?.classList.remove('active');
            }
        }, 250);
    });

    // Handle touch events for better mobile interaction
    const touchElements = document.querySelectorAll('.nav-items a, .button, .card');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });

        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });

    // Prevent iOS bounce effect while scrolling inside menu
    if (navItems) {
        let touchStartY;
        
        navItems.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        navItems.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const scrollTop = navItems.scrollTop;
            const scrollHeight = navItems.scrollHeight;
            const clientHeight = navItems.clientHeight;

            if (scrollTop === 0 && touchY > touchStartY) {
                e.preventDefault();
            }

            if (scrollTop + clientHeight >= scrollHeight && touchY < touchStartY) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Double tap prevention
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
            e.preventDefault();
        }
        lastTap = currentTime;
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');

if (hamburger && navItems) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navItems.classList.toggle('active');
    });
}

// Dashboard Number Animation
function animateValue(element) {
    const target = parseInt(element.getAttribute('data-value'));
    const duration = 2000; // Animation duration in ms
    const start = 0;
    const end = target;
    const range = end - start;
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * range + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    window.requestAnimationFrame(step);
}

// Animate dashboard values when page loads
document.addEventListener('DOMContentLoaded', () => {
    const statValues = document.querySelectorAll('.stat-value[data-value]');
    statValues.forEach(animateValue);
});