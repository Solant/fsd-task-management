<script lang="ts" setup>
import { ref } from 'vue';
import { AlertDialogCancel } from 'reka-ui';
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { toTypedSchema } from '@vee-validate/valibot';

import BaseButton from '@/shared/ui/BaseButton.vue';
import BaseDialog from '@/shared/ui/BaseDialog.vue';
import BaseInput from '@/shared/ui/BaseInput.vue';
import BaseSpinner from '@/shared/ui/BaseSpinner.vue';
import { ProjectInputSchema, type ProjectInput } from '@/entities/project';
import { useProjectStore } from '@/entities/project';

const open = ref(false);
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);

const props = defineProps<{
  projectId?: string;
}>();

const validationSchema = toTypedSchema(ProjectInputSchema);
const form = useForm<ProjectInput>({
  initialValues: props.projectId
    ? projects.value.find((project) => project.projectId === props.projectId)
    : {
        title: '',
      },
  validationSchema,
});

const [title] = form.defineField('title');

const submit = form.handleSubmit(async (payload) => {
  try {
    if (props.projectId) {
      await projectStore.updateProject(props.projectId, payload);
    } else {
      await projectStore.createProject(payload);
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
      <template v-if="projectId"> Edit project </template>

      <template v-else> Create new project </template>
    </template>

    <template #description>
      <form @submit.prevent="submit">
        <BaseInput
          v-model="title"
          name="title"
          title="Title"
          :error-message="form.errors.value.title"
        />
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
