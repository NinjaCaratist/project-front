<template>
  <div class="tests-container">
    <n-list bordered>
      <template #header>All the tests</template>
      <n-list-item v-for="test in tests" :key="test.id">
        <test :name="test.name" :description="test.description"></test>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>

import { ref, inject, onMounted } from "vue";
import Test from "@/pages/Tests/components/Test"

const axios = inject('axios');

const tests = ref([]);

onMounted(async () => {
  const response = await axios.get('http://localhost:8080/tests');

  tests.value = response.data;
})

</script>

<style scoped>
.tests-container {
  background: white;
  margin: 0 1rem;
}
</style>