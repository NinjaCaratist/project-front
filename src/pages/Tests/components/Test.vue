<template>
  <n-card v-bind:title="test.name">
    {{ test.description }}
    Test-id: {{ test.id }}
    <n-space>
      <n-button class="enroll-button"
                v-if="store.getters.canPerformUserActions"
                @click="onEnroll"
                :disabled="isActive">
        Enroll
      </n-button>
      <n-button @click="onLeave">
        Leave
      </n-button>
      <n-button>
        <router-link :to="{ name: 'configureTest', params: { testId: test.id } }">Configure</router-link>
      </n-button>
    </n-space>
    {{ isActive ? 'Test activated' : '' }}
  </n-card>
</template>

<script setup>
import { useStore } from "vuex";
import { inject, defineEmits } from "vue";

const axios = inject('axios');
const store = useStore();
const emit = defineEmits(['needRefresh']);

const props = defineProps({
  userId: {
    type: Number,
    required: true
  },
  test: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: "Name is not defined"
    },
    description: {
      type: String,
      default: "Description is not defined"
    }
  },
  isActive: {
    type: Boolean,
    default: false,
  }
})

const onEnroll = async () => {
  const response = await axios.post('http://localhost:8080/users/tests/enroll', null, {
    params: {
      testId: props.test.id
    }
  });

  emit('needRefresh');
}

const onLeave = async () => {
  const response = await axios.delete('http://localhost:8080/users/tests/leave', {
    data: {
      testId: props.test.id,
      userId: props.userId
    }
  })

  emit('needRefresh')
}
</script>

<style scoped>

</style>