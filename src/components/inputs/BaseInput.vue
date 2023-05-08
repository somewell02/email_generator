<template>
  <input :class="inputClass" />
</template>

<script lang="ts" setup>
import { baseColors } from "@/types/colors";
import { computed } from "vue";

export interface Props {
  color?: baseColors;
  valid?: boolean | null;
}

const props = withDefaults(defineProps<Props>(), {
  color: "secondary",
  valid: null,
});

const inputClass = computed(() => [
  "base-input",
  `base-input_${props.color}`,
  {
    "base-input_validated": props.valid === true,
    "base-input_failed": props.valid === false,
  },
]);
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  padding: 0 20px;
  height: 40px;
  background: transparent;
  outline: none;
  border-radius: 3px;
  font-size: 14px;
  border: 1px solid;
  color: var(--text-color);

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

  &:focus {
    border-width: 2px;
    padding: 0 19px;
  }
  &::placeholder {
    color: var(--secondary-color);
  }
}
</style>
