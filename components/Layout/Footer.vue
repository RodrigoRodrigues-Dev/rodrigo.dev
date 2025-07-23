<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="footer">
    <div class="footer__section footer__section--left">
      <p class="footer__edition">2025 © Edition</p>
      <UICurrentDateTime class="footer__datetime" />
    </div>
    <div class="footer__section footer__section--right">
      <h4 class="footer__title">Socials</h4>
      <ul class="footer__links">
        <li class="footer__link">
          <a
            href="https://www.linkedin.com/in/rodrigo-rodrigues-dev/"
            target="_blank"
          >
            Linkedin
          </a>
          <div class="footer__bar"></div>
        </li>
        <li class="footer__link">
          <a href="https://github.com/RodrigoRodrigues-Dev" target="_blank">
            GitHub
          </a>
          <div class="footer__bar"></div>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 1rem 3rem;
  align-items: flex-end;
  background-color: $color-grayish-lime-green;
  bottom: 0;
  display: flex;
  height: 10rem;
  justify-content: space-between;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: -1;
  color: $color-white;

  @media (max-width: 560px) {
    flex-direction: column;
    justify-content: end;
    gap: 1rem;
    align-items: start;
    height: 14rem;
  }

  &__section {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin-bottom: 0.2rem;
    opacity: 0.8;
  }

  &__edition {
    margin-bottom: 0.2rem;
    opacity: 0.8;
  }

  &__datetime {
    color: $color-white;
    font-size: 1.1rem;
    font-weight: 600;
  }

  &__links {
    display: flex;
    list-style: none;
    gap: 1rem;
    font-size: 1.1rem;
  }

  &__link {
    cursor: pointer;
    font-weight: 600;

    &:hover {
      .footer__bar {
        width: 100%;
        margin-left: auto;
      }
    }

    a {
      color: inherit;
    }
  }

  &__bar {
    transition: all ease 0.7s;
    width: 0;
    height: 2px;
    background-color: $color-white;
  }
}
</style>
