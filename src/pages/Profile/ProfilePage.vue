<template>
  <div class="form-container">
    <div class="data">
      <n-list v-if="user">
        <n-list-item>
          <n-space justify="space-between">
            <n-text>Email: </n-text>
            <n-text>{{ user.email }}</n-text>
          </n-space>
        </n-list-item>

        <n-list-item>
          <n-space justify="space-between">
            <n-text>First Name</n-text>
            <n-text>{{ user.firstName }}</n-text>
          </n-space>
        </n-list-item>

        <n-list-item>
          <n-space justify="space-between">
            <n-text>Last Name</n-text>
            <n-text>{{ user.lastName }}</n-text>
          </n-space>
        </n-list-item>

        <n-list-item>
          <n-space justify="space-between">
            <n-text>Middle Name</n-text>
            <n-text>{{ user.middleName }}</n-text>
          </n-space>
        </n-list-item>

        <n-list-item>
          <n-space justify="space-between">
            <n-text>Roles</n-text>
            <n-text>{{ user.roles }}</n-text>
          </n-space>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const user = store.getters.user;
</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}

.data {
  width: 50%;
}
</style>