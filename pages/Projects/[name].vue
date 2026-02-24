<template>
  <client-only>
    <section class="project-detail">
      <!-- Botão de voltar -->
      <RouterLink to="/">
        <Icon name="material-symbols:arrow-left-alt" class="project-detail__prev" />
      </RouterLink>

      <div class="project-detail__container">
        <img ref="pageImage" class="project-detail__page-image" :src="projectPageImage" alt="" @load="onImageLoad" />

        <div class="project-detail__hero">
          <img class="project-detail__hero-image" :src="projectLogoUrl" alt="Imagem do Projeto Nike" />
        </div>
      </div>

      <div class="project-detail__container project-detail__container--content">
        <!-- Informações do Projeto -->
        <div class="project-detail__info">
          <h3 class="project-detail__title">{{ projectName }}</h3>
          <div class="project-detail__divider-row">
            <div class="project-detail__divider"></div>
            <span>Detalhes</span>
            <div class="project-detail__divider"></div>
          </div>
          <div class="project-detail__content">
            <div class="project-detail__meta">
              <div class="project-detail__meta-item">
                <p class="project-detail__meta-label">Categoria:</p>
                <span class="project-detail__meta-value">{{
                  projectCategory
                  }}</span>
              </div>
              <div class="project-detail__meta-item">
                <p class="project-detail__meta-label">Ano:</p>
                <span class="project-detail__meta-value">{{
                  projectYear
                  }}</span>
              </div>
            </div>
            <p class="project-detail__description">{{ projectDescription }}</p>
          </div>
        </div>

        <div class="project-detail__divider-row">
          <div class="project-detail__divider"></div>
          <span>Tecnologias</span>
          <div class="project-detail__divider"></div>
        </div>

        <ul class="project-detail__technologies">
          <li v-for="tech in projectTechnologies" :key="tech">
            <Icon :name="tech" size="22px" />
          </li>
        </ul>

        <div class="project-detail__divider"></div>

        <!-- Links para Projeto e GitHub -->
        <div class="project-detail__links">
          <a class="project-detail__link project-detail__link--vercel" :href="projectVercelUrl" target="_blank">
            <img :src="projectLogoUrl" alt="Logo do Projeto" class="project-detail__link__logo" />
            Ver Projeto
          </a>
          <a class="project-detail__link project-detail__link--github" :href="projectGithubUrl" target="_blank">
            <Icon name="uil:github" size="22px" />
            GitHub
          </a>
        </div>
      </div>

      <div class="project-detail__marquee-wrapper">
        <div class="project-detail__marquee">
          <span v-for="(item, index) in marquee" :key="index">
            {{ item }}
          </span>
        </div>
      </div>

      <div class="project-detail__marquee-wrapper project-detail__marquee-wrapper--left">
        <div class="project-detail__marquee project-detail__marquee--reverse">
          <span v-for="(item, index) in marquee" :key="index">
            {{ item }}
          </span>
        </div>
      </div>
    </section>
  </client-only>
  <!-- Componente de rodapé -->
  <LayoutFooter />
  <UICustomCursor />
</template>

<script setup>
import { ref, onMounted, toRefs, computed, nextTick } from 'vue';
import { gsap } from 'gsap';
import { useProjectStore } from '~/stores/projectStore';

const animateMarquee = () => {
  nextTick(() => {
    const el = document.querySelector('.project-detail__marquee');
    if (!el) return;

    const totalWidth = el.scrollWidth / 2;

    gsap.to(el, {
      x: -totalWidth,
      duration: 90,
      ease: 'none',
      repeat: -1,
      onRepeat() {
        gsap.set(el, { x: 0 });
      }
    });
    const elReverse = document.querySelector('.project-detail__marquee--reverse');
    if (!elReverse) return;

    const totalWidthReverse = elReverse.scrollWidth / 2;

    gsap.fromTo(elReverse,
      { x: -totalWidthReverse },
      {
        x: 0,
        duration: 90,
        ease: 'none',
        repeat: -1,
        onRepeat() {
          gsap.set(elReverse, { x: -totalWidthReverse });
        }
      }
    );
  });
};

const projectStore = useProjectStore();
const {
  title: projectName,
  imagePageUrl: projectPageImage,
  technologies: projectTechnologies,
  vercelUrl: projectVercelUrl,
  githubUrl: projectGithubUrl,
  logoUrl: projectLogoUrl,
  year: projectYear,
  category: projectCategory,
  description: projectDescription,
} = toRefs(projectStore);

const pageImage = ref(null);

function onImageLoad(event) {
  const img = pageImage.value || event?.target;
  if (!img) return;

  requestAnimationFrame(() => {
    const rect = img.getBoundingClientRect();
    const rectH =
      rect.height ||
      img.clientHeight ||
      (img.naturalHeight && img.naturalWidth
        ? Math.round((img.naturalHeight / img.naturalWidth) * img.clientWidth)
        : 0);

    gsap.fromTo(
      '.project-detail__hero',
      { height: (rectH + 100) + 'px' },
      { height: '100px', opacity: 1, duration: 2.5, delay: 1, ease: 'power4.out' }
    );

    gsap.fromTo(
      '.project-detail__hero-image',
      { top: '20%', opacity: 1, width: 100 + 'px' },
      { top: '50%', opacity: 1, duration: 0.8, delay: 1, ease: 'power2.out', width: 40 + 'px' }
    );

    gsap.fromTo(
      '.project-detail__info',
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.6, delay: 0.3 }
    );

    gsap.fromTo(
      '.project-detail__links',
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.6, delay: 0.3 }
    );
  });
}

const marquee = computed(() => {
  if (!projectName.value) return [];
  const items = Array.from({ length: 50 }, () => projectName.value);
  return [...items, ...items];
})

onMounted(() => {
  if (pageImage.value && pageImage.value.complete) {
    onImageLoad();
  };
  animateMarquee();
});
</script>

<style lang="scss" scoped>
.project-detail {
  overflow: hidden;
  position: relative;
  margin-bottom: 6rem;
  border-radius: 4rem;
  background-color: #2D323A;

  @media (max-width: 1090px) {
    padding: 0 3rem;
  }

  @media (max-width: 1280px) {
    margin-bottom: 6rem;
    border-radius: 2rem;

    @media (max-width: 960px) {
      margin-bottom: 9rem;
    }
  }

  &__container {
    position: relative;

    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
    color: $color-white;

    &--content {
      padding: 5rem 0;
    }
  }

  &__hero {
    position: absolute;
    bottom: -93px;
    left: 0;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: $color-obsidian;
    border-radius: 0 0 6rem 6rem;

    &-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
    }
  }

  &__info {
    margin-top: 6rem;
  }

  &__title {
    font-size: 5rem;
    text-transform: uppercase;
    line-height: 1;

    @media (max-width: 1680px) {
      font-size: 4rem;
    }

    @media (max-width: 660px) {
      font-size: 3rem;
    }
  }

  &__description {
    font-size: 1.2rem;

    @media (max-width: 930px) {
      font-size: 1rem;
    }
  }

  &__page-image {
    width: 100%;
  }

  &__divider-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
  }

  &__divider {
    width: 100%;
    height: 2px;
    margin: 3rem 0;
    background-color: $color-white;
  }

  &__technologies {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
    list-style: none;
    padding: 0;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (max-width: 1280px) {
      grid-template-columns: 1fr;
    }
  }

  &__meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    font-size: 1.1rem;

    @media (max-width: 660px) {
      flex-direction: column-reverse;
    }

    &-item {
      display: flex;
      align-items: center;

      @media (max-width: 660px) {
        align-items: flex-start;
      }
    }

    &-label {
      font-size: 1.2rem;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }

  &__links {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    max-width: 800px;
    gap: 1rem;
    padding-bottom: 5rem;

    @media (max-width: 1280px) {
      flex-direction: column;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 2rem;
    background-color: $color-obsidian;
    border-radius: 1rem;
    color: $color-white;
    font-size: 1.2rem;
    opacity: 0.9;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }

    &__logo {
      width: 25px;
    }
  }

  &__marquee-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2rem;
    transform-origin: top right;
    transform: rotate(90deg);

    @media (max-width: 1090px) {
      right: 0;
    }

    &--left {
      transform-origin: top left;
      right: auto;
      left: 0;
      transform: rotate(90deg) translatey(-100%);
    }
  }

  &__marquee {
    display: flex;
    gap: 2rem;
    white-space: nowrap;
    width: max-content;
    color: #fff;
    font-size: 1rem;
    line-height: 2rem;
  }

  &__prev {
    position: fixed;
    top: 3%;
    left: 3%;
    font-size: 2.5rem;
    color: $color-ice-gray;

    @media (max-width: 1720px) {
      display: none;
    }
  }
}

.home__hero {
  img {
    width: 100%;
  }
}
</style>
