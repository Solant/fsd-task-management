import { defineStore } from "pinia";
import { readonly, ref } from "vue";

import { wait } from "@/shared/lib/async";

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);

    async function loadTasks(projectId: string) {
      await wait();
      console.log(projectId);

      tasks.value = [];
    }

    return {
      tasks: readonly(tasks),
      loadTasks,
    };
})