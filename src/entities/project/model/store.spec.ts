import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useProjectStore } from './store';

describe('Project store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();

    vi.mock('@/shared/lib/async', () => {
      return {
        wait: () => Promise.resolve(),
      };
    });
  });

  it('should create new project', async () => {
    const store = useProjectStore();

    await expect(store.createProject({ title: 'Test' })).resolves.not.toThrow();
    expect(store.projects).toHaveLength(1);
  });

  it('should not allow duplicate projects', async () => {
    const store = useProjectStore();
    await store.createProject({ title: 'Test' });

    await expect(store.createProject({ title: 'Test' })).rejects.toThrow();
    expect(store.projects).toHaveLength(1);
  });

  it('should delete project', async () => {
    const store = useProjectStore();
    await store.createProject({ title: 'Test' });

    await store.deleteProject(store.projects[0].projectId);
    expect(store.projects).toHaveLength(0);
  });
});
