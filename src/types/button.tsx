export const buttons = [
  "thumbl",
  "a",
  "b",
  "x",
  "y",
  "up",
  "right",
  "down",
  "left",
  "r",
  "l",
  "zr",
  "zl",
] as const;
export type Button = typeof buttons[number];
