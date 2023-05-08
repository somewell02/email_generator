<template>
  <button :class="btnClass">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { baseColors } from "@/types/colors";
import { computed } from "vue";

interface Props {
  color?: baseColors;
  isBordered?: boolean;
  isFull?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: "primary",
  isBordered: false,
  isFull: false,
});

const btnClass = computed(() => [
  "base-button",
  `base-button_${props.color}`,
  {
    "base-button_full": props.isFull,
    "base-button_bordered": props.isBordered,
  },
]);
</script>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 40px;
  height: 45px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin: 0;

  &_full {
    width: 100%;
  }

  @mixin btn-filled {
    &.base-button_primary {
      background-color: var(--primary-color);
      border: none;
      color: var(--primary-text-color);
    }
    &.base-button_secondary {
      background-color: var(--secondary-color);
      border: none;
      color: var(--primary-text-color);
    }
  }

  @mixin btn-bordered {
    &.base-button_primary {
      background-color: var(--background-color);
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    &.base-button_secondary {
      background-color: var(--background-color);
      border: 1px solid var(--secondary-color);
      color: var(--secondary-color);
    }
  }

  &_bordered {
    @include btn-bordered;
    &:hover {
      @include btn-filled;
    }
  }

  &:not(&_bordered) {
    @include btn-filled;
    &:hover {
      @include btn-bordered;
    }
  }
}
</style>
