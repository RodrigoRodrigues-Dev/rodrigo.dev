/* eslint-disable no-undef */
import { createPinia } from 'pinia';

export default defineNuxtPlugin(async (nuxtApp) => {
  const pinia = createPinia();

  if (typeof window !== 'undefined') {
    const { default: piniaPluginPersistedstate } = await import(
      'pinia-plugin-persistedstate'
    );
    pinia.use(piniaPluginPersistedstate);
  }

  nuxtApp.vueApp.use(pinia);
});
