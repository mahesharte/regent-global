import { Args } from "../types";

export const subject = () => `Regent Global - Contact`;

export const text = (args: Args) => `
  Hello,

  A visitor has reached out:

  Email address: ${args.email}

  Regent Global
`;

export const html = (args: Args) => `
  Hello,<br />
  <br />
  A visitor has reached out:<br />
  <br />
  Email address: <strong>${args.email}</strong><br />
  <br />
  Regent Global
`;
