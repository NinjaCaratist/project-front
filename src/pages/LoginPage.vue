<template>
<DefaultPage>
  <template v-slot:header>Login Page</template>
  <template v-slot:body>
    <div class="auth-container">
      <n-form ref="formRef" :model="formValue">
        <n-form-item label="Username" path="username">
          <n-input v-model:value="formValue.username" placeholder="username" />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input v-model:value="formValue.password" placeholder="password" />
        </n-form-item>
        <n-button type="primary" style="width: 100%" @click="onSubmit">Submit</n-button>
      </n-form>
    </div>
  </template>
</DefaultPage>
</template>

<script setup>
import DefaultPage from "@/pages/DefaultPage";

import { ref } from 'vue';
import { inject } from "vue";

const formRef = ref(null);
const axios = inject('axios');

const formValue = ref({
  username: '',
  password: ''
})

async function onSubmit() {
  const response  = await axios.post('http://localhost:8081/api/login', formValue.value);
  const user      = response.data.user;
  const token     = response.data.token;

  this.$store.dispatch('user', user);

  localStorage.setItem('accessToken', token.accessToken);
  localStorage.setItem('refreshToken', token.refreshToken);
  localStorage.setItem('currentUser', user);
}

</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  height: 300px;
  width: 600px;
}

</style>