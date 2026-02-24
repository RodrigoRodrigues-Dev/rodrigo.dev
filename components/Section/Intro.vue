<template>
  <section class="intro">
    <h1 class="intro__title">
      <span class="intro__title-row">
        <span class="intro__letter intro__letter--first" v-for="(letter, index) in titleFrontend" :key="index">{{ letter
          }}</span>
      </span>
      <span class="intro__title-row">
        <span class="intro__letter intro__letter--second" v-for="(letter, index) in titleDeveloper" :key="index">{{
          letter }}</span>
      </span>
    </h1>
    <div class="intro__tags">
      <span class="intro__marquee">
        <span class="intro__items">
          <span v-for="(tag, index) in tagsExtended" :key="index" class="intro__item">
            <span class="intro__tag">{{ tag }}</span>
            <span class="intro__icon">+</span>
          </span>
        </span>
      </span>
    </div>
    <div class="intro__scroll">
      <span class="intro__scroll-text">
        <span>s</span><span>c</span><span>r</span><span>o</span><span>l</span><span>l</span>
      </span>
      <div class="intro__line"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

// ==================== DATA ====================
const titleFrontend = 'Frontend';
const titleDeveloper = 'Developer';

const skillsList = [
  'Front-end: React + TypeScript',
  'Vue 3 & Nuxt (SSR)',
  'Component-Driven Development',
  'Gerenciamento de Estado — Redux Toolkit & Pinia',
  'RTK Query / Axios (Integração com APIs)',
  'Testes: Jest (unit) & Cypress (E2E)',
  'Otimização de Performance (Lighthouse 90+)',
  'Acessibilidade (a11y) e SEO',
  'Design Responsivo (mobile-first)',
  'CI/CD — GitHub Actions • Vercel • Netlify',
  'Firebase (Auth • Realtime DB)',
  'Gráficos Interativos (Chart.js)',
  'Styled Components & Vuetify',
  'Lazy-loading & Code-splitting',
  'Cobertura de Testes orientada a qualidade'
];

const tagsExtended = [...skillsList, ...skillsList];

// ==================== ANIMATIONS ====================
const animateTitleLetters = () => {
  gsap.from('.intro__letter', {
    y: -300,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out'
  });
};

const animateTagsMarquee = () => {
  gsap.to('.intro__item', {
    x: '+=1800',
    duration: 60,
    ease: 'none',
    repeat: -1
  });
};

const animateTagsIcons = () => {
  gsap.to('.intro__icon', {
    rotation: 360,
    duration: 5,
    ease: 'linear',
    repeat: -1
  });
};

const setupAnimations = () => {
  animateTitleLetters();
  animateTagsMarquee();
  animateTagsIcons();
};

onMounted(setupAnimations);
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

    text-align: center;
    text-transform: uppercase;
    color: $color-ice-gray;
    @include responsive-font(8rem, 6rem, 4rem, 2.5rem);

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

    &--first {
      &:nth-last-child(-n + 3) {
        background-color: $color-slate-gray;
        color: $color-black;
      }
    }

    &--second {
      &:nth-child(-n + 3) {
        background-color: $color-slate-gray;
        color: $color-black;
      }
    }
  }

  &__tags {
    padding-top: 5rem;

    @media (max-height: 634px) {
      display: none;
    }
  }

  &__marquee {
    position: relative;
    overflow: hidden;

    display: flex;
    align-items: center;
    
    font-size: 1rem;
    color: $color-ice-gray;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &__items {
    display: flex;
    align-items: center;
  }

  &__line {
    width: 2px;
    height: 100px;

    background: linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, transparent 100%);
  }

  &__item {
    white-space: nowrap;
    transform: translateX(-1800px);
  }
  
  &__icon {
    display: inline-block;
    padding: 0 3rem;
    
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  &__scroll {
    position: absolute;
    bottom: 0;
    left: 30%;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1.1rem;
    letter-spacing: 0.3rem;
    color: $color-ice-gray;
  }

  &__scroll-text {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    &>span {
      animation: wave 2s ease-in-out infinite;

      &:nth-child(1) {
        animation-delay: 0s;
      }

      &:nth-child(2) {
        animation-delay: 0.1s;
      }

      &:nth-child(3) {
        animation-delay: 0.2s;
      }

      &:nth-child(4) {
        animation-delay: 0.3s;
      }

      &:nth-child(5) {
        animation-delay: 0.4s;
      }

      &:nth-child(6) {
        animation-delay: 0.5s;
      }
    }
  }
}

@keyframes wave {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}
</style>
