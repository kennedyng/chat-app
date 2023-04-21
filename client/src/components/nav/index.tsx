import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggle } from "../../hooks/useToggle";

const drawerWidth = "324px";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
    background: "inherit",
  },
}));

StyledDrawer.defaultProps = {
  variant: "temporary",
  elevation: 0,
};

const StyledMobileDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    width: drawerWidth,
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

StyledMobileDrawer.defaultProps = {
  variant: "temporary",
  elevation: 0,
};

const SideBarContents = () => {
  const theme = useTheme();
  return (
    <Toolbar>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flex: 1 }}
      >
        <Typography fontWeight={700}>Channel</Typography>
        <IconButton
          onClick={() => console.log("clicked")}
          sx={{
            background: "silver",
            zIndex: theme.zIndex.appBar + 1,
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>
    </Toolbar>
  );
};

const Nav = () => {
  const [isDrawerOpen, toggleDrawer] = useToggle();

  const theme = useTheme();
  return (
    <AppBar
      sx={{ zIndex: theme.zIndex.drawer + 1, height: { md: 59 } }}
      color="transparent"
      position="fixed"
    >
      <Toolbar>
        <Grid container>
          <Grid container item xs={12} md={9} sx={{ px: { xs: 0, md: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  display: { xs: "span", md: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <StyledMobileDrawer open={isDrawerOpen}>
          <SideBarContents />
          <Button onClick={toggleDrawer}>dd</Button>
        </StyledMobileDrawer>

        <StyledDrawer open={true}>
          <SideBarContents />
        </StyledDrawer>
      </Box>
    </AppBar>
  );
};

export default Nav;
