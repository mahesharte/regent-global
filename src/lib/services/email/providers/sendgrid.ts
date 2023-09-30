import sendgrid from "@sendgrid/mail";

import { SendMail } from "../types";

sendgrid.setApiKey(process.env.MAIL_API_KEY ?? "");

export const send = async ({
  html,
  recipients,
  sender,
  subject,
  text,
}: SendMail): Promise<void> => {
  await sendgrid.send({
    to: recipients.map(({ name, email }) => ({
      email,
      name,
    })),
    from: {
      email: sender.email,
      name: sender.name,
    },
    html,
    subject,
    text,
  });
};
