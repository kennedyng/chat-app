import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import AuthLayout from "./layout/auth";
import RootLayout from "./layout/root";
import DetailsPage from "./pages/details";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import GroupMessagePage from "./pages/group-message";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";

function App() {
  return (
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
          <Route path="register" element={<LoginPage />} />
        </Route>

        <Route
          path="user"
          element={
            <RequireAuth loginPath="/auth/login">
              <AuthLayout />
            </RequireAuth>
          }
        >
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
