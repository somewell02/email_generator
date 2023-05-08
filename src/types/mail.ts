export interface Link {
  text: string;
  href: string;
}

export type align = "left" | "center" | "right";

export enum MailParameterType {
  TEXT_ON_BACKGROUND = "text_on_background",
  PARAGRAPH_HEADER = "paragraph_header",
  PARAGRAPH = "paragraph",
  BUTTON = "button",
}

export interface MailTextOnBackground {
  type: MailParameterType.TEXT_ON_BACKGROUND;
  text: string;
  is_boldest?: boolean;
}

export interface MailParagraphHeader {
  type: MailParameterType.PARAGRAPH_HEADER;
  text: string;
  is_boldest?: boolean;
}

export interface MailParagraph {
  type: MailParameterType.PARAGRAPH;
  text: string;
  links?: Link[];
  boldeable?: string[];
  align?: align;
}

export interface MailButton {
  type: MailParameterType.BUTTON;
  text: string;
  action: string;
}

export type Parameter =
  | MailTextOnBackground
  | MailParagraphHeader
  | MailParagraph
  | MailButton;

export interface Mail {
  subject: string;
  parameters: Parameter[];
}
