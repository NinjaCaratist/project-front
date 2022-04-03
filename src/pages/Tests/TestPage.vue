<template>
  <div class="form-container">
    <n-list bordered>
      <template #header>
        All the tests

        <router-link v-if="store.getters.canPerformExamActions"
                     :to="{ name: 'addTest' }">
          <n-button>
            Add New Test
          </n-button>
        </router-link>
      </template>

      <n-list-item v-for="test in tests" :key="test.id">

        <test :test="test"
              :is-active="checkActive(test.id)"></test>

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

  if (store.getters.canPerformUserActions) {
    await loadActiveTests();
  }
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

const onEnroll = async (testId) => {
  const response = await axios.post('http://localhost:8080/users/tests/enroll', null, {
    params: { testId }
  });

  await loadActiveTests();
}

const onLeave = async (testId) => {
  const response = await axios.delete('http://localhost:8080/users/tests/leave', {
    params: {
      testId: testId,
      userId: user.id
    }
  })

  await loadActiveTests();
}

</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}

</style>