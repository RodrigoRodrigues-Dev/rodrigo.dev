import { onMounted, onUnmounted } from 'vue';

// ==================== THEME CONFIGURATION ====================
const THEME_CONFIG = {
  0: {
    'color-steel-blue': '#5C80B5',
    'color-obsidian': '#111111',
    'color-mist-blue': '#191919',
    'color-gunmetal': '#5b5e65'
  },
  650: {
    'color-obsidian': '#5C80B5',
    'color-steel-blue': '#ffffff',
    'color-graphite': '#4E6281',
    'color-mist-blue': '#6488BD',
    'color-gunmetal': '#92B0D8'
  },
  2300: {
    'color-steel-blue': '#5C80B5',
    'color-obsidian': '#111111',
    'color-graphite': '#363636',
    'color-mist-blue': '#191919',
    'color-gunmetal': '#5b5e65'
  }
};

// ==================== UTILITIES ====================
/**
 * Apply theme colors to document root
 * @param {object} colors - Theme color object
 */
const applyTheme = (colors) => {
  Object.entries(colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value);
  });
};

/**
 * Get theme configuration based on scroll position
 * @param {number} scrollY - Current scroll position
 * @returns {object} Theme configuration
 */
const getThemeByScroll = (scrollY) => {
  if (scrollY <= 650) return THEME_CONFIG[0];
  if (scrollY <= 2300) return THEME_CONFIG[650];
  return THEME_CONFIG[2300];
};

// ==================== COMPOSABLE ====================
export const useScrollTheme = () => {
  const handleScroll = () => applyTheme(getThemeByScroll(window.scrollY));

  onMounted(() => window.addEventListener('scroll', handleScroll));
  onUnmounted(() => window.removeEventListener('scroll', handleScroll));
};
