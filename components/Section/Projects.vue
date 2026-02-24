<template>
  <section class="projects">
    <div class="projects__container">
      <h2 class="projects__title">003 / Projetos</h2>
    </div>
    <div class="projects__grid">
      <a class="projects__card" v-for="project in projects" :key="project.title" @click="navigateToProject(project)">
        <div class="projects__header">
          <span>{{ project.year }}</span>
          <Icon class="projects__icon" name="material-symbols:arrow-outward" />
        </div>
        <div class="projects__content">
          <p class="projects__description">{{ project.category }}</p>
          <h3 class="projects__description-title">{{ project.title }}</h3>
          <ul class="projects__technologies">
            <li v-for="technology in project.technologies" :key="technology">
              <Icon class="projects__tech-icon" :name="technology" />
            </li>
          </ul>
        </div>
        <div class="projects__watermark">
          <p>{{ project.title }}</p>
          <p>{{ project.title }}</p>
        </div>
      </a>
    </div>
    <div class="projects__marquee-wrapper">
      <div class="projects__marquee">
        <span v-for="(item, index) in marqueeItems" :key="index">
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios';
import { ref, nextTick, onMounted } from 'vue';
import { useProjectStore } from '~/stores/projectStore';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==================== DATA ====================
const projectStore = useProjectStore();
const router = useRouter();
const projects = ref([]);
const marqueeItems = Array.from({ length: 40 }, () => 'Projetos / 003');

const animationsMap = new Map();

// ==================== API ====================
const fetchProjects = async () => {
  try {
    const response = await axios.get(
      'https://110cbe32dcdc6022.mokky.dev/projects'
    );
    projects.value = response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// ==================== NAVIGATION ====================
const navigateToProject = (projectItem) => {
  projectStore.setProjectProps(projectItem);
  router.push({
    name: 'Projects-name',
    params: { name: projectItem.title }
  });
};

// ==================== ANIMATIONS ====================
const createCardAnimation = (element) => {
  if (animationsMap.has(element)) {
    return animationsMap.get(element);
  }

  const watermark = element.querySelector('.projects__watermark');
  const textWidth = watermark.querySelector('p').offsetWidth;
  const gap = 48;
  const totalDistance = -(textWidth + gap);

  const timeline = gsap.to(watermark, {
    x: totalDistance,
    duration: 10,
    ease: 'none',
    repeat: -1,
    paused: true
  });

  animationsMap.set(element, timeline);
  return timeline;
};

const handleCardMouseEnter = (event) => {
  const card = event.currentTarget;
  const animation = createCardAnimation(card);
  animation.play();
};

const handleCardMouseLeave = (event) => {
  const card = event.currentTarget;
  const animation = animationsMap.get(card);
  if (animation) {
    animation.pause();
  }
};

const setupCardAnimations = () => {
  const cards = document.querySelectorAll('.projects__card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', handleCardMouseEnter);
    card.addEventListener('mouseleave', handleCardMouseLeave);
  });
};

const setupScrollAnimations = () => {
  gsap.from('.projects__card', {
    scrollTrigger: {
      trigger: '.projects__grid',
      start: 'top 80%',
      end: 'top 30%',
      scrub: false,
      markers: false
    },
    opacity: 0,
    scale: 0.8,
    rotateY: -10,
    y: 50,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });
};

const animateMarquee = () => {
  nextTick(() => {
    const marqueeElement = document.querySelector('.projects__marquee');
    if (!marqueeElement) return;

    const totalWidth = marqueeElement.scrollWidth / 3;

    gsap.to(marqueeElement, {
      x: -totalWidth,
      duration: 60,
      ease: 'none',
      repeat: -1,
      onRepeat() {
        gsap.set(marqueeElement, { x: 0 });
      }
    });
  });
};

// ==================== LIFECYCLE ====================
onMounted(async () => {
  await fetchProjects();
  setupCardAnimations();
  setupScrollAnimations();
  animateMarquee();
});
</script>

<style lang="scss" scoped>
.projects {
  padding: 5rem 0;
  position: relative;
  overflow: hidden;

  &__container {
    display: flex;
    align-items: center;
    gap: 1rem;

    padding: 0 10rem;
    margin: 0 auto;
    margin-bottom: 5rem;

    @media (max-width: 900px) {
      padding: 0 5rem;
    }
  }

  &__title {
    font-size: 1.5rem;
    text-align: center;
    color: $color-ice-gray;

    &:nth-child(1) {
      text-align: start;
    }

    &:nth-child(2) {
      text-align: end;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;

    max-width: 1300px;
    padding: 0 5rem;
    margin: 0 auto;

    @media (max-width: 900px) {
      padding: 0 1rem;
    }

    @media (max-width: 790px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    @media (min-width: 1091px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));

      &>*:last-child {
        grid-column: span 1;
      }

      &>*:last-child:nth-child(3n + 1) {
        grid-column: span 3;
      }

      &>*:last-child:nth-child(3n + 2) {
        grid-column: span 2;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__icon {
    top: 0;
    right: 0;

    font-size: 2rem;
    opacity: 0;
  }

  &__card {
    position: relative;
    overflow: hidden;

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    height: 35rem;
    padding: 2rem;

    border: 1px solid $color-ice-gray;
    background-color: var(--color-mist-blue);
    color: $color-ice-gray;
    transition: background-color 0.5s ease;

    &:hover {
      box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 1);

      .projects__icon {
        opacity: 1;
      }

      .projects__watermark {
        bottom: 0;
        z-index: 9999;
      }

      .projects__content {
        transform: translateY(200%);
      }
    }
  }

  &__description {
    margin: 0;
  }

  &__technologies {
    display: flex;
    gap: 1rem;

    margin-top: 1rem;
  }

  &__tech-icon {
    font-size: 1.1rem;
  }

  &__content {
    transition: all 0.6s ease;
  }

  &__marquee-wrapper {
    position: absolute;
    top: 0;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    width: 100%;
    height: 2rem;
    padding-top: 10rem;

    transform-origin: top right;
    transform: rotate(90deg);

    @media (max-width: 1820px) {
      padding-top: 5rem;
    }

    @media (max-width: 1430px) {
      display: none;
    }
  }

  &__marquee {
    display: flex;
    gap: 2rem;
    width: max-content;
    white-space: nowrap;

    font-size: 1rem;
    font-weight: 900;
    line-height: 2rem;
    color: $color-ice-gray;
  }

  &__watermark {
    position: absolute;
    bottom: -500px;

    display: flex;
    gap: 3rem;

    font-size: 10rem;
    text-transform: uppercase;
    white-space: nowrap;
    transition: bottom 0.6s ease;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>