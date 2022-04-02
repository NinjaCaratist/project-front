<template>
  <n-card v-bind:title="name">
    {{ description }}
    <n-button v-if="store.getters.canPerformExamActions" @click="onEnroll">
      Enroll
    </n-button>
  </n-card>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  name: {
    type: String,
    default: "Name is not defined"
  },
  description: {
    type: String,
    default: "Description is not defined"
  }
})

const onEnroll = () => {

}
</script>

<style scoped>

</style>