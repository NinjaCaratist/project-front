<template>
<div class="form-container">
  <n-modal v-model:show="showModal"
           preset="card"
           :title="modalHeader"
           style="width: 600px;">
    {{ modalText }}
  </n-modal>
  <n-space vertical>
    <n-steps :current="current" :status="currentStatus">
      <n-step
          v-for="question in questions"
          :title="question.id.toString()"
          :description="question.description"
          :key="question.id">
      </n-step>
      <n-step title="review" description="check your answers"></n-step>
    </n-steps>
    <template v-if="current <= questions.length">
      <n-space vertical class="answers-container">
        <n-list>
          <n-checkbox-group v-model:value="chosenAnswers">
            <n-space vertical>
              <n-checkbox v-for="answer in availableAnswers"
                          :key="answer.id"
                          :value="answer.id"
                          :checked="answer.isChecked"
                          :label="answer.description"/>
            </n-space>
          </n-checkbox-group>
        </n-list>
      </n-space>
    </template>
    <template v-else>
      <n-table class="review-table">
        <tbody>
          <tr v-for="data in getReviewData()"
              :key="data.key">
            <td>{{ data.description }}</td>
            <td>{{ data.answers.map(id => getAnswerById(data.questionId, id).description) }}</td>
          </tr>
        </tbody>
      </n-table>
    </template>
    <n-button-group>
      <n-space>
        <n-button @click="prev">
          <template #icon>
            <n-icon>
              <md-arrow-round-back></md-arrow-round-back>
            </n-icon>
          </template>
        </n-button>
        <n-button @click="next">
          <template #icon>
            <n-icon>
              <md-arrow-round-forward></md-arrow-round-forward>
            </n-icon>
          </template>
        </n-button>
        <n-button type="primary" @click="onSubmit">
          Submit
        </n-button>
      </n-space>
    </n-button-group>
  </n-space>
</div>
</template>

<script setup>
import { ref, onMounted, inject, toRaw } from 'vue';
import { useRoute } from "vue-router";
import { MdArrowRoundBack, MdArrowRoundForward } from "@vicons/ionicons4";

const route = useRoute();
const axios = inject('axios');

const current = ref(1);
const currentStatus = ref("process");

const questions = ref([]);

const availableAnswers = ref([]);
const chosenAnswers = ref([]);

const data = new Map();

const showModal   = ref(false);
const modalText   = ref('');
const modalHeader = ref('');

onMounted(async () => {
    await loadQuestions();
    await loadAnswers();
})

const getCurrentQuestionId = () => {
  return questions.value[current.value - 1]?.id;
}

const next = () => {
  if (current.value !== questions.value.length + 1) {
    current.value += 1;
  }

  loadAnswers();
}

const prev = () => {
  if (current.value !== 1) {
    current.value -= 1;
  }

  loadAnswers();
}

const loadQuestions = async () => {
  const response = await axios.get(`http://localhost:8080/tests/questions`, {
    params: {
      testId: route.params.testId
    }
  });

  questions.value = response.data;
}

const loadAnswers = async () => {
  const questionId = getCurrentQuestionId();
  if (!questionId) return;

  const response = await axios.get(`http://localhost:8080/tests/questions/answers`, {
    params: {
      questionId: getCurrentQuestionId(),
    }
  });

  data.set(questionId, []);

  availableAnswers.value = response.data.map(answer => {
    answer.isChecked = false;
    data.get(questionId).push(answer);

    return answer;
  });
}

const onSubmit = async () => {
  if (current.value !== questions.value.length + 1) {
    current.value = questions.value.length + 1;
  } else {
    try {
      const response = await axios.post('http://localhost:8080/users/tests/pass', {
        answers: toRaw(chosenAnswers.value),
        testId: route.params.testId
      });

      modalHeader.value = 'Success';
      modalText.value = `Test data has been sent. Your result is: ${response.data}`;
      showModal.value = true;
    }
    catch(err) {
      modalHeader.value = 'Failed to send the test data';
      modalText.value = err;
      showModal.value = true;
    }
  }
}

const getReviewData = () => {
  const reviewData = [];

  for (const question of questions.value) {
    const answers = filterAnswers(toRaw(chosenAnswers.value), question.id);

    reviewData.push({
      description: question.description,
      questionId: question.id,
      answers: answers,
      key: question.id
    })
  }

  return reviewData;
}

const getAnswerById = (questionId, answerId) => {
  const answers = data.get(questionId);
  for (const answer of answers) {
    if (answer.id === answerId) return answer;
  }

  return null;
}

const filterAnswers = (answers, questionId) => {
  const correctAnswers = data.get(questionId);

  return answers.filter(answerId => {
    for (const correct of correctAnswers) {
      if (correct.id === answerId) return true;
    }

    return false;
  });
}

</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;

  max-height: 600px;
  overflow-y: scroll;
}

.review-table {
  width: 30%;
}

.answers-container {
  height: 200px;
  overflow-y: scroll;
}
</style>