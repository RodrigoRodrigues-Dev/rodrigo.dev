<template>
  <section class="skills-section">
    <header class="skills-section__header">
      <div class="skills-section__line"></div>
      <h2 class="skills-section__title">002 / habilidades</h2>
      <div class="skills-section__line skills-section__line--full"></div>
    </header>

    <h3 ref="subtitle" class="skills-section__subtitle">
      Desenvolvedor <br>
      Front<span class="skills-section__subtitle--underlined">End</span> JR.
    </h3>

    <h4 class="skills-section__main-title">
      <div class="skills-section__line"></div>
      Principais Habilidades
    </h4>

    <div class="skills-section__skills">
      <div v-for="skill in skillsList" :key="skill.name" class="skills-section__skill">
        <Icon class="skills-section__skill-icon" :name="skill.icon" />
        {{ skill.name }}
      </div>
    </div>


    <RouterLink to="AboutMe">
      <div class="about-me__btn">
        <p class="about-me__btn-text">mais sobre mim</p>
        <div class="about-me__btn-bar"></div>
      </div>
    </RouterLink>

    <footer class="skills-section__footer">
      <div class="skills-section__line skills-section__line--full"></div>
      <span class="skills-section__footer-text">skills</span>
      <div class="skills-section__line skills-section__line--full"></div>
    </footer>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ==================== DATA ====================
const skillsList = [
  { name: "React", icon: "mdi:react" },
  { name: "Next.js", icon: "cib:next-js" },
  { name: "Vue.js", icon: "mdi:vuejs" },
  { name: "Nuxt.js", icon: "lineicons:nuxt" },
  { name: "JavaScript", icon: "mdi:language-javascript" },
  { name: "TypeScript", icon: "mdi:language-typescript" },
  { name: "Redux", icon: "tabler:brand-redux" },
  { name: "Pinia", icon: "simple-icons:pinia" },
  { name: "Styled Components", icon: "file-icons:styledcomponents" },
  { name: "Sass", icon: "mdi:sass" },
  { name: "Bootstrap", icon: "ri:bootstrap-fill" },
  { name: "tailwind", icon: "mdi:tailwind" },
  { name: "Jest", icon: "file-icons:jest" },
  { name: "Cypress", icon: "tabler:brand-cypress" },
  { name: "SQL", icon: "material-symbols:database" },
  { name: "MySQL", icon: "tabler:brand-mysql" }
]

// ==================== REFS ====================
const subtitle = ref(null)
const subtitleAnimation = ref(null)

// ==================== ANIMATIONS ====================
const animateSubtitle = () => {
  if (!subtitle.value) return

  subtitleAnimation.value = gsap.from(subtitle.value, {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: subtitle.value,
      start: 'top 100%',
      once: true
    }
  })
}

const animateSkillsCards = () => {
  gsap.from('.skills-section__skill', {
    scrollTrigger: {
      trigger: '.skills-section__skills',
      start: 'top 80%',
      end: 'top 30%',
      scrub: false,
      markers: false,
      once: true
    },
    opacity: 0,
    scale: 0.8,
    rotateY: -10,
    y: 50,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  })
}

const cleanupAnimations = () => {
  if (subtitleAnimation.value && subtitleAnimation.value.scrollTrigger) {
    subtitleAnimation.value.scrollTrigger.kill()
    subtitleAnimation.value.kill()
  } else {
    ScrollTrigger.getAll().forEach(st => st.kill())
  }
}

// ==================== LIFECYCLE ====================
onMounted(() => {
  animateSubtitle()
  animateSkillsCards()
})

onBeforeUnmount(() => {
  cleanupAnimations()
})
</script>

<style lang="scss" scoped>
// Breakpoints
$bp-large: 1820px;
$bp-medium-lg: 1720px;
$bp-medium: 1280px;
$bp-medium-sm: 1080px;
$bp-small-lg: 890px;
$bp-small: 680px;
$bp-xs: 480px;

// Mixins
@mixin font-display($font-size: 3rem) {
  font-family: 'Gunterz';
  color: $color-ice-gray;
  font-size: $font-size;
}

@mixin title-style($font-size: 1rem) {
  font-family: 'Gunterz';
  text-transform: uppercase;
  color: $color-ice-gray;
  letter-spacing: 0.2rem;
  font-size: $font-size;
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin underlined-text {
  background-color: rgba(57, 68, 84, 0.5);
  padding-left: 0.55rem;
}

.skills-section {
  gap: 10rem;
  padding: 0 10rem;

  @media (max-width: $bp-large) {
    padding: 0 5rem;
  }

  @media (max-width: $bp-medium-lg) {
    flex-direction: column;
    gap: 5rem;
  }

  @media (max-width: $bp-small) {
    padding: 0 2rem;
    gap: 3rem;
  }

  @media (max-width: $bp-xs) {
    padding: 0 1.5rem;
    gap: 2rem;
  }

  &__header,
  &__footer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__footer {
    margin-top: 3rem;
  }

  &__footer-text {
    font-size: 1.1rem;
    font-weight: 900;
    text-transform: uppercase;
    color: $color-ice-gray;
  }

  &__line {
    height: 2px;
    width: 100px;
    background-color: $color-ice-gray;

    &--full {
      width: 100%;
    }

    @media (max-width: $bp-small) {
      width: 50px;

      &--full {
        width: 100%;
      }
    }
  }

  &__title {
    white-space: nowrap;
    color: $color-ice-gray;
  }

  &__subtitle {
    @include font-display();
    margin: 2rem 0 3rem 0;

    @media (max-width: $bp-medium-lg) {
      font-size: 3rem;
      margin: 1.5rem 0 2rem 0;
    }

    @media (max-width: $bp-medium-sm) {
      font-size: 2rem;
    }

    @media (max-width: $bp-small) {
      font-size: 1.5rem;
      margin: 1rem 0 1.5rem 0;
    }

    &--underlined {
      @include font-display();
      background-color: $color-slate-gray;
      color: $color-black;

      @media (max-width: $bp-medium-lg) {
        font-size: 3rem;
      }

      @media (max-width: $bp-medium-sm) {
        font-size: 2rem;
      }

      @media (max-width: $bp-small) {
        font-size: 1.5rem;
      }
    }
  }

  &__main-title {
    @include title-style();
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: $bp-small) {
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }
  }

  &__skills {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    column-gap: 5rem;
    row-gap: 3rem;
    margin: 3rem 0;

    @media (max-width: $bp-medium-lg) {
      grid-template-columns: repeat(6, 1fr);
      column-gap: 3rem;
      row-gap: 2rem;
    }

    @media (max-width: $bp-medium) {
      grid-template-columns: repeat(5, 1fr);
      column-gap: 2.5rem;
      row-gap: 2rem;
    }

    @media (max-width: $bp-medium-sm) {
      grid-template-columns: repeat(4, 1fr);
      column-gap: 2rem;
      row-gap: 1.5rem;
    }

    @media (max-width: $bp-small-lg) {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 1.5rem;
      row-gap: 1.5rem;
    }

    @media (max-width: $bp-xs) {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 0.8rem;
      row-gap: 0.8rem;
    }
  }

  &__skill {
    z-index: 1;
    overflow: hidden;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;

    width: 120px;
    height: 120px;
    padding: 1rem 2rem;

    border: 1px solid $color-ice-gray;
    border-radius: 1rem 0;
    color: $color-ice-gray;

    &::before {
      position: absolute;
      content: '';
      inset: 0;
      z-index: -1;

      border-radius: 1rem 0;
      background-color: $color-white;

      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform .6s cubic-bezier(.215, .61, .355, 1);
    }

    &:hover {
      &::before {
        transform: scaleY(1);
      }

      color: $color-deep-slate-blue;
    }

    &-icon {
      font-size: 35px;
    }

    @media (max-width: $bp-medium-lg) {
      width: auto;
      height: auto;
      padding: 1rem 1.5rem;

      font-size: 0.9rem;
    }

    @media (max-width: $bp-small-lg) {
      padding: 0.8rem 1.2rem;
      height: 120px;

      &-icon {
        font-size: 30px;
      }
    }

    @media (max-width: $bp-small) {
      padding: 0.6rem 1rem;
      gap: 0.6rem;
    }
  }
}

.about-me__btn {
  text-align: end;
  color: $color-ice-gray;
  width: 350px;
  margin-left: auto;
  transition: all ease-in-out 0.3s;

  @media (max-width: $bp-medium-lg) {
    text-align: left;
    margin: 2rem 0;
    width: 100%;
  }

  @media (max-width: $bp-small) {
    margin: 1.5rem 0;
  }

  &-text {
    font-family: 'Gunterz';
    cursor: pointer;
    font-size: 1.2rem;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;

    @media (max-width: $bp-small) {
      font-size: 1rem;
    }
  }

  &:hover {
    .about-me__btn-bar {
      width: 0%;
      margin-left: auto;
    }
  }

  &-bar {
    transition: all ease 0.7s;
    background-color: $color-ice-gray;
    width: 100%;
    height: 5px;

    @media (max-width: $bp-medium-lg) {
      height: 3px;
    }
  }
}
</style>
