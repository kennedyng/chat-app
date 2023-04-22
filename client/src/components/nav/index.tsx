import {
  AppBar,
  Avatar,
  Divider,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { TabContext, TabPanel } from "@mui/lab";
import { useToggle } from "../../hooks/useToggle";
import ChannelsTab from "./ChannelsTab";
import MembersTab from "./MembersTab";
import {
  BottomUserActions,
  CloseDrawerButton,
  StyledDrawer,
  StyledMobileDrawer,
} from "./styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CloseIcon from "@mui/icons-material/Close";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";

const DrawerContenr = () => {
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
      <CloseDrawerButton>
        <CloseIcon />
      </CloseDrawerButton>
      <TabContext value={tabValue}>
        <TabPanel value="1" sx={{ p: 0 }}>
          <ChannelsTab />
        </TabPanel>
        <TabPanel value="2" sx={{ p: 0 }}>
          <MembersTab />
        </TabPanel>
      </TabContext>

      <BottomUserActions>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: "42px", height: "42px" }} alt="I"></Avatar>
          <Typography fontWeight={700} color="text.secondary">
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
      </BottomUserActions>

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

      <StyledMobileDrawer open={isDrawerOpen}>
        <DrawerContenr />
      </StyledMobileDrawer>

      <StyledDrawer open={true}>
        <DrawerContenr />
      </StyledDrawer>
    </>
  );
};

export default Nav;
