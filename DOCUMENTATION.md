# TradeLearn - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Frontend Structure](#frontend-structure)
3. [Backend Structure](#backend-structure)
4. [Authentication Flow](#authentication-flow)
5. [Component Documentation](#component-documentation)
6. [Animation System](#animation-system)
7. [State Management](#state-management)
8. [API Reference](#api-reference)
9. [Database Schema](#database-schema)
10. [Deployment Guide](#deployment-guide)

---

## Architecture Overview

### Tech Stack
```
Frontend:
├── HTML5 (Semantic markup)
├── CSS3 (Grid, Flexbox, Variables, Animations)
└── Vanilla JavaScript (ES6+)

Backend:
├── Node.js (Runtime)
├── Express.js (Web framework)
├── JWT (Authentication)
└── bcrypt (Password hashing)
```

### Design Pattern
- **Frontend**: Component-based structure (reusable elements)
- **Backend**: MVC-inspired (routes, controllers, models)
- **Authentication**: JWT-based stateless authentication
- **Data Flow**: RESTful API communication

---

## Frontend Structure

### HTML Architecture

#### 1. Login Screen (`#login-screen`)
```html
<div id="login-screen">
  ├── .login-background (animated gradient + grid)
  └── .login-box
      ├── .login-header (brand + tagline)
      └── .login-form (email + password fields)
```

**Key Features:**
- Animated gradient background
- Glass-morphism effect
- Form validation
- Smooth fade-out transition

#### 2. Dashboard (`#dashboard`)
```html
<div id="dashboard">
  ├── nav.navbar (sticky navigation)
  ├── aside.learning-sidebar (collapsible)
  ├── .video-popup (modal for videos)
  └── main.main-content
      ├── #hero (dashboard home)
      ├── #insights (market news)
      ├── #learn (educational modules)
      └── #profile (user settings)
```

### CSS Architecture

#### Variables System
```css
:root {
  /* Colors */
  --primary: #0066FF;
  --secondary: #FF6B35;
  --accent: #00D4AA;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* Shadows */
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Spacing */
  --spacing-md: 1.5rem;
  
  /* Typography */
  --font-display: 'Syne', sans-serif;
}
```

#### Component Styles
Each component follows this structure:
```css
.component-name {
  /* Layout */
  display: flex;
  
  /* Spacing */
  padding: var(--spacing-md);
  
  /* Visual */
  background: var(--bg-secondary);
  
  /* Animation */
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease;
}
```

### JavaScript Architecture

#### Module Pattern
```javascript
// ==================== SECTION NAME ====================
// Code organized by functionality
```

**Key Modules:**
1. **Authentication**: Login/logout handling
2. **Navigation**: Smooth scrolling, active states
3. **Sidebar**: Collapse/expand, video modal
4. **Difficulty Toggle**: Chart complexity switching
5. **Chart Rendering**: Canvas-based visualization
6. **Animations**: Scroll observers, parallax

#### Event Handling
```javascript
// Delegation pattern for dynamic elements
element.addEventListener('click', handler);

// Debounced scroll events
window.addEventListener('scroll', debounce(handler, 250));
```

---

## Backend Structure

### Server Setup (`server.js`)

#### Middleware Stack
```javascript
app.use(cors());              // Cross-origin requests
app.use(express.json());      // Parse JSON bodies
app.use(express.static());    // Serve static files
```

#### Route Structure
```
/                    → Serve index.html
/api/register        → User registration
/api/login           → User authentication
/api/portfolio       → Portfolio data (protected)
/api/insights        → Market insights (protected)
/api/learning        → Learning modules (protected)
```

### Authentication Middleware
```javascript
const authenticateToken = (req, res, next) => {
  // Extract token from header
  // Verify with JWT
  // Attach user to request
  // Call next() or return error
};
```

---

## Authentication Flow

### Registration Flow
```
1. User submits email + password
2. Backend validates input
3. Password hashed with bcrypt
4. User saved to database
5. JWT token generated
6. Token + user data returned
```

### Login Flow
```
1. User submits credentials
2. Backend finds user by email
3. Password compared with hash
4. JWT token generated
5. Token + user data returned
6. Frontend stores token
7. Dashboard rendered
```

### Protected Routes
```
1. Frontend attaches token to request
2. Backend middleware verifies token
3. If valid: request proceeds
4. If invalid: 401/403 error
```

### Token Structure
```javascript
{
  id: user.id,
  email: user.email,
  iat: issuedAt,
  exp: expiresIn24Hours
}
```

---

## Component Documentation

### 1. Difficulty Selector

**Purpose**: Toggle between easy/intermediate/expert trading modes

**HTML Structure**:
```html
<div class="difficulty-selector">
  <div class="selector-label">Trading Mode</div>
  <div class="toggle-group">
    <button class="toggle-btn active" data-difficulty="easy">Easy</button>
    <button class="toggle-btn" data-difficulty="intermediate">Intermediate</button>
    <button class="toggle-btn" data-difficulty="expert">Expert</button>
  </div>
</div>
```

**JavaScript Logic**:
```javascript
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all
    // Add active to clicked
    // Get difficulty level
    // Update chart indicators
    // Animate change
  });
});
```

**Indicator Mapping**:
- **Easy**: 2 indicators (Price, Change)
- **Intermediate**: 5 indicators (Price, Change, Volume, 52W High/Low)
- **Expert**: 8 indicators (All technical indicators)

### 2. Learning Sidebar

**Purpose**: Provide quick access to educational videos

**Components**:
- Video thumbnails
- Play icons
- Title links to Zerodha Varsity
- Collapse/expand toggle

**Click Behaviors**:
```javascript
// Thumbnail click → Open video popup
thumbnail.addEventListener('click', () => {
  openVideoPopup(videoId);
});

// Title click → Open Varsity page
title.addEventListener('click', () => {
  window.open(varsityUrl, '_blank');
});
```

### 3. Video Popup

**Purpose**: Display learning videos in modal

**Structure**:
```html
<div class="video-popup">
  <div class="video-popup-content">
    <button class="close-popup">X</button>
    <div class="video-container">
      <iframe id="video-frame"></iframe>
    </div>
  </div>
</div>
```

**Lifecycle**:
```
1. User clicks thumbnail
2. Popup fades in with scale animation
3. Video URL loaded into iframe
4. User clicks close or backdrop
5. Popup fades out
6. iframe URL cleared
```

### 4. Chart Component

**Purpose**: Visualize portfolio performance

**Technology**: HTML5 Canvas

**Drawing Process**:
```javascript
1. Get canvas context
2. Set dimensions
3. Generate data points
4. Calculate min/max values
5. Draw grid lines
6. Draw gradient fill
7. Draw line chart
8. Draw data points
9. Add axis labels
```

**Responsiveness**:
```javascript
window.addEventListener('resize', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  redrawChart();
});
```

---

## Animation System

### Animation Types

#### 1. Page Load Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Staggered Animations**:
```css
.element:nth-child(1) { animation-delay: 0.1s; }
.element:nth-child(2) { animation-delay: 0.2s; }
.element:nth-child(3) { animation-delay: 0.3s; }
```

#### 2. Interaction Animations
```css
.button {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}
```

#### 3. Scroll Animations

**Intersection Observer**:
```javascript
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
```

#### 4. Parallax Effects
```javascript
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  element.style.transform = `translateY(${scrolled * 0.2}px)`;
});
```

### Performance Optimization

**CSS-Only Animations**:
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`

**Debouncing**:
```javascript
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

---

## State Management

### Frontend State

**User State**:
```javascript
const userState = {
  isAuthenticated: false,
  token: null,
  userData: null
};
```

**UI State**:
```javascript
const uiState = {
  currentSection: 'hero',
  sidebarCollapsed: false,
  currentDifficulty: 'easy',
  chartPeriod: '1D'
};
```

**State Updates**:
```javascript
function updateDifficulty(level) {
  uiState.currentDifficulty = level;
  updateChartIndicators(level);
  animateChartUpdate();
}
```

### Backend State

**In-Memory Storage** (Demo):
```javascript
const users = [
  {
    id: 1,
    email: 'demo@tradelearn.com',
    password: 'hashed_password',
    portfolioValue: 245890,
    holdings: [...]
  }
];
```

**Production Recommendation**:
- PostgreSQL / MySQL for user data
- Redis for session management
- MongoDB for analytics data

---

## API Reference

### Authentication Endpoints

#### POST `/api/register`
Register a new user.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Errors**:
- 400: User already exists
- 500: Registration failed

#### POST `/api/login`
Authenticate user.

**Request Body**:
```json
{
  "email": "demo@tradelearn.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "demo@tradelearn.com",
    "name": "Demo Trader",
    "portfolioValue": 245890
  }
}
```

**Errors**:
- 401: Invalid credentials
- 500: Login failed

### Protected Endpoints

**Authorization Header**:
```
Authorization: Bearer {jwt_token}
```

#### GET `/api/portfolio`
Get user portfolio data.

**Response** (200):
```json
{
  "portfolioValue": 245890,
  "holdings": [
    {
      "name": "Reliance Industries",
      "quantity": 25,
      "currentPrice": 2456.80,
      "returns": 8.5
    }
  ]
}
```

#### GET `/api/insights`
Get market insights.

**Response** (200):
```json
[
  {
    "category": "Market News",
    "title": "NIFTY 50 hits new all-time high",
    "content": "The benchmark index...",
    "trend": "+2.1%",
    "time": "2 hours ago"
  }
]
```

#### GET `/api/learning`
Get learning modules.

**Response** (200):
```json
[
  {
    "id": 1,
    "title": "Trading Basics",
    "duration": "5 min",
    "videoId": "intro-to-trading",
    "url": "https://zerodha.com/varsity/..."
  }
]
```

---

## Database Schema

### Recommended Schema (Production)

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Portfolio Table
```sql
CREATE TABLE portfolios (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_value DECIMAL(12, 2),
  day_change DECIMAL(12, 2),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Holdings Table
```sql
CREATE TABLE holdings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stock_name VARCHAR(255),
  stock_symbol VARCHAR(20),
  quantity INTEGER,
  average_price DECIMAL(10, 2),
  current_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Learning Progress Table
```sql
CREATE TABLE learning_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  module_id INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP
);
```

---

## Deployment Guide

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Start server**:
```bash
npm start
```

3. **Access application**:
```
http://localhost:3000
```

### Production Deployment

#### Option 1: Traditional Server

1. **Environment Variables**:
```bash
PORT=3000
NODE_ENV=production
SECRET_KEY=your-secure-secret-key
DATABASE_URL=postgresql://...
```

2. **Build & Start**:
```bash
npm install --production
npm start
```

3. **Process Manager** (PM2):
```bash
npm install -g pm2
pm2 start server.js --name tradelearn
pm2 startup
pm2 save
```

#### Option 2: Cloud Platforms

**Heroku**:
```bash
heroku create tradelearn-app
git push heroku main
heroku open
```

**Vercel** (Frontend):
```bash
vercel --prod
```

**Railway** / **Render**:
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### Database Migration

**PostgreSQL Setup**:
```bash
# Install PostgreSQL
# Create database
createdb tradelearn_db

# Run migrations
psql tradelearn_db < schema.sql
```

**Environment Configuration**:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

### Security Checklist

- [ ] Change `SECRET_KEY` to secure random value
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set secure CORS policy
- [ ] Implement rate limiting
- [ ] Add helmet.js for security headers
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Enable CSRF protection
- [ ] Regular dependency updates
- [ ] Monitor for vulnerabilities

### Performance Optimization

**Frontend**:
- Minify CSS/JS
- Optimize images
- Enable gzip compression
- Implement caching headers
- Lazy load images/components

**Backend**:
- Database connection pooling
- Redis caching
- CDN for static assets
- Load balancing
- Horizontal scaling

---

## Maintenance

### Monitoring
- Error logging (Winston, Sentry)
- Performance metrics (New Relic)
- User analytics (Google Analytics)
- Server health checks

### Updates
- Regular security patches
- Dependency updates
- Feature enhancements
- Bug fixes

---

**Last Updated**: February 2026
**Version**: 1.0.0
