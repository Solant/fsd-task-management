import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTaskStore } from './store';

function createTask() {
  return {
    title: 'Test',
    description: '',
    priority: 'high',
    projectId: 'test',
    status: 'done',
  } as const;
}

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

  it('should create new task', async () => {
    const store = useTaskStore();

    await expect(store.createTask(createTask())).resolves.not.toThrow();
    expect(store.tasks).toHaveLength(1);
  });

  it('should not allow duplicate tasks', async () => {
    const store = useTaskStore();
    await store.createTask(createTask());

    await expect(store.createTask(createTask())).rejects.toThrow();
    expect(store.tasks).toHaveLength(1);
  });

  it('should delete task', async () => {
    const store = useTaskStore();
    await store.createTask(createTask());

    await store.deleteTask(store.tasks[0].taskId);
    expect(store.tasks).toHaveLength(0);
  });
});
