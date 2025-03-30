import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { v4 } from "uuid";

import { wait } from "@/shared/lib/async";
import type { Task, TaskInput } from "./schema";

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([]);

    async function loadTasks(projectId: string) {
      await wait();
      console.log(projectId);

      tasks.value = [];
    }

    async function createTask(payload: TaskInput) {
      await wait();

      if (tasks.value.find(task => task.title === payload.title && task.projectId === payload.projectId)) {
        throw new Error('Task already exists', { cause: { title: 'Already exists' } });
      }

      tasks.value.push({
        taskId: v4(),
        ...payload,
      });
    }

    async function editTask(taskId: Task['taskId'], payload: TaskInput) {
      await wait();

      const task = tasks.value.find(task => task.taskId === taskId);
      if (task) {
        Object.assign(task, payload);
      }
    }

    return {
      tasks: readonly(tasks),
      loadTasks,
      createTask,
      editTask,
    };
})