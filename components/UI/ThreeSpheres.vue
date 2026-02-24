<template>
  <div ref="container" class="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

// ==================== REFS ====================
const container = ref<HTMLDivElement | null>(null);

// ==================== THREE.JS SCENE SETUP ====================
const initializeScene = () => {
  const width = container.value?.clientWidth ?? 800;
  const height = container.value?.clientHeight ?? 600;

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x333333);

  if (container.value) {
    container.value.appendChild(renderer.domElement);
  }

  // Setup lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Create spheres
  const sphereGroup = new THREE.Group();
  const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const sphereCount = 10;
  for (let i = 0; i < sphereCount; i++) {
    const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
    mesh.material.color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 55
    );
    sphereGroup.add(mesh);
  }

  scene.add(sphereGroup);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    sphereGroup.rotation.y += 0.002;
    sphereGroup.rotation.x += 0.001;
    renderer.render(scene, camera);
  };

  animate();
};

// ==================== LIFECYCLE ====================
onMounted(() => {
  initializeScene();
});
</script>

<style scoped>
.container {
  overflow: hidden;
  
  width: 100%;
  height: 600px;
  border-radius: 5rem 0 5rem 0;

  @media (max-width: 1760px) {
    margin-top: 10rem;
  }
}
</style>
