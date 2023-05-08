<template>
  <textarea
    :class="textareaClass"
    :value="modelValue ?? ''"
    @input="updateTextarea"
  />
</template>

<script lang="ts" setup>
import { baseColors } from "@/types/colors";
import { computed } from "vue";

export interface Props {
  modelValue: string;
  color?: baseColors;
  isFull?: boolean;
  valid?: boolean | null;
}

const props = withDefaults(defineProps<Props>(), {
  color: "secondary",
  isFull: false,
  valid: null,
});

const emits = defineEmits(["update:modelValue"]);

const textareaClass = computed(() => [
  "base-textarea",
  `base-textarea_${props.color}`,
  {
    "base-textarea_full": props.isFull === true,
    "base-textarea_validated": props.valid === true,
    "base-textarea_failed": props.valid === false,
  },
]);

const updateTextarea = (event: InputEvent) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.base-textarea {
  padding: 10px 20px;
  min-height: 100px;
  background: transparent;
  outline: none;
  border-radius: 3px;
  font-size: 14px;
  border: 1px solid;
  color: var(--text-color);
  max-width: 100%;

  &_primary {
    border-color: var(--primary-color);
  }
  &_secondary {
    border-color: var(--secondary-color);
  }

  &_validated {
    border-color: var(--success-color);
  }
  &_failed {
    border-color: var(--error-color);
  }

  &_full {
    width: 100%;
    min-width: 100%;
  }

  &:focus {
    border-width: 2px;
    padding: 9px 19px;
  }
  &::placeholder {
    color: var(--secondary-color);
  }
}
</style>
