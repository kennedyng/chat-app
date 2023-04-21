import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SwapSideBarProvider from "./context/swapSideBarTabs";
import "./index.css";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <SwapSideBarProvider>
        <App />
      </SwapSideBarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
