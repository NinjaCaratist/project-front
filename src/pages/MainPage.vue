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
import { h } from "vue";
import { RouterLink } from "vue-router";

const menuOptions = [
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