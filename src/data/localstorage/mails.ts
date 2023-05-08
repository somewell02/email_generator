import { Mail } from "@/types/mail";

const MAILS_KEY = "mails";

export const getMailsFromLs = (): Mail[] | undefined => {
  const mails = localStorage.getItem(MAILS_KEY);
  return mails ? JSON.parse(mails) : undefined;
};

export const setMailsToLs = (mails: Mail[]): void => {
  const stringifiedMails = JSON.stringify(mails);
  localStorage.setItem(MAILS_KEY, stringifiedMails);
};
