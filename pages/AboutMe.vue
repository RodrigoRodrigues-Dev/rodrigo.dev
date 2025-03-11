<template>
  <div class="about-me" :class="{ 'about-me--no-scroll': isLoading }">
    <div class="about-me__content-wrapper">
      <Header class="about-me__header" />
      <h1 class="about-me__title">Sobre mim</h1>
      <div class="about-me__container">
        <div class="about-me__section about-me__section--first">
          <p class="about-me__text about-me__text--first">
            Olá, meu nome é Rodrigo e sou um desenvolvedor apaixonado por
            transformar ideias em experiências digitais marcantes. Sou formado
            em Análise e Desenvolvimento de Sistemas, o que ampliou minha visão
            sobre engenharia de software, metodologias ágeis e a importância de
            um planejamento bem estruturado em cada projeto.
          </p>
          <svg
            class="about-me__icon"
            viewBox="0 0 29 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.75 32.2422C0.75 33.4141 1.29688 34 2.39062 34H5.95312C7.04688 34 7.59375 33.4141 7.59375 32.2422V20.4297H9.32812C10.6719 20.4297 12.0234 20.9375 13.3828 21.9531C14.7578 22.9531 15.7031 23.875 16.2188 24.7188L20.9531 32.6172C21.5 33.5391 22.2031 34 23.0625 34H27.1406C28.5938 34 28.8906 33.3281 28.0312 31.9844L22.875 23.8516C22.3906 23.1016 21.7656 22.2266 21 21.2266C20.2344 20.2266 19.1016 19.4453 17.6016 18.8828V18.8359C20.3672 18.3516 22.6484 17.3672 24.4453 15.8828C26.2422 14.3984 27.1406 12.4062 27.1406 9.90625C27.1406 6.54688 26.0312 4.125 23.8125 2.64062C21.5938 1.14062 18.0703 0.390625 13.2422 0.390625H2.39062C1.29688 0.390625 0.75 0.976562 0.75 2.14844V6.10001H8V6.10938H12.9141C15.3828 6.10938 17.25 6.36719 18.5156 6.88281C19.7969 7.38281 20.4375 8.47656 20.4375 10.1641C20.4375 11.7109 19.7734 12.8438 18.4453 13.5625C17.1328 14.2656 14.9141 14.6172 11.7891 14.6172H8V14.62H0.75V32.2422Z"
              fill="$color-beige"
            />
          </svg>
        </div>
        <div class="about-me__section about-me__section--second">
          <div class="about-me__ball"></div>
          <p class="about-me__text">
            Minha jornada no desenvolvimento começou com a curiosidade de
            entender como a tecnologia pode melhorar o dia a dia das pessoas, e
            hoje me especializo em ferramentas como NodeJS, VueJS, Nuxt, JQuery,
            JavaScript, TypeScript, HTML, CSS, SASS, Bootstrap (inclusive
            BootStrap 5), LESS, Gulp, Grunt, Parcel, Babel e Git. Esse
            conhecimento diversificado me permite abordar projetos de forma
            completa e integrada, sempre focando na excelência e na inovação.
          </p>
        </div>
      </div>
      <h2 class="about-me__subtitle">Como eu posso te ajudar</h2>
      <div class="about-me__cards-container">
        <div class="about-me__cards">
          <div class="about-me__card">
            <p>
              Desenvolvendo aplicações web de alta performance e escaláveis.
            </p>
            <div class="about-me__card-bar"></div>
          </div>
          <div class="about-me__card">
            <p>
              Projetando interfaces interativas e responsivas para melhor
              experiência do usuário.
            </p>
            <div class="about-me__card-bar"></div>
          </div>
          <div class="about-me__card">
            <p>
              Otimizando a usabilidade e acessibilidade com as melhores práticas
              de UI/UX.
            </p>
            <div class="about-me__card-bar"></div>
          </div>
          <div class="about-me__card">
            <p>
              Utilizando metodologias ágeis para entregar projetos eficientes e
              inovadores.
            </p>
            <div class="about-me__card-bar"></div>
          </div>
        </div>
      </div>
      <ContactSection class="about-me__contact-section" />
      <Footer class="about-me__footer" />
    </div>
    <div class="about-me__loading-text">Carregando...</div>
    <div class="about-me__overlay">
      <div
        class="about-me__block"
        v-for="n in 20"
        :key="n"
        :class="'about-me__block--' + n"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { TweenMax, Power1, Expo } from 'gsap';

const isLoading = ref(true);

if (
  typeof window !== 'undefined' &&
  window.history &&
  'scrollRestoration' in window.history
) {
  window.history.scrollRestoration = 'manual';
}

onBeforeMount(() => {
  window.scrollTo(0, 0);
});

onMounted(() => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);

  TweenMax.staggerFrom(
    '.about-me__block',
    0.8,
    {
      width: '0',
      ease: Power1.easeIn,
      delay: 2
    },
    0.04
  );

  TweenMax.to('.about-me__loading-text', 1, {
    x: 2,
    opacity: 0,
    ease: Expo.easeInOut,
    delay: 1.5
  });

  TweenMax.staggerFrom(
    '.about-me__header, .about-me__contact-section, .about-me__footer, .about-me__title, .about-me__text, .about-me__section, .about-me__container',
    2,
    {
      opacity: 0,
      y: 30,
      ease: Expo.easeInOut,
      delay: 3
    },
    0.06
  );

  setTimeout(() => {
    isLoading.value = false;
    document.body.classList.remove('no-scroll');
  }, 4500);

  document.body.classList.add('no-scroll');
});

watch(isLoading, (newValue) => {
  if (!newValue) {
    window.scrollTo(0, 0);
  }
});
</script>

<style lang="scss" scoped>
.about-me {
  background-color: $color-salvia;
  width: 100%;
  height: 100vh;

  &--no-scroll {
    overflow: hidden;
  }

  &__content-wrapper {
    position: absolute;
    width: 100% !important;
    z-index: 2;
  }

  &__header {
    background-color: $color-mist;
  }

  &__title {
    font-family: 'Gunterz';
    font-size: 4vw;
    text-align: center;
    padding-top: 10%;
    color: $color-beige;
    background-color: $color-mist;

    @media (max-width: 1280px) {
      font-size: 7vw;
      letter-spacing: 0.3rem;
      padding: 2rem 0;
    }
  }

  &__subtitle {
    font-family: 'Gunterz';
    font-size: 3vw;
    text-align: center;
    padding-top: 5%;
    color: $color-beige;
    background-color: $color-mist;

    @media (max-width: 1280px) {
      padding-top: 5rem;
      font-size: 4vw;
    }
  }

  &__container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $color-mist;
  }

  &__cards-container {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: $color-mist;
  }

  &__section {
    text-align: center;
    max-width: 1600px;
    width: 100%;
    padding: 5% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-mist;

    &--first {
      width: 80%;
      text-align: start;

      @media (max-width: 1280px) {
        text-align: center;
        flex-direction: column-reverse;
        width: 100%;

        .about-me__icon {
          width: 8%;
          height: 8%;
          margin-left: 0;
          margin-bottom: 2rem;
        }

        .about-me__text--first {
          width: 90%;
          font-size: 1rem;
        }
      }
    }

    &--second {
      flex-direction: column;
    }
  }

  &__text {
    width: 80%;
    font-weight: 900;
    font-size: 1.5vw;
    color: $color-beige;
    background-color: $color-mist;

    @media (max-width: 1280px) {
      font-size: 1rem;
    }

    &--first {
      width: 40%;
    }
  }

  &__card-bar {
    width: 100%;
    height: 1px;
    background-color: $color-beige;
    margin-top: 1rem;
  }

  &__icon {
    width: 20%;
    height: 20%;
    fill: $color-beige;
    margin-left: 5rem;
  }

  &__ball {
    width: 200px;
    height: 200px;
    background-color: $color-beige;
    border-radius: 50%;
    margin-bottom: 3rem;

    @media (max-width: 1585px) {
      width: 120px;
      height: 120px;
    }

    @media (max-width: 860px) {
      width: 100px;
      height: 100px;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: $color-beige;
      border-radius: 50%;
      top: 25%;
      left: 35%;
    }

    &::before {
      content: '';
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: $color-beige;
      border-radius: 50%;
      top: 25%;
      right: 35%;
    }

    @media (max-width: 1585px) {
      &::after,
      &::before {
        display: none;
      }
    }
  }

  &__loading-text {
    font-family: 'Gunterz';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    font-size: 1.5vw;
    color: $color-white;
    z-index: 999;

    @media (max-width: 1280px) {
      font-size: 3vw;
    }
  }

  &__cards {
    padding: 10rem 0;
    width: 90%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 10rem;
    column-gap: 20rem;
    height: 100%;
    background-color: $color-mist;
    color: $color-beige;
    font-size: 1.6rem;
    justify-content: center;

    @media (max-width: 1585px) {
      flex-direction: column;
      row-gap: 5rem;
      column-gap: 0;
    }

    @media (max-width: 960px) {
      font-size: 1rem;
      padding: 5rem 0;
    }

    p {
      width: 550px;

      @media (max-width: 1585px) {
        width: 100%;
      }
    }

    &-bar {
      width: 100%;
      height: 0.5px;
      background-color: $color-beige;
      margin-top: 1rem;
    }
  }

  &__overlay {
    width: 100%;
    height: 100vh;
  }

  &__block {
    position: fixed;
    width: 5%;
    height: 100vh;
    background-color: $color-mist;

    &--1 {
      left: 0;
    }
    &--2 {
      left: 5%;
    }
    &--3 {
      left: 10%;
    }
    &--4 {
      left: 15%;
    }
    &--5 {
      left: 20%;
    }
    &--6 {
      left: 25%;
    }
    &--7 {
      left: 30%;
    }
    &--8 {
      left: 35%;
    }
    &--9 {
      left: 40%;
    }
    &--10 {
      left: 45%;
    }
    &--11 {
      left: 50%;
    }
    &--12 {
      left: 55%;
    }
    &--13 {
      left: 60%;
    }
    &--14 {
      left: 65%;
    }
    &--15 {
      left: 70%;
    }
    &--16 {
      left: 75%;
    }
    &--17 {
      left: 80%;
    }
    &--18 {
      left: 85%;
    }
    &--19 {
      left: 90%;
    }
    &--20 {
      left: 95%;
    }
  }
}
</style>

<style lang="scss">
.no-scroll {
  overflow: hidden;
}
</style>
