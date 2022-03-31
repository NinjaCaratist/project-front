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
        <n-button type="primary" style="width: 100%" @click="onSubmit">Submit</n-button>
      </n-form>
    </div>
  </template>
</DefaultPage>
</template>

<script>
import DefaultPage from "@/pages/DefaultPage";
import { ref } from 'vue';
import { inject } from "vue";

export default {
  name: "LoginPage",
  components: { DefaultPage },

  setup() {
    const formRef = ref(null);
    const axios = inject('axios');

    const onSubmit = () => {
      axios.post('http://localhost:8081/api', this.formValue).then(function(response) {
        console.log(response)
      }, function(error) {
        console.error(error)
      })
    }

    return {
      onSubmit,
      formRef,
      formValue: ref({
        login: '',
        password: ''
      })
    }
  }
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