<template>
  <div class="cursor-wrapper">
    <div
      class="cursor-circle"
      :class="{ 'cursor-circle--visible': isHoverDelayed }"
      :style="{ left: circleX + 'px', top: circleY + 'px' }"
    ></div>

    <div
      class="cursor-dot"
      :class="{ 'cursor-dot--grow': isHovering }"
      :style="{ left: dotX + 'px', top: dotY + 'px' }"
    ></div>
  </div>
</template>

<script setup>
const {
  dotX,
  dotY,
  circleX,
  circleY,
  isHovering,
  isHoverDelayed
} = useCustomCursor();
</script>

<style scoped lang="scss">
.cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  pointer-events: none;
  transition: all 0.6s ease;

  @media (max-width: 760px) {
    display: none;
  }

  .cursor-circle,
  .cursor-dot {
    position: fixed;
    transform: translate(-50%, -50%) scale(1);
    will-change: transform, left, top;
  }

  .cursor-circle {
    width: 40px;
    height: 40px;

    border: 2px solid rgba(200, 200, 200, 0.8);
    border-radius: 50%;

    opacity: 0.9;
    transition:
      opacity 220ms ease,
      border-color 180ms ease,
      transform 220ms ease;

    &--visible {
      display: none;
    }
  }

  .cursor-dot {
    width: 8px;
    height: 8px;

    border-radius: 50%;
    background-color: #cfcfcf;

    transition:
      transform 160ms cubic-bezier(0.2, 0.9, 0.2, 1),
      width 160ms ease,
      height 160ms ease,
      background-color 120ms;
    transform-origin: center center;

    &--grow {
      width: 10px;
      height: 10px;

      background-color: $color-deep-slate-blue;
      transform: translate(-50%, -50%) scale(2.5);
    }
  }
}
</style>
