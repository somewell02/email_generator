<template>
  <div class="mail-parameter-layout">
    <div class="mail-parameter-layout__actions" v-if="isEditable">
      <div class="mail-parameter-layout__actions-list">
        <icon-button size="small" v-if="isEdit" @click="emits('save')">
          <img src="@/assets/image/icons/save.svg" alt="save" />
        </icon-button>
        <icon-button size="small" v-else @click="emits('edit')">
          <img src="@/assets/image/icons/edit.svg" alt="edit" />
        </icon-button>
        <icon-button size="small" @click="deleteParameter">
          <img src="@/assets/image/icons/delete.svg" alt="delete" />
        </icon-button>
        <icon-button size="small" @click="moveParameter('up')">
          <img
            src="@/assets/image/icons/arrow.svg"
            alt="move up"
            class="move-up-arrow"
          />
        </icon-button>
        <icon-button size="small" @click="moveParameter('down')">
          <img
            src="@/assets/image/icons/arrow.svg"
            alt="move down"
            class="move-down-arrow"
          />
        </icon-button>
      </div>
    </div>
    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconButton from "@/components/buttons/IconButton.vue";

import { useGeneratorStore } from "@/data/store/generatorStore";
import { computed } from "vue";

interface Props {
  index?: number;
  isEdit?: boolean;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
  isEditable: false,
});

const emits = defineEmits(["edit", "save", "delete", "moveUp", "moveDown"]);

const generatorStore = useGeneratorStore();

const moveParameter = (direction: "up" | "down") => {
  if (props.index !== undefined) {
    generatorStore.moveParameter(props.index, direction);
  }

  emits(direction === "up" ? "moveUp" : "moveDown");
};

const deleteParameter = () => {
  if (props.index !== undefined) {
    generatorStore.deleteParameter(props.index);
  }

  emits("delete");
};

const contentClass = computed(() => [
  "mail-parameter-layout__content",
  {
    "mail-parameter-layout__content_bordered": props.isEditable,
  },
]);
</script>

<style lang="scss" scoped>
.mail-parameter-layout {
  display: flex;
  flex-direction: column;

  &__actions {
    display: flex;
    justify-content: center;

    &-list {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 15px;
      padding: 7px 15px;
      border: solid var(--border-color);
      border-width: 1px 1px 0 1px;
      border-radius: 4px 4px 0 0;

      .move-up-arrow {
        transform: rotate(-90deg);
      }
      .move-down-arrow {
        transform: rotate(90deg);
      }
    }
  }

  &__content_bordered {
    padding: 20px 30px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
  }
}
</style>
