import React from "react";
import { createRoot } from "react-dom/client";
import { Top } from "./pages/top";
import "bootstrap/dist/css/bootstrap.min.css";

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(<Top />);
}
