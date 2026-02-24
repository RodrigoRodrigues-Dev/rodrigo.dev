<template>
  <div class="expertise-card">
    <div class="expertise-card__header">
      <Icon :class="['expertise-card__icon', icon]" :name="icon" size="30" />
      <h3 class="expertise-card__title">{{ title }}</h3>
    </div>
    <p v-html="description"></p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.expertise-card {
  z-index: 999;

  padding: 3rem 5rem;
  border: 1px solid $color-ice-gray;
  color: $color-ice-gray;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__title {
    margin: 1rem 0;
  }
}
</style>
