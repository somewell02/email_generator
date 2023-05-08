import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import { Mail, MailParameterType, Parameter } from "@/types/mail";

export const useGeneratorStore = defineStore("generator-store", () => {
  const mailIdx = ref<number | undefined>();
  const mail = reactive<Mail>({
    subject: "",
    parameters: [],
  });

  const setMail = (newMail: Mail, idx: number) => {
    mailIdx.value = idx;
    Object.assign(mail, JSON.parse(JSON.stringify(newMail)));
  };

  const resetMail = () => {
    mailIdx.value = undefined;
    Object.assign(mail, {
      subject: "",
      parameters: [],
    });
  };

  const addParameter = (type: MailParameterType) => {
    console.log(type);
    switch (type) {
      case MailParameterType.TEXT_ON_BACKGROUND:
        mail.parameters.push({
          type,
          text: "Абзац",
          is_boldest: false,
        });
        break;
      case MailParameterType.PARAGRAPH_HEADER:
        mail.parameters.push({
          type,
          text: "Заголовок",
          is_boldest: false,
        });
        break;
      case MailParameterType.PARAGRAPH:
        mail.parameters.push({
          type,
          text: "Абзац",
          links: [],
          boldeable: [],
          align: "left",
        });
        break;
      case MailParameterType.BUTTON:
        mail.parameters.push({
          type,
          text: "Кнопка",
          action: "#",
        });
        break;
    }
  };

  const updateParameter = (parameter: Parameter, idx: number) => {
    mail.parameters[idx] = Object.assign({ ...parameter });
  };

  const deleteParameter = (idx: number) => {
    mail.parameters.splice(idx, 1);
  };

  const moveParameter = (idx: number, direction: "up" | "down") => {
    console.log(idx, direction);

    if (
      (idx === 0 && direction === "up") ||
      (idx === mail.parameters.length - 1 && direction === "down")
    )
      return;

    const parameter = mail.parameters[idx];
    mail.parameters.splice(idx, 1);
    mail.parameters.splice(
      direction === "up" ? idx - 1 : idx + 1,
      0,
      parameter
    );
  };

  return {
    mail,
    mailIdx,
    setMail,
    resetMail,
    addParameter,
    updateParameter,
    deleteParameter,
    moveParameter,
  };
});
