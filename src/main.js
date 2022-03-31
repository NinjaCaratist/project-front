
import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import VueAxios from "vue-axios";
import axios from "axios";

const app = createApp(App);
app.use(naive)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
