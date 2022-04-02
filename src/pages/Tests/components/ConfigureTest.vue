<template>
<div class="form-container">
  <n-card v-if="test" :title="test.name">
    {{ test.description }}
  </n-card>

  <n-h1>
    <n-text type="primary">
      Questions
    </n-text>
  </n-h1>

  <n-button @click="showModal=true">Add Question</n-button>
  <add-question-modal :show="showModal" @closed="showModal=false"></add-question-modal>

  <n-list-item v-for="question in questions" :key="question.id">

  </n-list-item>
</div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AddQuestionModal from '@/pages/Tests/components/AddQuestionModal';

const axios = inject('axios');
const route = useRoute();

const questions = ref([]);
const test = ref(null);
const showModal = ref(false);

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
  const response = await axios.get('http://localhost:8080/tests/questions', {
    params: {
      testId: route.params.testId
    }
  })

  console.log(response)
}
</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}
</style>