import { Args } from "../types";

const getFullName = (args: Args) =>
  args.fullName || `${args.firstName ?? ""} ${args.lastName ?? ""}`.trim();

export const subject = () => `Sustainability Strategy Document Request`;

export const text = (args: Args) => `
  Hello,

  A visitor has requested a Sustainability Strategy Document:

  Full name: ${getFullName(args)}
  Email address: ${args.emailAddress}
  Phone number: ${args.phoneNumber}
  Company name: ${args.companyName}

  Regent Global
`;

export const html = (args: Args) => `
  Hello,<br />
  <br />
  A visitor has requested a Sustainability Strategy Document:<br />
  <br />
  Full name: <strong>${getFullName(args)}</strong><br />
  Email address: <strong>${args.emailAddress}</strong><br />
  Phone number: <strong>${args.phoneNumber}</strong><br />
  Company name: <strong>${args.companyName}</strong><br />
  <br />
  Regent Global
`;
