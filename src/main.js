
import './assets/styles/main.scss'

import App from './App.vue'

import axios from "axios";
import naive from 'naive-ui'
import VueAxios from "vue-axios";

import { createApp } from 'vue'
import { createStore } from "vuex";

import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";

import MainPage from '@/pages/MainPage'
import LoginPage from '@/pages/LoginPage'

import { authGuard } from "@/guards/authGuards";

const state = {
    user: null
}

const store = createStore({
    state,
    getters: {
        user: () => {
            return JSON.parse(localStorage.getItem('CURRENT_USER')) || null;
        }
    },
});

const routes = [
    {
        name: 'main',
        path: '/',
        component: MainPage,
        beforeEnter: authGuard,
    },
    {
        name: 'login',
        path: '/login',
        component: LoginPage,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App);

axios.interceptors.request.use((config) => {
    console.log('making a request')
    return config;
})

app.use(store)
app.use(router)
app.use(naive)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
