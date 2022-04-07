<template>
  <div class="form-container">
    <n-modal v-model:show="showModal"
             preset="card"
             :title="modalHeader"
             style="width: 600px;">
      {{ modalText }}
    </n-modal>
    <n-list bordered>
      <template #header>
        All the tests

        <router-link v-if="store.getters.canPerformExamActions || store.getters.canPerformModerActions"
                     :to="{ name: 'addTest' }">
          <n-button>
            Add New Test
          </n-button>
        </router-link>
      </template>

      <n-list-item v-for="test in tests" :key="test.id">
        <test :test="test"
              :is-active="checkActive(test.id)"
              :is-passed="checkPassed(test.id)"
              @enroll="onEnroll"
              @continue="onContinue"
              @leave="onLeave"></test>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>

import { ref, inject, onMounted } from "vue";
import Test from "@/pages/Tests/components/Test"
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const axios = inject('axios');
const store = useStore();
const router = useRouter();

const user = store.getters.user;

const tests = ref([]);
const activeTests = ref([]);
const passedTests = ref([]);

const showModal = ref(false);
const modalText = ref('');
const modalHeader = ref('');

onMounted(async () => {
  await loadTests();

  if (store.getters.canPerformUserActions) {
    await loadActiveTests();
    await loadPassedTests();
  }
})

const loadTests = async () => {
  try {
    const testsResponse = await axios.get('http://localhost:8080/tests');
    tests.value = testsResponse.data;
  }
  catch(err) {
    modalHeader.value = 'Failed to load tests';
    modalText.value = err;
    showModal.value = true;
  }
}

const loadActiveTests = async () => {
  try {
    const activeTestsResponse = await axios.get('http://localhost:8080/users/tests');
    activeTests.value = activeTestsResponse.data.map(test => test.id);
  }
  catch(err) {
    modalHeader.value = 'Failed to load active tests';
    modalText.value = err;
    showModal.value = true;
  }
}

const loadPassedTests = async () => {
  try {
    const response = await axios.get('http://localhost:8080/users/history');
    passedTests.value = response.data.map(test => test.id);
  }
  catch(err) {
    modalHeader.value = 'Failed to load passed tests';
    modalText.value = err;
    showModal.value = true;
  }
}

const checkActive = (testId) => {
  return activeTests.value.includes(testId);
}

const checkPassed = (testId) => {
  return passedTests.value.includes(testId);
}

const onEnroll = async (testId) => {
  try {
    const response = await axios.post('http://localhost:8080/users/tests/enroll', null, {
      params: { testId }
    });

    await router.replace({
      name: 'passTest',
      params: { testId },
    })
  }
  catch(err) {
    modalHeader.value = 'Failed to enroll';
    modalText.value = err;
    showModal.value = true;
  }
}

const onContinue = async (testId) => {
  await router.replace({
    name: 'passTest',
    params: { testId },
  })
}

const onLeave = async (testId) => {
  try {
    const response = await axios.delete('http://localhost:8080/users/tests/leave', {
      params: {
        testId: testId,
        userId: user.id
      }
    })

    await loadActiveTests();
  }
  catch(err) {
    modalHeader.value = 'Failed to leave from the test';
    modalText.value = err;
    showModal.value = true;
  }
}

</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;

  max-height: 600px;
  overflow-y: scroll;
}

</style>