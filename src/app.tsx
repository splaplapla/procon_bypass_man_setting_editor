import React from "react";
import { createRoot } from "react-dom/client";
import { Top } from "./pages/top";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<Top />);
}
