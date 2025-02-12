<template>
    <div class="expertise__card">
        <div class="expertise__card-header">
            <Icon :class="['expertise__card-icon', icon]" :name="icon" size="30" />
            <h3 class="expertise__card-title">{{ title }}</h3>
        </div>
        <p v-html="description"></p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    icon: String,
    title: String,
    description: String
});
</script>

<style scoped lang="scss">
.expertise__card {
    z-index: 999;
    color: $color-beige;
    border: 1px solid $color-beige;
    padding: 3rem 5rem;

    &-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    &-title {
        margin: 1rem 0;
    }
}
</style>
