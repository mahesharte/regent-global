import { send } from "@/lib/services/email";
import type { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";

import { html, subject, text } from "@/lib/services/email/templates/contact";

type Request = {
  email?: string;
};
type Response = {
  error?: boolean;
  message: string;
};

const contact = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method?.toUpperCase() !== "POST") {
    return res.status(405).json({
      error: true,
      message: `Unsupported HTTP method: ${req.method}`,
    });
  }
  const { email }: Request = req.body ?? {};
  if (!email || !isString(email)) {
    return res.status(400).json({
      error: true,
      message: "Email is required",
    });
  }
  const args = {
    email,
  };
  await send({
    html: html(args),
    recipients: [
      {
        name: process.env.MAIL_RECIPIENT_NAME ?? "",
        email: process.env.MAIL_RECIPIENT_EMAIL ?? "",
      },
    ],
    subject: subject(),
    text: text(args),
  });
  return res.json({
    message: "Contact info sent",
  });
};

export default contact;
