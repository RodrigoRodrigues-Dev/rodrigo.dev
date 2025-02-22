<template>
    <div class="contact-section">
        <div class="contact-container">
            <h2 class="contact-title">Entre em contato</h2>
            <div class="form-wrapper">
                <form @submit.prevent="sendEmail" class="contact-form">
                    <div class="form-group" :class="{ 'form-group--invalid': !nameValid }">
                        <span v-if="!nameValid" class="form-group__message-error">Nome Invalido</span>
                        <input placeholder="Seu Nome *" type="text" id="name" v-model="form.name" required />
                        <div class="input-bar"></div>
                    </div>
                    <div class="form-group" :class="{ 'form-group--invalid-email': !emailValid }">
                        <span v-if="!emailValid" class="form-group__message-error">Email Invalido</span>
                        <input placeholder="Seu Email *" type="email" id="email" v-model="form.email" required />
                        <div class="input-bar"></div>
                    </div>
                    <div class="form-group" :class="{ 'form-group--invalid': !messageValid }">
                        <span v-if="!messageValid" class="form-group__message-error">Mensagem Invalida</span>
                        <textarea placeholder="Sua Mensagem *" id="message" v-model="form.message" rows="5" required></textarea>
                        <div class="input-bar"></div>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
                <ThreeSpheres />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import axios from 'axios';

const form = reactive({
    name: '',
    email: '',
    message: ''
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateName = (name) => {
    return name.trim().length > 0;
};

const validateMessage = (message) => {
    return message.trim().length > 0;
};

const emailValid = ref(true);
const nameValid = ref(true);
const messageValid = ref(true);

watch(() => form.email, (newEmail) => {
    emailValid.value = validateEmail(newEmail);
});

watch(() => form.name, (newName) => {
    nameValid.value = validateName(newName);
});

watch(() => form.message, (newMessage) => {
    messageValid.value = validateMessage(newMessage);
});

const sendEmail = async () => {
    if (!emailValid.value || !nameValid.value || !messageValid.value) {
        return;
    }

    try {
        const response = await axios.post(`https://formspree.io/f/${import.meta.env.VITE_FORM_ID}`, {
            name: form.name,
            email: form.email,
            message: form.message
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert('Message sent successfully!');
            form.name = '';
            form.email = '';
            form.message = '';
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            alert(`Failed to send message: ${error.response.data.error}`);
        } else {
            alert('Failed to send message.');
        }
    }
};
</script>

<style lang="scss" scoped>
.contact-section {
    padding: 6rem 0;
    margin-bottom: 6rem;
    border-radius: 0 0 3rem 3rem;
    background-color: $color-mist;

    @media (max-width: 560px) {
        margin-bottom: 12rem;
    }

    .contact-container {
        max-width: 1600px;
        margin: 0 auto;
        border-top: 1px solid $color-beige;

        @media (max-width: 1760px) {
            padding: 0 2rem;
        }
    }

    .contact-title {
        margin: 5rem 0 10rem;
        font-family: 'Gunterz';
        color: $color-beige;
        text-align: center;
        font-size: 6vw;
        text-transform: uppercase;
    }

    .form-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 5rem;

        @media (max-width: 1760px) {
            flex-direction: column;
        }
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        margin-right: 5rem;

        @media (max-width: 1760px) {
            margin: 0;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            margin: 1rem 0;

            &__message-error {
                color: $color-cinnabar;
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }

            &--invalid-email {
                .input-bar {
                    background-color: $color-cinnabar;
                }

                input::placeholder {
                    color: $color-cinnabar;
                }
            }

            &--invalid {
                .input-bar {
                    background-color: $color-cinnabar;
                }

                input::placeholder,
                textarea::placeholder {
                    color: $color-cinnabar;
                }
            }
        }

        input, textarea {
            resize: none;
            padding: 0.5rem;
            border: none;
            border-radius: 4px;
            background: transparent;
            font-size: 1.2rem;

            &:focus {
                box-shadow: none;
                border: none;
                outline: none;
            }
        }

        button {
            margin: 1rem 0 0 auto;
            width: 130px;
            padding: 1.2rem 2rem;
            background-color: $color-beige;
            color: $color-white;
            border: none;
            border-radius: 1rem;
            cursor: pointer;
            text-transform: uppercase;
            font-size: 1rem;
        }
    }

    .input-bar {
        margin: 0.5rem 0;
        width: 100%;
        height: 1px;
        background-color: $color-beige;
    }
}
</style>