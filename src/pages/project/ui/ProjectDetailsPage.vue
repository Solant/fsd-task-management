<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useProjectStore } from '@/entities/project';
import { useTaskStore } from '@/entities/task';
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';

const route = useRoute();
const projectId = computed(() => {
  const id = route.params.projectId;
  return Array.isArray(id) ? id[0] : id;
});

const projectStore = useProjectStore();
const taskStore = useTaskStore();
const { projects } = storeToRefs(projectStore);

const currentProject = computed(() => {
  return projects.value.find((project) => project.projectId === projectId.value);
});

const loading = ref(true);
if (!projects.value.length) {
  Promise.all([projectStore.loadProjects(), taskStore.loadTasks(projectId.value)])
    .then(() => {
      if (!currentProject.value) {
        alert('Project not found');
      }
    })
    .finally(() => {
      loading.value = false;
    });
} else {
  taskStore.loadTasks(projectId.value).finally(() => {
    loading.value = false;
  });
}
</script>

<template>
  <div class="container mx-auto py-5 px-2">
    <h1 v-if="currentProject" class="c-white text-4xl font-bold tracking-wide mb-5">
      {{ currentProject.title }}
    </h1>

    <div v-if="loading" class="flex justify-center">
      <BaseSpinner />
    </div>
    <div v-else>list</div>
  </div>
</template>
