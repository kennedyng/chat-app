import { RequireAuth } from "react-auth-kit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { API_URL } from "./api";
import SocketProvider from "./context/socket";
import AuthLayout from "./layout/auth";
import RootLayout from "./layout/root";
import EditProfilePage from "./pages/edit-profile";
import GroupMessagePage from "./pages/group-message";
import LoginPage from "./pages/login";
import ProfileView from "./pages/profile-view";
import RegisterPage from "./pages/register";
import SetProfilePage from "./pages/set-profile";
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

        <Route
          path="user"
          element={
            <RequireAuth loginPath="/auth/login">
              <AuthLayout />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
