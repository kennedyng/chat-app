import { RequireAuth } from "react-auth-kit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/auth";
import RootLayout from "./layout/root";
import EditProfilePage from "./pages/edit-profile";
import GroupMessagePage from "./pages/group-message";
import LoginPage from "./pages/login";
import ProfileView from "./pages/profile-view";
import RegisterPage from "./pages/register";
import SetProfilePage from "./pages/set-profile";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

const ErrorRender = ({ resetErrorBoundary, error }: FallbackProps) => (
  <Grid
    container
    sx={{ height: "100vh" }}
    justifyContent="center"
    alignItems="center"
    direction="column"
  >
    <Stack direction="column" spacing={2}>
      <Typography color="error">{error.message}</Typography>
      <Button
        variant="contained"
        sx={{ alignSelf: "center" }}
        onClick={() => resetErrorBoundary()}
      >
        Try gain
      </Button>
    </Stack>
  </Grid>
);

function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} fallbackRender={ErrorRender}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth loginPath="/auth/login">
                <RootLayout />
              </RequireAuth>
            }
          >
            <Route index path=":channel?" element={<GroupMessagePage />} />
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="view/profile"
              element={
                <RequireAuth loginPath="/auth/login">
                  <ProfileView />
                </RequireAuth>
              }
            />
            <Route
              path="set/profile"
              element={
                <RequireAuth loginPath="/auth/login">
                  <SetProfilePage />
                </RequireAuth>
              }
            />

            <Route
              path="edit/profile"
              element={
                <RequireAuth loginPath="/auth/login">
                  <EditProfilePage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
