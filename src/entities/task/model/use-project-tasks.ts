import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { storeToRefs } from "pinia";

import { useTaskStore } from "./store";
import type { Task } from "./schema";

export type TaskFilters = Partial<Pick<Task, 'title' | 'status' | 'priority'>>;

export function useTaskList(projectId: MaybeRefOrGetter<string>, filters: MaybeRefOrGetter<TaskFilters>) {
  const { tasks } = storeToRefs(useTaskStore());

  return computed(() => tasks.value.filter(task => task.projectId === toValue(projectId)).filter(task => {
    const { priority, status, title } = toValue(filters);
    if (priority && task.priority !== priority) {
      return false;
    }
    if (status && task.status !== status) {
      return false;
    }
    if (title && !task.title.toLowerCase().includes(title.toLowerCase())) {
      return false;
    }

    return true;
  }));
}