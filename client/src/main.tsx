import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import DrawerProvider from "./context/drawer";
import "./index.css";
import { theme } from "./theme";

import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      // cookieSecure={window.location.protocol === "https:"}
      cookieSecure={false}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DrawerProvider>
            <App />
          </DrawerProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
