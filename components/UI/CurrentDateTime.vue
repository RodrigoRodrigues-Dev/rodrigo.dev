<template>
  <p>{{ currentDateTime }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentDateTime = ref('');

// ==================== DATE AND TIME CONSTANTS ====================
const DAYS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

// ==================== UTILITIES ====================
/**
 * Format the current date and time
 * @returns {string} Formatted date and time string
 */
const formatDateTime = () => {
  const now = new Date();
  const day = DAYS[now.getDay()];
  const date = now.getDate();
  const month = MONTHS[now.getMonth()];
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${day}, ${date} ${month}, ${hours}:${minutes}`;
};

/**
 * Update the current date and time
 */
const updateDateTime = () => {
  currentDateTime.value = formatDateTime();
};

// ==================== LIFECYCLE ====================
onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000);
});
</script>

<style lang="scss" scoped>
p {
  font-size: 1.2rem;
  color: $color-graphite;
}
</style>
