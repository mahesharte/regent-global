import { send } from "@/lib/services/email";
import type { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";
import pick from "lodash/pick";

import { html, subject, text } from "@/lib/services/email/templates/contact";
import { FormAPIResponse } from "@/types/global";

const requiredFields = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  message: "Message",
  phone: "",
};
type Request = typeof requiredFields;

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
  const request: Request = req.body ?? {};
  const keys = Object.keys(requiredFields) as (keyof Request)[];
  for (const key of keys) {
    if (requiredFields[key] && (!request[key] || !isString(request[key]))) {
      return res.status(400).json({
        error: true,
        message: `${requiredFields[key]} is required`,
      });
    }
  }
  const args = pick(request, keys);
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
    message: "Your contact information has been submitted",
  });
};

export default contact;
