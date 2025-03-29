<script setup lang="ts">
import { AlertDialogCancel } from 'reka-ui';
import { ref } from 'vue';

import { useProjectStore } from '@/entities/project/model/store.ts';
import Spinner from '@/shared/ui/BaseSpinner.vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import BaseDialog from '@/shared/ui/BaseDialog.vue';

const props = defineProps<{
  projectId: string;
}>();

const store = useProjectStore();

const open = ref(false);
const loading = ref(false);

async function handleAction() {
  if (loading.value) {
    return;
  }
  loading.value = true;

  try {
    await store.deleteProject(props.projectId);
  } finally {
    open.value = false;
    loading.value = false;
  }
}
</script>

<template>
  <BaseDialog v-model:open="open">
    <slot />

    <template #title> Are you absolutely sure? </template>

    <template #description>
      This action cannot be undone. This will permanently delete your project and remove your data
      from our servers.
    </template>

    <template #footer>
      <Spinner v-if="loading" />

      <template v-else>
        <AlertDialogCancel v-if="!loading" as-child>
          <BaseButton variant="transparent">Cancel</BaseButton>
        </AlertDialogCancel>

        <BaseButton variant="danger" @click="handleAction"> Yes, delete project </BaseButton>
      </template>
    </template>
  </BaseDialog>
</template>
