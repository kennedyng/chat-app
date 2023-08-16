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
import { useDrawer } from "../../context/drawer";
import { useAuthHeader, useAuthUser, useSignOut } from "react-auth-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserProfile } from "src/api/user";
import { API_URL } from "src/api";
import useSocket from "src/hooks/useSocket";
import { getChannelData, getChannelInfo } from "src/api/channels";

const DraweContent = () => {
  const { tabValue, toggleDrawer } = useDrawer();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const userProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(authHeader()),
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { getOffline } = useSocket();
  const signOut = useSignOut();
  const auth = useAuthUser();

  const handleSignOut = () => {
    setAnchorEl(null);
    signOut();
    navigate("/auth/login");

    // socket io offline
    getOffline(auth()?.id);
  };

  const handleProfileClick = () => {
    navigate("/auth/view/profile");
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CloseDrawerButton onClick={toggleDrawer}>
        <CloseIcon fontSize="small" />
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
        {userProfileQuery.isSuccess && (
          <>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{ width: "42px", height: "42px" }}
                src={userProfileQuery.data?.data?.img_url}
              />
              <Typography
                fontWeight={700}
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
              >
                {userProfileQuery.data?.data?.name}
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
          </>
        )}
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
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "left", vertical: "center" }}
        PaperProps={{
          sx: {
            py: "15px",
            px: "12px",
            background: "#252329",
            width: "192px",
            borderRadius: "12px",
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
};

const Nav = () => {
  const { open, toggleDrawer } = useDrawer();
  const { channel } = useParams();

  const channelInfoQuery = useQuery({
    queryKey: ["channelInfo", Number(channel ?? 1)],
    queryFn: () => getChannelInfo(Number(channel ?? 1)),
  });

  return (
    <>
      <AppBar color="transparent" position="fixed">
        <Toolbar>
          <Stack
            sx={{ ml: { xs: 0, md: "324px" }, px: { xs: 0, md: "40px" } }}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            {!open && (
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  display: { xs: "span", md: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography textTransform="uppercase" fontWeight={700}>
              {channelInfoQuery.data?.data?.name}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <StyledMobileDrawer open={open}>
        <DraweContent />
      </StyledMobileDrawer>

      <StyledDrawer open={true}>
        <DraweContent />
      </StyledDrawer>
    </>
  );
};

export default Nav;
