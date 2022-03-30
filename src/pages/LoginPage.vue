<template>
<DefaultPage>
  <template v-slot:header>Login Page</template>
  <template v-slot:body>
    <div class="auth-container">
      <n-form ref="formRef" :model="formValue">
        <n-form-item label="Login" path="login">
          <n-input v-model:value="formValue.login" placeholder="login value" />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input v-model:value="formValue.password" placeholder="password value" />
        </n-form-item>
        <n-button type="primary">Submit</n-button>

      </n-form>
    </div>
  </template>
</DefaultPage>
</template>

<script>
//import { inject } from "vue";

import DefaultPage from "@/pages/DefaultPage";
import { ref } from 'vue';

export default {
  name: "LoginPage",
  components: { DefaultPage },
  setup() {
    const formRef = ref(null);

    return {
      formRef,
      formValue: ref({
        login: '',
        password: ''
      })
    }
  },
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