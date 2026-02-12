# Portfolio of Er. Biswajit Deb Barman

> Civil Engineer & Structural Designer - Professional Portfolio Website

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Create React App](https://img.shields.io/badge/CRA-5.0-09D3AC?logo=create-react-app&logoColor=white)](https://create-react-app.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Component Architecture](#component-architecture)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Styling Architecture](#styling-architecture)
- [Build & Deployment](#build--deployment)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

A modern, responsive portfolio website showcasing the professional work, skills, and services of Er. Biswajit Deb Barman, a Civil Engineer specializing in structural design, cost estimation, and architectural planning. The website features an integrated construction cost calculator, project gallery, and comprehensive service information.

**Live Website:** `[Your deployed URL here]`

---

## ✨ Features

### Core Features
- 📱 **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Clean, professional interface with smooth animations
- 🚀 **Fast Performance** - Optimized bundle size and lazy loading
- ♿ **Accessible** - WCAG 2.1 compliant with keyboard navigation support
- 🌐 **SEO Optimized** - Semantic HTML and meta tags

### Page-Specific Features

#### Home Page
- Hero section with animated background
- Skills showcase grid
- Featured projects preview
- Service cards with pricing
- Professional summary section

#### Projects Page
- Interactive project gallery
- Category filtering (Residential/Commercial/All)
- Modal-based project details
- Lazy-loaded images
- Responsive grid layout

#### About Page
- Professional summary
- Skills grid with icons
- Education timeline
- Certifications showcase
- Contact information card

#### Calculators Page
- **Building Cost Estimator**
  - Material quantity calculation (cement, steel, sand, aggregate)
  - Labor cost estimation (auto % or manual input)
  - Finishing quality selection (Basic/Standard/Premium)
  - Contingency percentage
  - Real-time cost breakdown
  
- **RCC Slab Calculator**
  - Concrete volume calculation
  - Cement requirements (M20 grade)
  - Steel reinforcement estimation
  - Supports custom slab dimensions

---

## 📁 Project Structure

```
portfolio/
│
├── public/                          # Static assets
│   ├── assets/
│   │   ├── icons/
│   │   │   └── My__Logo.png        # Site logo
│   │   ├── images/
│   │   │   ├── hero/               # Hero section images
│   │   │   └── projects/           # Project screenshots
│   │   └── files/
│   │       └── Biswajit_Deb_Barman__CV.pdf
│   └── index.html                   # HTML template
│
├── src/
│   ├── components/                  # React components
│   │   ├── layout/                  # Layout components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # Site footer
│   │   │   └── index.js            # Barrel export
│   │   │
│   │   ├── modals/                  # Modal components
│   │   │   ├── ProjectModal.jsx    # Project details modal
│   │   │   └── index.js
│   │   │
│   │   └── ui/                      # Reusable UI components
│   │       ├── EducationItem.jsx   # Education timeline item
│   │       ├── ProjectCard.jsx     # Project gallery card
│   │       ├── ServiceCard.jsx     # Service pricing card
│   │       ├── SkillCard.jsx       # Skill showcase card
│   │       └── index.js
│   │
│   ├── config/                      # Configuration files
│   │   ├── constants.js            # App-wide constants
│   │   └── index.js
│   │
│   ├── data/                        # Static data
│   │   ├── education.js            # Education & certifications
│   │   ├── projects.js             # Project portfolio data
│   │   ├── services.js             # Service offerings
│   │   ├── skills.js               # Skills & expertise
│   │   └── index.js
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useCalculator.js        # Calculator state management
│   │   └── index.js
│   │
│   ├── pages/                       # Page components
│   │   ├── HomePage.jsx            # Landing page
│   │   ├── ProjectsPage.jsx        # Projects gallery
│   │   ├── AboutPage.jsx           # About/profile page
│   │   ├── CalculatorsPage.jsx     # Construction calculators
│   │   └── index.js
│   │
│   ├── styles/                      # CSS architecture
│   │   ├── base/                    # Foundation styles
│   │   │   ├── reset.css           # CSS reset
│   │   │   └── variables.css       # CSS custom properties
│   │   │
│   │   ├── components/              # Component styles
│   │   │   ├── buttons.css         # Button variants
│   │   │   ├── hero.css            # Hero section
│   │   │   ├── services.css        # Service cards
│   │   │   └── skills.css          # Skill cards
│   │   │
│   │   ├── layout/                  # Layout styles
│   │   │   ├── header.css          # Navbar styles
│   │   │   └── footer.css          # Footer styles
│   │   │
│   │   ├── pages/                   # Page-specific styles
│   │   │   ├── about.css           # About page
│   │   │   ├── projects.css        # Projects page
│   │   │   └── calculators.css     # Calculators page
│   │   │
│   │   ├── utilities/               # Utility classes
│   │   │   ├── animation.css       # Animation utilities
│   │   │   ├── helpers.css         # Helper classes
│   │   │   └── utilities.css       # Common utilities
│   │   │
│   │   └── main.css                 # Main stylesheet (imports all)
│   │
│   ├── utils/                       # Utility functions
│   │   ├── animations.js           # Animation helpers
│   │   ├── calculator/             # Calculator utilities
│   │   │   ├── core.js             # Calculation logic
│   │   │   ├── ui.js               # UI interactions
│   │   │   └── index.js
│   │   ├── dom.js                  # DOM manipulation helpers
│   │   ├── helpers.js              # General utilities
│   │   ├── validation.js           # Input validation
│   │   └── index.js
│   │
│   ├── App.jsx                      # Root component
│   ├── index.js                     # Entry point
│   └── setupTests.js                # Test configuration
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies & scripts
└── README.md                        # This file
```

---

## 🛠 Technology Stack

### Core Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | 18.3.x |
| **React Router DOM** | Client-side routing | 7.1.x |
| **JavaScript (ES6+)** | Programming language | ES2023 |
| **CSS3** | Styling | Modern CSS |
| **Create React App** | Build tooling | 5.0.x |

### Development Tools
- **npm/yarn** - Package management
- **Webpack** - Module bundling (via CRA)
- **Babel** - JavaScript transpilation (via CRA)
- **ESLint** - Code linting
- **Git** - Version control

### External Libraries
- **AOS (Animate On Scroll)** - Scroll animations (optional CDN)
- **Google Fonts** - Typography (Lexend, Poppins)

---

## 🧩 Component Architecture

### Component Hierarchy

```
App (BrowserRouter)
├── Navbar (Fixed header)
│   ├── Logo
│   ├── Navigation Links
│   ├── Download Resume Button
│   └── Hamburger Menu (mobile)
│
├── Routes
│   ├── HomePage
│   │   ├── Hero Section
│   │   ├── Skills Section (SkillCard × 5)
│   │   ├── Recent Projects (ProjectCard × 4)
│   │   ├── Services Section (ServiceCard × 3)
│   │   └── About Me Preview
│   │
│   ├── ProjectsPage
│   │   ├── Page Header
│   │   ├── Filter Buttons
│   │   ├── Projects Grid (ProjectCard × n)
│   │   └── ProjectModal (dynamic)
│   │
│   ├── AboutPage
│   │   ├── Page Header
│   │   ├── Skills Grid (SkillCard × 5)
│   │   ├── Education Timeline (EducationItem × 5)
│   │   ├── Professional Summary
│   │   └── Contact Card
│   │
│   └── CalculatorsPage
│       ├── Input Section
│       │   ├── Building Parameters
│       │   ├── Material Rates
│       │   └── RCC Slab Inputs
│       └── Results Section
│           ├── Building Estimate
│           ├── Cost Breakdown
│           ├── Material Quantities
│           └── RCC Slab Results
│
└── Footer
    ├── Brand Section
    ├── Navigation Links
    ├── Social Links
    └── Copyright
```

### Component Descriptions

#### Layout Components

**`Navbar.jsx`**
- **Purpose:** Fixed navigation header with scroll behavior
- **Features:**
  - Responsive hamburger menu for mobile
  - Active link highlighting
  - Download resume button
  - Scroll-triggered styling
  - ESC key to close menu
- **State:** `menuOpen`, `scrolled`

**`Footer.jsx`**
- **Purpose:** Site footer with navigation and social links
- **Contains:** Brand logo, quick links, social media icons, copyright
- **External Links:** LinkedIn, Facebook, Instagram

#### UI Components

**`ProjectCard.jsx`**
- **Purpose:** Gallery card for project showcase
- **Features:**
  - Hover overlay with project info
  - Click-to-open modal
  - Keyboard navigation (Enter key)
  - Category badge
  - Lazy-loaded images
- **Props:** `project`, `onClick`

**`SkillCard.jsx`**
- **Purpose:** Display individual skills with icons
- **Features:**
  - Hover animation
  - Icon + title + description layout
- **Props:** `icon`, `name`, `description`

**`ServiceCard.jsx`**
- **Purpose:** Service pricing and features display
- **Features:**
  - "Recommended" badge for popular services
  - Feature list with checkmarks
  - Hover effects
- **Props:** `icon`, `name`, `price`, `description`, `features`, `popular`

**`EducationItem.jsx`**
- **Purpose:** Timeline item for education/certifications
- **Features:**
  - Icon display
  - Year, degree, and institution
  - Hover slide effect
- **Props:** `year`, `degree`, `school`

#### Modal Components

**`ProjectModal.jsx`**
- **Purpose:** Full-screen project details overlay
- **Features:**
  - ESC key to close
  - Click outside to close
  - Body scroll lock
  - Large image display
  - Tags and description
- **Props:** `project`, `onClose`

#### Page Components

**`HomePage.jsx`**
- **Features:**
  - Hero section with animated background
  - Skills grid (5 skills)
  - Recent projects (4 projects)
  - Services showcase (3 services)
  - About me preview
  - Project modal integration

**`ProjectsPage.jsx`**
- **Features:**
  - Filter bar (All/Residential/Commercial)
  - Animated page header
  - Filtered projects grid
  - Project modal for details

**`AboutPage.jsx`**
- **Features:**
  - Animated page header
  - Skills grid
  - Education timeline
  - Professional summary
  - Contact information card
  - Download resume link

**`CalculatorsPage.jsx`**
- **Features:**
  - Two-column layout (inputs | results)
  - Building cost estimator
  - RCC slab calculator
  - Real-time calculations
  - Reset functionality
  - Responsive design

---

## 🎨 Styling Architecture

### CSS Custom Properties (Variables)

Located in `src/styles/base/variables.css`:

**Color Palette:**
```css
--color-primary: #003366        /* Navy blue */
--color-accent: #FF8C00         /* Orange */
--color-bg-dark: #F4F4F4        /* Light gray */
--color-text: #1E293B           /* Dark slate */
```

**Typography:**
```css
--font-display: "lexend"        /* Headings */
--font-body: "popping"          /* Body text */
```

**Spacing Scale:**
```css
--spacing-xs: 0.5rem (8px)
--spacing-sm: 1rem (16px)
--spacing-md: 2rem (32px)
--spacing-lg: 4rem (64px)
--spacing-xl: 5rem (80px)
```

### Visual Effects

**Mirror/Shimmer Effect:**
All interactive cards (projects, skills, services, education) feature a shimmer/mirror effect on hover created with CSS pseudo-elements:

```css
element::before {
  content: '';
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  /* Animates left: -100% → 100% on hover */
}
```

**Button Animations:**
- Shine effect on hover
- translateY(-2px) lift
- Box shadow transition
- Ripple effect on click

**Scroll Animations:**
- AOS (Animate On Scroll) library integration
- Fade-up, fade-in, slide-in effects
- Stagger delays for card grids
- Parallax scrolling on hero section

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** >= 14.0.0
- **npm** >= 6.0.0 or **yarn** >= 1.22.0

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm start
# or
yarn start
```

4. **Open in browser**
```
http://localhost:3000
```

The page will automatically reload when you make changes.

---

## 📜 Available Scripts

### Development

#### `npm start`
Runs the app in development mode.
- Opens: http://localhost:3000
- Hot reload enabled
- Lint errors displayed in console

### Testing

#### `npm test`
Launches the test runner in interactive watch mode.
- Uses Jest testing framework
- Supports React Testing Library

### Production

#### `npm run build`
Builds the app for production to the `build` folder.
- Bundles React in production mode
- Optimizes for best performance
- Minifies code
- Includes content hashes in filenames
- Ready for deployment

**Build Output:**
```
build/
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── index.html
└── asset-manifest.json
```

### Advanced

#### `npm run eject`
**⚠️ One-way operation - cannot be undone!**

Ejects from Create React App, giving full control over:
- Webpack configuration
- Babel configuration
- ESLint configuration
- Build scripts

---

## ⚙️ Configuration

### Site Metadata (`src/config/constants.js`)

```javascript
export const SITE = {
  name: 'Er. Biswajit Deb Barman',
  title: 'Civil Engineer & Structural Designer',
  email: 'biswajitdebbarman.civil@gmail.com',
  phone: '+91-7602120054',
  location: 'Chanditala, Raiganj, Uttar Dinajpur',
  linkedin: 'https://www.linkedin.com/in/biswajit-deb-barman/',
  facebook: 'https://www.facebook.com/profile.php?id=61585030424249',
  instagram: 'https://www.instagram.com/biswajit.deb.barman/',
};
```

### Calculator Constants

**Material Constants** (per sq.ft for RCC framed structures):
```javascript
export const MATERIAL_CONSTANTS = {
  cement: 0.4,      // bags per sq.ft
  steel: 4.0,       // kg per sq.ft
  sand: 0.044,      // m³ per sq.ft
  aggregate: 0.088, // m³ per sq.ft
};
```

**Default Material Rates** (₹):
```javascript
export const DEFAULT_MATERIAL_RATES = {
  cement: 420,      // per bag
  steel: 65,        // per kg
  sand: 1500,       // per m³
  aggregate: 1400,  // per m³
};
```

**Finishing Rates** (₹ per sq.ft):
```javascript
export const FINISHING_RATES = {
  basic: 450,
  standard: 750,
  premium: 1200,
};
```

### AOS Animation Configuration

```javascript
export const AOS_CONFIG = {
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100,
  delay: 50,
};
```

---

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build with:
- Minified code
- Tree-shaking for smaller bundle size
- Asset optimization
- Service worker for offline capability (optional)

### Deployment Options

#### 1. **Netlify** (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### 2. **Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### 3. **GitHub Pages**
```bash
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

#### 4. **Traditional Hosting**
Upload the contents of the `build` folder to your web server.

---

## 🌐 Browser Support

The production build supports all modern browsers:

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Opera** (latest)

**Mobile Browsers:**
- iOS Safari 12+
- Chrome for Android

**Legacy Support:**
- IE11 requires polyfills (not included by default)

---

## 🔧 Troubleshooting

### Common Issues

**1. Build fails with memory error**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

**2. Port 3000 already in use**
```bash
# Use different port
PORT=3001 npm start
```

**3. Missing dependencies**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Data Management

### Adding Projects

Edit `src/data/projects.js`:

```javascript
{
  id: 5,
  category: "RESIDENTIAL", // or "COMMERCIAL"
  title: "Project Title",
  description: "Detailed project description...",
  tags: ["Tag1", "Tag2", "Tag3"],
  image: "/assets/images/projects/filename.png"
}
```

### Adding Skills

Edit `src/data/skills.js`:

```javascript
{
  icon: "🎯",
  name: "Skill Name",
  description: "Skill description..."
}
```

### Adding Services

Edit `src/data/services.js`:

```javascript
{
  name: "Service Name",
  price: "Custom Quote",
  description: "Service description",
  features: ["Feature 1", "Feature 2"],
  icon: "🔧",
  popular: false
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Use functional components with hooks
- Follow existing naming conventions
- Add comments for complex logic
- Update documentation for new features
- Test across multiple browsers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Er. Biswajit Deb Barman**
- Civil Engineer & Structural Designer
- Email: biswajitdebbarman.civil@gmail.com
- Phone: +91-7602120054
- LinkedIn: [biswajit-deb-barman](https://www.linkedin.com/in/biswajit-deb-barman/)
- Location: Chanditala, Raiganj, Uttar Dinajpur, West Bengal, India

---

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) - Build tooling
- [React Router](https://reactrouter.com/) - Routing solution
- [AOS](https://michalsnik.github.io/aos/) - Scroll animations
- [Google Fonts](https://fonts.google.com/) - Typography
- Icons: Emoji-based (no external dependencies)

---

## 📊 Project Stats

- **React Components:** 15+
- **Pages:** 4 (Home, Projects, About, Calculators)
- **Data Models:** 4 (Projects, Skills, Services, Education)
- **CSS Files:** 15+ (modular architecture)
- **Utility Functions:** 40+
- **Custom Hooks:** 1 (useCalculator)

---

## 🔮 Future Enhancements

- [ ] Blog section for civil engineering articles
- [ ] Multi-language support (Bengali/Hindi)
- [ ] Dark mode toggle
- [ ] Client testimonials section
- [ ] Contact form with email integration
- [ ] More calculators (beam design, column design)
- [ ] Project filtering by year
- [ ] Progressive Web App (PWA) features
- [ ] Performance monitoring (Google Analytics)

---

**Built with ❤️ by Er. Biswajit Deb Barman**

Last Updated: February 2026