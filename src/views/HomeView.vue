<template>
  <base-layout>
    <div class="mails-list">
      <mail-small-card
        v-for="(mail, idx) in mailsStore.mails"
        :key="mail"
        :mail-subject="mail.subject"
        @edit="editMail(idx)"
        @delete="deleteMail(idx)"
      />
    </div>
    <div class="mails-actions">
      <json-file-input @onload="importMail"> Импортировать </json-file-input>
    </div>
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import MailSmallCard from "@/components/mail/cards/MailSmallCard.vue";
import JsonFileInput from "@/components/inputs/JsonFileInput.vue";

import { useMailsStore } from "@/data/store/mailsStore";
import { useRouter } from "vue-router";
import { Mail } from "@/types/mail";

const mailsStore = useMailsStore();
const router = useRouter();

const editMail = (idx: number) => {
  router.push({ name: "generator", params: { id: idx } });
};

const deleteMail = (idx: number) => {
  mailsStore.deleteMail(idx);
};

const importMail = (mail: Mail) => {
  mailsStore.addMail(mail);
};
</script>

<style lang="scss" scoped>
.mails-list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.mails-actions {
  margin-top: 20px;
  display: flex;
  column-gap: 20px;
}
</style>
