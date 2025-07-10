import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css"; // CSS dosyasını import et

import ChatbotDemo from "./App"; // App.js'teki ChatbotDemo component'ini import et

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <div className="App">
      <ChatbotDemo />
    </div>
  </StrictMode>
);