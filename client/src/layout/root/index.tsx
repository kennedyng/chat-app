import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "../../components/nav";

import { Toolbar } from "@mui/material";

import { useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import useSocket from "src/hooks/useSocket";

const drawerWidth = "324px";

const RootLayout = () => {
  const { getOnline, activeUsers } = useSocket();
  const auth = useAuthUser();

  useEffect(() => {
    ///socket io getting online
    getOnline(auth()?.id);
  }, []);

  return (
    <>
      <Nav />

      {/* to leave appBar space */}
      <Toolbar />

      <Box sx={{ ml: { xs: 0, md: drawerWidth } }}>
        <Outlet />
      </Box>
    </>
  );
};

export default RootLayout;
