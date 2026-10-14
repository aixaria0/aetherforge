import React from "react";
import ReactDOM from "react-dom/client";
import { ForgeShell } from "@/components/forge-shell";
import "@/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ForgeShell />
  </React.StrictMode>,
);
