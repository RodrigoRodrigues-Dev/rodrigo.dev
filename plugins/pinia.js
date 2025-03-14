/* eslint-disable no-undef */
import { createPinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();

  if (process.client) {
    import('pinia-plugin-persistedstate').then(
      ({ default: piniaPluginPersistedstate }) => {
        pinia.use(piniaPluginPersistedstate);
      }
    );
  }

  nuxtApp.vueApp.use(pinia);
});
