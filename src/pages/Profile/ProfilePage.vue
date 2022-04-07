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
    <div class="groups" v-if="store.getters.canPerformUserActions">
      <n-h1>Your groups</n-h1>
      <n-list>
        <n-list-item v-for="group in groups" :key="group.id">
          <n-card :title="group.name">
            {{ group.description }}
          </n-card>
        </n-list-item>
      </n-list>
    </div>
    <div class="passed-tests" v-if="store.getters.canPerformUserActions">
      <n-h1>Passed tests</n-h1>
      <n-list>
        <n-list-item v-for="test in passedTests" :key="test.id">
          <n-card :title="test.name">
            {{ test.description }}
          </n-card>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useStore } from "vuex";

const store = useStore();
const axios = inject('axios');

const user = store.getters.user;

const passedTests = ref([]);
const groups = ref([]);

onMounted(() => {
  if (store.getters.canPerformUserActions) {
    loadPassedTests();
    loadGroups();
  }
})

const loadPassedTests = async () => {
  const response = await axios.get('http://localhost:8080/users/history');
  passedTests.value = response.data;
}

const loadGroups = async () => {
  const response = await axios.get('http://localhost:8080/groups/users');
  groups.value = response.data;
}
</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;

  max-height: 600px;
  overflow-y: scroll;
}

.data {
  width: 50%;
}
</style>