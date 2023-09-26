export type User = {
  name: string;
  email: string;
};

export type Template = "contact" | "subscribe";

export type Args = {
  [name: string]: string;
};

export type SendMail<Options = Record<string, string>> = {
  html: string;
  options?: Options;
  recipients: User[];
  sender: User;
  subject: string;
  text: string;
};
