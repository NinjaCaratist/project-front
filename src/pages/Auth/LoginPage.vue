<template>
  <n-modal v-model:show="showErrorModal"
           preset="card"
           title="Error!"
           style="width: 600px;">
    {{ errorText }}
  </n-modal>
  <DefaultPage>
    <template v-slot:header>Login Page</template>
    <template v-slot:body>
      <div class="auth-container">
        <n-form ref="formRef" :model="formValue">
          <n-form-item label="Username" path="username">
            <n-input v-model:value="formValue.username" placeholder="username"/>
          </n-form-item>
          <n-form-item label="Password" path="password">
            <n-input v-model:value="formValue.password" placeholder="password" type="password"
                     :input-props="{ autoComplete: 'on' }"/>
          </n-form-item>
          <n-space vertical>
            <n-button type="primary" style="width: 100%" @click="onSubmit">Submit</n-button>
            <n-button type="primary" style="width: 100%" @click="onRegister">Register</n-button>
          </n-space>
        </n-form>
      </div>
    </template>
  </DefaultPage>
</template>

<script setup>
import DefaultPage from "@/pages/DefaultPage";

import { ref } from "vue";
import { inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const formRef = ref(null);
const axios = inject('axios');

const store = useStore();
const router = useRouter();

const showErrorModal = ref(false);
const errorText = ref('');

const formValue = ref({
  username: '',
  password: ''
})

async function onSubmit() {
  try {
    const response = await axios.post('http://localhost:8080/security/login', formValue.value);
    await handleResponse(response);
  }
  catch (err) {
    errorText.value = err;
    showErrorModal.value = true;
  }
}

const handleResponse = async (response) => {
  const user = response.data;
  const token = response.headers['x-auth-token'];

  localStorage.setItem('TOKEN', token);
  localStorage.setItem('CURRENT_USER', JSON.stringify(user));

  await router.push('/');
}

async function onRegister() {
  await router.replace('/register');
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