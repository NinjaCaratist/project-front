<template>
<DefaultPage>
  <template v-slot:header>Login Page</template>
  <template v-slot:body>
    <div class="auth-container">
<!--      <v-form @submit.prevent="onSubmit">-->
<!--        <v-container>-->
<!--          <v-row>-->
<!--            <v-text-field-->
<!--                v-model="login"-->
<!--                label="login"-->
<!--                required-->
<!--            ></v-text-field>-->
<!--          </v-row>-->
<!--          <v-row>-->
<!--            <v-text-field-->
<!--                v-model="password"-->
<!--                label="password"-->
<!--                required-->
<!--            ></v-text-field>-->
<!--          </v-row>-->
<!--        </v-container>-->
<!--        <v-row>-->
<!--          <v-btn color="primary">Submit</v-btn>-->
<!--        </v-row>-->
<!--      </v-form>-->
    </div>
  </template>
</DefaultPage>
</template>

<script>
//import { inject } from "vue";

import DefaultPage from "@/pages/DefaultPage";

export default {
  name: "LoginPage",
  components: { DefaultPage },
  setup() {
    //const axios = inject('axios')
    //axios.get()
  },
  data: () => ({
    login: '',
    password: '',
  }),
  methods: {
    onSubmit: function() {
      console.log('SUBMITTED!')
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