# Design to Code Workshop - Demo Setup Guide

## 🚀 Quick Setup for 4-Scenario Demo

This guide ensures a flawless demonstration of AI-powered design-to-code conversion for:
1. **E-commerce Product Page** - Modern shopping experience
2. **SaaS Landing Page** - CloudSync platform
3. **Agency Portfolio** - Nexus Creative
4. **Travel Platform** - TravelWise

---

## 📋 Pre-Demo Checklist

### Environment Setup (15 minutes)
```bash
# 1. Create demo workspace
mkdir design-to-code-demo && cd design-to-code-demo

# 2. Install global dependencies
npm install -g create-react-app @modelcontextprotocol/cli

# 3. Setup VS Code with extensions
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```

### Project Structure
```
design-to-code-demo/
├── scenario-1-ecommerce/
├── scenario-2-saas/
├── scenario-3-agency/
├── scenario-4-travel/
├── shared-resources/
│   ├── figma-exports/
│   ├── design-tokens/
│   └── component-library/
└── demo-scripts/
```

---

## 🎯 Scenario 1: E-commerce Product Page

### Setup (5 minutes)
```bash
# Create React app with TypeScript
npx create-react-app scenario-1-ecommerce --template typescript
cd scenario-1-ecommerce

# Install dependencies
npm install styled-components framer-motion axios react-query
npm install -D @types/styled-components

# Copy Figma export
cp ../shared-resources/figma-exports/ecommerce.json src/data/
```

### Key Features to Demo
- Product image gallery with zoom
- Size/color variant selection
- Add to cart with animation
- Real-time inventory check
- Customer reviews section
- Related products carousel

### Live Coding Script
```typescript
// 1. Show Figma design
// 2. Use Copilot prompt:
"@workspace Create a ProductGallery component from the Figma e-commerce export 
with image zoom, thumbnail navigation, and mobile swipe support"

// 3. Generate complete component in ~30 seconds
// 4. Show live preview with interactions
```

---

## 🎯 Scenario 2: SaaS Landing Page (CloudSync)

### Setup (5 minutes)
```bash
# Create Next.js app for better SEO
npx create-next-app@latest scenario-2-saas --typescript --tailwind --app
cd scenario-2-saas

# Install animation libraries
npm install framer-motion react-intersection-observer
npm install recharts react-countup
```

### Key Features to Demo
- Animated hero section
- Interactive pricing calculator
- Feature comparison table
- Customer testimonials slider
- Newsletter signup with validation
- Dark mode toggle

### MCP Figma Integration
```bash
# Start MCP server
mcp start figma

# Connect to Figma file
@figma connect https://figma.com/file/xxx/cloudsync-saas
@figma generate landing page with animations and interactions
```

---

## 🎯 Scenario 3: Agency Portfolio (Nexus Creative)

### Setup (5 minutes)
```bash
# Create Gatsby app for optimal performance
npx gatsby new scenario-3-agency
cd scenario-3-agency

# Install portfolio dependencies
npm install react-spring react-use-gesture
npm install gatsby-plugin-image gatsby-transformer-sharp
```

### Key Features to Demo
- Parallax scrolling effects
- Portfolio filtering with animations
- Team member cards with social links
- Contact form with email integration
- Smooth scroll navigation
- Loading animations

### Performance Optimization Demo
```javascript
// Show Lighthouse scores before/after
// Demonstrate lazy loading
// Show bundle size optimization
```

---

## 🎯 Scenario 4: Travel Platform (TravelWise)

### Setup (5 minutes)
```bash
# Create React app with Redux
npx create-react-app scenario-4-travel --template redux-typescript
cd scenario-4-travel

# Install travel-specific packages
npm install react-dates moment
npm install mapbox-gl react-map-gl
npm install react-slick slick-carousel
```

### Key Features to Demo
- Destination search with autocomplete
- Interactive map integration
- Date picker for travel dates
- Price filtering and sorting
- Booking flow simulation
- Multi-language support

---

## 🎬 Demo Flow Script

### Opening (2 minutes)
1. Show traditional development timeline (weeks)
2. Introduce AI-powered approach
3. Preview all 4 live demos

### Per Scenario (7-8 minutes each)
1. **Show Figma Design** (30 seconds)
   - Highlight complex interactions
   - Point out design system usage

2. **Generate Components** (2-3 minutes)
   - Use GitHub Copilot Agent
   - Show real-time code generation
   - Explain the prompts used

3. **Live Preview** (2-3 minutes)
   - Demonstrate all interactions
   - Show responsive behavior
   - Test accessibility features

4. **Code Quality** (1-2 minutes)
   - Show generated TypeScript types
   - Demonstrate component reusability
   - Quick performance metrics

### Closing (3 minutes)
1. Compare time saved (90%+ reduction)
2. Show code quality metrics
3. Q&A preparation

---

## 🛠️ Troubleshooting Guide

### Common Demo Issues & Solutions

#### Copilot Not Responding
```bash
# Restart VS Code
# Check status: https://githubstatus.com
# Use fallback: prepared code snippets
```

#### Build Errors
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Use pre-built version
cd demo-backups/scenario-x-complete
```

#### Performance Issues
```bash
# Disable dev tools
# Close unnecessary apps
# Use production builds for demo
npm run build && npm run preview
```

---

## 📊 Success Metrics Display

### Dashboard Component
```typescript
const DemoMetrics = () => {
  const metrics = {
    timeReduction: '94%',
    linesGenerated: '12,847',
    componentsCreated: '86',
    accuracyScore: '99.2%',
    performanceScore: '96/100'
  };
  
  return (
    <MetricsGrid>
      {Object.entries(metrics).map(([key, value]) => (
        <MetricCard key={key}>
          <CountUp end={parseFloat(value)} duration={2} />
          <MetricLabel>{formatLabel(key)}</MetricLabel>
        </MetricCard>
      ))}
    </MetricsGrid>
  );
};
```

---
