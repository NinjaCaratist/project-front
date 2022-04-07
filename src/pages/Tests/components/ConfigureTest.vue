<template>
<div class="form-container">
  <n-modal v-model:show="showInfoModal"
           preset="card"
           title="Error!"
           style="width: 600px;"
           @after-leave="onModalClosed">
    {{ infoModalText }}
  </n-modal>

  <n-card v-if="test" :title="test.name">
    {{ test.description }}
    <n-h1>
      <n-text type="primary">
        Questions
      </n-text>
    </n-h1>

    <n-space>
      <n-button @click="showModal=true">Add Question</n-button>
      <n-button @click="onDeleteTest">Delete test</n-button>
    </n-space>

    <add-question :test-id="test.id"
                  :show-modal="showModal"
                  :on-update:show="value => (showModal = value)"
                  @submit="onAddQuestion"></add-question>

    <n-list>
      <n-list-item v-for="question in questions" :key="question.id">
        {{ question.description }}
      </n-list-item>
    </n-list>

  </n-card>
</div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AddQuestion from '@/pages/Tests/components/Question/AddQuestion'

const axios = inject('axios');
const router = useRouter();
const route = useRoute();

const questions = ref([]);
const test = ref(null);

const showModal = ref(false);

const showInfoModal = ref(false);
const showModalHeader = ref('');
const infoModalText = ref('');
let isTestDeleted = false;

onMounted(() => {
  loadTest();
  loadQuestions();
})

const loadTest = async () => {
  try {
    const response = await axios.get('http://localhost:8080/tests', {
      params: {
        id: route.params.testId
      }
    });

    test.value = response.data[0];
  }
  catch(err) {
    showModalHeader.value = 'Failure';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

const loadQuestions = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/tests/questions`, {
      params: {
        testId: route.params.testId
      }
    })
    questions.value = response.data;
  }
  catch(err) {
    showModalHeader.value = 'Failure';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

const onAddQuestion = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/tests/questions', data);
    await loadQuestions();

    showModalHeader.value = 'Success';
    infoModalText.value = 'The question has been successfully added';
    showInfoModal.value = true;
  }
  catch(err) {
    showModalHeader.value = 'Failure';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

const onDeleteTest = async () => {
  try {
    const response = await axios.delete('http://localhost:8080/tests', {
      params: {
        testId: test.value.id
      }
    });

    showModalHeader.value = 'Success!';
    infoModalText.value = 'Test has been successfully deleted';
    showInfoModal.value = true;
    isTestDeleted = true;
  }
  catch(err) {
    showModalHeader.value = 'Failed to delete the test';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

const onModalClosed = async () => {
  if (isTestDeleted) {
    await router.replace({
      name: 'tests',
    })
  }
}
</script>

<style lang="scss">
.modal {
  min-height: 500px;
  min-width: 1000px;
}

.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}
</style>