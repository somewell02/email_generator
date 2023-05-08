import { defineStore } from "pinia";
import { ref } from "vue";

import { Mail } from "@/types/mail";
import { useGeneratorStore } from "@/data/store/generatorStore";
import { getMailsFromLs, setMailsToLs } from "@/data/localstorage/mails";

export const useMailsStore = defineStore("mails-store", () => {
  const mails = ref<Mail[]>([]);

  const initMails = () => {
    mails.value = getMailsFromLs() ?? [];
  };

  const updateLocalStorage = () => {
    setMailsToLs(mails.value);
  };

  const addMail = (mail: Mail) => {
    mails.value.push(mail);
    updateLocalStorage();
  };

  const updateMailFromGenerator = () => {
    const generatorStore = useGeneratorStore();
    const idx = generatorStore.mailIdx;

    if (idx !== undefined && mails.value[idx]) {
      mails.value[idx] = Object.assign({ ...generatorStore.mail });
      updateLocalStorage();
    }
  };

  const deleteMail = (idx: number) => {
    mails.value.splice(idx, 1);
    updateLocalStorage();
  };

  return { mails, initMails, addMail, updateMailFromGenerator, deleteMail };
});
