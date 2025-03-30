<script lang="ts" setup>
import { reactive, watch } from 'vue';

import BaseSelect from '@/shared/ui/BaseSelect.vue';
import BaseInput from '@/shared/ui/BaseInput.vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import type { TaskFilters } from '@/entities/task';

const fitlers = reactive<TaskFilters>({
  title: '',
  status: undefined,
  priority: undefined,
});

function clearFilters() {
  Object.assign(fitlers, {
    title: '',
    status: undefined,
    priority: undefined,
  });
}

const emit = defineEmits<{
  filter: [payload: TaskFilters];
}>();

watch(
  fitlers,
  (updatedFilters) => {
    emit('filter', updatedFilters);
  },
  { deep: true },
);
</script>

<template>
  <div class="flex gap-5">
    <BaseInput v-model="fitlers.title" />

    <BaseSelect
      v-model="fitlers.priority"
      :options="['low', 'medium', 'high']"
      placeholder="Priority"
      class="ml-auto"
    />

    <BaseSelect
      v-model="fitlers.status"
      :options="['pending', 'in-progress', 'done']"
      placeholder="Status"
    />

    <BaseButton variant="transparent" @click="clearFilters"> Clear fitlers </BaseButton>
  </div>
</template>
