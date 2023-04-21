import { Drawer, styled } from "@mui/material";

const drawerWidth = "324px";
export const BackGroundDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,
  ".MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
    background: "inherit",
  },
}));

BackGroundDrawer.defaultProps = {
  variant: "temporary",
  elevation: 0,
};

export const BackGroundMobileDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: theme.zIndex.appBar - 1,
  ".MuiDrawer-paper": {
    width: drawerWidth,
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

BackGroundMobileDrawer.defaultProps = {
  variant: "temporary",
  elevation: 0,
};

export const StyledTopDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    background: "unset",
    border: "none",
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
    background: "inherit",
  },
}));

StyledTopDrawer.defaultProps = {
  variant: "persistent",
  elevation: 0,
};

export const StyledTopMobileDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    width: drawerWidth,
    background: "unset",
    border: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

StyledTopMobileDrawer.defaultProps = {
  variant: "persistent",
  elevation: 0,
};
