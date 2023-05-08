<template>
  <mail-parameter-layout
    :is-editable="isEditable"
    :is-edit="isEdit"
    :index="index"
    @edit="setEditMode"
    @save="saveParameter"
  >
    <div class="mail-parameter mail-paragraph">
      <template v-if="isEdit">
        <div class="mail-paragraph__editor">
          <base-textarea
            v-model="localParameter.text"
            placeholder="Текст абзаца"
            is-full
          />
        </div>
      </template>
      <template v-else>
        <p v-sane-html="parameter.text" class="mail-paragraph__content" />
      </template>
    </div>
  </mail-parameter-layout>
</template>

<script lang="ts" setup>
import MailParameterLayout from "@/components/mail/parameters/MailParameterLayout.vue";
import BaseTextarea from "@/components/inputs/BaseTextarea.vue";

import { reactive, ref } from "vue";
import { MailParagraph } from "@/types/mail";
import { useGeneratorStore } from "@/data/store/generatorStore";

interface Props {
  parameter: MailParagraph;
  index: number;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const isEdit = ref<boolean>(false);
const localParameter = reactive<MailParagraph>(
  Object.assign({ ...props.parameter })
);

const generatorStore = useGeneratorStore();

const setEditMode = () => {
  isEdit.value = true;
};

const saveParameter = () => {
  generatorStore.updateParameter(localParameter, props.index);
};
</script>

<style lang="scss" scoped>
.mail-paragraph {
  color: var(--text-color);

  &__editor {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    &-row {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }
  }
}
</style>
