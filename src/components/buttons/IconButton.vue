<template>
  <button :class="btnClass">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: "small" | "standard" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  size: "standard",
});

const btnClass = computed(() => ["icon-button", `icon-button_${props.size}`]);
</script>

<style lang="scss" scoped>
.icon-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  border: none;
  background: none;

  &_small {
    width: 20px;
    height: 20px;
  }

  &_standard {
    width: 30px;
    height: 30px;
  }

  &_large {
    width: 40px;
    height: 40px;
  }

  :deep(img) {
    width: 100%;
    height: 100%;
  }
}
</style>
