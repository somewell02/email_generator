<template>
  <label class="json-file-input">
    <input @change="uploadFile" type="file" accept="application/json" />
    <slot />
  </label>
</template>

<script lang="ts" setup>
const emits = defineEmits(["onload"]);

const reader = new FileReader();
reader.onload = (event: ProgressEvent<FileReader>) => {
  if (!event.target || typeof event.target.result !== "string") return;
  const obj = JSON.parse(event.target.result);
  emits("onload", obj);
};

const uploadFile = (event: InputEvent) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  const file = files[0];

  if (file && file.type === "application/json") {
    reader.readAsText(file);
  }
};
</script>

<style lang="scss" scoped>
.json-file-input {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 40px;
  height: 45px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  background-color: var(--primary-color);
  border: none;
  color: var(--primary-text-color);

  &:hover {
    background-color: var(--background-color);
    outline: 1px solid var(--primary-color);
    color: var(--primary-color);
  }

  input {
    display: none;
  }
}
</style>
