<template>
  <div class="mail-small-card">
    <div class="mail-small-card__title">
      {{ mailSubject }}
    </div>
    <div class="mail-small-card__actions">
      <icon-button size="small" @click="emits('edit')">
        <img src="@/assets/image/icons/edit.svg" alt="edit" />
      </icon-button>
      <icon-button size="small" @click="emits('delete')">
        <img src="@/assets/image/icons/delete.svg" alt="delete" />
      </icon-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconButton from "@/components/buttons/IconButton.vue";

interface Props {
  mailSubject?: string;
}

withDefaults(defineProps<Props>(), {
  mailSubject: "",
});

const emits = defineEmits(["edit", "delete"]);
</script>

<style lang="scss" scoped>
.mail-small-card {
  display: flex;
  align-items: center;
  column-gap: 20px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 10px 20px;

  &__title {
    flex-grow: 3;
  }

  &__actions {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }
}
</style>
