import mailchimp from "@mailchimp/mailchimp_transactional";

import { SendMail } from "../types";

const client = mailchimp(process.env.MAIL_API_KEY ?? "");

export const send = async ({
  html,
  recipients,
  sender,
  subject,
  text,
}: SendMail): Promise<void> => {
  await client.messages.send({
    message: {
      from_email: sender.email,
      from_name: sender.name,
      html,
      subject,
      text,
      to: recipients.map(({ name, email }) => ({
        email,
        name,
      })),
    },
  });
};
