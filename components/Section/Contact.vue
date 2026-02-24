<template>
  <section class="contact">
    <div class="contact__container">
      <div class="contact__header">
        <h2 class="contact__header-title">004 / Contato</h2>
        <div class="contact__header-line"></div>
      </div>
      <h2 class="contact__title">Entre em contato</h2>

      <div class="contact__messages">
        <div class="contact__status contact__status--sent" :style="{
          transform: isMessageSent ? 'translateX(0%)' : 'translateX(-100%)'
        }">
          E-Mail Enviado
        </div>

        <div class="contact__status contact__status--not-sent" :style="{
          transform: isMessageNotSent ? 'translateX(0%)' : 'translateX(-100%)'
        }">
          E-Mail não enviado
        </div>
      </div>

      <div class="contact__form-wrapper">
        <form @submit.prevent="sendEmail" class="contact__form">
          <div :class="[
            'contact__group',
            { 'contact__group--invalid': !nameValid }
          ]">
            <span v-if="!nameValid" class="contact__error">Nome inválido</span>
            <input class="contact__input" placeholder="Seu Nome *" type="text" id="name" v-model="form.name" required />
            <div class="contact__bar"></div>
          </div>

          <div :class="[
            'contact__group',
            { 'contact__group--invalid': !emailValid }
          ]">
            <span v-if="!emailValid" class="contact__error">Email inválido</span>
            <input class="contact__input" placeholder="Seu Email *" type="email" id="email" v-model="form.email"
              required />
            <div class="contact__bar"></div>
          </div>

          <div :class="[
            'contact__group',
            { 'contact__group--invalid': !messageValid }
          ]">
            <span v-if="!messageValid" class="contact__error">Mensagem inválida</span>
            <textarea class="contact__textarea" placeholder="Sua Mensagem *" id="message" v-model="form.message"
              rows="5" required></textarea>
            <div class="contact__bar"></div>
          </div>

          <button class="contact__button" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Enviando...' : 'Enviar' }}
          </button>
        </form>

        <UIThreeSpheres class="contact__spheres" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==================== DATA ====================
const form = reactive({
  name: '',
  email: '',
  message: ''
});

const isMessageSent = ref(false);
const isMessageNotSent = ref(false);
const isLoading = ref(false);

const emailValid = ref(true);
const nameValid = ref(true);
const messageValid = ref(true);

// ==================== VALIDATION ====================
const validateEmail = (email) => {
  // RFC 5322 simplified regex for better email validation
  const emailRegex = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
};

const validateName = (name) => {
  const trimmedName = name.trim();
  // Minimum 3 characters, only letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zàáâãäåâæçèéêëìíîïðñòóôõöøùúûüýþÿœ\s\-']{3,}$/i;
  return nameRegex.test(trimmedName) && trimmedName.length >= 3 && trimmedName.length <= 100;
};

const validateMessage = (message) => {
  const trimmedMessage = message.trim();
  // Minimum 10 characters for a meaningful message
  return trimmedMessage.length >= 10 && trimmedMessage.length <= 5000;
};

const sanitizeInput = (input) => {
  return input.trim().slice(0, 5000);
};

// ==================== FORM HANDLING ====================
const resetForm = () => {
  form.name = '';
  form.email = '';
  form.message = '';
  isLoading.value = false;
};

const showSuccessMessage = () => {
  isMessageSent.value = true;
  resetForm();
  setTimeout(() => {
    isMessageSent.value = false;
  }, 3000);
};

const showErrorMessage = () => {
  isMessageNotSent.value = true;
  isLoading.value = false;
  setTimeout(() => {
    isMessageNotSent.value = false;
  }, 3000);
};

const sendEmail = async () => {
  // Validate all fields before submission
  if (!nameValid.value || !emailValid.value || !messageValid.value) {
    showErrorMessage();
    return;
  }

  // Prevent multiple submissions
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.post(
      `https://formspree.io/f/${import.meta.env.VITE_FORM_ID}`,
      {
        name: sanitizeInput(form.name),
        email: sanitizeInput(form.email),
        message: sanitizeInput(form.message)
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      }
    );
    if (response.status === 200) {
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  } catch (error) {
    console.error('Error sending email:', error);
    showErrorMessage();
  }
};

// ==================== WATCHERS ====================
watch(
  () => form.email,
  (newEmail) => {
    // Valid if empty (field optional until submit) or passes validation
    emailValid.value = newEmail === '' || validateEmail(newEmail);
  }
);

watch(
  () => form.name,
  (newName) => {
    // Valid if empty (field optional until submit) or passes validation
    nameValid.value = newName === '' || validateName(newName);
  }
);

watch(
  () => form.message,
  (newMessage) => {
    // Valid if empty (field optional until submit) or passes validation
    messageValid.value = newMessage === '' || validateMessage(newMessage);
  }
);

// ==================== ANIMATIONS ====================
const animateTitle = () => {
  gsap.from('.contact__title', {
    scrollTrigger: {
      trigger: '.contact__title',
      start: 'top 80%',
      once: true,
      markers: false
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  });
};

const animateFormFields = () => {
  gsap.from('.contact__group', {
    scrollTrigger: {
      trigger: '.contact__form',
      start: 'top 80%',
      once: true,
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

const animateSubmitButton = () => {
  gsap.from('.contact__button', {
    scrollTrigger: {
      trigger: '.contact__form',
      start: 'top 80%',
      once: true,
      markers: false
    },
    opacity: 0,
    scale: 0.8,
    y: 30,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  });
};

const animateSpheres = () => {
  gsap.from('.contact__spheres', {
    scrollTrigger: {
      trigger: '.contact__form-wrapper',
      start: 'top 80%',
      once: true,
      markers: false
    },
    opacity: 0,
    scale: 0.5,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  });
};

const setupAnimations = () => {
  animateTitle();
  animateFormFields();
  animateSubmitButton();
  animateSpheres();
  
  // Refresh ScrollTrigger with delay to ensure all triggers are properly calculated
  gsap.delayedCall(0.5, () => {
    ScrollTrigger.refresh();
  });
};

// ==================== LIFECYCLE ====================
onMounted(async () => {
  await nextTick();
  setupAnimations();
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
</script>

<style lang="scss" scoped>
.contact {
  margin-bottom: 6.5rem;
  border-radius: 0 0 3rem 3rem;

  @media (max-width: 560px) {
    margin-bottom: 12rem;
  }

  &__container {
    max-width: 1600px;
    margin: 0 auto;

    @media (max-width: 1760px) {
      padding: 0 2rem;
    }
  }

  &__spheres {
    margin-top: 3rem;
  }

  &__title {
    margin: 5rem 0;

    font-family: 'Gunterz';
    font-size: 6vw;
    text-align: center;
    text-transform: uppercase;
    color: $color-ice-gray;
  }

  &__form-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom: 5rem;

    @media (max-width: 1760px) {
      flex-direction: column;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
    margin-right: 5rem;

    @media (max-width: 1760px) {
      margin: 0;
    }
  }

  &__group {
    display: flex;
    flex-direction: column;

    padding: 1.5rem;
    margin: 1rem 0;
    background-color: var(--color-graphite);
    border-radius: 2rem 0 2rem 0;

    transition: background-color 0.5s ease;

    &--invalid {
      .contact__bar {
        background-color: $color-crimson;
      }

      .contact__input::placeholder,
      .contact__textarea::placeholder {
        color: $color-crimson;
      }
    }
  }

  &__error {
    margin-bottom: 0.5rem;

    font-size: 1.2rem;
    color: $color-crimson;
  }

  &__input,
  &__textarea {
    padding: 0.5rem;

    resize: none;
    border: none;
    border-radius: 4px;

    font-size: 1.2rem;
    background: transparent;
    color: $color-ice-gray;

    &:focus {
      box-shadow: none;
      border: none;
      outline: none;
    }
  }

  &__textarea {
    min-height: 8rem;
  }

  &__button {
    margin: 1rem 0 0 auto;
    width: 130px;

    padding: 0.5rem 2rem;
    border: none;
    border-radius: 1rem 0;

    font-size: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    border: 2px solid $color-ice-gray;
    color: $color-ice-gray;
    background-color: transparent;

    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover:not(:disabled) {
      color: $color-slate-gray;
      border: 2px solid $color-slate-gray;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__bar {
    margin: 0.5rem 0;
    width: 100%;
    height: 1px;

    background-color: $color-ice-gray;
  }

  &__messages {
    overflow: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;

    color: $color-white;
  }

  &__header-title {
    text-wrap: nowrap;
  }

  &__header-line {
    width: 100%;
    height: 2px;

    background-color: $color-white;
  }

  @mixin status-badge($background-color) {
    width: fit-content;
    padding: 4px 16px;

    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    color: $color-ice-gray;
    background-color: $background-color;

    border-radius: 24px;
    transition: all 0.3s ease-in-out;
  }

  &__status {
    &--sent {
      @include status-badge($color-forest-green);
    }

    &--not-sent {
      @include status-badge($color-crimson);
    }
  }
}
</style>
