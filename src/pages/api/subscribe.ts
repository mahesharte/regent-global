import { send } from "@/lib/services/email";
import type { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";

import { html, subject, text } from "@/lib/services/email/templates/subscribe";
import { FormAPIResponse } from "@/types/global";

type Request = {
  email: string;
};

const contact = async (
  req: NextApiRequest,
  res: NextApiResponse<FormAPIResponse>,
) => {
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
      message: "Email address is required",
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
    message: "Your subscription has been submitted",
  });
};

export default contact;
