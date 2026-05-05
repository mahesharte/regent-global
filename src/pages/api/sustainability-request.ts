import { send } from "@/lib/services/email";
import type { NextApiRequest, NextApiResponse } from "next";
import isString from "lodash/isString";
import pick from "lodash/pick";

import { html, subject, text } from "@/lib/services/email/templates/sustainability-request";
import { FormAPIResponse } from "@/types/global";

const requiredFields = {
  emailAddress: "Email address",
  phoneNumber: "Phone number",
  companyName: "Company name",
};

type Request = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailAddress?: string;
  phone?: string;
  phoneNumber?: string;
  company?: string;
  companyName?: string;
};

const recipient = {
  name: process.env.SUSTAINABILITY_REQUEST_RECIPIENT_NAME ?? "Sustainability Request Recipient",
  email: process.env.SUSTAINABILITY_REQUEST_RECIPIENT_EMAIL ?? "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sustainabilityRequest = async (
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
  const formValues = {
    fullName: request.fullName,
    firstName: request.firstName,
    lastName: request.lastName,
    emailAddress: request.emailAddress ?? request.email,
    phoneNumber: request.phoneNumber ?? request.phone,
    companyName: request.companyName ?? request.company,
  };

  if (
    !formValues.fullName &&
    (!formValues.firstName || !isString(formValues.firstName) || !formValues.lastName || !isString(formValues.lastName))
  ) {
    return res.status(400).json({
      error: true,
      message:
        "Full name is required. Provide fullName or both firstName and lastName.",
    });
  }

  for (const key of Object.keys(requiredFields) as (keyof typeof requiredFields)[]) {
    const value = formValues[key];
    if (requiredFields[key] && (!value || !isString(value))) {
      return res.status(400).json({
        error: true,
        message: `${requiredFields[key]} is required`,
      });
    }
  }

  if (!emailPattern.test(formValues.emailAddress ?? "")) {
    return res.status(400).json({
      error: true,
      message: "Please enter a valid email address",
    });
  }

  if (!recipient.email) {
    return res.status(500).json({
      error: true,
      message:
        "Sustainability request recipient email is not configured. Please set SUSTAINABILITY_REQUEST_RECIPIENT_EMAIL.",
    });
  }

  const args = {
    fullName: formValues.fullName ?? `${request.firstName ?? ""} ${request.lastName ?? ""}`.trim(),
    firstName: request.firstName ?? "",
    lastName: request.lastName ?? "",
    emailAddress: formValues.emailAddress ?? "",
    phoneNumber: formValues.phoneNumber ?? "",
    companyName: formValues.companyName ?? "",
  };

  await send({
    html: html(args),
    recipients: [recipient],
    subject: subject(),
    text: text(args),
  });

  return res.json({
    message:
      "Your request to access Regent’s sustainability strategy has been successfully submitted",
  });
};

export default sustainabilityRequest;
