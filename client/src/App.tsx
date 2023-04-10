import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/auth";
import RootLayout from "./layout/root";
import DetailsPage from "./pages/details";
import GenderPage from "./pages/gender";
import LoginPage from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        element: <GenderPage />,
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
