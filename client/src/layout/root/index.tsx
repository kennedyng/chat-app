import { Box, Button, Grid, Paper, useTheme } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "../../components/nav";

import {
  AppBar,
  Drawer,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
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
