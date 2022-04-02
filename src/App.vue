<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider } from "naive-ui";

const themeOverrides = {
  common: {
    primaryColor: '#6494d6',
    primaryColorHover: '#5b81f0',
    primaryColorPressed: '#5b81f0',
    primaryColorSuppl: '#5b81f0',
  }
}

</script>

<style>
#app {
  height: 100%;
}

.n-config-provider {
  height: 100%;
}
</style>
