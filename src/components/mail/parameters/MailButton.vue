<template>
  <mail-parameter-layout
    :is-editable="isEditable"
    :is-edit="isEdit"
    :index="index"
    @edit="setEditMode"
    @save="saveParameter"
  >
    <div class="mail-parameter mail-button">
      <template v-if="isEdit">
        <div class="mail-button__editor">
          <text-input
            v-model="localParameter.text"
            placeholder="Текст кнопки"
            is-full
          />
          <text-input
            v-model="localParameter.action"
            placeholder="Ссылка"
            is-full
          />
        </div>
      </template>
      <template v-else>
        <a
          :href="parameter.action"
          class="mail-button__content"
          target="_blank"
        >
          <base-button v-sane-html="parameter.text" is-full />
        </a>
      </template>
    </div>
  </mail-parameter-layout>
</template>

<script lang="ts" setup>
import MailParameterLayout from "@/components/mail/parameters/MailParameterLayout.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

import { reactive, ref } from "vue";
import { MailButton } from "@/types/mail";
import { useGeneratorStore } from "@/data/store/generatorStore";

interface Props {
  parameter: MailButton;
  index: number;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const isEdit = ref<boolean>(false);
const localParameter = reactive<MailButton>(
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
.mail-button {
  &__editor {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>
