import {
  AppBar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  styled,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggle } from "../../hooks/useToggle";
import { TabContext, TabPanel } from "@mui/lab";
import {
  BackGroundDrawer,
  BackGroundMobileDrawer,
  StyledTopDrawer,
  StyledTopMobileDrawer,
} from "./styles";
import MembersTab from "./MembersTab";
import ChannelsTab from "./ChannelsTab";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";

const drawerWidth = "324px";

const TopElevetedDrawer = () => {
  const { tabValue } = useSwapDrawerTabs();
  return (
    <TabContext value={tabValue}>
      <TabPanel value="1" sx={{ p: 0 }}>
        <ChannelsTab />
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0 }}>
        <MembersTab />
      </TabPanel>
    </TabContext>
  );
};
const Nav = () => {
  const [isDrawerOpen, toggleDrawer] = useToggle();
  return (
    <>
      <AppBar sx={{ height: { md: 59 } }} color="transparent" position="fixed">
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
        <Button onClick={toggleDrawer}>dd</Button>
      </StyledTopMobileDrawer>
      <BackGroundMobileDrawer open={isDrawerOpen} />

      <StyledTopDrawer open={true}>
        <TopElevetedDrawer />
      </StyledTopDrawer>

      <BackGroundDrawer open={true} />
    </>
  );
};

export default Nav;
