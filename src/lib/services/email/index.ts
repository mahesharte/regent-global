import { SendMail } from "./types";

import { send as mailchimpSend } from "./providers/mailchimp";
import { send as sendgridSend } from "./providers/sendgrid";

export const send = async (
  args: Omit<SendMail, "sender">,
  provider = process.env.MAIL_PROVIDER || "mailchimp",
): Promise<void> => {
  switch (provider) {
    case "mailchimp":
      return mailchimpSend({
        sender: {
          name: process.env.MAIL_SENDER_NAME ?? "",
          email: process.env.MAIL_SENDER_EMAIL ?? "",
        },
        ...args,
      });
    case "sendgrid":
      return sendgridSend({
        sender: {
          name: process.env.MAIL_SENDER_NAME ?? "",
          email: process.env.MAIL_SENDER_EMAIL ?? "",
        },
        ...args,
      });
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};
