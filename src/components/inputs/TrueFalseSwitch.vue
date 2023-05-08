<template>
  <div
    class="true-false-switch"
    @click="toggle()"
    @keydown.space.prevent="toggle"
  >
    <span class="true-false-switch__background" :class="backgroundClass">
      {{ modelValue ? "Да" : "Нет" }}
    </span>
    <span class="true-false-switch__indicator" :style="indicatorClass" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

export interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const emits = defineEmits(["update:modelValue"]);

const backgroundClass = computed(() => ({
  enable: props.modelValue,
  disable: !props.modelValue,
}));

const indicatorClass = computed(() => ({
  transform: props.modelValue ? "translateX(34px)" : "translateX(0)",
}));

const toggle = () => {
  emits("update:modelValue", !props.modelValue);
};
</script>

<style lang="scss" scoped>
.true-false-switch {
  display: flex;
  position: relative;
  cursor: pointer;
  width: 60px;
  height: 26px;
  border-radius: 5px;

  &:focus {
    outline: 0;
  }

  &__background {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    transition: background-color 0.4s ease;
    font-size: 11px;
    line-height: 1;
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 8px;

    &.enable {
      background-color: var(--success-color);
      justify-content: flex-start;
    }
    &.disable {
      background-color: #9c9c9c;
      justify-content: flex-end;
    }
  }

  &__indicator {
    position: absolute;
    height: 22px;
    width: 22px;
    left: 2px;
    bottom: 2px;
    background-color: var(--background-color);
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;
  }
}
</style>
