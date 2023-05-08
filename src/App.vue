<template>
  <div class="app-wrap">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useMailsStore } from "@/data/store/mailsStore";

const mailsStore = useMailsStore();
mailsStore.initMails();
</script>
