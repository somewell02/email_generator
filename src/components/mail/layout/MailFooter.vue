<template>
  <div class="mail-footer">
    <div class="mail-footer__section mail-footer__social">
      <h4>Подписывайтесь на наши соц. сети:</h4>
      <div class="mail-footer__social-list">
        <a v-for="item in social" :key="item.icon" :href="item.url">
          <icon-button>
            <img
              :src="require(`@/assets/image/icons/social/${item.icon}.svg`)"
              :alt="item.icon"
            />
          </icon-button>
        </a>
      </div>
    </div>
    <div class="mail-footer__section mail-footer__contact">
      <h4>Контакнтая информация:</h4>
      <p>8 (800) 700-70-70</p>
      <p>email@gmail.com</p>
    </div>
    <hr />
    <div class="mail-footer__section mail-footer__contact">
      <p>
        Вы получили это письмо, так как являетесь пользователем нашего портала.
        <br />
        Если вы не хотите получать рассылку, вы можете
        <a href="#">отписаться</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconButton from "@/components/buttons/IconButton.vue";

import { ref } from "vue";

const social = ref([
  {
    icon: "vk",
    url: "#",
  },
  {
    icon: "telegram",
    url: "#",
  },
  {
    icon: "youtube",
    url: "#",
  },
]);
</script>

<style lang="scss" scoped>
.mail-footer {
  background: var(--background-secondary-color);
  color: var(--text-color);
  padding: 20px 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;

  &__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    text-align: center;
  }

  &__social-list {
    display: flex;
    column-gap: 20px;
  }
}
</style>
