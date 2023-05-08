<template>
  <base-input
    type="text"
    :color="color"
    :valid="valid"
    :value="modelValue ?? ''"
    @input="updateInput"
  />
</template>

<script lang="ts" setup>
import BaseInput from "@/components/inputs/BaseInput.vue";
import { baseColors } from "@/types/colors";

export interface Props {
  modelValue: string;
  color?: baseColors;
  valid?: boolean | null;
}

withDefaults(defineProps<Props>(), {
  color: "secondary",
  valid: null,
});

const emits = defineEmits(["update:modelValue"]);

const updateInput = (event: InputEvent) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
