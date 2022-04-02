<template>
  <n-modal
      v-model:show="showModal"
      mask-closable="false"
      preset="dialog"
      title="Add Question"
      positive-text="Confirm"
      negative-text="Close"
      @positive-click="onSubmit"
      @negative-click="onClose"
  >

  </n-modal>
</template>

<script>
export default {
  name: 'addQuestionModal'
}
</script>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  }
})

const emit = defineEmits(['closed']);

const showModal = ref(props.show);

watch(() => props.show, (newValue) => {
  if (newValue) {
    showModal.value = true;
  }
})

const onSubmit = async () => {
  emit('closed');
}

const onClose = async () => {
  emit('closed');
}
</script>

<style scoped>

</style>