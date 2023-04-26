import {
  Badge,
  Box,
  Drawer,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import { PuffLoader } from "react-spinners";

const drawerWidth = "324px";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
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

StyledDrawer.defaultProps = {
  variant: "persistent",
  elevation: 0,
};

export const StyledMobileDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    width: drawerWidth,
    background: "#120F13",
    border: "none",
    overflow: "visible",
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

StyledMobileDrawer.defaultProps = {
  variant: "persistent",
  elevation: 0,
};

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const CloseDrawerButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  background: "#120F13",
  width: "38px",
  height: "38px",
  top: "5px",
  left: "calc(324px + 6px)",
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export const BottomUserActions = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  background: "#0B090C",
  width: "324px",
  height: "76.5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 2),
}));

export const AddChannelButton = styled(IconButton)(({ theme }) => ({
  background: "#252329",
  width: "32px",
  height: "32px",
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "48px",
  },
}));

export const ListContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  height: "calc(100% - 140px)",
  overflow: "auto",

  [theme.breakpoints.down("sm")]: {
    height: "calc(100% - 130px)",
  },
}));

export const Loader = styled(PuffLoader)(({ theme }) => ({
  margin: theme.spacing(4, "auto"),
  display: "flex",
  justifyContent: "center",
  alightItems: "center",
}));
