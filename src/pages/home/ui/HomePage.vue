<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { useProjectStore } from '@/entities/project/model/store.ts';
import Spinner from '@/shared/ui/BaseSpinner.vue';
import { DeleteProjectDialog } from '@/features/project-delete';
import BaseButton from '@/shared/ui/BaseButton.vue';
import CreateProjectDialog from '@/features/project-edit/ui/CreateProjectDialog.vue';
import { EditProjectDialog } from '@/features/project-edit';

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const loading = ref(true);
projectStore.loadProjects().finally(() => {
  loading.value = false;
});
</script>

<template>
  <div class="container mx-auto py-5 px-2">
    <h1 class="c-white text-4xl font-bold tracking-wide mb-5">Projects</h1>

    <div v-if="loading" class="flex justify-center">
      <Spinner />
    </div>

    <div v-else class="grid md:grid-cols-3 gap-5">
      <a
        href="#"
        @click.prevent
        v-for="project in projects"
        :key="project.projectId"
        class="flex items-center justify-center flex-col p-6 border rounded-lg shadow-sm hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 relative"
      >
        <h5 class="text-2xl font-bold tracking-tight text-white">
          {{ project.title }}
        </h5>

        <EditProjectDialog :project-id="project.projectId">
          <BaseButton variant="transparent" class="absolute top-0 right-18">
            <div class="i-mdi-pencil-outline" />
          </BaseButton>
        </EditProjectDialog>

        <DeleteProjectDialog :project-id="project.projectId">
          <BaseButton variant="danger" class="absolute top-0 right-0">
            <div class="i-mdi-trash-can-outline" />
          </BaseButton>
        </DeleteProjectDialog>
      </a>

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
