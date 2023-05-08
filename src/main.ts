import { createApp } from "vue";
import { createPinia } from "pinia";
import { saneHtml } from "@/directives/saneHtml";

import App from "./App.vue";
import "./assets/css/index.scss";

import router from "./router";
const pinia = createPinia();

const app = createApp(App);

app.directive("sane-html", saneHtml);
app.use(router).use(pinia);

app.mount("#app");
