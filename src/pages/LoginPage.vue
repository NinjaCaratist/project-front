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
/* eslint-disable */
import DefaultPage from "@/pages/DefaultPage";

import { ref } from "vue";
import { inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const formRef = ref(null);
const axios = inject('axios');

const store = useStore();
const router = useRouter();

const formValue = ref({
  username: '',
  password: ''
})

async function onSubmit() {
  // const response  = await axios.post('http://localhost:8080/api/login', formValue.value);
  // const user      = response.data.user;
  // const token     = response.data.token;
  //
  // console.log(store.state.user)
  //
  // localStorage.setItem('ACCESS_TOKEN', token.accessToken);
  // localStorage.setItem('REFRESH_TOKEN', token.refreshToken);
  // localStorage.setItem('CURRENT_USER', user);
  //
  // console.log(user)

  await router.push('/');
}
/* eslint enable */
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