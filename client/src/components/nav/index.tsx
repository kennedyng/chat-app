import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { useToggle } from "../../hooks/useToggle";
import { TabContext, TabPanel } from "@mui/lab";
import { StyledTopDrawer, StyledTopMobileDrawer } from "./styles";
import MembersTab from "./MembersTab";
import ChannelsTab from "./ChannelsTab";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";

const TopElevetedDrawer = () => {
  const { tabValue } = useSwapDrawerTabs();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TabContext value={tabValue}>
        <TabPanel value="1" sx={{ p: 0 }}>
          <ChannelsTab />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <MembersTab />
        </TabPanel>
      </TabContext>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          background: "#0B090C",
          width: "324px",
          height: "76.5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar>I</Avatar>
          <Typography fontWeight={700} variant="h6" sx={{ color: "#828282" }}>
            Xanthe Neal
          </Typography>
        </Stack>
        <IconButton
          onClick={handleClick}
          id="user-menu-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Menu
        id="user-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Log out</MenuItem>
      </Menu>
    </>
  );
};
const Nav = () => {
  const [isDrawerOpen, toggleDrawer] = useToggle();
  return (
    <>
      <AppBar color="transparent" position="fixed">
        <Toolbar>
          <Grid container>
            <Grid container item xs={12} md={9} sx={{ px: { xs: 0, md: 4 } }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                {!isDrawerOpen && (
                  <IconButton
                    onClick={toggleDrawer}
                    sx={{
                      display: { xs: "span", md: "none" },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <StyledTopMobileDrawer open={isDrawerOpen}>
        <TopElevetedDrawer />
      </StyledTopMobileDrawer>

      <StyledTopDrawer open={true}>
        <TopElevetedDrawer />
      </StyledTopDrawer>
    </>
  );
};

export default Nav;
