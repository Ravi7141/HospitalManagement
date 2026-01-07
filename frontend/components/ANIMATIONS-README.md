# React Bits Style Animations

This directory contains animated components inspired by React Bits patterns, specifically tailored for the Hospital Management System.

## Components

### 1. AnimatedCard
A card component with smooth hover effects and entrance animations.

**Features:**
- Smooth fade-in and scale animations on mount
- Interactive hover effects with radial gradient following mouse
- Configurable delay for staggered animations
- Works seamlessly with existing `.stat-card` and `.card` classes

**Usage:**
```jsx
import AnimatedCard from '@/components/AnimatedCard';

<AnimatedCard className="stat-card" delay={100}>
  {/* Your content */}
</AnimatedCard>
```

### 2. AnimatedButton
A button component with ripple effects and smooth transitions.

**Features:**
- Ripple effect on click
- Multiple variants: primary, secondary, success, danger
- Smooth hover and active states
- Disabled state support

**Usage:**
```jsx
import AnimatedButton from '@/components/AnimatedButton';

<AnimatedButton variant="primary" onClick={handleClick}>
  Click Me
</AnimatedButton>
```

**Variants:**
- `primary` - Blue primary button
- `secondary` - Outlined secondary button
- `success` - Green success button
- `danger` - Red danger button

### 3. LoadingSkeleton
Skeleton loading states for better UX during data fetching.

**Features:**
- Shimmer animation effect
- Customizable width, height, and border radius
- Pre-built components: `StatCardSkeleton`, `TableRowSkeleton`

**Usage:**
```jsx
import LoadingSkeleton, { StatCardSkeleton, TableRowSkeleton } from '@/components/LoadingSkeleton';

// Basic skeleton
<LoadingSkeleton width="200px" height="20px" />

// Stat card skeleton
<StatCardSkeleton />

// Table row skeleton
<TableRowSkeleton colCount={4} />
```

### 4. FadeIn
A wrapper component for fade-in animations with multiple directions.

**Features:**
- Fade-in from multiple directions (up, down, left, right, scale)
- Intersection Observer for scroll-triggered animations
- Configurable delay and duration

**Usage:**
```jsx
import FadeIn from '@/components/FadeIn';

<FadeIn delay={200} direction="up" duration={0.5}>
  <div>Your content</div>
</FadeIn>
```

**Directions:**
- `up` - Fade in from bottom
- `down` - Fade in from top
- `left` - Fade in from right
- `right` - Fade in from left
- `scale` - Scale in with fade

## Integration Examples

### Dashboard Stat Cards
```jsx
<FadeIn delay={0} direction="up">
  <AnimatedCard className="stat-card" delay={0}>
    <div className="stat-card-icon blue">👥</div>
    <div className="stat-card-info">
      <h3>{stats.patients}</h3>
      <p>Total Patients</p>
    </div>
  </AnimatedCard>
</FadeIn>
```

### Loading State
```jsx
{loading ? (
  <StatCardSkeleton />
) : (
  <AnimatedCard className="stat-card">
    {/* Content */}
  </AnimatedCard>
)}
```

### Animated Table Rows
```jsx
{items.map((item, index) => (
  <tr key={item.id} className="table-row-animated" style={{ animationDelay: `${index * 0.05}s` }}>
    <td>{item.name}</td>
  </tr>
))}
```

## Styling

All components support dark mode through CSS variables defined in `globals.css`. The animations are optimized for performance and use CSS transforms for smooth 60fps animations.

## Best Practices

1. **Staggered Animations**: Use delays to create cascading animation effects
2. **Loading States**: Always show skeleton loaders instead of blank screens
3. **Performance**: Avoid animating too many elements at once
4. **Accessibility**: Animations respect `prefers-reduced-motion` through CSS

## Browser Support

All components use modern CSS features and are compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

