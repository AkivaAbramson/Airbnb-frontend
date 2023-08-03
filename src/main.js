import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'


import './assets/styles/main.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App)
const clickOut = {
    mounted: (el, binding) => {
        el.clickOut = event => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOut);
    },
    unmounted: el => {
        document.removeEventListener("click", el.clickOut);
    },
}

// Use plugin defaults (optional)

// Use the components
// app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.use(setupCalendar, {})
app.use(router)
app.use(store)
app.use(ElementPlus)
app.directive('clickout', clickOut)

app.mount('#app')
