<template>
  <n-modal
      class="modal"
      :show="showModal"
      :mask-closable="true"
      preset="dialog"
      title="Add Question"
      positive-text="Confirm"
      negative-text="Close"
      @positive-click="onSubmit"
  >
    <n-form>
      <n-form-item label="Description" path="username">
        <n-input
            type="textarea"
            v-model:value="formValue.description"
            placeholder="Question Description"
            :autosize="{
            minRows: 3
          }"
        />
      </n-form-item>

      <n-form>
        <n-form-item label="Add Answer">
          <n-space>
            <n-space>
              <n-input v-model:value="answerFormValue.description" placeholder="Answer"></n-input>
              <n-button @click="addAnswer">Add</n-button>
              <n-text>Correct</n-text>
              <n-checkbox v-model:checked="answerFormValue.correct"></n-checkbox>
            </n-space>
            <n-space vertical>
              <n-slider v-model:value="totalScore" :step="10" />
              <n-input-number min="0" max="100" v-model:value="totalScore" size="small" />
            </n-space>
          </n-space>
        </n-form-item>
      </n-form>
      <div class="answers">
        <n-space vertical>
          <n-card v-for="answer in answers" :key="hashFromString(answer.description)">
            <n-space justify="space-between">
              {{ answer.position }}
              {{ answer.description }}

              {{ answer.correct ? 'Correct!' : '' }}

              <n-button @click="removeAnswer(answer)">Remove</n-button>
            </n-space>
          </n-card>
        </n-space>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup>
import { ref, toRaw, defineProps } from "vue";
import { hashFromString } from "@/services/utils";

const emit = defineEmits(['submit']);

const answers = ref([]);
const totalScore = ref(0);
const isCorrectAnswer = ref(false);

const props = defineProps({
  testId: {
    type: Number,
    required: true,
  },
  showModal: {
    type: Boolean,
    default: false,
  }
})

const formValue = ref({
  description: '',
});

const answerFormValue = ref({
  description: '',
  correct: false
})

const addAnswer = () => {
  const answer = Object.assign({}, answerFormValue.value);

  if (answer.description.length) {
    answer.position = answers.value.length;
    answers.value.push(answer);
  }
}

const removeAnswer = (answerToRemove) => {
  answers.value = answers.value.filter(answer => answer.position !== answerToRemove.position);
  reCalcPositions();
}

const reCalcPositions = () => {
  answers.value.forEach((answer, idx) => {
    answer.position = idx;
  })
}

const onSubmit = () => {
  emit('submit', {
    description: formValue.value.description,
    answers: answers.value.map(answer => toRaw(answer)),
    testId: props.testId,
    totalScore: totalScore.value,
  });
}
</script>

<style scoped>
.answers {
  height: 300px;
  overflow-y: scroll;
}
</style>