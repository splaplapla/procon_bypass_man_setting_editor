export const colors = [
  "red",
  "blue",
  "yellow",
  "green",
  "pink",
  "cyan",
  "white",
] as const;
export type ProconColor = typeof colors[number];
