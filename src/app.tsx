import React from "react";
import { createRoot } from 'react-dom/client';

export const Top: React.FC = () => {
  return <h1>1hello4</h1>;
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<Top />);
}
