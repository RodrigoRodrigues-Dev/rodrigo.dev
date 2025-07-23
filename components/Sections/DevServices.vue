<template>
  <section class="dev-services">
    <div class="dev-services__description">
      Como desenvolvedor front end junior, integro equipes multidisciplinares
      para criar interfaces intuitivas e experiencias digitais de alto impacto.
    </div>
    <div class="dev-services__overlay"></div>
    <div ref="threeCanvas" class="dev-services__canvas"></div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

const threeCanvas = ref(null);

const initThreeJS = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa1a499);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeCanvas.value.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xcadbc8 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube.position.set(5.5, -2.5, 0);

    renderer.render(scene, camera);
  };

  animate();
};

onMounted(() => {
  initThreeJS();
});
</script>

<style lang="scss" scoped>
.dev-services {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 100vh;

  &__overlay {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }

  &__description {
    font-family: 'Gunterz';
    text-align: center;
    text-transform: uppercase;
    width: 70%;
    color: $color-white;
    z-index: 2;
    font-size: 3rem;

    @media (max-width: 1350px) {
      font-size: 2rem;
    }

    @media (max-width: 760px) {
      font-size: 1.2rem;
    }
  }

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
</style>
