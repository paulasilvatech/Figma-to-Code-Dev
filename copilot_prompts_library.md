# 🤖 GitHub Copilot Prompts Library
## Master Collection of AI Prompts for Design-to-Code Conversion

> **Proven prompts that generate production-ready code from Figma designs**

---

## 📋 Table of Contents

- [🎯 Prompt Structure & Best Practices](#-prompt-structure--best-practices)
- [🛍️ E-commerce Prompts](#️-e-commerce-prompts)
- [📊 SaaS Dashboard Prompts](#-saas-dashboard-prompts)
- [🎨 Agency Portfolio Prompts](#-agency-portfolio-prompts)
- [✈️ Travel Platform Prompts](#️-travel-platform-prompts)
- [🔧 General Component Prompts](#-general-component-prompts)
- [⚡ Performance & Optimization Prompts](#-performance--optimization-prompts)
- [🧪 Testing Prompts](#-testing-prompts)

---

## 🎯 Prompt Structure & Best Practices

### Effective Prompt Template
```
Using the Figma export at [FILE_PATH], create a [COMPONENT_NAME] component 
at [OUTPUT_PATH]

Requirements:
- [SPECIFIC_FUNCTIONALITY]
- [STYLING_REQUIREMENTS]  
- [INTERACTIVE_FEATURES]
- TypeScript interfaces
- [RESPONSIVE_BEHAVIOR]
- [ACCESSIBILITY_FEATURES]

Extract exact measurements and colors from the Figma export.
```

### Key Prompt Elements
1. **Context**: Reference to Figma export file
2. **Output**: Specific file path and component name
3. **Functionality**: Clear feature requirements
4. **Styling**: Visual specifications
5. **TypeScript**: Always request proper typing
6. **Responsiveness**: Mobile/desktop considerations
7. **Accessibility**: WCAG compliance

---

## 🛍️ E-commerce Prompts

### Product Gallery with Image Zoom
```typescript
Using the Figma export at src/data/ecommerceFigmaExport.json, create a ProductGallery 
component at src/components/ProductGallery/ProductGallery.tsx

Requirements:
- Main image display with zoom on hover using react-image-magnify
- Thumbnail carousel below using react-slick (4 visible, arrows on sides)
- Smooth fade transitions between images
- Loading skeleton states for images
- Mobile: full width with swipe gestures
- Desktop: 600x600px main image, 100px thumbnails
- Image lazy loading with Intersection Observer
- Fullscreen lightbox on click

The component should accept array of product images and handle all interactions.
Include TypeScript interfaces for image data structure.
```

### Dynamic Size Selector
```typescript
Create a SizeSelector component at src/components/ProductInfo/SizeSelector.tsx 
from the e-commerce Figma export

Features:
- Grid layout of size buttons (8 columns on desktop, 4 on mobile)
- Each button shows size value and stock availability
- Disabled state for out-of-stock sizes with crossed-out styling
- Selected state with primary color background
- Hover animations with scale effect
- "Only X left" indicator for low stock (<=5 items)
- Size guide modal trigger
- Keyboard navigation support
- Screen reader announcements for stock status

Use Framer Motion for animations and match exact styling from Figma.
```

### Shopping Cart with Animations
```typescript
Generate a ShoppingCart component at src/components/Cart/ShoppingCart.tsx

Requirements:
- Slide-in drawer from right side (400px width on desktop)
- Dark overlay backdrop with blur effect
- Cart items list with:
  - Product thumbnail (80x80px)
  - Name, color, size, and price
  - Quantity selector with +/- buttons
  - Remove item button with confirmation
  - Item subtotal calculation
- Promo code input with validation
- Order summary:
  - Subtotal calculation
  - Shipping (free over $75, otherwise $9.99)
  - Tax calculation (8.5%)
  - Total with large emphasis
- Empty cart state with illustration and CTA
- Checkout and continue shopping buttons
- Mobile responsive (full width on mobile)

Include cart state management with React Context and smooth animations.
```

### Product Reviews System
```typescript
Create a comprehensive ReviewsSection component at src/components/Reviews/ReviewsSection.tsx

Features:
1. Overall rating summary:
   - Large average rating (4.5/5) with animated counting
   - Star display using dynamic SVG
   - Total review count with formatting (234 → "234 reviews")
   - Rating distribution bars (5★: 156, 4★: 45, etc.)

2. Review filtering:
   - Filter buttons: Most Recent, Most Helpful, Highest Rating, Lowest Rating
   - Active filter state with primary color background
   - Smooth transitions between filtered views

3. Individual review cards:
   - Reviewer name with avatar (generated from initials)
   - Verified purchase badge
   - Rating stars and review date (formatted)
   - Review title and expandable text content
   - Helpful/Not helpful voting with counts
   - Photo attachments (if present)
   - Report review option

4. Pagination:
   - Load 10 reviews initially
   - "Load More" button with loading state
   - Infinite scroll option

5. Write review modal:
   - Star rating input
   - Title and text fields
   - Photo upload capability
   - Form validation and submission

Include proper TypeScript interfaces and accessibility features.
```

---

## 📊 SaaS Dashboard Prompts

### Real-time Data Dashboard
```typescript
Using src/data/cloudSyncFigmaExport.json, create a DashboardGrid component 
at src/components/Dashboard/DashboardGrid.tsx

Requirements:
- Responsive grid layout using react-grid-layout
- Drag and drop widget rearrangement
- Layout persistence in localStorage
- Breakpoint configurations:
  - lg: 12 columns (1200px+)
  - md: 10 columns (996px+) 
  - sm: 6 columns (768px+)
  - xs: 4 columns (480px+)

Widget types to support:
- MetricCard: Single KPI with trend indicator
- ChartWidget: Various chart types (line, bar, pie, area)
- TableWidget: Data tables with sorting/filtering
- NotificationWidget: Alert and message center

Features:
- Real-time data updates via WebSocket
- Loading skeletons for all widgets
- Error boundaries for individual widgets
- Export functionality (PDF/PNG)
- Theme support (light/dark)
- Custom widget configuration panels

Generate with TypeScript interfaces for all data structures and responsive design.
```

### Interactive Charts Suite
```typescript
Create a comprehensive ChartLibrary at src/components/Charts/ using Recharts

Generate these chart components:
1. LineChart.tsx - Multi-line with gradient fills
2. AreaChart.tsx - Stacked areas with animations  
3. BarChart.tsx - Grouped and stacked bars
4. PieChart.tsx - With custom labels and legend
5. RadialChart.tsx - Progress circles and gauges

Each component should include:
- ResponsiveContainer for auto-sizing
- Custom tooltips with formatted data
- Legend with toggle functionality
- Zoom and pan capabilities
- Data point animations on load
- Export to PNG/SVG functionality
- Loading states and error handling
- Theme color support from figmaExport
- Accessibility features (ARIA labels, keyboard nav)

Include a ChartContainer wrapper with:
- Title and description
- Time range selector
- Data refresh button
- Export menu
- Fullscreen modal option

TypeScript interfaces for all chart data and configuration props.
```

### WebSocket Real-time Integration
```typescript
Create a real-time data service at src/services/realtime.ts with React hooks

Requirements:
1. WebSocket service class:
   - Connection management with Socket.io
   - Automatic reconnection logic (max 5 attempts)
   - Connection status tracking
   - Event subscription/unsubscription
   - Error handling and logging

2. React hooks:
   - useRealtimeData(channel) - Subscribe to data streams
   - useConnectionStatus() - Monitor connection state  
   - useRealtimeMetrics() - Live KPI updates
   - useRealtimeNotifications() - Alert system

3. Data management:
   - React Query integration for caching
   - Optimistic updates
   - Data normalization
   - Conflict resolution

4. Features:
   - Typing indicators for collaborative features
   - Presence awareness (who's online)
   - Rate limiting and throttling
   - Message queuing for offline periods

Include comprehensive TypeScript types and error boundaries.
```

---

## 🎨 Agency Portfolio Prompts

### Custom Cursor with Effects
```typescript
Create a CustomCursor component at src/components/Cursor/CustomCursor.tsx

Features:
- Main cursor dot (20px) follows mouse precisely
- Follower circle (40px) with smooth lag animation
- Interactive states:
  - Hover on links: scale to 1.5x and change to pointer style
  - Hover on buttons: blend mode difference effect
  - Hover on images: expand to 60px with "view" icon
  - Hover on text: shrink to 8px
- Hide on touch devices (mobile/tablet)
- Smooth transitions using Framer Motion
- Color changes based on background (light/dark detection)
- Text cursor mode for input fields
- Custom shapes for specific elements (arrow for links, plus for interactive)

Performance optimizations:
- RequestAnimationFrame for smooth movement
- Throttled mouse events
- GPU acceleration (transform3d)
- Reduced motion support for accessibility

Include TypeScript interfaces and proper cleanup on unmount.
```

### Parallax Hero with Animations  
```typescript
Generate a HeroSection component at src/components/Hero/ParallaxHero.tsx

Requirements:
1. Parallax scrolling effects:
   - Background elements move at different speeds
   - Text layers with varying scroll rates
   - Floating geometric shapes with rotation
   - Particle system or mesh gradient background

2. Text animations:
   - Title appears with stagger effect (word by word)
   - Subtitle fades in with delay
   - Buttons animate from bottom with bounce
   - Stats counter animation on scroll into view

3. Interactive elements:
   - Mouse parallax on hero image
   - Floating cards with hover tilt effects
   - Gradient background that follows cursor
   - Scroll indicator with smooth animation

4. Performance optimizations:
   - Intersection Observer for scroll triggers
   - Transform3d for GPU acceleration
   - Debounced scroll events
   - Lazy loading for heavy animations

Use Framer Motion and React Spring for animations. Include responsive behavior 
and reduced motion preferences support.
```

### Portfolio Filter with FLIP Animation
```typescript
Create a PortfolioGrid component at src/components/Portfolio/PortfolioGrid.tsx

Features:
1. Filter system:
   - Filter buttons: All, Web Design, Mobile Apps, Branding, Motion
   - Active state with gradient background and smooth indicator
   - Filter count display (e.g., "Web Design (12)")

2. Grid layout:
   - Masonry layout using CSS Grid or react-masonry-css
   - Responsive columns (4 on desktop, 2 on tablet, 1 on mobile)
   - Equal aspect ratios with CSS aspect-ratio

3. FLIP animations:
   - Smooth transitions when filtering (First, Last, Invert, Play)
   - Items fade out/in with scale effect
   - Layout shift animations using LayoutGroup
   - Stagger effect for multiple items

4. Portfolio items:
   - Image with overlay on hover
   - Project title and category
   - Technology tags
   - View project button
   - Lightbox modal for full view

5. Advanced features:
   - Search functionality
   - Sort options (date, name, category)
   - Load more pagination
   - Deep linking for filtered views

Use Framer Motion with LayoutGroup and AnimatePresence for smooth transitions.
```

---

## ✈️ Travel Platform Prompts

### Destination Search with Autocomplete
```typescript
Create a DestinationSearch component at src/components/Search/DestinationSearch.tsx

Requirements:
1. Search input with features:
   - Autocomplete using react-select/async
   - Recent searches persistence
   - Popular destinations suggestions
   - Search history with clear option
   - Voice search integration (Web Speech API)

2. Search results:
   - Destination name with country
   - Thumbnail image
   - Price range indicator
   - Rating and review count
   - Distance from user location
   - Popular season indicator

3. Advanced features:
   - Fuzzy search matching
   - Search filters (price, rating, activities)
   - Map integration showing results
   - Saved destinations/wishlist
   - Share search results

4. Performance:
   - Debounced API calls (300ms)
   - Results caching with React Query
   - Loading states and skeleton UI
   - Error handling with retry mechanism
   - Infinite scroll for large result sets

5. Accessibility:
   - Keyboard navigation (arrow keys, enter, escape)
   - Screen reader announcements
   - ARIA labels and roles
   - Focus management

Include TypeScript interfaces for search data and comprehensive error handling.
```

### Interactive Map with Clustering
```typescript
Generate an InteractiveMap component at src/components/Map/InteractiveMap.tsx using Mapbox GL

Features:
1. Map setup:
   - Mapbox GL integration with custom styling
   - Responsive container (full width, 500px height)
   - Custom map controls (zoom, fullscreen, style switcher)
   - Geolocation button to find user position

2. Destination markers:
   - Custom markers for each destination
   - Clustering for zoom levels (using supercluster)
   - Marker colors based on price range
   - Hover effects with elevation
   - Click to show destination popup

3. Popups and interactions:
   - Rich popup cards with:
     - Destination image
     - Name and brief description  
     - Price and rating
     - Quick view and book buttons
   - Smooth fly-to animations between destinations
   - Popup positioning to avoid edges

4. Advanced features:
   - Draw custom regions/areas of interest
   - Heatmap overlay for popularity
   - Route planning between destinations
   - Weather layer integration
   - Street view integration

5. Performance optimizations:
   - Marker virtualization for large datasets
   - Image lazy loading in popups
   - Debounced map events
   - Memory cleanup on unmount

Include TypeScript types for all map data and proper error boundaries.
```

### Multi-language Support (i18n)
```typescript
Implement comprehensive internationalization at src/i18n/

Requirements:
1. i18next configuration:
   - Language detection (browser, localStorage)
   - Fallback language (English)
   - Namespace organization by features
   - Pluralization rules for different languages
   - Number and date formatting

2. Language files structure:
   ```
   locales/
   ├── en/
   │   ├── common.json (navigation, buttons, etc.)
   │   ├── search.json (search interface)
   │   ├── booking.json (booking flow)
   │   └── destinations.json (destination info)
   ├── es/
   ├── fr/
   ├── de/
   └── ja/
   ```

3. React integration:
   - useTranslation hook usage examples
   - Trans component for complex translations
   - Language switcher component
   - RTL language support (Arabic, Hebrew)
   - Dynamic locale loading

4. Advanced features:
   - Context-aware translations
   - Gender-specific translations
   - Currency localization
   - Date/time formatting per locale
   - Image localization (country-specific images)

5. Developer experience:
   - Translation key validation
   - Missing translation warnings
   - Automated translation extraction
   - CI/CD integration for translation updates

Include TypeScript interfaces for translation keys and comprehensive examples.
```

---

## 🔧 General Component Prompts

### Reusable Button System
```typescript
Create a comprehensive Button system at src/components/UI/Button/

Generate:
1. Button.tsx - Main button component with variants:
   - primary, secondary, outline, ghost, danger
   - sizes: sm, md, lg, xl
   - states: default, hover, active, disabled, loading

2. IconButton.tsx - Button with icon support:
   - Icon position: left, right, only
   - Icon size matching button size
   - Proper spacing and alignment

3. ButtonGroup.tsx - Multiple buttons together:
   - Horizontal and vertical orientation
   - Connected appearance (shared borders)
   - Keyboard navigation between buttons

Styling requirements:
- Use styled-components with theme support
- Smooth transitions (0.2s ease)
- Focus states with proper outline
- Loading spinner integration
- Accessibility attributes (aria-label, role)

Include comprehensive TypeScript interfaces and Storybook stories.
```

### Form Components Library
```typescript
Generate a complete form library at src/components/Forms/

Components needed:
1. Input.tsx - Text input with validation
2. Select.tsx - Dropdown with search
3. Checkbox.tsx - Custom styled checkboxes
4. Radio.tsx - Radio button groups
5. Switch.tsx - Toggle switches
6. DatePicker.tsx - Date selection
7. FileUpload.tsx - Drag & drop file upload
8. FormField.tsx - Wrapper with label and error

Features for each:
- Controlled and uncontrolled modes
- Built-in validation with error messages
- Loading and disabled states
- Keyboard navigation support
- Screen reader compatibility
- Consistent styling with theme
- Animation for state changes

Integration:
- React Hook Form compatibility
- Yup schema validation
- Form context for shared state
- Accessibility best practices

Include TypeScript interfaces and comprehensive examples.
```

---

## ⚡ Performance & Optimization Prompts

### Lazy Loading Implementation
```typescript
Create performance optimization utilities at src/utils/performance/

Generate:
1. LazyImage.tsx - Image component with lazy loading:
   - Intersection Observer for viewport detection
   - Placeholder while loading (skeleton or blur)
   - Error state handling
   - Progressive image loading (low-res → high-res)
   - WebP format detection and fallback

2. LazyComponent.tsx - Component lazy loading wrapper:
   - React.lazy with Suspense integration
   - Loading spinner/skeleton
   - Error boundary for failed loads
   - Preloading on hover/focus

3. VirtualList.tsx - Virtual scrolling for large lists:
   - Window-based rendering
   - Dynamic item heights
   - Smooth scrolling
   - Keyboard navigation

Performance features:
- Bundle size optimization
- Memory usage monitoring
- Performance timing integration
- Service worker caching

Include TypeScript types and performance measurement utilities.
```

---

## 🧪 Testing Prompts

### Component Testing Suite
```typescript
Generate comprehensive tests for ProductGallery component

Create tests at src/components/ProductGallery/__tests__/ProductGallery.test.tsx

Test scenarios:
1. Rendering:
   - Renders with provided images
   - Shows correct number of thumbnails
   - Displays main image correctly

2. Interactions:
   - Thumbnail click changes main image
   - Hover effects work properly
   - Keyboard navigation (arrow keys)
   - Touch/swipe gestures on mobile

3. Loading states:
   - Shows skeleton while loading
   - Handles image load errors
   - Lazy loading functionality

4. Accessibility:
   - Proper ARIA labels
   - Keyboard focus management
   - Screen reader announcements

5. Edge cases:
   - Empty image array
   - Single image
   - Invalid image URLs
   - Network failures

Use React Testing Library with Jest. Include setup for mocking intersection observer and resize observer.
```

---

## 💡 Pro Tips for Better Prompts

### 1. Be Specific with Context
❌ Bad: "Create a button component"
✅ Good: "Create a Button component at src/components/UI/Button.tsx with primary/secondary variants, loading states, and TypeScript interfaces"

### 2. Reference Design Sources
❌ Bad: "Make it look nice"
✅ Good: "Use exact colors and spacing from figmaExport.json, with primary color #FF6B6B and 24px padding"

### 3. Include Edge Cases
❌ Bad: "Add form validation"
✅ Good: "Add form validation with error messages, loading states, success feedback, and accessibility announcements"

### 4. Specify File Structure
❌ Bad: "Create some components"
✅ Good: "Create components at: Button/Button.tsx, Button/Button.styles.ts, Button/Button.stories.tsx, Button/index.ts"

### 5. Request Performance Considerations
❌ Bad: "Make it work"
✅ Good: "Optimize for performance with React.memo, lazy loading, and debounced events"

---

## 🔄 Iterative Prompting

### Step 1: Basic Implementation
"Create a basic ProductCard component with image, title, price"

### Step 2: Add Interactivity  
"Add hover effects, wishlist button, and click to view functionality to the ProductCard"

### Step 3: Enhance Performance
"Optimize ProductCard for performance with lazy loading and memoization"

### Step 4: Add Accessibility
"Add ARIA labels, keyboard navigation, and screen reader support to ProductCard"

### Step 5: Add Testing
"Create comprehensive tests for ProductCard including edge cases and accessibility"

---

**🎯 Remember: Great prompts lead to great code. Be specific, provide context, and iterate!**

[🏠 Home](README.md) | [🛠️ Setup Guide](workshop_setup_guide.md) |
