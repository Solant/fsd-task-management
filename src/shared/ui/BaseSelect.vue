<script lang="ts" setup>
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui';

const model = defineModel<string>({ required: false });

defineProps<{
  options: string[];
  placeholder: string;
}>();
</script>

<template>
  <SelectRoot v-model="model">
    <SelectTrigger
      v-bind="$attrs"
      class="inline-flex min-w-[160px] items-center justify-between rounded-lg p-2.5 leading-none gap-[5px] bg-gray-600 c-white border border-gray-500 outline-none"
      aria-label="Customise options"
    >
      <SelectValue class="capitalize" :placeholder />
      <div class="i-mdi-menu-down" />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="min-w-[160px] bg-gray-600 rounded-lg border border-gray-500 z-[100] c-white"
        :side-offset="5"
      >
        <SelectViewport class="p-[5px]">
          <SelectGroup>
            <SelectItem
              v-for="option in options"
              :key="option"
              class="leading-none c-white rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[highlighted]:bg-blue-600"
              :value="option"
            >
              <SelectItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <div class="i-mdi-check" />
              </SelectItemIndicator>
              <SelectItemText class="capitalize">{{ option }}</SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
