<template>
<div class="form-container">
  <n-modal v-model:show="showModal"
           preset="card"
           :title="modalHeader"
           style="width: 600px;">
    {{ modalText }}
  </n-modal>
  <n-form>
    <n-form-item label="Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Test name" />
    </n-form-item>

    <n-form-item label="Description" path="description">
      <n-input
          type="textarea"
          v-model:value="formValue.description"
          placeholder="Test Description"
          :autosize="{
            minRows: 3
          }"
      />
    </n-form-item>
    <n-button type="primary" style="width: 100%" @click="onSubmit">Create Test</n-button>
  </n-form>
</div>
</template>

<script setup>
import { inject, ref } from "vue";

const formRef = ref(null);
const axios = inject('axios');

const showModal = ref(false);
const modalText = ref('');
const modalHeader = ref('');

const formValue = ref({
  name: '',
  description: '',
})

const onSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8080/tests', formValue.value);

    modalHeader.value = 'Success!';
    modalText.value = 'The test has been successfully added';
    showModal.value = true;
  }
  catch(err) {
    modalHeader.value = 'Failure!';
    modalText.value = err;
    showModal.value = true;
  }
}
</script>

<style lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}
</style>