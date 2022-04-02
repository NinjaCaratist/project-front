<template>
  <div class="tests-container">
    <n-list bordered>
      <template #header>
        All the tests
        <n-button v-if="store.getters.canPerformExamActions">
          <router-link :to="{ name: 'addTest' }">Add New Test</router-link>
        </n-button>
      </template>

      <n-list-item v-for="test in tests" :key="test.id">

        <test :user-id="user.id"
              :test="test"
              :is-active="checkActive(test.id)"
              @need-refresh="loadActiveTests"></test>

      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>

import { ref, inject, onMounted } from "vue";
import Test from "@/pages/Tests/components/Test"
import { useStore } from "vuex";

const axios = inject('axios');
const store = useStore();

const user = store.getters.user;

const tests = ref([]);
const activeTests = ref([]);

onMounted(async () => {
  await loadTests();
  await loadActiveTests();
})

const loadTests = async () => {
  const testsResponse = await axios.get('http://localhost:8080/tests');
  tests.value = testsResponse.data;
}

const loadActiveTests = async () => {
  const activeTestsResponse = await axios.get('http://localhost:8080/users/tests');
  activeTests.value = activeTestsResponse.data.map(test => test.id);
}

const checkActive = (testId) => {
  return activeTests.value.includes(testId);
}

</script>

<style scoped>
.tests-container {
  background: white;
  margin: 0 1rem;
}

</style>