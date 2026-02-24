<template>
  <header class="header">
    <RouterLink to="/">
      <img class="header__logo" src="/public/images/Logo.webp" alt="">
    </RouterLink>

    <nav class="header__right">
      <a 
        href="https://rodrigo-dev-curriculo.vercel.app/Rodrigo%20Rodrigues%20-%20Curriculo.pdf" 
        target="_blank"
        class="header__btn"
      >
        Rodrigo Curriculo | Ver
      </a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 3rem 4rem;
  border-radius: 3rem 3rem 0 0;
  background-color: var(--color-obsidian);
  transition: background-color 0.5s ease;

  @media (max-width: 760px) {
    padding: 2rem 2rem;
  }

  &__logo {
    width: 29px;
    height: 34px;

    @media (max-width: 760px) {
      width: 20px;
      height: 25px;
    }

    @media (max-width: 520px) {
      width: 20px;
      height: 25px;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }

  &__btn {
    position: relative;
    overflow: hidden;  
    z-index: 0;  

    padding: 0.75rem 1.5rem;
    font-size: 1rem;

    border: 3px solid $color-ice-gray;
    border-radius: 8px 0 8px 0;
    background: transparent;
    color: $color-ice-gray;

    transition: color .6s;
    cursor: pointer;

    @media (max-width: 760px) {
      padding: 0.70rem 1rem;
      font-size: 0.8rem;
    }

    @media (max-width: 520px) {
      padding: 0.60rem 1rem;
      font-size: 0.65rem;
    }

    &::before {
      position: absolute;
      z-index: -1;
      inset: 0;
      content: '';

      padding: 0 1.5rem;
      background-color: $color-white;

      transform: scaleY(0);
      transform-origin: bottom;
      transition: transform .6s cubic-bezier(.215, .61, .355, 1);
    }

    &:hover {
      &::before {
        padding: 0.75rem 1.5rem;
        transform: scaleY(1);
      }

      color: $color-graphite;
    }
  }
}
</style>
