
import './assets/styles/main.scss'

import App from './App.vue'

import axios from "axios";
import naive from 'naive-ui'
import VueAxios from "vue-axios";

import { createApp } from 'vue'
import { createStore } from "vuex";

const state = {
    user: null
}

const store = createStore({
    state,
    getters: {
        user: (state) => {
            return state.user;
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        }
    },
})

const app = createApp(App);

app.use(store)
app.use(naive)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
