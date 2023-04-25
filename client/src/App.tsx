import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./layout/auth";
import RootLayout from "./layout/root";
import DetailsPage from "./pages/details";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import GroupMessagePage from "./pages/group-message";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";

interface PrivateRoutesProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRoutesProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();

  if (auth) {
    return <>{children}</>;
  } else {
    return <Navigate to="auth" />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    errorElement: <h1>Something Went Wrong</h1>,
    children: [
      {
        index: true,
        element: <GroupMessagePage />,
      },
    ],
  },

  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "personal/details",
        element: <DetailsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
