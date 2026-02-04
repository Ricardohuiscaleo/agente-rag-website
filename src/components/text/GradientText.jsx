import './GradientText.css';
import { useEffect, useRef } from 'react';

export default function GradientText({
  children,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'], // Default colors for light mode
  darkModeColors, // New prop for dark mode colors
  animationSpeed = 8, // Default animation speed in seconds
  showBorder = false, // Default overlay visibility
  showShimmer = false, // New prop to enable the shimmer effect
  shimmerIntensity = 'low', // Puede ser 'low', 'medium', 'high'
  enhancedContrast = true, // Nueva propiedad para mejorar visibilidad
}) {
  const textContentRef = useRef(null);
  const overlayRef = useRef(null);

  // Parse colors if they're passed as a string (from Astro)
  const lightColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
  const darkColors = darkModeColors
    ? typeof darkModeColors === 'string'
      ? JSON.parse(darkModeColors)
      : darkModeColors
    : lightColors;

  // Add shimmer class if enabled
  const shimmerClass = showShimmer ? `shimmer shimmer-${shimmerIntensity}` : '';
  // Add enhanced contrast class if enabled
  const contrastClass = enhancedContrast ? 'enhanced-contrast' : '';
  const fullClassName = `animated-gradient-text ${className} ${shimmerClass}`.trim();

  // Initial gradient style
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${lightColors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  useEffect(() => {
    if (!textContentRef.current) return;

    // Add enhanced contrast class if enabled
    if (enhancedContrast) {
      textContentRef.current.classList.add('enhanced-contrast');
    }

    // Store colors as data attributes for the script in Astro to use
    textContentRef.current.setAttribute('data-light-colors', JSON.stringify(lightColors));
    textContentRef.current.setAttribute('data-dark-colors', JSON.stringify(darkColors));

    // If not using the theme-aware class, no need for more logic
    if (!className.includes('theme-aware')) return;

    // Initial check for dark mode
    const isDarkMode =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.hasAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Apply the appropriate colors
    const colorsToUse = isDarkMode ? darkColors : lightColors;
    if (textContentRef.current) {
      textContentRef.current.style.backgroundImage = `linear-gradient(to right, ${colorsToUse.join(', ')})`;
    }
    if (showBorder && overlayRef.current) {
      overlayRef.current.style.backgroundImage = `linear-gradient(to right, ${colorsToUse.join(', ')})`;
    }
  }, []);

  return (
    <div className={fullClassName}>
      {showBorder && (
        <div ref={overlayRef} className="gradient-overlay" style={gradientStyle}></div>
      )}
      <div ref={textContentRef} className={`text-content ${contrastClass}`} style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}
