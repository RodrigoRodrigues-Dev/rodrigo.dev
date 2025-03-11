<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="intro">
    <h1 class="intro__title">
      <span class="intro__title-row">
        <span
          class="intro__letter"
          v-for="(letter, index) in titleFrontend"
          :key="index"
          >{{ letter }}</span
        >
      </span>
      <span class="intro__title-row">
        <span
          class="intro__letter"
          v-for="(letter, index) in titleDeveloper"
          :key="index"
          >{{ letter }}</span
        >
      </span>
    </h1>
    <div class="intro__tags">
      <span class="intro__marquee">
        <span class="intro__items">
          <span
            v-for="(tag, index) in tagsExtended"
            :key="index"
            class="intro__item"
          >
            <span class="intro__tag">{{ tag }}</span>
            <span class="intro__icon">+</span>
          </span>
        </span>
      </span>
    </div>
    <div class="intro__scroll-indicator">
      <span class="intro__scroll-text">Scroll Down</span>
      <span class="intro__scroll-arrow">↓</span>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

const titleFrontend = 'Frontend';
const titleDeveloper = 'Developer';

const tags = [
  'Creative',
  'Developer',
  'Problem Solver',
  'BEM Practitioner',
  'Tech Innovator',
  'Task Manager Developer',
  'Performance Optimizer',
  'Responsive Design Advocate',
  'Web Accessibility Advocate',
  'Component-Driven Developer',
  'State Management Expert',
  'Micro Frontends Enthusiast'
];

const tagsExtended = [...tags, ...tags];

const animateIntro = () => {
  gsap.from('.intro__letter', {
    y: -300,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.to('.intro__item', {
    x: '+=1800',
    duration: 100,
    ease: 'none',
    repeat: -1
  });

  gsap.to('.intro__icon', {
    rotation: 360,
    duration: 5,
    ease: 'linear',
    repeat: -1
  });

  gsap.to('.intro__scroll-arrow', {
    y: 10,
    duration: 0.8,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
};

onMounted(animateIntro);
</script>

<style lang="scss" scoped>
@mixin responsive-font($size-large, $size-medium, $size-small, $size-xsmall) {
  font-size: $size-large;

  @media (max-width: 1530px) {
    font-size: $size-medium;
  }

  @media (max-width: 1010px) {
    font-size: $size-small;
  }

  @media (max-width: 820px) {
    font-size: $size-xsmall;
  }
}

@mixin responsive-padding($padding-large, $padding-medium, $padding-small) {
  padding: $padding-large;

  @media (max-width: 1335px) {
    padding: $padding-medium;
  }

  @media (max-height: 720px) {
    padding: $padding-small;
  }
}

.intro {
  height: 100vh;
  @include responsive-padding(5rem, 6rem 1rem, 1rem);

  &__title {
    display: flex;
    flex-direction: column;
    color: $color-beige;
    text-transform: uppercase;
    text-align: center;
    @include responsive-font(10rem, 8rem, 6rem, 4rem);

    @media (max-width: 520px) {
      font-size: 2.5rem;
    }

    @media (max-height: 768px) and (min-width: 1128px) {
      font-size: 3.5rem;
    }

    &-row {
      height: 1.1em;
      overflow-y: hidden;
    }
  }

  &__letter {
    display: inline-block;
    font-family: 'Gunterz';
    font-weight: 900;
  }

  &__tags {
    padding: 5rem 0;

    @media (max-height: 634px) {
      display: none;
    }
  }

  &__marquee {
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: 1.3rem;
    color: $color-beige;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &__items {
    display: flex;
    align-items: center;
  }

  &__item {
    transform: translateX(-1800px);
    white-space: nowrap;
  }

  &__tag {
    padding: 0 2rem;
  }

  &__icon {
    display: inline-block;
    padding: 0 2rem;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: $color-beige;
    font-size: 1.5rem;

    @media (max-width: 960px) {
      font-size: 1rem;
    }
  }

  &__scroll-text {
    display: block;
  }

  &__scroll-arrow {
    display: block;
  }
}
</style>
