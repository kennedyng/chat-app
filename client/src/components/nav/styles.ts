import { Drawer, styled } from "@mui/material";

const drawerWidth = "324px";

export const StyledTopDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    background: "#120F13",
    border: "none",
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

StyledTopDrawer.defaultProps = {
  variant: "persistent",
  elevation: 0,
};

export const StyledTopMobileDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    width: drawerWidth,
    background: "#120F13",
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
