<template>
<DefaultPage>
  <template v-slot:header>Registration Page</template>
  <template v-slot:body>
    <div class="auth-container">
      <n-form ref="formRef" :model="formValue">
        <n-form-item label="Email" path="email">
          <n-input v-model:value="formValue.email" placeholder="email" />
        </n-form-item>

        <n-form-item label="First Name" path="firstName">
          <n-input v-model:value="formValue.firstName" placeholder="first name" />
        </n-form-item>

        <n-form-item label="Last Name" path="lastName">
          <n-input v-model:value="formValue.lastName" placeholder="last name" />
        </n-form-item>

        <n-form-item label="Middle Name" path="middleName">
          <n-input v-model:value="formValue.middleName" placeholder="middle name" />
        </n-form-item>

        <n-form-item label="Password" path="password">
          <n-input v-model:value="formValue.password" placeholder="password" type="password"/>
        </n-form-item>
        <n-button type="primary" style="width: 100%" @click="onSubmit">Register</n-button>
      </n-form>
    </div>
  </template>
</DefaultPage>
</template>

<script setup>
import DefaultPage from "@/pages/DefaultPage";

import { ref } from "vue";
import { inject } from "vue";
//import { useStore } from "vuex";
import { useRouter } from "vue-router";

const formRef = ref(null);
const axios = inject('axios');

const router = useRouter();

const formValue = ref({
  email: '',
  firstName: '',
  lastName: '',
  middleName: '',
  password: '',
});

async function onSubmit() {
  const data = formValue.value;
  data.role = 'EXAM';

  const response  = await axios.post('http://localhost:8080/security/registration', data);

  console.log(response)

  await router.push('/login');
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  height: 450px;
  width: 600px;
}
</style>