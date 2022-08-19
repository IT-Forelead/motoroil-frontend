import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import 'flowbite'
import { VueMaskDirective } from 'v-mask'
import money from 'v-money3'
import DashboardLayout from './components/layout/DashboardLayout.vue'

const vMaskV2 = VueMaskDirective
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind,
}

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(money)
app.directive('mask', vMaskV3)
app.component('dashboard-layout', DashboardLayout)
app.mount('#app')
