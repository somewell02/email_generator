<template>
  <mail-layout class="mail-edit-card">
    <div class="mail-edit-parameters">
      <div class="mail-edit-parameters__list">
        <div
          v-for="(parameter, idx) in generatorStore.mail.parameters"
          :key="parameter"
        >
          <component
            v-if="getParameterComponent(parameter.type)"
            :is="getParameterComponent(parameter.type)"
            :parameter="parameter"
            :index="idx"
            is-editable
          />
        </div>
      </div>
      <div class="mail-edit-parameters__add-block">
        <base-button
          v-for="button in addButtons"
          :key="`add-button-${button.type}`"
          is-bordered
          is-full
          @click="addParameter(button.type)"
        >
          {{ button.title }}
        </base-button>
      </div>
    </div>
  </mail-layout>
</template>

<script lang="ts" setup>
import MailLayout from "@/components/mail/layout/MailLayout.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

import MailTextOnBackground from "@/components/mail/parameters/MailTextOnBackground.vue";
import MailParagraphHeader from "@/components/mail/parameters/MailParagraphHeader.vue";
import MailParagraph from "@/components/mail/parameters/MailParagraph.vue";
import MailButton from "@/components/mail/parameters/MailButton.vue";

import { Component, computed } from "vue";
import { useGeneratorStore } from "@/data/store/generatorStore";
import { MailParameterType } from "@/types/mail";

const generatorStore = useGeneratorStore();

const getParameterComponent = (type: MailParameterType): Component | null => {
  switch (type) {
    case MailParameterType.TEXT_ON_BACKGROUND:
      return MailTextOnBackground;
    case MailParameterType.PARAGRAPH_HEADER:
      return MailParagraphHeader;
    case MailParameterType.PARAGRAPH:
      return MailParagraph;
    case MailParameterType.BUTTON:
      return MailButton;
    default:
      return null;
  }
};

const addButtons = computed(() => [
  {
    title: "Добавить текст на фоне",
    type: MailParameterType.TEXT_ON_BACKGROUND,
  },
  {
    title: "Добавить заголовок",
    type: MailParameterType.PARAGRAPH_HEADER,
  },
  {
    title: "Добавить абзац",
    type: MailParameterType.PARAGRAPH,
  },
  {
    title: "Добавить кнопку",
    type: MailParameterType.BUTTON,
  },
]);

const addParameter = (type: MailParameterType) => {
  generatorStore.addParameter(type);
};
</script>

<style lang="scss" scoped>
.mail-edit-parameters,
.mail-edit-parameters__list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.mail-edit-parameters__add-block {
  display: flex;
  column-gap: 20px;
  margin: 20px 0;
}
</style>
