<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useProjectStore } from '@/entities/project/model/store.ts';
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';
import { DeleteProjectDialog } from '@/features/project-delete';
import BaseButton from '@/shared/ui/BaseButton.vue';
import CreateProjectDialog from '@/features/project-edit/ui/CreateProjectDialog.vue';
import { EditProjectDialog } from '@/features/project-edit';

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const loading = ref(true);
if (!projects.value.length) {
  projectStore.loadProjects().finally(() => {
    loading.value = false;
  });
} else {
  loading.value = false;
}
</script>

<template>
  <div class="container mx-auto py-5 px-2">
    <h1 class="c-white text-4xl font-bold tracking-wide mb-5">Projects</h1>

    <div v-if="loading" class="flex justify-center">
      <BaseSpinner />
    </div>

    <div v-else class="grid md:grid-cols-3 gap-5">
      <RouterLink
        :to="`/project/${project.projectId}`"
        v-for="project in projects"
        :key="project.projectId"
        class="flex items-center justify-center flex-col p-6 border rounded-lg shadow-sm hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 relative"
      >
        <h5 class="text-2xl font-bold tracking-tight text-white">
          {{ project.title }}
        </h5>

        <EditProjectDialog :project-id="project.projectId">
          <BaseButton variant="transparent" class="absolute top-0 right-18" @click.prevent>
            <div class="i-mdi-pencil-outline" />
          </BaseButton>
        </EditProjectDialog>

        <DeleteProjectDialog :project-id="project.projectId">
          <BaseButton variant="danger" class="absolute top-0 right-0" @click.prevent>
            <div class="i-mdi-trash-can-outline" />
          </BaseButton>
        </DeleteProjectDialog>
      </RouterLink>

      <CreateProjectDialog>
        <a
          href="#"
          class="flex items-center justify-center flex-col p-6 border border-dashed rounded-lg shadow-sm hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700"
        >
          <div class="i-mdi-plus c-white" />
        </a>
      </CreateProjectDialog>
    </div>
  </div>
</template>
