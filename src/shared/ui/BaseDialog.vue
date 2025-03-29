<script lang="ts" setup>
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'reka-ui';

const open = defineModel<boolean>({ required: false, default: true });
</script>

<template>
  <AlertDialogRoot v-model:open="open">
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 z-30 bg-gray-900/80" />
      <AlertDialogContent
        @escape-key-down.prevent
        class="z-[100] text-sm fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-gray-600 p-[25px]"
      >
        <AlertDialogTitle class="c-white m-0 text-[17px] font-semibold">
          <slot name="title" />
        </AlertDialogTitle>

        <AlertDialogDescription class="c-white mt-4 mb-5 text-sm leading-normal">
          <slot name="description" />
        </AlertDialogDescription>

        <div class="flex justify-end gap-4">
          <slot name="footer" />
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
