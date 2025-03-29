import type { Project } from '@/entities/project';

export function createProjectList(): Project[] {
  return [
    {
      projectId: '97b6c771-a041-4cb4-a355-f069885d05f6',
      title: 'Marketing',
    },
    {
      projectId: 'b6fea6bf-d9f2-47f4-81a3-ed01533f6963',
      title: 'Engineering',
    },
  ];
}
