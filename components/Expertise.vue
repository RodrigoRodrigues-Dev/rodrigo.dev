<template>
    <section class="expertise">
        <div class="expertise__container">
            <h2 class="expertise__title">
                <span v-for="(letter, index) in title" :key="index" class="expertise__title__letter">{{ letter }}</span>
            </h2>
            <div class="expertise__grid">
                <ExpertiseCard v-for="(card, index) in cards" :key="index" :icon="card.icon" :title="card.title"
                    :description="card.description" />
            </div>
        </div>
        <div class="expertise__background-ball"></div>
        <RouterLink to="AboutMe">
            <div class="about-me">
                <p class="about-me__text">mais sobre mim</p>
                <div class="about-me__bar"></div>
            </div>
        </RouterLink>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExpertiseCard from './ExpertiseCard.vue';

const title = 'Conhecimentos'.split('');
const cards = [
    {
        icon: 'bx:bxl-html5',
        title: 'Frontend Development',
        description: 'Domínio em VueJS, NuxtJS, jQuery, HTML, CSS<br>Especialista em SASS, Bootstrap 5, LESS'
    },
    {
        icon: 'iconoir:tools',
        title: 'Build Tools',
        description: 'Proficiência em Gulp, Grunt, Parcel<br>Experiência com Babel, Git'
    },
    {
        icon: 'nonicons:javascript-16',
        title: 'JavaScript Ecosystem',
        description: 'Especialista em JavaScript, TypeScript<br>Experiência com NodeJS'
    },
    {
        icon: 'proicons:webpack',
        title: 'Web Development',
        description: 'Profundo conhecimento em stack web moderna<br>Habilidade excepcional em SPAs e design responsivo<br>Apaixonado por criar experiências de UI/UX incríveis'
    },
    {
        icon: 'streamline:interface-lighting-light-bulb-lighting-light-incandescent-bulb-lights',
        title: 'Technical Skills',
        description: 'Domínio em paradigmas Funcionais & OOP<br>Soluções multiplataforma robustas<br>Integração de API eficiente'
    }
];

const setScrollTriggerValues = () => {
    const isSmallScreen = window.innerWidth <= 1024 || window.innerHeight <= 980;
    if (isSmallScreen) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        return;
    }

    const startValue = 'top 70%';
    const endValue = 'bottom 120%';

    gsap.from('.expertise__title__letter', {
        y: -100,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.expertise',
            start: startValue,
            end: endValue,
            scrub: true,
        }
    });

    gsap.from('.expertise__background-ball', {
        x: -1000,
        scrollTrigger: {
            trigger: '.expertise',
            start: startValue,
            end: endValue,
            scrub: true,
        }
    });
};

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    setScrollTriggerValues();
    window.addEventListener('resize', setScrollTriggerValues);
});
</script>

<style lang="scss" scoped>
.expertise {
    position: relative;
    height: auto;
    width: 100%;
    margin: 0 auto;

    &__container {
        margin: 0 auto;
        max-width: 1300px;
        text-transform: uppercase;
        text-align: center;

        @media (max-width: 1300px) {
            padding: 0 2rem;
        }
    }

    &__title {
        margin-bottom: 7rem;
        font-size: 4.5rem;
        color: $color-beige;
        height: 1.075em;
        overflow-y: hidden;

        @media (max-width: 1760px) {
            font-size: 3rem;
        }

        @media (max-width: 640px) {
            font-size: 2rem;
        }

        &__letter {
            display: inline-block;
            font-family: 'Gunterz';
            transform: translateY(0px);
        }
    }

    &__grid {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2.5rem;
        flex-wrap: wrap;

        @media (max-width: 1228px) {
            display: grid;
        }
    }

    &__background-ball {
        width: 750px;
        height: 800px;
        background-color: $color-beige;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -23%;
        border-radius: 50%;

        @media (max-width: 1880px) {
            left: -30%;
        }

        @media (max-width: 1700px) {
            left: -37%;
        }

        @media (max-width: 1600px) {
            display: none;
        }
    }
}

.about-me {
    text-align: right;
    color: $color-beige;
    margin: 5rem 10rem 5rem auto;
    width: 260px;

    @media (max-width: 1290px) {
        margin: 5rem 3rem 2rem auto;
    }

    &__text {
        font-family: 'Gunterz';
        cursor: pointer;
        font-size: 1.5rem;
        text-transform: uppercase;
        text-decoration: none;
    }

    &:hover {
        .about-me__bar {
            width: 0%;
            margin-left: auto;
        }
    }

    &__bar {
        transition: all ease 0.7s;
        background-color: $color-beige;
        width: 100%;
        height: 5px;
    }
}
</style>