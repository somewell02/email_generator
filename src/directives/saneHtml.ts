import DOMPurify from "dompurify";

export const saneHtml = (el: { innerHTML: any }, binding: { value: any }) => {
  el.innerHTML = DOMPurify.sanitize(binding.value);
};
