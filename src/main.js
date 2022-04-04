
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

import AddTest from '@/pages/Tests/components/AddTest';
import ConfigureTest from '@/pages/Tests/components/ConfigureTest';
import GroupsPage from "@/pages/Groups/GroupsPage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import AddGroup from "@/pages/Groups/components/AddGroup";
import ConfigureGroup from "@/pages/Groups/components/ConfigureGroup";
import PassTestPage from '@/pages/Tests/components/PassTestPage';

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
                component: TestPage,
            },
            {
                name: 'addTest',
                path: 'add-test',
                component: AddTest,
            },
            {
                name: 'configureTest',
                path: 'configure-test/:testId',
                component: ConfigureTest
            },
            {
                name: 'passTest',
                path: 'pass-test/:testId',
                component: PassTestPage
            },
            {
                name: 'groups',
                path: 'groups',
                component: GroupsPage,
            },
            {
                name: 'addGroup',
                path: 'add-group',
                component: AddGroup,
            },
            {
                name: 'configureGroup',
                path: 'configure-group/:groupId',
                component: ConfigureGroup
            },
            {
                name: 'profile',
                path: 'profile',
                component: ProfilePage,
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

const formIgnorePair = (url, method) => ({ url, method });

const ignoreUrls = [
    formIgnorePair('http://localhost:8080/tests', 'get'),
    formIgnorePair('http://localhost:8080/tests/questions', 'get'),
    formIgnorePair('http://localhost:8080/security/login', 'get'),
    formIgnorePair('http://localhost:8080/security/registration', 'get'),
];

const isIgnored = (url, method) => {
    for (const pair of ignoreUrls) {
        if (url === pair.url && method === pair.method) {
            return true;
        }
    }

    return false;
}

axios.interceptors.request.use((config) => {
    if (!isIgnored(config.url, config.method)) {
        const token = localStorage.getItem('TOKEN');

        if (token) {
            config.headers.common['x-auth-token'] = token;
        }
    }


    return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        if (error.response.status === 403) {
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('CURRENT_USER');

            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            })
        }

        return Promise.reject(error.response.data);
    }
})

app.use(store)
app.use(router)
app.use(naive)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
