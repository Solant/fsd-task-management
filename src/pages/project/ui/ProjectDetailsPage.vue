<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useProjectStore } from '@/entities/project';
import { useTaskList, useTaskStore } from '@/entities/task';
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';
import { CreateTaskDialog } from '@/features/task-edit';
import { EditTaskDialog } from '@/features/task-edit';

const route = useRoute();
const projectId = computed(() => {
  const id = route.params.projectId;
  return Array.isArray(id) ? id[0] : id;
});
const tasks = useTaskList(projectId);

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
    <div v-else class="grid lg:grid-cols-2 gap-5">
      <EditTaskDialog
        v-for="task in tasks"
        :key="task.taskId"
        :task-id="task.taskId"
        :project-id="task.projectId"
      >
        <div
          class="cursor-pointer flex items-center justify-left flex-col p-6 border rounded-lg shadow-sm hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 relative"
        >
          <h5 class="text-2xl font-bold tracking-tight text-white">
            {{ task.title }}
          </h5>

          <div class="c-white mt-1">
            {{ task.description }}
          </div>

          <div
            :class="{
              'c-white': task.priority === 'low',
              'c-yellow-400': task.priority === 'medium',
              'c-red-400': task.priority === 'high',
            }"
            class="capitalize absolute left-2 top-2"
          >
            {{ task.priority }}, {{ task.status }}
          </div>
        </div>
      </EditTaskDialog>

      <CreateTaskDialog :project-id>
        <a
          href="#"
          @click.prevent
          class="flex items-center justify-center flex-col p-6 border border-dashed rounded-lg shadow-sm hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700"
        >
          <div class="i-mdi-plus c-white" />
        </a>
      </CreateTaskDialog>
    </div>
  </div>
</template>
