<template>
  <div class="mail-layout">
    <mail-header />
    <div class="mail-layout__main">
      <slot />
    </div>
    <mail-footer />
  </div>
</template>

<script lang="ts" setup>
import MailHeader from "@/components/mail/layout/MailHeader.vue";
import MailFooter from "@/components/mail/layout/MailFooter.vue";
</script>

<style lang="scss" scoped>
.mail-layout {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
}
</style>
