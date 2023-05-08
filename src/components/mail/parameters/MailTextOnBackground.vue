<template>
  <mail-parameter-layout
    :is-editable="isEditable"
    :is-edit="isEdit"
    :index="index"
    @edit="setEditMode"
    @save="saveParameter"
  >
    <div :class="textOnBgClass">
      <template v-if="isEdit">
        <div class="mail-text-on-bg__editor">
          <div class="mail-text-on-bg__editor-row">
            Выделить жирным
            <true-false-switch v-model="localParameter.is_boldest" />
          </div>
          <base-textarea
            v-model="localParameter.text"
            placeholder="Текст абзаца"
            is-full
          />
        </div>
      </template>
      <template v-else>
        <p v-sane-html="parameter.text" class="mail-text-on-bg__content" />
      </template>
    </div>
  </mail-parameter-layout>
</template>

<script lang="ts" setup>
import MailParameterLayout from "@/components/mail/parameters/MailParameterLayout.vue";
import BaseTextarea from "@/components/inputs/BaseTextarea.vue";
import TrueFalseSwitch from "@/components/inputs/TrueFalseSwitch.vue";

import { computed, reactive, ref } from "vue";
import { MailTextOnBackground } from "@/types/mail";
import { useGeneratorStore } from "@/data/store/generatorStore";

interface Props {
  parameter: MailTextOnBackground;
  index: number;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const isEdit = ref<boolean>(false);
const localParameter = reactive<MailTextOnBackground>(
  Object.assign({ ...props.parameter })
);

const generatorStore = useGeneratorStore();

const setEditMode = () => {
  isEdit.value = true;
};

const saveParameter = () => {
  generatorStore.updateParameter(localParameter, props.index);
};

const textOnBgClass = computed(() => [
  "mail-parameter mail-text-on-bg",
  {
    "mail-text-on-bg_boldest": props.parameter.is_boldest,
  },
]);
</script>

<style lang="scss" scoped>
.mail-text-on-bg {
  background: var(--background-secondary-color);
  color: var(--text-color);
  padding: 20px 30px;
  border-radius: 4px;

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
