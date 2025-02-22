<template>
    <section class="projects">
        <div class="projects__balls">
            <div class="projects__ball projects__ball--1"></div>
            <div class="projects__ball projects__ball--2"></div>
        </div>
        <h1 class="projects__title">Projetos</h1>
        <div class="projects__container">
            <div class="projects__container-names" ref="container">
                <div v-for="(project, index) in projects" :key="index" @mouseover="setMainImage(project.projectImage)"
                    @mouseleave="resetMainImage()" class="projects__project-text-container">
                    <a :href="project.projectLink" target="_blank" class="projects__project-text">{{ project.projectName }}</a>
                    <a :href="project.projectLink" target="_blank" class="projects__project-text--bottom">{{ project.projectName }}
                        <svg viewBox="0 0 24 24" class="projects__arrow-work" style="width: 2rem; height: 2rem;">
                            <path fill="#E2D4B7" d="M3.2 23.3.7 20.8 17.5 4h-15V.5h21v21H20v-15L3.2 23.3Z"></path>
                            <path fill="#E2D4B7" d="M3.2 24 0 20.8 16.3 4.5H2V0h22v22h-4.5V7.7L3.2 24ZM20 6.5v15h3.5V.5h-21V4h15L.7 20.8l2.5 2.5L20 6.5Z"></path>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="projects__tooltip-card">
                <img v-for="(project, index) in projects" :key="index" :src="project.projectImage" alt=""
                    style="transform: translateY(100%);" class="projects__tooltip-card-image" :ref="el => tooltipImages[index] = el">
            </div>
            <div class="projects__background-ball"></div>
        </div>
    </section>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const container = ref(null);
const projects = ref([]);
const tooltipImages = ref([]);

const resetMainImage = () => {
    tooltipImages.value.forEach((tooltipImage) => {
        tooltipImage.style.transform = `translateY(100%)`;
    });
};

const setMainImage = (image) => {
    tooltipImages.value.forEach((tooltipImage) => {
        tooltipImage.style.transform = tooltipImage.src === image ? `translateY(0%)` : `translateY(100%)`;
    });
};

const fetchData = async () => {
    try {
        const response = await axios.get('https://110cbe32dcdc6022.mokky.dev/projects');
        projects.value = response.data;
    } catch (error) {
        console.error(error);
    }
};

const animateText = (elements, yStart, yEnd) => {
    elements.forEach((element) => {
        const svgElement = element.querySelector('svg');
        let svgClone = null;
        if (svgElement) {
            svgClone = svgElement.cloneNode(true);
            svgElement.remove();
            const paths = svgClone.querySelectorAll('path');
            gsap.set(paths, { y: yStart, opacity: 0 });
        }
        
        const text = element.textContent;
        element.innerHTML = '';
        
        for (const char of text) {
            const span = document.createElement('span');
            span.innerText = char.trim() === '' ? '\u00A0' : char;
            span.classList.add('projects__letter');
            element.appendChild(span);
        }
        
        if (svgClone) {
            element.appendChild(svgClone);
        }
        
        element.parentElement.addEventListener('mouseenter', () => {
            gsap.to(element.querySelectorAll('.projects__letter'), {
                y: yEnd,
                stagger: 0.03,
                ease: 'power1.inOut',
                duration: 0.5
            });
            if (svgClone) {
                gsap.to(svgClone.querySelectorAll('path'), {
                    y: yEnd,
                    opacity: 1,
                    ease: 'power1.inOut',
                    duration: 0.5
                });
            }
        });
        
        element.parentElement.addEventListener('mouseleave', () => {
            gsap.to(element.querySelectorAll('.projects__letter'), {
                y: yStart,
                stagger: 0.03,
                ease: 'power1.inOut',
                duration: 0.5
            });
            if (svgClone) {
                gsap.to(svgClone.querySelectorAll('path'), {
                    y: yStart,
                    opacity: 0,
                    ease: 'power1.inOut',
                    duration: 0.5
                });
            }
        });
    });
};

onMounted(async () => {
    await fetchData();
    const letters = container.value.querySelectorAll('.projects__project-text');
    const lettersBottom = container.value.querySelectorAll('.projects__project-text--bottom');
    animateText(letters, '0%', '-100%');
    animateText(lettersBottom, '100%', '0%');
});
</script>

<style lang="scss">
.projects {
    overflow-x: hidden;
    position: relative;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1639px) {
        justify-content: center;
    }

    @media (max-width: 1180px) {
        flex-direction: column;
        padding: 10rem 1rem;
        height: auto;
    }

    &__title {
        transform: rotate(-90deg);
        font-family: 'Gunterz';
        font-size: 3.5rem;
        color: $color-beige;
        text-transform: uppercase;

        @media (max-width: 1180px) {
            transform: rotate(0deg);
            margin-bottom: 3rem;
            font-size: 3rem;
        }

        @media (max-width: 960px) {
            font-size: 2rem;
        }
    }

    &__container {
        margin: 0 auto;
        height: 100%;
        max-width: 1750px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__container-names {
        width: 90%;
        display: flex;
        flex-direction: column;

        @media (max-width: 1180px) {
            width: 100%;
        }
    }

    &__project-text,
    &__project-text--bottom {
        text-decoration: none;
        color: $color-beige;
        font-size: 3.5rem;
        margin: 10px;
        position: absolute;
        top: 0;
        left: 0;

        @media (max-width: 960px) {
            font-size: 2rem;
        }
    }

    &__project-text-container {
        overflow: hidden;
        position: relative;
        height: 5rem;
        margin: 1rem 0;
        cursor: pointer;

        @media (max-width: 960px) {
            height: 3rem;
        }
    }

    &__letter {
        display: inline-block;
        will-change: transform;
        font-family: 'Gunterz';
    }

    &__project-text--bottom .projects__letter {
        transform: translateY(100%);
    }

    &__tooltip-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 50%;
        z-index: 9999;
        right: 120px;
        height: 500px;
        overflow: hidden;

        @media (max-width: 1639px) {
            display: none;
        }

        span {
            font-family: 'Gunterz';
            font-size: 3rem;
            margin-left: 1.5rem;
        }
    }

    &__tooltip-card-image {
        position: absolute;
        object-fit: contain;
        border-radius: 1rem;
        height: 100%;
        transition: all 0.6s ease;
    }

    &__background-ball {
        width: 750px;
        height: 800px;
        background-color: $color-beige;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -23%;
        border-radius: 50%;

        @media (max-width: 1881px) {
            display: none;
        }
    }
}

.projects__balls {
    position: absolute;
    display: flex;
    top: 10%; 
    right: 70%;
    transform: rotate(-60deg);
    gap: 2rem;

    @media (max-width: 1180px) {
        display: none;
    }
}

.projects__ball {
    z-index: 9999;
    height: 120px;
    width: 120px;
    border-radius: 100%;
    background-color: $color-beige;
}

.projects__ball--1 {
    height: 40px;
    width: 40px
}
</style>