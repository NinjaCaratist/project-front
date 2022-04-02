<template>
<div class="wrapper">
  <div class="navbar">
    <n-menu mode="horizontal" :options="menuOptions"></n-menu>
  </div>
  <div class="body">
    <router-view></router-view>
  </div>
</div>
</template>

<script setup>
import { h } from "vue";
//import { RouterLink } from "vue-router";

const menuOptions = [
  {
    label: () =>
        h(
            'a',
            {
              href: '/',
              target: '_blank',
            },
            "Profile"
        ),
    key: 'profile',
  },
  {
    label: 'Games',
    key: 'games',
  },
  {
    label: 'Developers',
    key: 'developers',
  },
  {
    label: 'Items',
    key: 'items',
  },
  {
    label: 'Admin',
    key: 'admin'
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