# Design Guide - Government Academic Verification Portal

## 🎨 Color Palette

### Primary Colors
- **Royal Blue**: `#0066cc` (Primary-500)
  - Used for: Buttons, headers, navigation, primary actions
  - Shades: 50-900 available in Tailwind config

- **Gold**: `#ffd700` (Gold-500)
  - Used for: Accents, highlights, special announcements
  - Shades: 50-900 available in Tailwind config

- **White**: `#ffffff`
  - Used for: Backgrounds, cards, text on dark backgrounds

- **Dark**: `#001429` (Gov-dark)
  - Used for: Footer, dark sections

### Usage Examples
```tsx
// Primary button
<Button variant="primary">Click Me</Button>

// Gold accent
<div className="bg-gold-500 text-gov-dark">Special Announcement</div>

// Royal blue background
<div className="bg-primary-500 text-white">Header</div>
```

## 📝 Typography

### Font Families
- **Primary**: Inter (weights: 300-800)
- **Secondary**: Poppins (weights: 300-800)
- **Fallback**: Roboto (weights: 300-700)

### Font Sizes
- **Hero Title**: `text-4xl md:text-6xl` (36px - 60px)
- **Section Title**: `text-3xl md:text-4xl` (30px - 36px)
- **Card Title**: `text-xl` (20px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)

### Font Weights
- **Bold**: `font-bold` (700) - Headings
- **Semibold**: `font-semibold` (600) - Buttons, labels
- **Medium**: `font-medium` (500) - Subheadings
- **Regular**: `font-normal` (400) - Body text

## 🎭 Animations

### Available Animations
1. **fade-in**: Fade in from transparent
2. **slide-up**: Slide up with fade
3. **slide-down**: Slide down with fade
4. **scale-in**: Scale from 0.9 to 1.0
5. **float**: Continuous floating motion

### Usage
```tsx
<div className="animate-fade-in">Content</div>
<div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>Content</div>
```

### Custom Animations
- **card-hover**: Hover effect for cards (shadow + translate)
- **btn-hover**: Button hover effects (scale + shadow)

## 🧩 Component Library

### Button
```tsx
<Button variant="primary" size="md">Click Me</Button>
// Variants: primary, secondary, gold, outline
// Sizes: sm, md, lg
```

### Card
```tsx
<Card hover className="custom-class">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Invalid email"
/>
```

### Select
```tsx
<Select
  label="University"
  options={[
    { value: 'rgpv', label: 'RGPV Bhopal' },
    { value: 'other', label: 'Other' }
  ]}
/>
```

### Modal
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content</p>
</Modal>
```

### Table
```tsx
<Table
  data={students}
  columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Roll No', accessor: 'rollNumber' }
  ]}
/>
```

## 📐 Layout Structure

### Header
- Top bar with logo, portal name, helpline, notifications
- Background: `bg-primary-600`
- Height: Auto (py-3)

### Navbar
- Sticky navigation (`sticky top-0`)
- Logo + Portal name (left)
- Navigation links (center)
- Search + Language switcher (right)
- Mobile menu support

### Sidebar
- Floating icons on right side
- Icons: Alerts, Calendar, Notifications, Help Desk
- Slide-out panels on click

### Footer
- 4 columns: About, Quick Links, Policies, Contact
- Background: `bg-gov-dark`
- Gold accents for headings

## 🏠 Home Page Sections

### 1. Hero Section
- Full-width banner (600px height)
- 3D animated overlay (floating circles)
- Rotating announcement banners (4s interval)
- Quick search form
- CTA buttons

### 2. Why Section
- 4 feature cards
- Icons with colored backgrounds
- Hover effects

### 3. User Panels Section
- 4 user type cards
- Gradient icon backgrounds
- Access panel buttons

### 4. Stats Section
- 5 animated counters
- Gradient background (primary-600 to primary-800)
- Intersection observer for animation trigger

### 5. How It Works Section
- 4-step process
- Numbered badges
- Connection line (desktop)
- Arrow indicators

### 6. Image Carousel
- Auto-rotating images (5s interval)
- Navigation buttons
- Dot indicators
- Gradient overlay

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large Desktop**: `xl:` (≥ 1280px)

### Common Patterns
```tsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Text responsive
<h1 className="text-2xl md:text-4xl lg:text-6xl">

// Spacing responsive
<div className="px-4 md:px-8 lg:px-16">
```

## 🎯 Design Principles

1. **Government Professional**: Clean, authoritative, trustworthy
2. **Modern Interactive**: Smooth animations, hover effects, micro-interactions
3. **Accessible**: High contrast, readable fonts, clear hierarchy
4. **Responsive**: Works on all devices
5. **Consistent**: Reusable components, standardized spacing

## 🔧 Custom Utilities

### Tailwind Classes
- `.gradient-overlay`: Blue gradient overlay
- `.glass-effect`: Glassmorphism effect
- `.card-hover`: Card hover animation
- `.btn-primary`: Primary button styles
- `.btn-secondary`: Secondary button styles
- `.btn-gold`: Gold button styles

### Usage
```tsx
<div className="gradient-overlay">Content</div>
<div className="glass-effect">Glass card</div>
```

## 📦 Next Steps for Dashboards

When building dashboards, use:
- Same color palette
- Consistent spacing (p-4, p-6, p-8)
- Card-based layouts
- Table components for data
- Modal for forms/details
- Button variants for actions

