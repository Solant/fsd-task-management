<script lang="ts" setup>
import TaskDialog from './TaskDialog.vue';

defineProps<{ projectId: string }>()
</script>

<template>
  <TaskDialog :project-id>
    <slot />
  </TaskDialog>
</template>
