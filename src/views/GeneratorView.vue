<template>
  <base-layout class="generator-layout">
    <div class="generator-mail">
      <mail-edit-card />
    </div>
    <div class="generator-actions">
      <div class="generator-actions__list container">
        <base-button color="secondary" is-full @click="backToHome">
          Назад
        </base-button>
        <base-button is-full @click="saveMail"> Сохранить </base-button>
      </div>
    </div>
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import MailEditCard from "@/components/mail/cards/MailEditCard.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

import { useGeneratorStore } from "@/data/store/generatorStore";
import { useMailsStore } from "@/data/store/mailsStore";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const mailsStore = useMailsStore();
const generatorStore = useGeneratorStore();
const router = useRouter();

onMounted(() => {
  const route = useRoute();
  const idx = parseInt(route.params.id.toString());
  const mail = mailsStore.mails[idx];
  generatorStore.setMail(mail, idx);
});

const backToHome = () => {
  generatorStore.resetMail();
  router.push({ name: "home" });
};

const saveMail = () => {
  mailsStore.updateMailFromGenerator();
  generatorStore.resetMail();
  router.push({ name: "home" });
};
</script>

<style lang="scss" scoped>
.generator-layout {
  padding-bottom: 120px;

  .generator-actions {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;

    &__list {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }
  }
}
</style>
