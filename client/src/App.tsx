import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/auth";
import RootLayout from "./layout/root";
import DetailsPage from "./pages/details";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>Groupdddd Char</div>,
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
        path: "gender",
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
