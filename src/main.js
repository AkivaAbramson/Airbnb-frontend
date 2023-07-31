import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'


import './assets/styles/main.scss'
import App from './App.vue'

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
app.use(router)
app.use(store)
app.directive('clickout', clickOut)

app.mount('#app')
