import { defineStore } from 'pinia';
import { readonly, ref } from 'vue';

import { createProjectList, type Project, type ProjectInput } from '@/entities/project';
import { wait } from '@/shared/lib/async.ts';
import { v4 } from 'uuid';

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([]);

  async function loadProjects() {
    await wait();
    projects.value = createProjectList();
  }

  async function deleteProject(projectId: Project['projectId']) {
    await wait();
    projects.value = projects.value.filter((project) => project.projectId !== projectId);
  }

  async function createProject(payload: ProjectInput) {
    await wait(1_000);
    if (projects.value.some((project) => project.title === payload.title)) {
      throw new Error('Oooops', { cause: { title: 'Already exists' } });
    }

    projects.value.push({
      projectId: v4(),
      title: payload.title,
    });
  }

  async function updateProject(projectId: Project['projectId'], payload: ProjectInput) {
    await wait(1_000);
    if (
      projects.value.some(
        (project) => project.title === payload.title && project.projectId !== projectId,
      )
    ) {
      throw new Error('Oooops', { cause: { title: 'Already exists' } });
    }

    const project = projects.value.find((project) => project.projectId === projectId);
    if (!project) {
      throw new Error('Project not found', { cause: { projectId: 'Project not found' } });
    }

    Object.assign(project, payload);
  }

  return {
    projects: readonly(projects),
    loadProjects,
    deleteProject,
    createProject,
    updateProject,
  };
});
