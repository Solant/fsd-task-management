import { createRouter, createWebHistory } from 'vue-router';

import { HomePage } from '@/pages/home';
import { ProjectDetailsPage } from '@/pages/project';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/project/:projectId',
      name: 'project-details',
      component: ProjectDetailsPage,
    }
  ],
});
