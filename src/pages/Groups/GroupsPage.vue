<template>
  <div class="form-container">
    <n-modal v-model:show="showModal"
             preset="card"
             :title="modalHeader"
             style="width: 600px;">
      {{ modalText }}
    </n-modal>
    <n-list class="groups-list" bordered>
      <template #header>
        All the groups

        <router-link v-if="store.getters.canPerformExamActions || store.getters.canPerformModerActions"
                     :to="{ name: 'addGroup' }">
          <n-button>
            Add New Group
          </n-button>
        </router-link>
      </template>

      <n-list-item v-for="group in groups" :key="group.id">

        <group :group="group"></group>

      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";
import Group from "@/pages/Groups/components/Group";

const store = useStore()
const axios = inject('axios');

const groups = ref([]);

const showModal   = ref(false);
const modalText   = ref('');
const modalHeader = ref('');

onMounted(() => {
  loadGroups();
})

const loadGroups = async () => {
  try {
    const response = await axios.get('http://localhost:8080/groups');
    groups.value = response.data;
  }
  catch(err) {
    modalHeader.value = 'Cannot load the groups';
    modalText.value   = err;
    showModal.value   = true;
  }
}
</script>

<style scoped lang="scss">
.form-container {
  @include default-container;
  margin: 5rem 10rem 5rem 10rem;
}

.groups-list {
  overflow-y: scroll;
  max-height: 600px;
}
</style>