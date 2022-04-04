<template>
<div class="form-container">
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
      <n-space vertical>
        <n-list>
          <n-checkbox-group v-model:value="chosenAnswers"
                            @update:value="refreshAnswersMap">
            <n-space vertical>
              <n-checkbox v-for="answer in answers"
                          :key="answer.id"
                          :value="answer.id"
                          :label="answer.description"/>
            </n-space>
          </n-checkbox-group>
        </n-list>
      </n-space>
    </template>
    <template v-else>
      <n-table class="review-table">
        <tbody>
          <tr v-for="question in questions" :key="question.id">
            <td>{{ question.description }}</td>
            <td>{{ answersMap.get(question.id) }}</td>
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
        <n-button type="primary">
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

const questions = ref([]);
const answers = ref([]);

const current = ref(1);
const currentStatus = ref("process");

const chosenAnswers = ref(null);
const answersMap = ref(new Map());

const getCurrentQuestionId = () => {
  return questions.value[current.value - 1]?.id;
}

onMounted(async () => {
    await loadQuestions();
    await loadAnswers();
})

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
  initAnswersMap();
}

const initAnswersMap = () => {
  answersMap.value = new Map();
  questions.value.forEach(question => answersMap.value.set(question.id, []));
}

const refreshAnswersMap = () => {
  answersMap.value.set(getCurrentQuestionId(), toRaw(chosenAnswers.value));
}

const loadData = async () => {
  if (current.value <= questions.value.length) {
    await loadAnswers()
  } else {

  }
}

const loadAnswers = async () => {
  const questionId = getCurrentQuestionId();
  if (!questionId) return;

  const response = await axios.get(`http://localhost:8080/tests/questions/answers`, {
    params: {
      questionId: getCurrentQuestionId(),
    }
  })

  answers.value = response.data;
}

</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}

.review-table {
  width: 30%;
}
</style>