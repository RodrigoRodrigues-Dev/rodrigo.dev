<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <client-only>
    <section class="project-detail">
      <!-- Botão de voltar -->
      <RouterLink to="/">
        <Icon
          name="material-symbols:arrow-left-alt"
          class="project-detail__prev"
        />
      </RouterLink>

      <div class="project-detail__container">
        <!-- Seção Hero -->
        <div class="project-detail__hero">
          <img
            class="project-detail__hero-image"
            :src="projectLogoUrl"
            alt="Imagem do Projeto Nike"
          />
        </div>

        <!-- Informações do Projeto -->
        <div class="project-detail__info">
          <h3 class="project-detail__title">{{ projectName }}</h3>
          <div class="project-detail__divider"></div>
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

        <!-- Links para Projeto e GitHub -->
        <div class="project-detail__links">
          <a
            class="project-detail__link project-detail__link--vercel"
            :href="projectVercelUrl"
            target="_blank"
          >
            <img
              :src="projectLogoUrl"
              alt="Logo do Projeto"
              class="project-detail__link__logo"
            />
            Ver Projeto
          </a>
          <a
            class="project-detail__link project-detail__link--github"
            :href="projectGithubUrl"
            target="_blank"
          >
            <Icon name="uil:github" size="22px" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  </client-only>
  <!-- Componente de rodapé -->
  <LayoutFooter />
</template>

<script setup>
import { onMounted, nextTick, toRefs } from 'vue';
import { gsap } from 'gsap';
import { useProjectStore } from '~/stores/projectStore';

const projectStore = useProjectStore();
const {
  name: projectName,
  vercelURL: projectVercelUrl,
  githubURL: projectGithubUrl,
  logoURL: projectLogoUrl,
  year: projectYear,
  category: projectCategory,
  description: projectDescription
} = toRefs(projectStore);

onMounted(() => {
  nextTick(() => {
    animateProjectDetails();
  });
});

function animateProjectDetails() {
  gsap.fromTo('.project-detail__hero', { y: -100 }, { y: 0, delay: 0.3 });
  gsap.fromTo('.project-detail__info', { y: 100 }, { y: 0, delay: 0.3 });
  gsap.fromTo('.project-detail__links', { y: 100 }, { y: 0, delay: 0.3 });
}
</script>

<style lang="scss" scoped>
.project-detail {
  overflow: hidden;
  margin-bottom: 6rem;
  border-radius: 0 0 4rem 4rem;

  @media (max-width: 1280px) {
    margin-bottom: 6rem;
    border-radius: 0 0 2rem 2rem;

    @media (max-width: 960px) {
      margin-bottom: 9rem;
    }
  }

  &__container {
    margin: 0 auto;
    width: 100%;
    max-width: 1432px;
    padding: 0 1.5rem;
    color: $color-white;
  }

  &__hero {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 60vh;
    background-color: $color-obsidian;
    border-radius: 0 0 6rem 6rem;

    &-image {
      width: 15%;
      object-fit: contain;
    }
  }

  &__info {
    margin: 6rem 0;
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
  }

  &__divider {
    width: 100%;
    height: 2px;
    margin: 3rem 0;
    background-color: $color-white;
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
    gap: 1rem;
    margin-bottom: 2rem;
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

  &__prev {
    position: fixed;
    top: 2%;
    left: 1%;
    font-size: 3rem;
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
