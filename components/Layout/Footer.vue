<template>
  <footer class="footer">
    <div class="footer__section footer__section--left">
      <p class="footer__edition">{{ year }} © Edition</p>
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

<script setup>
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: -1;

  width: 100%;
  height: 10rem;
  padding: 1.5rem 3rem;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  
  background-color: var(--color-gunmetal);
  color: $color-white;
  transition: all 0.5s ease;

  @media (max-width: 560px) {
    height: 14rem;

    flex-direction: column;
    justify-content: end;
    align-items: start;
    gap: 1rem; 
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
    font-size: 1.1rem;
    font-weight: 600;
    color: $color-white;
  }

  &__links {
    display: flex;
    list-style: none;
    gap: 1rem;

    font-size: 1.1rem;
  }

  &__link {
    font-weight: 600;
    cursor: pointer;

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
    width: 0;
    height: 2px;
    
    background-color: $color-white;
    transition: all ease 0.7s;
  }
}
</style>
