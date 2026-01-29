// ===== Standard Normal CDF ===== 
// Using the Abramowitz and Stegun approximation (accurate to ~7 decimal places)
function standardNormalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989422804014337 * Math.exp(-x * x / 2);
    const probability = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return x >= 0 ? 1 - probability : probability;
}

// ===== Black-Scholes Pricing ===== 
function blackScholes(S, K, r, sigma, T) {
    if (T <= 0) {
        // At expiration
        const callPrice = Math.max(S - K, 0);
        const putPrice = Math.max(K - S, 0);
        return { call: callPrice, put: putPrice };
    }

    // Calculate d1 and d2
    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const callPrice = S * standardNormalCDF(d1) - K * Math.exp(-r * T) * standardNormalCDF(d2);
    const putPrice = K * Math.exp(-r * T) * standardNormalCDF(-d2) - S * standardNormalCDF(-d1);

    return { call: callPrice, put: putPrice };
}

// ===== Calculate and Display ===== 
function calculateOptionPrices() {
    const S = parseFloat(document.getElementById('spotPrice').value);
    const K = parseFloat(document.getElementById('strikePrice').value);
    const r = parseFloat(document.getElementById('riskFreeRate').value);
    const sigma = parseFloat(document.getElementById('volatility').value);
    const T = parseFloat(document.getElementById('timeToMaturity').value);

    // Validate inputs
    if (isNaN(S) || isNaN(K) || isNaN(r) || isNaN(sigma) || isNaN(T)) {
        return;
    }

    if (S <= 0 || K <= 0 || sigma < 0 || T < 0) {
        return;
    }

    // Calculate option prices
    const prices = blackScholes(S, K, r, sigma, T);

    // Update results with smooth animation
    updateResultValue('callPrice', prices.call);
    updateResultValue('putPrice', prices.put);
}

// ===== Smooth Value Update ===== 
function updateResultValue(elementId, newValue) {
    const element = document.getElementById(elementId);
    const formattedValue = '$' + newValue.toFixed(4);
    
    // Add a subtle animation for visual feedback
    element.style.opacity = '0.7';
    setTimeout(() => {
        element.textContent = formattedValue;
        element.style.opacity = '1';
    }, 50);
    
    element.style.transition = 'opacity 0.15s ease-out';
}

// ===== Collapsible Sections ===== 
function setupCollapsibleSections() {
    const toggleButtons = document.querySelectorAll('.section-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const section = document.getElementById(targetId);

            if (!section) return;

            // Toggle expanded state
            this.classList.toggle('expanded');
            section.classList.toggle('collapsed');

            // Smooth height animation
            if (this.classList.contains('expanded')) {
                section.style.maxHeight = section.scrollHeight + 'px';
            } else {
                section.style.maxHeight = '0';
            }
        });
    });
}

// ===== Modal Management ===== 
function setupModals() {
    const modalOverlay = document.getElementById('modal-overlay');
    
    // Open modals from nav links
    document.querySelectorAll('[data-toggle]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-toggle') + '-modal';
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Close modals
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => closeModal(modal));
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => closeModal(modal));
        }
    });
}

function openModal(modal) {
    const overlay = document.getElementById('modal-overlay');
    modal.classList.add('show');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    const openModals = document.querySelectorAll('.modal.show');
    if (openModals.length <= 1) {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
    modal.classList.remove('show');
}

// ===== Feedback Form ===== 
function setupFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const type = document.getElementById('feedbackType').value;
            const email = document.getElementById('feedbackEmail').value;
            const message = document.getElementById('feedbackMessage').value;
            
            // Simple validation
            if (!type || !message) {
                alert('Please fill in required fields');
                return;
            }
            
            // Log feedback (in production, would send to server)
            console.log({
                type: type,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            });
            
            // Show success and reset
            alert('Thank you for your feedback!');
            form.reset();
            
            // Close modal
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    }
}

// ===== Sidebar Navigation ===== 
function setupSidebarNav() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
        });
    });
}

// ===== Sidebar Toggle ===== 
function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarToggleFloating = document.getElementById('sidebar-toggle-floating');
    const appSidebar = document.querySelector('.app-sidebar');
    const appContainer = document.querySelector('.app-container');
    
    function toggleSidebar() {
        appSidebar.classList.toggle('collapsed');
        appContainer.classList.toggle('sidebar-collapsed');
        sidebarToggleFloating.classList.toggle('show');
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }
    
    if (sidebarToggleFloating) {
        sidebarToggleFloating.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }
}

// ===== Event Listeners ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Setup collapsible sections
    setupCollapsibleSections();
    
    // Setup modals
    setupModals();
    
    // Setup feedback form
    setupFeedbackForm();
    
    // Setup sidebar navigation
    setupSidebarNav();
    
    // Setup sidebar toggle
    setupSidebarToggle();

    // Setup input listeners for real-time calculation
    const inputs = ['spotPrice', 'strikePrice', 'riskFreeRate', 'volatility', 'timeToMaturity'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateOptionPrices);
            input.addEventListener('change', calculateOptionPrices);
        }
    });

    // Initial calculation
    calculateOptionPrices();
});

// ===== Window Resize Handler ===== 
// Adjust collapsible section heights on window resize
window.addEventListener('resize', function() {
    const expandedSections = document.querySelectorAll('.section-content:not(.collapsed)');
    expandedSections.forEach(section => {
        section.style.maxHeight = section.scrollHeight + 'px';
    });
});
