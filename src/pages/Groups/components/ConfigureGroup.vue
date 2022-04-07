<template>
  <div class="form-container">
    <n-modal v-model:show="showInfoModal"
             preset="card"
             title="Error!"
             style="width: 600px;">
      {{ infoModalText }}
    </n-modal>

    <n-card v-if="group" :title="group.name">
      {{ group.description }}
    </n-card>

    <n-list>
      <n-list-item>
        <n-space>
          <n-select class="test-select"
                    placeholder="Choose tests"
                    v-model:value="chosenTests"
                    :options="availableTests"
                    multiple></n-select>
          <n-button @click="onTestAdd">Add</n-button>
        </n-space>
      </n-list-item>
      <n-list-item v-if="store.getters.canPerformExamActions">
        <n-space>
          <n-select class="user-select"
                    placeholder="Choose user"
                    v-model:value="chosenUser"
                    :options="availableUsers"></n-select>
          <n-button @click="onCreateInvite">Create Invite</n-button>
        </n-space>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>

import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const axios = inject('axios');
const route = useRoute();
const store = useStore();

const user = store.getters.user;

const group = ref(null);

const availableTests = ref([]);
const availableUsers = ref([]);

const chosenTests = ref([]);
const chosenUser = ref(null);

const showModal = ref(false);

const showInfoModal   = ref(false);
const showModalHeader = ref('');
const infoModalText   = ref('');

onMounted(() => {
  loadGroup();
  loadTests();
  loadUsers();
});

const loadGroup = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/groups/${route.params.groupId}`);

    group.value = response.data;
  }
  catch(err) {
    showModalHeader.value = 'Failed to load the group';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}


const loadTests = async () => {
  try {
    const response = await axios.get('http://localhost:8080/tests');
    availableTests.value = response.data.map(test => {
      return {
        label: test.name,
        value: test
      }
    });
  }
  catch(err) {
    showModalHeader.value = 'Failed to load the tests';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

const loadUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/users');
    availableUsers.value = response.data.map(user => {
      return {
        label: `${user.firstName} ${user.lastName}`,
        value: user
      }
    });
  }
  catch(err) {
    showModalHeader.value = 'Failed to load the users';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

const onTestAdd = async () => {
  try {
    for (const test of chosenTests.value) {
      const response = await axios.post('http://localhost:8080/groups/tests/add', null, {
        params: {
          groupId: parseInt(route.params.groupId),
          testId: test.id,
        }
      })

      showModalHeader.value = 'Success';
      infoModalText.value = 'Test has been added';
      showInfoModal.value = true;
    }
  }
  catch(err) {
    showModalHeader.value = 'Failed to add a test';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

const onCreateInvite = async () => {
  try {
    const response = await axios.post('http://localhost:8080/groups/invites', null, {
      params: {
        groupId: parseInt(route.params.groupId),
        userId: chosenUser.value.id,
      }
    })

    showModalHeader.value = 'Success';
    infoModalText.value = 'Test has been added';
    showInfoModal.value = true;
  }
  catch(err) {
    showModalHeader.value = 'Failed to add a user';
    infoModalText.value = err;
    showInfoModal.value = true;
  }
}

</script>

<style scoped>
.test-select,
.user-select {
  width: 500px;
}
</style>