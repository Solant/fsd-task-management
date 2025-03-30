import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { storeToRefs } from "pinia";

import { useTaskStore } from "./store";

export function useTaskList(projectId: MaybeRefOrGetter<string>) {
  const { tasks } = storeToRefs(useTaskStore());

  return computed(() => tasks.value.filter(task => task.projectId === toValue(projectId)));
}