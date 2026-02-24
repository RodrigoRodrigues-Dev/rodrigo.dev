<template>
  <NuxtPage />
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useScrollTheme } from '~/composables/useScrollTheme'

useScrollTheme()

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
})
</script>
