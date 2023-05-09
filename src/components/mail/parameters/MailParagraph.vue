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
          <div class="mail-paragraph__editor-actions">
            <base-button @click="addBoldeable">Жирным</base-button>
          </div>
          <base-textarea
            v-model="localParameter.text"
            placeholder="Текст абзаца"
            is-full
          />
        </div>
      </template>
      <template v-else>
        <p
          v-sane-html="paragraphDisplay"
          :class="[
            'mail-paragraph__content',
            `mail-paragraph__content_${parameter.align ?? 'left'}`,
          ]"
        />
      </template>
    </div>
  </mail-parameter-layout>
</template>

<script lang="ts" setup>
import MailParameterLayout from "@/components/mail/parameters/MailParameterLayout.vue";
import BaseTextarea from "@/components/inputs/BaseTextarea.vue";

import { computed, reactive, ref } from "vue";
import { Link, MailParagraph } from "@/types/mail";
import { useGeneratorStore } from "@/data/store/generatorStore";
import BaseButton from "@/components/buttons/BaseButton.vue";

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

const paragraphDisplay = computed(() => {
  let paragraph = props.parameter.text;

  props.parameter.boldeable?.forEach((item: string) => {
    paragraph = paragraph.split(item).join(`<b>${item}</b>`);
  });

  props.parameter.links?.forEach((item: Link) => {
    paragraph = paragraph
      .split(item.text)
      .join(`<a href="${item.href}">${item.text}</a>`);
  });

  return paragraph;
});

const setEditMode = () => {
  isEdit.value = true;
};

const saveParameter = () => {
  generatorStore.updateParameter(localParameter, props.index);
};

const addBoldeable = () => {
  const selection = window.getSelection();
  if (!selection) return;

  const selectionText = selection.toString();
  if (!props.parameter.text.includes(selectionText)) return;

  localParameter.boldeable = localParameter.boldeable
    ? [...localParameter.boldeable, selectionText]
    : [selectionText];
};
</script>

<style lang="scss" scoped>
.mail-paragraph {
  color: var(--text-color);

  &__content {
    &_left {
      text-align: left;
    }
    &_center {
      text-align: center;
    }
    &_right {
      text-align: right;
    }
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
