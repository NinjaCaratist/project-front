<template>
<div class="form-container">
  <n-card v-if="test" :title="test.name">
    {{ test.description }}
    <n-h1>
      <n-text type="primary">
        Questions
      </n-text>
    </n-h1>

    <n-button @click="showModal=true">Add Question</n-button>

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
import { useRoute } from 'vue-router';

import AddQuestion from '@/pages/Tests/components/Question/AddQuestion'

const axios = inject('axios');
const route = useRoute();

const questions = ref([]);
const test = ref(null);

let showModal = ref(false);

onMounted(() => {
  loadTest();
  loadQuestions();
})

const loadTest = async () => {
  const response = await axios.get('http://localhost:8080/tests', {
    params: {
      id: route.params.testId
    }
  });

  test.value = response.data[0];
}

const loadQuestions = async () => {
  const response = await axios.get(`http://localhost:8080/tests/questions`, {
    params: {
      testId: route.params.testId
    }
  })

  questions.value = response.data;
}

const onAddQuestion = async (data) => {
  const response = await axios.post('http://localhost:8080/tests/questions', data);

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