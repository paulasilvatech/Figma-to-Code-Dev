# 🤝 Contributing to Design-to-Code Workshop
## Help Us Build the Future of AI-Powered Development

> **Welcome! We're excited you want to contribute to making design-to-code conversion accessible to everyone.**

---

## 🎯 How You Can Contribute

### 🔥 High-Priority Contributions
- **New demo scenarios** (gaming, healthcare, fintech, etc.)
- **AI prompt improvements** for better code generation
- **Performance optimizations** for generated components
- **Accessibility enhancements** (WCAG 2.2 compliance)
- **Mobile-first responsive improvements**

### 💡 Other Valuable Contributions
- Bug fixes and error handling
- Documentation improvements
- Translation/internationalization
- Testing and quality assurance
- Developer experience improvements

---

## 🚀 Quick Start for Contributors

### 1. Fork & Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/your-username/design-to-code-workshop.git
cd design-to-code-workshop

# Add upstream remote
git remote add upstream https://github.com/design-to-code-workshop/design-to-code-workshop.git
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your API keys

# Verify setup
npm run setup:verify

# Start development
npm run dev:all
```

### 3. Create a Feature Branch
```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/amazing-new-feature

# Or for bug fixes
git checkout -b fix/important-bug-fix
```

---

## 📝 Contribution Guidelines

### Code Standards

#### TypeScript First
```typescript
// ✅ Always use TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children }) => {
  return (
    <StyledButton variant={variant} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

// ❌ Avoid JavaScript without types
const Button = ({ variant, size, onClick, children }) => {
  // No type safety
};
```

#### Component Structure
```
src/components/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.styles.ts    # Styled components
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Unit tests
├── index.ts                   # Export file
└── README.md                  # Component documentation
```

#### Styling Guidelines
```typescript
// ✅ Use styled-components with theme
const StyledButton = styled.button<{ variant: string }>`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme, variant }) => theme.colors[variant]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  // Responsive design
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

// ❌ Avoid inline styles
<button style={{ padding: '16px', background: 'blue' }}>
```

### Accessibility Requirements
```typescript
// ✅ Always include accessibility features
<button
  aria-label="Add item to cart"
  aria-describedby="cart-description"
  onClick={handleAddToCart}
>
  <span id="cart-description" className="sr-only">
    This will add the selected item to your shopping cart
  </span>
  Add to Cart
</button>

// ✅ Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
};

// ✅ Focus management
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);
```

### Performance Standards
```typescript
// ✅ Use React.memo for expensive components
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  return <ComplexVisualization data={data} />;
});

// ✅ Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));

// ✅ Optimize images
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

---

## 🎨 Adding New Scenarios

### Scenario Checklist
When adding a new demo scenario, ensure it includes:

#### 1. Design Assets
- [ ] Figma design file
- [ ] Exported JSON with design tokens
- [ ] High-quality mockup images
- [ ] Component specifications

#### 2. Implementation
- [ ] Complete React application
- [ ] TypeScript throughout
- [ ] Responsive design (mobile-first)
- [ ] Accessibility compliance
- [ ] Performance optimization

#### 3. Documentation
- [ ] Detailed README.md
- [ ] Step-by-step tutorial
- [ ] GitHub Copilot prompts
- [ ] Troubleshooting guide

#### 4. Quality Assurance
- [ ] Unit tests (>80% coverage)
- [ ] Integration tests
- [ ] Accessibility testing
- [ ] Performance audit (Lighthouse >90)

### New Scenario Template
```bash
# Create new scenario structure
mkdir scenario-5-your-scenario
cd scenario-5-your-scenario

# Copy template
cp -r ../scenario-template/* .

# Update package.json
npm init -y
npm install

# Create documentation
touch README.md
touch DEMO-GUIDE.md
```

---

## 🧪 Testing Requirements

### Unit Tests
```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Button from './Button';
import theme from '../../../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Button', () => {
  it('renders with correct text', () => {
    renderWithTheme(<Button variant="primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>
    );
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard navigation', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>
    );
    
    const button = screen.getByText('Click me');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific scenario tests  
npm run test:ecommerce

# Run accessibility tests
npm run test:a11y
```

---

## 📚 Documentation Standards

### Component Documentation
```markdown
# ComponentName

Brief description of what the component does.

## Usage

```tsx
import { Button } from '@/components/UI/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' | 'primary' | Button style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| onClick | () => void | - | Click handler |

## Examples

### Primary Button
[Interactive example with code]

### Secondary Button
[Interactive example with code]

## Accessibility

- Keyboard navigation with Enter and Space
- Screen reader support with aria-label
- Focus management
```

### Prompt Documentation
```markdown
## GitHub Copilot Prompt

Using the Figma export at [path], create a [ComponentName] component...

### Generated Code Quality
- ✅ TypeScript interfaces
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Performance optimized

### Customization Options
[How to modify the generated code]
```

---

## 🔄 Pull Request Process

### Before Submitting
1. **Test your changes thoroughly**
   ```bash
   npm run test:all
   npm run lint
   npm run build
   ```

2. **Update documentation**
   - README files
   - Code comments
   - CHANGELOG.md

3. **Check accessibility**
   ```bash
   npm run test:a11y
   npm run lighthouse
   ```

### PR Template
```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility tested

## Screenshots
[If applicable, add screenshots of UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No merge conflicts
```

### Review Process
1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** on multiple browsers/devices
4. **Documentation review**
5. **Approval** and merge

---

## 🏆 Recognition

### Contributor Levels
- 🌟 **Contributor**: First contribution
- ⭐ **Regular Contributor**: 5+ contributions
- 🚀 **Core Contributor**: 15+ contributions
- 💎 **Maintainer**: Ongoing project stewardship

### Recognition Program
- Contributors featured in README
- Swag for regular contributors
- Speaking opportunities at conferences
- Direct collaboration with GitHub Copilot team

---

## 🎯 Contribution Ideas

### For Beginners
- Fix typos in documentation
- Add examples to existing components
- Improve error messages
- Add loading states
- Write unit tests

### For Intermediate Developers
- Create new component variations
- Optimize performance bottlenecks
- Add animations and transitions
- Implement responsive designs
- Add accessibility features

### For Advanced Developers
- Build new demo scenarios
- Implement complex integrations (WebSocket, real-time)
- Create advanced AI prompts
- Optimize bundle sizes
- Add performance monitoring

### For Designers
- Create new Figma templates
- Improve visual design systems
- Add new color schemes/themes
- Create mobile-first designs
- Design accessibility-focused components

### For Technical Writers
- Improve documentation clarity
- Create video tutorials
- Write troubleshooting guides
- Translate content
- Create beginner-friendly guides

---

## 🤔 Questions & Support

### Before Asking Questions
1. Check existing [GitHub Issues](https://github.com/design-to-code-workshop/issues)
2. Read the [Documentation](https://docs.design-to-code.dev)
3. Try the [Troubleshooting Guide](TROUBLESHOOTING.md)

### Where to Get Help
- 💬 **Discord**: [Join our community](https://discord.gg/design-to-code)
- 📧 **Email**: contributors@design-to-code.dev
- 🐛 **GitHub Issues**: For bugs and feature requests
- 📖 **Discussions**: For general questions

### Response Times
- **Issues**: Within 48 hours
- **Pull Requests**: Within 1 week
- **Discord**: Usually within hours
- **Email**: Within 3 business days

---

## 📄 Code of Conduct

### Our Pledge
We are committed to making participation in our project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, nationality
- Personal appearance, race, religion
- Sexual identity and orientation

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what's best for the community
- Show empathy towards other members

### Unacceptable Behavior
- Harassment of any kind
- Discriminatory language or actions
- Personal attacks or trolling
- Public or private harassment
- Publishing others' private information

### Enforcement
Violations can be reported to conduct@design-to-code.dev. All reports will be reviewed and investigated promptly and fairly.

---

## 🎉 Thank You!

Every contribution, no matter how small, helps make AI-powered development more accessible to developers worldwide. Together, we're building the future of design-to-code conversion!

### Special Thanks
- GitHub Copilot team for AI partnership
- Figma community for design assets
- All our amazing contributors
- Open source maintainers who inspire us

---

**Ready to contribute? Pick an issue, fork the repo, and let's build something amazing together!**

[🏠 Main README](README.md) | [🛠️ Setup Guide](SETUP.md) | [💬 Join Discord](https://discord.gg/design-to-code)