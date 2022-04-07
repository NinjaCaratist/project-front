<template>
  <n-card v-bind:title="group.name">
    <n-modal v-model:show="showModal"
             preset="card"
             :title="modalHeader"
             style="width: 600px;">
      {{ modalText }}
    </n-modal>
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
    <router-link v-if="store.getters.canPerformExamActions || store.getters.canPerformModerActions"
                 :to="{ name: 'configureGroup', params: { groupId: group.id } }" >
      <n-button>Configure</n-button>
    </router-link>

    <n-button v-if="store.getters.canPerformUserActions"
              @click="enterToGroup">
      Enter to the group
    </n-button>

  </n-card>
</template>

<script setup>

import { useStore } from "vuex";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const axios = inject('axios');
const store = useStore();
const router = useRouter();

const showModal   = ref(false);
const modalText   = ref('');
const modalHeader = ref('');

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

const enterToGroup = async () => {
  if (!store.getters.canPerformUserActions) return;

  try {
    const response = await axios.post('http://localhost:8080/groups/users/add', null, {
      params: {
        groupId: props.group.id,
      }
    });

    modalHeader.value = 'Success!';
    modalText.value   = 'You has been added to the group ' + props.group.name;
    showModal.value   = true;
  }
  catch(err) {
    modalHeader.value = 'Cannot enter to the group';
    modalText.value   = err;
    showModal.value   = true;
  }
}

</script>

<style scoped>

</style>