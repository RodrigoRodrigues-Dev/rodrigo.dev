<template>
    <p>{{ currentDateTime }}</p>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentDateTime = ref('');

const updateDateTime = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    currentDateTime.value = `${day}, ${date} ${month}, ${hours}:${minutes}`;
};

onMounted(() => {
    updateDateTime();
    setInterval(updateDateTime, 60000);
});
</script>

<style lang="scss" scoped>
p {
    font-size: 1.2rem;
    color: $color-very-dark-gray;
}
</style>
