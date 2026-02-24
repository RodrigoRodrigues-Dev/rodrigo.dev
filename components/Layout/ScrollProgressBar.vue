<template>
  <div
    class="scroll-progress"
    :style="{ backgroundColor: currentColor, width: progress + '%' }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// ==================== COLOR THRESHOLDS ====================
const PROGRESS_COLORS = [
  { threshold: 0, color: '#ffffff' },
  { threshold: 25, color: '#eae737' },
  { threshold: 50, color: '#ba17bd' },
  { threshold: 75, color: '#46ab8d' },
  { threshold: 100, color: '#568A4D' }
];

// ==================== STATE ====================
const progress = ref(0);
const currentColor = ref('#ffffff');

// ==================== UTILITIES ====================
/**
 * Calculate scroll progress as percentage
 * @returns {number} Scroll progress (0-100)
 */
const calculateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  return (scrollTop / documentHeight) * 100;
};

/**
 * Get color based on scroll progress
 * @param {number} scrollProgress - Current scroll progress (0-100)
 * @returns {string} Hex color code
 */
const getColorForProgress = (scrollProgress) => {
  for (let i = 0; i < PROGRESS_COLORS.length - 1; i++) {
    if (scrollProgress >= PROGRESS_COLORS[i].threshold && scrollProgress < PROGRESS_COLORS[i + 1].threshold) {
      return PROGRESS_COLORS[i].color;
    }
  }
  return PROGRESS_COLORS[PROGRESS_COLORS.length - 1].color;
};

// ==================== EVENT HANDLERS ====================
const handleScroll = () => {
  progress.value = calculateScrollProgress();
  currentColor.value = getColorForProgress(progress.value);
};

// ==================== LIFECYCLE ====================
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  height: 6px;
  transition: all 0.3s ease;
}
</style>
