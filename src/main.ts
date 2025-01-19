import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import Aura from '@primevue/themes/aura';
import './assets/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App);


app.use(createPinia());

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(router);

app.mount('#app');
