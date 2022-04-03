<template>
  <n-card v-bind:title="test.name">
    {{ test.description }}
    Test-id: {{ test.id }}
    <n-space>
      <n-button class="enroll-button"
                v-if="store.getters.canPerformUserActions"
                @click="emit('enroll', test.id)"
                :disabled="isActive">
        Enroll
      </n-button>
      <n-button v-if="store.getters.canPerformUserActions"
                @click="emit('leave', test.id)">
        Leave
      </n-button>

      <router-link v-if="store.getters.canPerformExamActions"
                   :to="{ name: 'configureTest', params: { testId: test.id } }" >
        <n-button>Configure</n-button>
      </router-link>
    </n-space>
    {{ isActive ? 'Test activated' : '' }}
  </n-card>
</template>

<script setup>
import { useStore } from "vuex";
import { inject, defineEmits } from "vue";

const axios = inject('axios');
const store = useStore();
const emit = defineEmits(['enroll, leave']);

const props = defineProps({
  test: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: "Name is not defined"
    },
    description: {
      type: String,
      default: "Description is not defined"
    }
  },
  isActive: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped>

</style>