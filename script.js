// ==================== AUTHENTICATION ====================
const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logout-btn');

// Initial state
document.body.classList.add('login-active');

// Login handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation (demo purposes)
    if (email && password) {
        // Animate login screen out
        loginScreen.style.animation = 'fadeOut 0.5s ease forwards';

        setTimeout(() => {
            loginScreen.style.display = 'none';
            document.body.classList.remove('login-active'); // Enable scroll
            dashboard.style.display = 'block';
            initDashboard();
        }, 500);
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// Logout handler
logoutBtn.addEventListener('click', () => {
    dashboard.style.animation = 'fadeOut 0.5s ease forwards';

    setTimeout(() => {
        dashboard.style.display = 'none';
        loginScreen.style.display = 'flex';
        document.body.classList.add('login-active'); // Disable scroll
        loginScreen.style.animation = 'fadeIn 0.5s ease forwards';

        // Reset form
        loginForm.reset();
    }, 500);
});

// ==================== NAVIGATION ====================
const navLinks = document.querySelectorAll('.nav-link:not(.logout)');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Smooth scroll to section
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100);
});

// ==================== SIDEBAR ====================
const sidebar = document.getElementById('learning-sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
const sidebarResizeHandle = document.getElementById('sidebar-resize-handle');
const mainContent = document.querySelector('.main-content');

// Toggle sidebar (close)
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    sidebarOpenBtn.classList.add('visible');
});

// Open sidebar
sidebarOpenBtn.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
    sidebarOpenBtn.classList.remove('visible');
});

// Sidebar resize functionality (for LEFT sidebar)
let isResizing = false;
let sidebarWidth = 300;

sidebarResizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    sidebarResizeHandle.classList.add('active');
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    // For left sidebar, width = mouse X position
    const newWidth = e.clientX;
    if (newWidth >= 200 && newWidth <= 500) {
        sidebarWidth = newWidth;
        sidebar.style.width = newWidth + 'px';
        mainContent.style.marginLeft = newWidth + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        sidebarResizeHandle.classList.remove('active');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }
});

// ==================== SIDEBAR SEARCH ====================
const sidebarSearchInput = document.getElementById('sidebar-search-input');

sidebarSearchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const learningItems = document.querySelectorAll('.learning-item');

    learningItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        if (searchTerm === '' || title.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// ==================== LEARNING ITEMS & VIDEO POPUP ====================
const learningItems = document.querySelectorAll('.learning-item');
const videoPopup = document.getElementById('video-popup');
const closePopup = document.getElementById('close-popup');
const videoFrame = document.getElementById('video-frame');

learningItems.forEach(item => {
    const thumbnail = item.querySelector('.video-thumbnail');
    const title = item.querySelector('h4');
    const videoId = item.getAttribute('data-video');
    const varsityUrl = item.getAttribute('data-url');

    // Click on thumbnail - open video popup
    thumbnail.addEventListener('click', () => {
        openVideoPopup(videoId);
    });

    // Click on title - redirect to Zerodha Varsity
    title.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(varsityUrl, '_blank');
    });

    title.style.cursor = 'pointer';
    title.style.textDecoration = 'underline';
});

function openVideoPopup(videoId) {
    // Map video IDs to YouTube embed URLs (demo purposes)
    const videoUrls = {
        'intro-to-trading': 'https://www.youtube.com/embed/p7HKvqRI_Bo',
        'technical-analysis': 'https://www.youtube.com/embed/08c8dDzPphA',
        'fundamental-analysis': 'https://www.youtube.com/embed/CdJj2ECokKc',
        'risk-management': 'https://www.youtube.com/embed/1pwwXnKa3-o'
    };

    videoFrame.src = videoUrls[videoId] || '';
    videoPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoPopup() {
    videoPopup.classList.remove('active');
    videoFrame.src = '';
    document.body.style.overflow = '';
}

closePopup.addEventListener('click', closeVideoPopup);

videoPopup.addEventListener('click', (e) => {
    if (e.target === videoPopup) {
        closeVideoPopup();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoPopup.classList.contains('active')) {
        closeVideoPopup();
    }
});

// ==================== DIFFICULTY TOGGLE ====================
const toggleBtns = document.querySelectorAll('.toggle-btn');
const chartIndicators = document.getElementById('chart-indicators');
let currentDifficulty = 'easy';

toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        toggleBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Get difficulty level
        currentDifficulty = btn.getAttribute('data-difficulty');

        // Update chart indicators based on difficulty
        updateChartIndicators(currentDifficulty);

        // Show/hide customization button
        updateChartControls(currentDifficulty);

        // Redraw chart based on difficulty
        animateChartUpdate();
        setTimeout(() => initChart(currentDifficulty), 100);
    });
});

const customizeBtn = document.getElementById('chart-customize-btn');
if (customizeBtn) {
    customizeBtn.addEventListener('click', () => {
        alert('Chart customization panel coming soon!');
    });
}

function updateChartControls(difficulty) {
    const customizeBtn = document.getElementById('chart-customize-btn');

    if (customizeBtn) {
        if (difficulty === 'expert') {
            customizeBtn.style.display = 'inline-flex';
        } else {
            customizeBtn.style.display = 'none';
        }
    }
}

function updateChartIndicators(difficulty) {
    let indicators = '';

    if (difficulty === 'easy') {
        indicators = `
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease;">
                <span class="indicator-label">Current Price</span>
                <span class="indicator-value">₹2,456.80</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.1s backwards;">
                <span class="indicator-label">Day Change</span>
                <span class="indicator-value" style="color: var(--success);">+2.5%</span>
            </div>
        `;
    } else if (difficulty === 'intermediate') {
        indicators = `
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease;">
                <span class="indicator-label">Current Price</span>
                <span class="indicator-value">₹2,456.80</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.1s backwards;">
                <span class="indicator-label">Day Change</span>
                <span class="indicator-value" style="color: var(--success);">+2.5%</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.2s backwards;">
                <span class="indicator-label">Volume</span>
                <span class="indicator-value">2.5M</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.3s backwards;">
                <span class="indicator-label">52W High</span>
                <span class="indicator-value">₹2,890</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.4s backwards;">
                <span class="indicator-label">52W Low</span>
                <span class="indicator-value">₹2,120</span>
            </div>
        `;
    } else if (difficulty === 'expert') {
        indicators = `
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease;">
                <span class="indicator-label">Current Price</span>
                <span class="indicator-value">₹2,456.80</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.1s backwards;">
                <span class="indicator-label">Day Change</span>
                <span class="indicator-value" style="color: var(--success);">+2.5%</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.2s backwards;">
                <span class="indicator-label">Volume</span>
                <span class="indicator-value">2.5M</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.3s backwards;">
                <span class="indicator-label">RSI (14)</span>
                <span class="indicator-value">62.5</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.4s backwards;">
                <span class="indicator-label">MACD</span>
                <span class="indicator-value" style="color: var(--success);">+12.3</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.5s backwards;">
                <span class="indicator-label">SMA (50)</span>
                <span class="indicator-value">₹2,345</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.6s backwards;">
                <span class="indicator-label">EMA (20)</span>
                <span class="indicator-value">₹2,432</span>
            </div>
            <div class="indicator-item" style="animation: fadeInUp 0.5s ease 0.7s backwards;">
                <span class="indicator-label">Bollinger Bands</span>
                <span class="indicator-value">₹2,340-2,580</span>
            </div>
        `;
    }

    chartIndicators.innerHTML = indicators;
}

function animateChartUpdate() {
    const chartCanvas = document.getElementById('chart-canvas');
    chartCanvas.style.opacity = '0.3';
    chartCanvas.style.transform = 'scale(0.98)';

    setTimeout(() => {
        chartCanvas.style.transition = 'all 0.5s ease';
        chartCanvas.style.opacity = '1';
        chartCanvas.style.transform = 'scale(1)';
    }, 100);
}

// ==================== CHART ====================
function initChart(difficulty = 'easy') {
    const canvas = document.getElementById('trading-chart');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (difficulty === 'easy') {
        // Generate random line chart data
        const dataPoints = 50;
        const data = [];
        let value = 100;

        for (let i = 0; i < dataPoints; i++) {
            value += (Math.random() - 0.45) * 5;
            data.push(value);
        }

        // Draw line chart
        drawLineChart(ctx, canvas, data);
    } else {
        // Generate candlestick data for intermediate and expert
        const candleData = generateCandleData(30);
        drawCandlestickChart(ctx, canvas, candleData);
    }
}

// Generate OHLC candlestick data
function generateCandleData(count) {
    const candles = [];
    let basePrice = 2400;

    for (let i = 0; i < count; i++) {
        const open = basePrice + (Math.random() - 0.5) * 30;
        const close = open + (Math.random() - 0.5) * 50;
        const high = Math.max(open, close) + Math.random() * 20;
        const low = Math.min(open, close) - Math.random() * 20;

        candles.push({ open, high, low, close });
        basePrice = close;
    }

    return candles;
}

// Draw candlestick chart
function drawCandlestickChart(ctx, canvas, data) {
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max
    const allPrices = data.flatMap(c => [c.high, c.low]);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const range = max - min;

    // Draw grid
    ctx.strokeStyle = '#E5E5E5';
    ctx.lineWidth = 1;

    for (let i = 0; i < 5; i++) {
        const y = padding + (i * (height - 2 * padding) / 4);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Calculate candle dimensions
    const candleWidth = ((width - 2 * padding) / data.length) * 0.7;
    const candleSpacing = (width - 2 * padding) / data.length;

    // Draw candles
    data.forEach((candle, index) => {
        const x = padding + index * candleSpacing + candleSpacing / 2;
        const isGreen = candle.close >= candle.open;

        // Colors
        const bodyColor = isGreen ? '#22C55E' : '#EF4444';
        const wickColor = isGreen ? '#16A34A' : '#DC2626';

        // Calculate Y positions
        const yOpen = padding + (max - candle.open) / range * (height - 2 * padding);
        const yClose = padding + (max - candle.close) / range * (height - 2 * padding);
        const yHigh = padding + (max - candle.high) / range * (height - 2 * padding);
        const yLow = padding + (max - candle.low) / range * (height - 2 * padding);

        // Draw wick (high to low line)
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, yHigh);
        ctx.lineTo(x, yLow);
        ctx.stroke();

        // Draw body (rectangle)
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.abs(yClose - yOpen) || 1;

        ctx.fillStyle = bodyColor;
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#666666';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i < 5; i++) {
        const value = max - (i * range / 4);
        const y = padding + (i * (height - 2 * padding) / 4);
        ctx.fillText('₹' + value.toFixed(0), padding - 8, y + 4);
    }
}

function drawLineChart(ctx, canvas, data) {
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min and max
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    // Draw grid
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;

    for (let i = 0; i < 5; i++) {
        const y = padding + (i * (height - 2 * padding) / 4);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0.0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    // Draw line and fill
    const stepX = (width - 2 * padding) / (data.length - 1);

    data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + (max - value) / range * (height - 2 * padding);

        if (index === 0) {
            ctx.lineTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = padding + index * stepX;
        const y = padding + (max - value) / range * (height - 2 * padding);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#667eea';
    data.forEach((value, index) => {
        if (index % 5 === 0) {
            const x = padding + index * stepX;
            const y = padding + (max - value) / range * (height - 2 * padding);

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#475569';
    ctx.font = '12px "Space Mono", monospace';
    ctx.textAlign = 'right';

    for (let i = 0; i < 5; i++) {
        const value = max - (i * range / 4);
        const y = padding + (i * (height - 2 * padding) / 4);
        ctx.fillText('₹' + value.toFixed(0), padding - 10, y + 4);
    }
}

// Chart period buttons
const chartBtns = document.querySelectorAll('.chart-btn');

chartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        chartBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Animate chart update
        animateChartUpdate();
        setTimeout(initChart, 100);
    });
});

// ==================== SCROLL ANIMATIONS ====================
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.insight-card, .module-card, .stat-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== DASHBOARD INITIALIZATION ====================
function initDashboard() {
    // Initialize chart
    setTimeout(() => {
        initChart();
    }, 300);

    // Initialize difficulty indicators
    updateChartIndicators('easy');

    // Initialize chart controls (Customize button visibility)
    updateChartControls('easy');

    // Initialize scroll animations
    observeElements();

    // Resize chart on window resize
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('trading-chart');
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initChart();
        }
    });
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content, .trading-dashboard');

    parallaxElements.forEach((el, index) => {
        const speed = 0.2 + (index * 0.1);
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
});

// ==================== SMOOTH HOVER EFFECTS ====================
document.querySelectorAll('.stat-card, .holding-card, .insight-card, .module-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    if (window.innerWidth <= 968) {
        const navLinks = document.querySelectorAll('.nav-link:not(.logout)');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }
}

window.addEventListener('resize', debounce(initMobileMenu, 250));

// ==================== ACCESSIBILITY ====================
// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c TradeLearn Platform ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Built with modern web technologies ', 'color: #667eea; font-size: 12px;');
console.log('%c For demo purposes only ', 'color: #94A3B8; font-size: 10px;');

// ==================== ALGO TRADING ====================
const algoTradingBtn = document.getElementById('algo-trading-btn');
const algoModalOverlay = document.getElementById('algo-modal-overlay');
const algoModalClose = document.getElementById('algo-modal-close');
const algoGenerateBtn = document.getElementById('algo-generate-btn');
const algoDisableBtn = document.getElementById('algo-disable-btn');
const algoTokenDisplay = document.getElementById('algo-token-display');
const algoTokenValue = document.getElementById('algo-token-value');
const copyTokenBtn = document.getElementById('copy-token-btn');
const algoMessage = document.getElementById('algo-message');
const algoProgressBar = document.getElementById('algo-progress-bar');
const algoStatus = document.getElementById('algo-status');
const algoSteps = document.querySelectorAll('.algo-step');

// Check for existing token on load
function checkAlgoStatus() {
    const token = localStorage.getItem('algo_token');
    if (token) {
        algoTradingBtn.innerHTML = '<span class="algo-icon">🤖</span><span class="algo-text">Active</span>';
        algoTradingBtn.classList.add('active');
    }
}

// Open modal
algoTradingBtn.addEventListener('click', () => {
    algoModalOverlay.classList.add('active');
    updateModalState();
});

// Close modal
algoModalClose.addEventListener('click', () => {
    algoModalOverlay.classList.remove('active');
});

algoModalOverlay.addEventListener('click', (e) => {
    if (e.target === algoModalOverlay) {
        algoModalOverlay.classList.remove('active');
    }
});

// Update modal based on token state
function updateModalState() {
    const token = localStorage.getItem('algo_token');

    if (token) {
        // Already has token - show completed state
        algoGenerateBtn.style.display = 'none';
        algoTokenDisplay.style.display = 'block';
        algoDisableBtn.style.display = 'block';
        algoTokenValue.textContent = token;
        algoProgressBar.style.width = '100%';

        // Mark all steps completed
        algoSteps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('completed');
        });

        showMessage('Automation is active and running.', 'success');
    } else {
        // No token - show generate state
        algoGenerateBtn.style.display = 'block';
        algoTokenDisplay.style.display = 'none';
        algoDisableBtn.style.display = 'none';
        algoProgressBar.style.width = '0%';

        // Reset steps
        algoSteps.forEach(step => {
            step.classList.remove('active', 'completed');
        });

        hideMessage();
    }
}

// ==================== ALGO INFO POPUP ====================
const algoInfoBtn = document.getElementById('algo-info-btn');
const algoInfoPopup = document.getElementById('algo-info-popup');

if (algoInfoBtn && algoInfoPopup) {
    // Toggle popup on button click
    algoInfoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        algoInfoPopup.classList.toggle('active');
    });

    // Close popup on click outside
    document.addEventListener('click', (e) => {
        if (!algoInfoPopup.contains(e.target) && !algoInfoBtn.contains(e.target)) {
            algoInfoPopup.classList.remove('active');
        }
    });

    // Prevent closing when clicking inside popup
    algoInfoPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Show message
function showMessage(text, type) {
    algoMessage.textContent = text;
    algoMessage.className = 'algo-message ' + type;
}

// Hide message
function hideMessage() {
    algoMessage.className = 'algo-message';
    algoMessage.textContent = '';
}

// Update step UI
function setStepActive(stepNum) {
    algoSteps.forEach(step => {
        const num = parseInt(step.dataset.step);
        if (num < stepNum) {
            step.classList.remove('active');
            step.classList.add('completed');
        } else if (num === stepNum) {
            step.classList.remove('completed');
            step.classList.add('active');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Simulate step completion with delay
function completeStep(stepNum) {
    return new Promise(resolve => {
        setStepActive(stepNum);
        algoProgressBar.style.width = (stepNum * 25) + '%';
        setTimeout(resolve, 600);
    });
}

// Generate token
algoGenerateBtn.addEventListener('click', async () => {
    const currentUser = localStorage.getItem('currentUser') || 'demo_user';

    // Disable button during process
    algoGenerateBtn.disabled = true;
    algoGenerateBtn.innerHTML = '<span class="btn-icon">⏳</span> Generating...';

    try {
        // Step 1: Generate Token
        showMessage('Generating secure API token...', 'loading');
        await completeStep(1);

        // API Call
        const response = await fetch(`http://127.0.0.1:8000/login?username=${encodeURIComponent(currentUser)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.access_token && !data.token) {
            throw new Error('Invalid response: No token received');
        }

        const token = data.access_token || data.token;

        // Store token
        localStorage.setItem('algo_token', token);

        // Step 2: Authorize Agent
        showMessage('Authorizing AI trading agent...', 'loading');
        await completeStep(2);

        // Step 3: Connect Gateway
        showMessage('Connecting to gateway server...', 'loading');
        await completeStep(3);

        // Step 4: Start Automation
        showMessage('Starting automated trading...', 'loading');
        await completeStep(4);

        // Mark all complete
        algoSteps.forEach(step => {
            step.classList.remove('active');
            step.classList.add('completed');
        });
        algoProgressBar.style.width = '100%';

        // Show success
        showMessage('✓ Automation enabled successfully!', 'success');

        // Update UI
        algoGenerateBtn.style.display = 'none';
        algoTokenDisplay.style.display = 'block';
        algoDisableBtn.style.display = 'block';
        algoTokenValue.textContent = token;

        // Update main button
        algoTradingBtn.innerHTML = '<span class="algo-icon">🤖</span><span>Automation Active</span>';
        algoTradingBtn.classList.add('active');
        algoStatus.textContent = '✓ Connected to trading server';
        algoStatus.className = 'algo-status success';

    } catch (error) {
        console.error('Algo Trading Error:', error);

        // Handle specific errors
        let errorMessage = 'Failed to generate token. ';

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            errorMessage += 'Network error - check if the server is running at http://127.0.0.1:8000';
        } else if (error.message.includes('Server error')) {
            errorMessage += error.message;
        } else {
            errorMessage += error.message || 'Please try again.';
        }

        showMessage(errorMessage, 'error');

        // Reset steps
        algoSteps.forEach(step => {
            step.classList.remove('active', 'completed');
        });
        algoProgressBar.style.width = '0%';

    } finally {
        // Re-enable button
        algoGenerateBtn.disabled = false;
        algoGenerateBtn.innerHTML = '<span class="btn-icon">🔑</span> Generate Token';
    }
});

// Copy token
copyTokenBtn.addEventListener('click', async () => {
    const token = algoTokenValue.textContent;

    try {
        await navigator.clipboard.writeText(token);
        copyTokenBtn.textContent = '✓';
        copyTokenBtn.classList.add('copied');

        setTimeout(() => {
            copyTokenBtn.textContent = '📋';
            copyTokenBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = token;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        copyTokenBtn.textContent = '✓';
        setTimeout(() => {
            copyTokenBtn.textContent = '📋';
        }, 2000);
    }
});

// Disable automation
algoDisableBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to disable automated trading? This will revoke the API token.')) {
        // Remove token
        localStorage.removeItem('algo_token');

        // Reset UI
        updateModalState();

        // Update main button
        algoTradingBtn.innerHTML = '<span class="algo-icon">🤖</span><span>Enable Automated Trading</span>';
        algoTradingBtn.classList.remove('active');
        algoStatus.textContent = '';
        algoStatus.className = 'algo-status';

        showMessage('Automation disabled. Token revoked.', 'success');

        setTimeout(() => {
            hideMessage();
        }, 3000);
    }
});

// Initialize algo status on load
checkAlgoStatus();

// ==================== PORTFOLIO MODAL ====================
const portfolioBtn = document.getElementById('portfolio-btn');
const portfolioModalOverlay = document.getElementById('portfolio-modal-overlay');
const portfolioModalClose = document.getElementById('portfolio-modal-close');

portfolioBtn.addEventListener('click', () => {
    portfolioModalOverlay.classList.add('active');
});

portfolioModalClose.addEventListener('click', () => {
    portfolioModalOverlay.classList.remove('active');
    // Reset to products view when closing
    document.querySelector('.portfolio-products').style.display = 'grid';
    document.querySelector('.portfolio-summary').style.display = 'block';
    document.getElementById('portfolio-holdings').style.display = 'none';
});

portfolioModalOverlay.addEventListener('click', (e) => {
    if (e.target === portfolioModalOverlay) {
        portfolioModalOverlay.classList.remove('active');
    }
});

// Portfolio Holdings Data
const portfolioHoldings = {
    kite: {
        title: 'Kite Holdings - Stocks & F&O',
        holdings: [
            { name: 'Reliance Industries', qty: '25 shares', value: '₹71,408', returns: '+8.5%', isPositive: true },
            { name: 'TCS', qty: '15 shares', value: '₹55,218', returns: '+15.2%', isPositive: true },
            { name: 'HDFC Bank', qty: '30 shares', value: '₹18,604', returns: '-2.3%', isPositive: false }
        ]
    },
    coin: {
        title: 'Coin Holdings - Mutual Funds',
        holdings: [
            { name: 'Axis Bluechip Fund', qty: '548 units', value: '₹32,450', returns: '+18.4%', isPositive: true },
            { name: 'SBI Small Cap Fund', qty: '234 units', value: '₹18,970', returns: '+22.1%', isPositive: true },
            { name: 'HDFC Flexi Cap Fund', qty: '312 units', value: '₹14,000', returns: '+12.8%', isPositive: true }
        ]
    },
    console: {
        title: 'Console Holdings - Bonds & FDs',
        holdings: [
            { name: 'SGB 2028', qty: '5 grams', value: '₹15,000', returns: '+4.5%', isPositive: true },
            { name: 'REC Tax Free Bonds', qty: '10 units', value: '₹10,000', returns: '+3.2%', isPositive: true }
        ]
    },
    funds: {
        title: 'Available Funds',
        holdings: [
            { name: 'Trading Balance', qty: '', value: '₹8,240', returns: 'Equity', isPositive: true },
            { name: 'Commodity Balance', qty: '', value: '₹2,000', returns: 'Commodity', isPositive: true }
        ]
    }
};

// Product card click handlers
document.querySelectorAll('.product-card.clickable').forEach(card => {
    card.addEventListener('click', () => {
        const product = card.dataset.product;
        const data = portfolioHoldings[product];

        // Hide products and summary, show holdings
        document.querySelector('.portfolio-products').style.display = 'none';
        document.querySelector('.portfolio-summary').style.display = 'none';

        const holdingsSection = document.getElementById('portfolio-holdings');
        holdingsSection.style.display = 'block';
        document.getElementById('holdings-title').textContent = data.title;

        // Render holdings
        document.getElementById('holdings-list').innerHTML = data.holdings.map(h => `
            <div class="holding-item">
                <div>
                    <div class="holding-name">${h.name}</div>
                    <div class="holding-qty">${h.qty}</div>
                </div>
                <div class="holding-value">
                    <div class="price">${h.value}</div>
                    <div class="returns ${h.isPositive ? 'positive' : 'negative'}">${h.returns}</div>
                </div>
            </div>
        `).join('');
    });
});

// Back button
document.getElementById('holdings-back').addEventListener('click', () => {
    document.querySelector('.portfolio-products').style.display = 'grid';
    document.querySelector('.portfolio-summary').style.display = 'block';
    document.getElementById('portfolio-holdings').style.display = 'none';
});

// ==================== LIVE MARKET VIEW ====================
const marketTabs = document.querySelectorAll('.market-tab');
const stockList = document.getElementById('stock-list');
const marketChartTitle = document.getElementById('market-chart-title');
const indexValue = document.getElementById('index-value');
const indexChange = document.getElementById('index-change');

// Market data
const marketData = {
    nifty50: {
        title: 'NIFTY 50',
        value: '22,456.80',
        change: '+156.45 (+0.70%)',
        isPositive: true,
        stocks: [
            { name: 'Reliance Industries', price: '₹2,856.30', change: '+1.24%', isPositive: true },
            { name: 'TCS', price: '₹3,945.50', change: '+0.89%', isPositive: true },
            { name: 'HDFC Bank', price: '₹1,654.20', change: '+0.56%', isPositive: true },
            { name: 'Infosys', price: '₹1,523.80', change: '-0.32%', isPositive: false },
            { name: 'ICICI Bank', price: '₹1,089.45', change: '+1.12%', isPositive: true },
            { name: 'Bharti Airtel', price: '₹1,234.60', change: '+0.78%', isPositive: true },
            { name: 'ITC', price: '₹456.30', change: '+0.45%', isPositive: true },
            { name: 'Kotak Bank', price: '₹1,789.20', change: '-0.18%', isPositive: false },
            { name: 'LT', price: '₹3,456.80', change: '+0.92%', isPositive: true },
            { name: 'Axis Bank', price: '₹1,123.45', change: '+0.67%', isPositive: true }
        ]
    },
    sensex: {
        title: 'SENSEX',
        value: '73,852.45',
        change: '+342.18 (+0.47%)',
        isPositive: true,
        stocks: [
            { name: 'Reliance Industries', price: '₹2,856.30', change: '+1.24%', isPositive: true },
            { name: 'TCS', price: '₹3,945.50', change: '+0.89%', isPositive: true },
            { name: 'HDFC Bank', price: '₹1,654.20', change: '+0.56%', isPositive: true },
            { name: 'Infosys', price: '₹1,523.80', change: '-0.32%', isPositive: false },
            { name: 'ICICI Bank', price: '₹1,089.45', change: '+1.12%', isPositive: true },
            { name: 'HUL', price: '₹2,567.40', change: '+0.34%', isPositive: true },
            { name: 'SBI', price: '₹789.60', change: '+0.89%', isPositive: true },
            { name: 'Bajaj Finance', price: '₹6,789.30', change: '-0.45%', isPositive: false },
            { name: 'Maruti Suzuki', price: '₹12,345.60', change: '+0.78%', isPositive: true },
            { name: 'Asian Paints', price: '₹2,890.45', change: '+0.23%', isPositive: true }
        ]
    },
    gainers: {
        title: 'Top Gainers',
        value: '',
        change: '',
        isPositive: true,
        stocks: [
            { name: 'Adani Ports', price: '₹1,345.80', change: '+5.67%', isPositive: true },
            { name: 'BPCL', price: '₹567.30', change: '+4.23%', isPositive: true },
            { name: 'Tata Motors', price: '₹789.45', change: '+3.89%', isPositive: true },
            { name: 'Coal India', price: '₹456.20', change: '+3.45%', isPositive: true },
            { name: 'ONGC', price: '₹234.60', change: '+3.12%', isPositive: true },
            { name: 'Power Grid', price: '₹345.80', change: '+2.89%', isPositive: true },
            { name: 'NTPC', price: '₹378.90', change: '+2.67%', isPositive: true },
            { name: 'JSW Steel', price: '₹890.45', change: '+2.45%', isPositive: true },
            { name: 'Tata Steel', price: '₹145.60', change: '+2.23%', isPositive: true },
            { name: 'Hindalco', price: '₹567.80', change: '+2.01%', isPositive: true }
        ]
    },
    losers: {
        title: 'Top Losers',
        value: '',
        change: '',
        isPositive: false,
        stocks: [
            { name: 'Tech Mahindra', price: '₹1,234.50', change: '-3.45%', isPositive: false },
            { name: 'Wipro', price: '₹456.30', change: '-2.89%', isPositive: false },
            { name: 'HDFC Life', price: '₹567.80', change: '-2.34%', isPositive: false },
            { name: 'SBI Life', price: '₹1,345.60', change: '-2.12%', isPositive: false },
            { name: 'Bajaj Finserv', price: '₹1,567.90', change: '-1.89%', isPositive: false },
            { name: 'Divi\'s Labs', price: '₹3,456.70', change: '-1.67%', isPositive: false },
            { name: 'Apollo Hospitals', price: '₹5,678.90', change: '-1.45%', isPositive: false },
            { name: 'Nestle India', price: '₹2,345.60', change: '-1.23%', isPositive: false },
            { name: 'Britannia', price: '₹4,567.80', change: '-1.01%', isPositive: false },
            { name: 'Eicher Motors', price: '₹4,123.40', change: '-0.89%', isPositive: false }
        ]
    }
};

let currentMarket = 'nifty50';

// Render stock list
function renderStockList(market) {
    const data = marketData[market];
    stockList.innerHTML = data.stocks.map((stock, index) => `
        <div class="stock-item${index === 0 ? ' active' : ''}" data-index="${index}">
            <span class="stock-name">${stock.name}</span>
            <div class="stock-price">
                <div class="price">${stock.price}</div>
                <div class="change ${stock.isPositive ? 'positive' : 'negative'}">${stock.change}</div>
            </div>
        </div>
    `).join('');

    // Update header
    marketChartTitle.textContent = data.title;
    if (data.value) {
        indexValue.textContent = data.value;
        indexChange.textContent = data.change;
        indexChange.className = `index-change ${data.isPositive ? 'positive' : 'negative'}`;
        document.querySelector('.market-index-info').style.display = 'block';
    } else {
        document.querySelector('.market-index-info').style.display = 'none';
    }

    // Add click handlers to stock items
    document.querySelectorAll('.stock-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.stock-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            // Update company details
            updateCompanyDetails(data.stocks[idx], idx);
            // Redraw chart for selected stock
            initChart(currentDifficulty);
        });
    });

    // Update company details for first stock
    if (data.stocks.length > 0) {
        updateCompanyDetails(data.stocks[0], 0);
    }
}

// Company details data
const companyDetails = {
    'Reliance Industries': { sector: 'Oil & Gas', open: '₹2,845.00', high: '₹2,878.50', low: '₹2,832.20', volume: '12.5M', patterns: ['Bullish Engulfing', 'Support at ₹2,820', 'Above 50 DMA'] },
    'TCS': { sector: 'IT Services', open: '₹3,920.00', high: '₹3,958.30', low: '₹3,912.80', volume: '3.2M', patterns: ['Doji Star', 'Resistance at ₹3,980', 'RSI Overbought'] },
    'HDFC Bank': { sector: 'Banking', open: '₹1,648.00', high: '₹1,662.40', low: '₹1,640.50', volume: '8.7M', patterns: ['Hammer', 'Near Support', 'Positive Volume'] },
    'Infosys': { sector: 'IT Services', open: '₹1,530.00', high: '₹1,538.90', low: '₹1,518.40', volume: '5.1M', patterns: ['Bearish Engulfing', 'Below 20 DMA', 'Weak Momentum'] },
    'ICICI Bank': { sector: 'Banking', open: '₹1,078.00', high: '₹1,095.60', low: '₹1,075.30', volume: '9.4M', patterns: ['Morning Star', 'Breakout', 'High Volume'] },
    'Bharti Airtel': { sector: 'Telecom', open: '₹1,225.00', high: '₹1,242.80', low: '₹1,220.50', volume: '4.8M', patterns: ['Bullish Flag', 'Strong Trend', 'Above All MAs'] },
    'ITC': { sector: 'FMCG', open: '₹453.00', high: '₹458.20', low: '₹451.80', volume: '15.2M', patterns: ['Inside Bar', 'Consolidation', 'Low Volatility'] },
    'Kotak Bank': { sector: 'Banking', open: '₹1,795.00', high: '₹1,798.40', low: '₹1,782.60', volume: '2.1M', patterns: ['Spinning Top', 'Indecision', 'Wait for Breakout'] },
    'Axis Bank': { sector: 'Banking', open: '₹1,115.00', high: '₹1,128.50', low: '₹1,112.30', volume: '7.3M', patterns: ['Bullish Harami', 'Reversal Signal', 'Volume Spike'] }
};

function updateCompanyDetails(stock, index) {
    const details = companyDetails[stock.name] || {
        sector: 'Unknown',
        open: stock.price,
        high: stock.price,
        low: stock.price,
        volume: '1M',
        patterns: ['No Data']
    };

    document.getElementById('company-name').textContent = stock.name;
    document.querySelector('.company-sector').textContent = details.sector;
    document.getElementById('stat-open').textContent = details.open;
    document.getElementById('stat-high').textContent = details.high;
    document.getElementById('stat-low').textContent = details.low;
    document.getElementById('stat-volume').textContent = details.volume;

    // Update patterns
    const patternTags = document.querySelector('.pattern-tags');
    patternTags.innerHTML = details.patterns.map((p, i) => {
        const type = i === 0 ? (stock.isPositive ? 'bullish' : 'bearish') : 'neutral';
        return `<span class="pattern-tag ${type}">${p}</span>`;
    }).join('');
}

// Market tab switching
marketTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        marketTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentMarket = tab.dataset.market;
        renderStockList(currentMarket);
        initChart(currentDifficulty);
    });
});

// Initialize market view
renderStockList('nifty50');


// ==================== INSIGHTS CAROUSEL ====================
const carousel = document.getElementById('insights-carousel');
const dotsContainer = document.getElementById('carousel-dots');

if (carousel && dotsContainer) {
    const cards = carousel.querySelectorAll('.insight-card');

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => {
            cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
        dotsContainer.appendChild(dot);
    });

    // Update active dot on scroll
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 24; // card width + gap
        const activeIndex = Math.round(scrollLeft / cardWidth);

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
        });
    });
}

// ==================== SUPPORT CHATBOT LOGIC ====================
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// Knowledge Base
const knowledgeBase = {
    account: {
        keywords: ['account', 'kyc', 'login', 'reactivate', 'block', 'freeze'],
        solutions: {
            'kyc': 'KYC verification takes **up to 72 hours**. Check status at **cvlkra.com**.',
            'reactivate': 'Reactivate at **signup.zerodha.com/rekyc**. Processing takes **24-48 hours**.',
            'freeze': 'To freeze, email **stoptrade@zerodha.com** or call **080-4680-1166** immediately.'
        },
        suggestions: ['Check KYC Status', 'Reactivate Account', 'Freeze Account']
    },
    trading: {
        keywords: ['trade', 'order', 'margin', 'gtt', 'rejected'],
        solutions: {
            'rejected': 'Common reasons: **Insufficient margin**, **Price outside circuit**, or **Outside market hours** (9:15-3:30).',
            'margin': 'Penalties apply for shortages. Use the **Zerodha Margin Calculator** to verify requirements.',
            'gtt': 'GTT orders are valid for **365 days**. Ideal for long-term stop losses.'
        },
        suggestions: ['Order Rejection Help', 'Margin Calculator', 'GTT Info']
    },
    funds: {
        keywords: ['fund', 'money', 'withdraw', 'upi', 'deposit'],
        solutions: {
            'withdraw': 'Withdrawals are processed by end of day and hit your bank in **24 hours**.',
            'upi': 'Use Kite for UPI deposits (**Limit: ₹5 Lakh**). Do NOT initiate from the UPI app directly.'
        },
        suggestions: ['Withdrawal Timeline', 'UPI Deposit Help']
    }
};

let botIsTyping = false;

// Toggle Chatbot
if (chatbotToggle && chatbotWidget) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWidget.classList.add('active');
        chatbotToggle.classList.add('active');

        // Initial greeting if empty
        if (chatMessages.children.length === 0) {
            appendBotMessage("Hi! I'm your Zerodha Assistant. How can I help you today?");
        }
    });

    chatClose.addEventListener('click', () => {
        chatbotWidget.classList.remove('active');
        chatbotToggle.classList.remove('active');
    });
}

function appendMessage(role, text, suggestions = []) {
    const wrap = document.createElement('div');
    wrap.className = `message ${role}`;

    // Convert **text** to <b>tags
    const formatted = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    wrap.innerHTML = `
        ${role === 'bot' ? '<div class="bot-avatar">🤖</div>' : ''}
        <div class="message-content">${formatted}</div>
    `;

    chatMessages.appendChild(wrap);

    if (suggestions.length > 0) {
        const suggDiv = document.createElement('div');
        suggDiv.className = 'suggestions';
        suggestions.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.innerText = s;
            btn.onclick = () => {
                chatInput.value = s;
                handleChatSend();
            };
            suggDiv.appendChild(btn);
        });
        chatMessages.appendChild(suggDiv);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendBotMessage(text, suggestions = []) {
    appendMessage('bot', text, suggestions);
}

function findBotResponse(input) {
    const query = input.toLowerCase();

    for (const category in knowledgeBase) {
        const data = knowledgeBase[category];
        if (data.keywords.some(kw => query.includes(kw))) {
            for (const key in data.solutions) {
                if (query.includes(key)) {
                    return { text: data.solutions[key], suggestions: data.suggestions };
                }
            }
            return { text: `I can help with ${category} queries. What specifically do you need?`, suggestions: data.suggestions };
        }
    }
    return null;
}

async function handleChatSend() {
    if (botIsTyping) return;
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    chatInput.value = '';

    botIsTyping = true;

    // Simulate thinking
    const response = findBotResponse(text);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));

    if (response) {
        appendBotMessage(response.text, response.suggestions);
    } else {
        appendBotMessage("I'm not sure about that. Try one of these topics:", ['Account', 'Trading', 'Funds']);
    }

    botIsTyping = false;
}

if (sendBtn) {
    sendBtn.addEventListener('click', handleChatSend);
}
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
    });
}
