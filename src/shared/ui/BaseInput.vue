<script lang="ts" setup>
import { useId } from 'vue';

const model = defineModel<string>({ required: false, default: '' });

defineProps<{
  type?: string;
  name?: string;
  errorMessage?: string;
  title?: string;
}>();

const id = useId();
</script>

<template>
  <div>
    <label v-if="title" :for="id" class="block mb-2 text-sm font-medium text-white">
      {{ title }}
    </label>
    <input
      v-model="model"
      :type
      :name
      :id
      class="border rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 c-white focus:outline-none"
      placeholder="Project title"
    />
    <div v-if="errorMessage" class="c-red-400 mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>
