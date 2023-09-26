import { Args } from "../types";

export const subject = () => `Regent Global - Subscribe`;

export const text = (args: Args) => `
  Hello,

  A visitor has subscribed:

  Email address: ${args.email}

  Regent Global
`;

export const html = (args: Args) => `
  Hello,<br />
  <br />
  A visitor has subscribed:<br />
  <br />
  Email address: <strong>${args.email}</strong><br />
  <br />
  Regent Global
`;
