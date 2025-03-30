<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { AlertDialogCancel } from 'reka-ui';
import { storeToRefs } from 'pinia';

import BaseDialog from '@/shared/ui/BaseDialog.vue';
import BaseInput from '@/shared/ui/BaseInput.vue';
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';
import BaseButton from '@/shared/ui/BaseButton.vue';
import { useTaskStore, type TaskInput } from '@/entities/task';
import BaseSelect from '@/shared/ui/BaseSelect.vue';

const props = defineProps<{ taskId?: string; projectId: string }>();

const open = ref(false);

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

const form = useForm<TaskInput>({
  initialValues: props.taskId
    ? tasks.value.find((task) => task.taskId === props.taskId)
    : {
        title: '',
        description: '',
        priority: 'low',
        projectId: props.projectId,
        status: 'pending',
      },
});
const [title] = form.defineField('title');
const [description] = form.defineField('description');
const [priority] = form.defineField('priority');
const [status] = form.defineField('status');

const submit = form.handleSubmit(async (payload) => {
  try {
    if (props.taskId) {
      await taskStore.editTask(props.taskId, payload);
    } else {
      await taskStore.createTask(payload);
    }
    form.resetForm();
    open.value = false;
  } catch (e: unknown) {
    if (e instanceof Error && typeof e.cause === 'object' && e.cause !== null) {
      form.setErrors(e.cause);
    }
  }
});
</script>

<template>
  <BaseDialog v-model:open="open">
    <slot />

    <template #title>
      <template v-if="taskId"> Edit task </template>

      <template v-else> Create new task </template>
    </template>

    <template #description>
      <form @submit.prevent="submit">
        <BaseInput
          v-model="title"
          name="title"
          title="Title"
          :error-message="form.errors.value.title"
        />

        <BaseInput
          class="mt-5"
          v-model="description"
          name="description"
          title="Description"
          :error-message="form.errors.value.description"
        />

        <div class="flex justify-between mt-5">
          <BaseSelect
            v-model="priority"
            placeholder="Priority"
            :options="['low', 'medium', 'high']"
          />

          <BaseSelect
            v-model="status"
            placeholder="Status"
            :options="['pending', 'in-progress', 'done']"
          />
        </div>
      </form>
    </template>

    <template #footer>
      <template v-if="form.isSubmitting.value">
        <BaseSpinner />
      </template>

      <template v-else>
        <AlertDialogCancel as-child>
          <BaseButton variant="transparent">Cancel</BaseButton>
        </AlertDialogCancel>

        <BaseButton @click="submit"> Save </BaseButton>
      </template>
    </template>
  </BaseDialog>
</template>
