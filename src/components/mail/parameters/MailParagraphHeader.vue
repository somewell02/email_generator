<template>
  <mail-parameter-layout
    :is-editable="isEditable"
    :is-edit="isEdit"
    :index="index"
    @edit="setEditMode"
    @save="saveParameter"
  >
    <div :class="paragraphHeaderClass">
      <template v-if="isEdit">
        <div class="mail-paragraph-header__editor">
          <div class="mail-paragraph-header__editor-row">
            Выделить жирным
            <true-false-switch v-model="localParameter.is_boldest" />
          </div>
          <text-input
            v-model="localParameter.text"
            placeholder="Текст заголовка"
            is-full
          />
        </div>
      </template>
      <template v-else>
        <h3
          v-sane-html="parameter.text"
          class="mail-paragraph-header__content"
        />
      </template>
    </div>
  </mail-parameter-layout>
</template>

<script lang="ts" setup>
import MailParameterLayout from "@/components/mail/parameters/MailParameterLayout.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import TrueFalseSwitch from "@/components/inputs/TrueFalseSwitch.vue";

import { computed, reactive, ref } from "vue";
import { MailParagraphHeader } from "@/types/mail";
import { useGeneratorStore } from "@/data/store/generatorStore";

interface Props {
  parameter: MailParagraphHeader;
  index: number;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const isEdit = ref<boolean>(false);
const localParameter = reactive<MailParagraphHeader>(
  Object.assign({ ...props.parameter })
);

const generatorStore = useGeneratorStore();

const setEditMode = () => {
  isEdit.value = true;
};

const saveParameter = () => {
  generatorStore.updateParameter(localParameter, props.index);
};

const paragraphHeaderClass = computed(() => [
  "mail-parameter mail-paragraph-header",
  {
    "mail-paragraph-header_boldest": props.parameter.is_boldest,
  },
]);
</script>

<style lang="scss" scoped>
.mail-paragraph-header {
  color: var(--text-color);

  &:not(&_boldest) &__content {
    font-weight: 500;
  }

  &_boldest &__content {
    font-weight: 600;
  }

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
