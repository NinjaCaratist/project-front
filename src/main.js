
import './assets/styles/main.scss'

import App from './App.vue'

import axios from "axios";
import naive from 'naive-ui'
import VueAxios from "vue-axios";

import { createApp } from 'vue'
import { createStore } from "vuex";

import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";

import LoginPage from '@/pages/Auth/LoginPage'
import RegistrationPage from '@/pages/Auth/RegistrationPage'

import MainPage from '@/pages/MainPage'
import TestPage from '@/pages/Tests/TestPage'

//import { authGuard } from "@/guards/authGuards";

const state = {
    user: null
}

const store = createStore({
    state,
    getters: {
        user: () => {
            return JSON.parse(localStorage.getItem('CURRENT_USER')) || null;
        },
        canPerformModerActions: () => {
            const user = store.getters.user;
            return !!(user && user.roles.includes('MODER'));
        },
        canPerformExamActions: () => {
            const user = store.getters.user;
            return !!(user && user.roles.includes('EXAM'));
        },
        canPerformUserActions: () => {
            const user = store.getters.user;
            return !!(user && user.roles.includes('USER'));
        },
    },
});

const routes = [
    {
        path: '/',
        redirect: { name: 'tests' }
    },
    {
        name: 'main',
        path: '/main',
        component: MainPage,
        children: [
            {
                name: 'tests',
                path: 'tests',
                component: TestPage
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: LoginPage,
    },
    {
        name: 'register',
        path: '/register',
        component: RegistrationPage,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(App);

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.common['token'] = token;
    }

    return config;
}, error => Promise.reject(error))

app.use(store)
app.use(router)
app.use(naive)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
