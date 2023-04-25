import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "../../components/nav";

import { Toolbar } from "@mui/material";

import { useToggle } from "../../hooks/useToggle";

const drawerWidth = "324px";

const RootLayout = () => {
  const [isDrawerOpen, toggleDrawer] = useToggle();

  const theme = useTheme();
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
