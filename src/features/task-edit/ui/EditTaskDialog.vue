<script lang="ts" setup>
import TaskDialog from './TaskDialog.vue';

defineProps<{ projectId: string; taskId: string }>();
</script>

<template>
  <TaskDialog :project-id :task-id>
    <slot />
  </TaskDialog>
</template>
