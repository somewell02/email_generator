<template>
  <div class="mail-header">
    <div class="mail-header__logo">LOGO</div>
    <div class="mail-header__action">8 (800) 700-70-70</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.mail-header {
  background: var(--primary-color);
  color: var(--primary-text-color);
  padding: 20px 30px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    font-weight: 800;
    font-size: 24px;
  }
}
</style>
