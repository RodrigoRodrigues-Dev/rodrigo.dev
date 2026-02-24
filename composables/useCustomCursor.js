import { ref, onMounted, onUnmounted } from 'vue';

const TIMEOUT_DELAY = 180;
const CIRCLE_SMOOTHNESS = 0.15;

export const useCustomCursor = () => {
  // ==================== REFS ====================
  const dotX = ref(0);
  const dotY = ref(0);
  const circleX = ref(0);
  const circleY = ref(0);
  const isHovering = ref(false);
  const isHoverDelayed = ref(false);

  // ==================== STATE ====================
  let mouseX = 0;
  let mouseY = 0;
  let animationFrame;
  let hoverTimeout = null;

  // ==================== UTILITIES ====================
  const isClickableElement = (element) => {
    if (!element) return false;
    return !!element.closest('a, button, [role="button"], input[type="button"], input[type="submit"], [data-cursor-pointer]');
  };

  const clearHoverTimeout = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  // ==================== EVENT HANDLERS ====================
  const handleMouseMove = (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const handleMouseOver = (event) => {
    if (!isClickableElement(event.target)) return;
    isHovering.value = true;
    clearHoverTimeout();
    isHoverDelayed.value = true;
  };

  const handleMouseOut = () => {
    isHovering.value = false;
    clearHoverTimeout();
    hoverTimeout = setTimeout(() => {
      isHoverDelayed.value = false;
      hoverTimeout = null;
    }, TIMEOUT_DELAY);
  };

  // ==================== ANIMATION LOOP ====================
  const animateCursor = () => {
    dotX.value = mouseX;
    dotY.value = mouseY;
    circleX.value += (mouseX - circleX.value) * CIRCLE_SMOOTHNESS;
    circleY.value += (mouseY - circleY.value) * CIRCLE_SMOOTHNESS;
    animationFrame = requestAnimationFrame(animateCursor);
  };

  // ==================== LIFECYCLE ====================
  onMounted(() => {
    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    animateCursor();
  });

  onUnmounted(() => {
    document.body.style.cursor = '';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseover', handleMouseOver);
    window.removeEventListener('mouseout', handleMouseOut);
    cancelAnimationFrame(animationFrame);
    clearHoverTimeout();
  });

  return { dotX, dotY, circleX, circleY, isHovering, isHoverDelayed };
};
