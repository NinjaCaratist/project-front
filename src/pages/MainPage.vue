<template>
<div class="wrapper">
  <div class="navbar">
    <n-space justify="end">
      <n-menu mode="horizontal" :options="menuOptions"></n-menu>
    </n-space>
  </div>
  <div class="body">
    <router-view></router-view>
  </div>
</div>
</template>

<script setup>
import { h, inject } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "vuex";

import Button from "naive-ui/es/button/src/Button";

const axios = inject('axios');
const store = useStore();
const router = useRouter();

const authOptions = [
  {
    label: () => h(RouterLink, {
      to: {
        name: "login",
        params: {
          lang: "en-US"
        }
      },
    }, { default: () => "Login" }),
    key: 'login',
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "register",
        params: {
          lang: "en-US"
        }
      },
    }, { default: () => "Register" }),
    key: 'register',
  }
];

const commonOptions = [
  {
    label: () => h(RouterLink, {
      to: {
        name: "profile",
        params: {
          lang: "en-US"
        }
      },
    }, { default: () => "Profile" }),
    key: 'profile',
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "groups",
        params: {
          lang: "en-US"
        }
      },
    }, { default: () => "Groups" }),
    key: 'groups',
  },
  {
    label: () => h(RouterLink, {
      to: {
        name: "tests",
        params: {
          lang: "en-US"
        }
      },
    }, { default: () => "Tests" }),
    key: 'tests',
  },
  {
    label: () => h(Button, {
      onClick: async () => {
        await axios.post('http://localhost:8080/security/logout')

        localStorage.removeItem('TOKEN');
        localStorage.removeItem('CURRENT_USER');

        await router.replace({
          path: '/login',
        })
      }
    }, { default: () => "Logout" }),
    key: 'tests',
  },
];

const menuOptions = [];

if (!store.getters.user) {
  menuOptions.push(...authOptions);
} else {
  menuOptions.push(...commonOptions);
}

</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;

  height: 100%;

  background-image: url("../assets/images/background.jpg");
}

.navbar {
  @include default-container;

  border-radius: 0;
  padding: .5rem;
}

.body {
  height: 100%;
}
</style>