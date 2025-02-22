<template>
  <div ref="container" class="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const width = container.value?.clientWidth ?? 800;
  const height = container.value?.clientHeight ?? 600;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x333333);
  if (container.value) {
    container.value.appendChild(renderer.domElement);
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const sphereGroup = new THREE.Group();
  const geometry = new THREE.SphereGeometry(10, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const sphereCount = 10;
  for (let i = 0; i < sphereCount; i++) {
    const mesh = new THREE.Mesh(geometry, material.clone());
    mesh.material.color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 55
    );
    sphereGroup.add(mesh);
  }

  scene.add(sphereGroup);

  function animate() {
    requestAnimationFrame(animate);
    sphereGroup.rotation.y += 0.002;
    sphereGroup.rotation.x += 0.001;
    renderer.render(scene, camera);
  }

  animate();
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 600px;
  border-radius: 1rem;
  overflow: hidden;

  @media (max-width: 1760px) {
    margin-top: 10rem;
  }
}
</style>
