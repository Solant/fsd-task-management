<script setup lang="ts">
import ProjectDialog from './ProjectDialog.vue';

defineProps<{ projectId: string }>();
</script>

<template>
  <ProjectDialog :project-id>
    <slot />
  </ProjectDialog>
</template>
