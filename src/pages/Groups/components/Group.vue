<template>
  <n-card v-bind:title="group.name">
    <n-list>
      <n-list-item>
        id: {{ group.id }}
      </n-list-item>
      <n-list-item>
        public URL: {{ group.publicUrl }}
      </n-list-item>
      <n-list-item>
        description: {{ group.description }}
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup>

import { useStore } from "vuex";
import { inject } from "vue";

const axios = inject('axios');
const store = useStore();

const props = defineProps({
  group: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicUrl: {
      type: String,
      required: true,
    }
  }
})

</script>

<style scoped>

</style>