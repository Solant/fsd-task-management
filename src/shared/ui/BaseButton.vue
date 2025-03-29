<script lang="ts">
const variantMap: Record<string, string> = {
  primary: ' bg-blue-600 hover:bg-blue-700 focus:ring-blue-800',
  transparent: 'hover:bg-blue-700 focus:ring-blue-800',
  danger: ' bg-red-600 hover:bg-red-700 focus:ring-red-800',
};
</script>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'transparent' | 'danger';
  }>(),
  {
    variant: 'primary',
  },
);

const variantClass = computed(() => variantMap[props.variant]);
</script>

<template>
  <button
    type="button"
    class="text-white focus:ring-4 font-medium rounded-lg px-5 py-2.5 focus:outline-none"
    :class="variantClass"
  >
    <slot />
  </button>
</template>
