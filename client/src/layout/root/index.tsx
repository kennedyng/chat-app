import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "../../components/nav";

import { Toolbar } from "@mui/material";

import { useToggle } from "../../hooks/useToggle";
import useSocket from "src/hooks/useSocket";
import { useCallback, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

const drawerWidth = "324px";

const RootLayout = () => {
  const socket = useSocket();
  const [isDrawerOpen, toggleDrawer] = useToggle();
  const theme = useTheme();
  const auth = useAuthUser();

  useEffect(() => {
    socket.emit("USER_ONLINE", { userId: auth()?.id });
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
