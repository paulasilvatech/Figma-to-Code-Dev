# 🧪 Testing Guide

## Overview

This guide covers comprehensive testing strategies for all workshop scenarios, ensuring code quality, performance, and reliability across the entire Design-to-Code ecosystem.

---

## 🗂️ Testing Structure

```
tests/
├── unit/                    # Unit tests for components
├── integration/             # Integration tests
├── e2e/                    # End-to-end tests
├── performance/            # Performance benchmarks
├── accessibility/          # A11y compliance tests
├── visual/                 # Visual regression tests
└── fixtures/               # Test data and mocks
```

---

## 🚀 Quick Start

### Install Testing Dependencies

```bash
# Root level dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D cypress playwright @axe-core/playwright
npm install -D lighthouse puppeteer

# Scenario-specific
npm run test:install:all
```

### Run All Tests

```bash
# Run all test suites
npm run test

# Run specific scenario tests
npm run test:ecommerce
npm run test:saas
npm run test:agency
npm run test:travel

# Run with coverage
npm run test:coverage
```

---

## 📋 Testing Checklist

### ✅ Pre-Development Testing
- [ ] Setup testing environment
- [ ] Configure test runners
- [ ] Create test data fixtures
- [ ] Set up CI/CD pipelines

### ✅ Component Testing
- [ ] Unit tests for all components
- [ ] Props validation
- [ ] Event handling
- [ ] State management
- [ ] Error boundaries

### ✅ Integration Testing
- [ ] API integration
- [ ] Component interactions
- [ ] Data flow validation
- [ ] Third-party services

### ✅ End-to-End Testing
- [ ] User workflows
- [ ] Critical paths
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness

### ✅ Performance Testing
- [ ] Bundle size analysis
- [ ] Load time optimization
- [ ] Memory usage
- [ ] Runtime performance

### ✅ Accessibility Testing
- [ ] WCAG 2.1 AA compliance
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast ratios

---

## 🎯 Scenario-Specific Testing

### Scenario 1: E-commerce Product Page

#### Critical Test Cases
```javascript
// Product gallery tests
describe('ProductGallery', () => {
  test('displays main product image', async () => {
    render(<ProductGallery images={mockImages} />);
    expect(screen.getByRole('img', { name: /nike air max/i })).toBeInTheDocument();
  });

  test('changes image on thumbnail click', async () => {
    render(<ProductGallery images={mockImages} />);
    const thumbnail = screen.getAllByRole('button')[1];
    await userEvent.click(thumbnail);
    expect(screen.getByRole('img')).toHaveAttribute('src', mockImages[1].url);
  });
});

// Add to cart functionality
describe('AddToCart', () => {
  test('adds product to cart with correct details', async () => {
    const mockAddToCart = jest.fn();
    render(<AddToCart onAddToCart={mockAddToCart} product={mockProduct} />);
    
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: mockProduct.id,
      quantity: 1,
      size: 'M',
      color: 'black'
    });
  });
});
```

#### E2E Test Flow
```javascript
// cypress/integration/ecommerce.spec.js
describe('E-commerce User Journey', () => {
  it('completes full purchase flow', () => {
    cy.visit('/product/nike-air-max-270');
    
    // Select product options
    cy.get('[data-testid="color-selector"] button').first().click();
    cy.get('[data-testid="size-selector"] button').contains('9').click();
    
    // Add to cart
    cy.get('[data-testid="add-to-cart"]').click();
    cy.get('[data-testid="cart-notification"]').should('be.visible');
    
    // View cart
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid="cart-item"]').should('exist');
    
    // Proceed to checkout
    cy.get('[data-testid="checkout-button"]').click();
    cy.url().should('include', '/checkout');
  });
});
```

### Scenario 2: SaaS Dashboard

#### Real-time Data Testing
```javascript
// WebSocket connection tests
describe('Dashboard Real-time Updates', () => {
  let mockWebSocket;
  
  beforeEach(() => {
    mockWebSocket = new WS('ws://localhost:8080');
  });

  test('updates KPI cards on WebSocket message', async () => {
    render(<Dashboard />);
    
    // Send mock WebSocket message
    await act(async () => {
      mockWebSocket.send(JSON.stringify({
        type: 'kpi_update',
        data: { id: 'active-users', value: 45500 }
      }));
    });
    
    expect(screen.getByText('45,500')).toBeInTheDocument();
  });
});

// Chart rendering tests
describe('Charts', () => {
  test('renders revenue chart with correct data', () => {
    render(<RevenueChart data={mockChartData} />);
    
    expect(screen.getByRole('img', { name: /revenue chart/i })).toBeInTheDocument();
    expect(screen.getByText('$127.5K')).toBeInTheDocument();
  });
});
```

### Scenario 3: Agency Portfolio

#### Animation Testing
```javascript
// Framer Motion animation tests
describe('Portfolio Animations', () => {
  test('portfolio items animate on scroll', async () => {
    const { container } = render(<PortfolioGrid />);
    
    // Mock intersection observer
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    
    window.IntersectionObserver = mockIntersectionObserver;
    
    // Trigger intersection
    act(() => {
      const callback = mockIntersectionObserver.mock.calls[0][0];
      callback([{ isIntersecting: true }]);
    });
    
    expect(container.querySelector('.portfolio-item')).toHaveClass('animate-in');
  });
});

// 3D effects testing
describe('3D Card Effects', () => {
  test('applies 3D transform on mouse move', async () => {
    render(<ServiceCard />);
    const card = screen.getByRole('article');
    
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    
    expect(card).toHaveStyle('transform: rotateX(-5deg) rotateY(5deg)');
  });
});
```

### Scenario 4: Travel Platform

#### Search and Booking Tests
```javascript
// Search functionality
describe('Travel Search', () => {
  test('filters destinations by criteria', async () => {
    render(<DestinationSearch />);
    
    // Select filters
    await userEvent.selectOptions(screen.getByLabelText(/budget/i), '$1000-$2000');
    await userEvent.selectOptions(screen.getByLabelText(/duration/i), '4-7 days');
    
    // Apply filters
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    
    // Verify filtered results
    const results = screen.getAllByTestId('destination-card');
    results.forEach(result => {
      expect(result).toHaveAttribute('data-price-range', '$1000-$2000');
    });
  });
});

// Booking flow
describe('Booking Process', () => {
  test('completes booking with valid data', async () => {
    render(<BookingForm destination={mockDestination} />);
    
    // Fill form
    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.selectOptions(screen.getByLabelText(/travelers/i), '2');
    
    // Submit booking
    await userEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Verify confirmation
    expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
  });
});
```

---

## ⚡ Performance Testing

### Bundle Size Analysis

```bash
# Analyze bundle sizes
npm run analyze

# Check bundle size limits
npm run size-limit

# Generate size report
npm run build:analyze
```

### Lighthouse Performance

```javascript
// Performance testing with Lighthouse
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

describe('Performance Tests', () => {
  test('meets Lighthouse performance benchmarks', async () => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {logLevel: 'info', output: 'json', port: chrome.port};
    const runnerResult = await lighthouse('http://localhost:3000', options);
    
    const scores = runnerResult.lhr.categories;
    
    expect(scores.performance.score).toBeGreaterThan(0.9);
    expect(scores.accessibility.score).toBeGreaterThan(0.95);
    expect(scores['best-practices'].score).toBeGreaterThan(0.9);
    expect(scores.seo.score).toBeGreaterThan(0.9);
    
    await chrome.kill();
  });
});
```

### Load Testing

```javascript
// Load testing with Artillery.io
// artillery.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10
    - duration: 120
      arrivalRate: 50
scenarios:
  - name: "Browse products"
    flow:
      - get:
          url: "/"
      - get:
          url: "/products"
      - get:
          url: "/product/nike-air-max-270"
```

---

## ♿ Accessibility Testing

### Automated A11y Testing

```javascript
// @axe-core/react integration
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual A11y Checklist

- [ ] **Keyboard Navigation**
  - All interactive elements focusable
  - Logical tab order
  - Visible focus indicators
  - Skip links available

- [ ] **Screen Reader Compatibility**
  - Semantic HTML structure
  - ARIA labels and descriptions
  - Alt text for images
  - Form labels properly associated

- [ ] **Color and Contrast**
  - 4.5:1 contrast ratio for normal text
  - 3:1 contrast ratio for large text
  - Information not conveyed by color alone

- [ ] **Motion and Animation**
  - Respects `prefers-reduced-motion`
  - No auto-playing videos with sound
  - Pause/stop controls available

---

## 👁️ Visual Regression Testing

### Chromatic Integration

```javascript
// .storybook/main.js
module.exports = {
  addons: ['@storybook/addon-essentials'],
  features: {
    buildStoriesJson: true
  }
};

// chromatic.yml (GitHub Actions)
- name: Publish to Chromatic
  uses: chromaui/action@v1
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

### Percy Integration

```javascript
// Percy visual testing
const percySnapshot = require('@percy/playwright');

test('visual regression test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await percySnapshot(page, 'Homepage');
  
  await page.click('[data-testid="product-card"]');
  await percySnapshot(page, 'Product Page');
});
```

---

## 🔧 Test Configuration

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.js',
    '!src/serviceWorker.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Cypress Configuration

```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    }
  }
});
```

---

## 📊 Coverage Reports

### Generate Coverage

```bash
# Generate HTML coverage report
npm run test:coverage

# Upload to Codecov
npm run coverage:upload

# View coverage summary
npm run coverage:summary
```

### Coverage Goals

| Metric | Target | Current |
|--------|--------|---------|
| Lines | 85% | 87% |
| Functions | 85% | 89% |
| Branches | 80% | 82% |
| Statements | 85% | 88% |

---

## 🚨 Debugging Tests

### Common Issues

1. **Async Operations**
```javascript
// ❌ Wrong
test('loads data', () => {
  render(<Component />);
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});

// ✅ Correct
test('loads data', async () => {
  render(<Component />);
  expect(await screen.findByText('Data loaded')).toBeInTheDocument();
});
```

2. **Component State**
```javascript
// ❌ Wrong
test('updates state', () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('1')).toBeInTheDocument();
});

// ✅ Correct
test('updates state', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

3. **Network Requests**
```javascript
// Mock API calls
beforeEach(() => {
  fetchMock.resetMocks();
});

test('fetches user data', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ name: 'John' }));
  
  render(<UserProfile />);
  
  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(fetchMock).toHaveBeenCalledWith('/api/user');
});
```

---

## 📈 Test Metrics Dashboard

### Key Performance Indicators

- **Test Coverage**: 87%
- **Test Success Rate**: 98.5%
- **Average Test Duration**: 2.3s
- **Flaky Test Rate**: 0.5%

### Quality Gates

- All tests must pass before merge
- Coverage must not decrease
- Performance benchmarks must be met
- No accessibility violations

---

## 🔄 Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18, 20]
        scenario: [ecommerce, saas, agency, travel]
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm ci
        cd scenario-${{ matrix.scenario }} && npm ci
    
    - name: Run tests
      run: npm run test:${{ matrix.scenario }}
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

---

## 📚 Testing Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

### Tools
- **Unit Testing**: Jest, React Testing Library
- **E2E Testing**: Cypress, Playwright
- **Visual Testing**: Chromatic, Percy
- **Performance**: Lighthouse, WebPageTest
- **Accessibility**: axe-core, WAVE

### Community
- [Testing JavaScript Course](https://testingjavascript.com/)
- [React Testing Patterns](https://react-testing-examples.com/)
- [A11y Testing Guide](https://accessibility.digital.gov/guide/)

---

## 🎯 Next Steps

1. **Enhance Test Coverage**
   - Add more edge case tests
   - Increase integration test coverage
   - Implement visual regression testing

2. **Improve Test Performance**
   - Optimize test execution time
   - Implement parallel test running
   - Reduce test flakiness

3. **Advanced Testing**
   - Contract testing with Pact
   - Chaos engineering tests
   - Security testing integration

---

*Last Updated: January 2025*  
*Testing Guide Version: 2.0*