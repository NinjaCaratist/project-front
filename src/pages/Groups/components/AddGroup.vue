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
        <n-input v-model:value="formValue.name" placeholder="Group name" />
      </n-form-item>

      <n-form-item label="Description" path="description">
        <n-input
            type="textarea"
            v-model:value="formValue.description"
            placeholder="Group Description"
            :autosize="{
            minRows: 3
          }"
        />
      </n-form-item>
      <n-button type="primary" style="width: 100%" @click="onSubmit">Create Group</n-button>
    </n-form>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";

const formRef = ref(null);
const axios = inject('axios');

const showModal   = ref(false);
const modalText   = ref('');
const modalHeader = ref('');

const formValue = ref({
  name: '',
  description: '',
});

const onSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8080/groups', formValue.value);

    modalHeader.value = 'Success';
    modalText.value   = 'The new group has been successfully added';
    showModal.value   = true;
  }
  catch(err) {
    modalHeader.value = 'Failed to add a new group';
    modalText.value   = err;
    showModal.value   = true;
  }
}
</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}
</style>