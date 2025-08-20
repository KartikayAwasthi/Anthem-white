# Fan Components Documentation

This directory contains individual fan components for the Anthem ceiling fans website. Each fan has been separated into its own component for better maintainability and modularity.

## Structure

```
src/components/fans/
├── index.js           # Main export file
├── FanRouter.jsx      # Router component for fan navigation
├── FanDemo.jsx        # Demo page showing all fans
├── SkyroFan.jsx       # SKYRO fan component
├── InaraFan.jsx       # INARA fan component
├── EvaaraFan.jsx      # eVAARA fan component
├── LaraFan.jsx        # LARA fan component
└── README.md          # This documentation
```

## Components

### 1. SkyroFan
- **Motor Types**: BLDC & Induction
- **Colors**: 5 color variants (Classic White, Matte Black, Royal Blue, Antique Gold, Purple)
- **Price Range**: ₹2,999 - ₹3,999
- **Features**: Energy efficient, Remote control, Anti-dust coating

### 2. InaraFan
- **Motor Types**: BLDC & Induction
- **Colors**: 7 color variants (Pearl White, Bakers Brown, Matte Black, Royal Blue, Antique Gold, Purple, Classic White)
- **Price Range**: ₹3,499 - ₹4,499
- **Features**: Premium design, Smart home ready, LED lighting

### 3. EvaaraFan
- **Motor Types**: BLDC only
- **Colors**: 5 color variants (Classic White, Pearl Bronze, Matte Black, Brushed Silver, Antique Gold)
- **Price**: ₹3,699
- **Features**: Energy efficient, Decorative LED, Low maintenance

### 4. LaraFan
- **Motor Types**: Induction only
- **Colors**: 1 color variant (Classic White)
- **Price**: ₹3,199
- **Features**: Elegant design, Reliable performance, Premium materials

## Usage

### Using Individual Components

```jsx
import { SkyroFan, InaraFan, EvaaraFan, LaraFan } from './components/fans';

// Use any specific fan component
function MyPage() {
  return <SkyroFan />;
}
```

### Using the Router Component

```jsx
import FanRouter from './components/fans/FanRouter';

// In your routing setup
<Route path="/fan/:fanId" element={<FanRouter />} />
```

### Using the Demo Component

```jsx
import FanDemo from './components/fans/FanDemo';

// Shows all fans with a selector
function DemoPage() {
  return <FanDemo />;
}
```

## Features

Each fan component includes:

- **Interactive Color Selection**: Click to change fan colors with smooth transitions
- **Motor Type Selection**: Switch between BLDC and Induction motors (where available)
- **Image Gallery**: Main product image with thumbnail gallery
- **Fullscreen Viewer**: Click to view images in fullscreen mode
- **Specifications**: Expandable technical specifications
- **Add to Cart**: Integration with cart context
- **Share Functionality**: Native sharing or clipboard copy
- **Responsive Design**: Works on all device sizes
- **Error Handling**: Fallback images for missing assets

## Props and State

Each component manages its own state for:
- `selectedColor`: Currently selected color variant
- `selectedMotorType`: Currently selected motor type
- `showColorTransition`: Animation state for color changes
- `isSpecsOpen`: Specifications panel toggle
- `showFullscreen`: Fullscreen image viewer state
- `fullscreenImageIndex`: Current image in fullscreen mode

## Dependencies

- React (hooks: useState, useEffect)
- React Router (useParams)
- Lucide React (icons)
- Cart Context (for add to cart functionality)
- ColorChangeTransition component

## File Structure

Each fan component follows the same structure:
1. **Imports**: All necessary dependencies
2. **Image Imports**: Fan-specific images and creative assets
3. **Data Definition**: Fan specifications, colors, motor types
4. **Component Logic**: State management and event handlers
5. **JSX Render**: UI structure with responsive design

## Styling

All components use:
- **Tailwind CSS**: For styling and responsive design
- **Color Scheme**: Dark theme with accent colors (#ba6a5a, #e49385)
- **Gradients**: Background gradients for visual appeal
- **Transitions**: Smooth animations for interactions

## Future Enhancements

Potential improvements:
1. **Lazy Loading**: Implement image lazy loading
2. **SEO**: Add meta tags and structured data
3. **Analytics**: Track user interactions
4. **Performance**: Optimize image sizes and formats
5. **A11y**: Enhance accessibility features
6. **Testing**: Add unit and integration tests

## Migration Notes

When migrating from the original `FanDetail.jsx`:
1. Import the new `FanRouter` component
2. Update routing in `App.jsx`
3. Individual fan data is now contained within each component
4. Shared functionality can be extracted into custom hooks if needed
