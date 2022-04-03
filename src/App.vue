<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from "naive-ui";

const themeOverrides = {
  common: {
    primaryColor: '#5a86c5',
    primaryColorHover: '#4274b9',
    primaryColorPressed: '#4274b9',
    primaryColorSuppl: '#4274b9',
  }
}

</script>

<style>
#app {
  height: 100%;
}

.n-config-provider {
  height: 100%;
  overflow: hidden;
}
</style>
