<template>
  <div class="base-layout">
    <main class="base-layout__main container">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 30px 0;

  &__main {
    flex-grow: 3;
  }
}
</style>
