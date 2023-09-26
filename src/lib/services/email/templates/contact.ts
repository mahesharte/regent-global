import { Args } from "../types";

export const subject = () => `Regent Global - Contact`;

export const text = (args: Args) => `
  Hello,

  A visitor has reached out:

  Name: ${args.firstName} ${args.lastName}
  Email address: ${args.email}
  Phone: ${args.phone ?? "-"}
  Message:
  
  ${args.message}

  Regent Global
`;

export const html = (args: Args) => `
  Hello,<br />
  <br />
  A visitor has reached out:<br />
  <br />
  Name: <strong>${args.firstName} ${args.lastName}</strong><br />
  Email address: <strong>${args.email}</strong><br />
  Phone: <strong>${args.phone ?? "-"}</strong><br />
  Message:<br />
  <br />
  ${args.message}<br />
  <br />
  Regent Global
`;
