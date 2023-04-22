import { IconButton, styled, TextField } from "@mui/material";
import { Box } from "@mui/system";

export const MessageTextField = styled(TextField)(({ theme }) => ({
  margin: "40px 0 40px 0",
  [theme.breakpoints.down("sm")]: {
    margin: "15px 0 15px 0",
  },

  [theme.breakpoints.up("xs")]: {
    padding: "0 10px",
  },

  [theme.breakpoints.up("md")]: {
    padding: "0 76px",
  },
}));

export const MessagesContent = styled(Box)(({ theme }) => ({
  flex: theme.spacing(1),
  overflow: "auto",
  padding: "40px",

  [theme.breakpoints.up("xs")]: {
    padding: "0 10px",
  },

  [theme.breakpoints.up("md")]: {
    padding: "0 76px",
  },
}));

export const SendButton = styled(IconButton)(({ theme }) => ({
  width: "49px",
  height: "39px",
  background: "#2F80ED",
  color: "#ffff",
}));
