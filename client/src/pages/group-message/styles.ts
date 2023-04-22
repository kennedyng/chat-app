import { IconButton, styled, TextField } from "@mui/material";
import { Box } from "@mui/system";

export const MessageTextField = styled(TextField)(({ theme }) => ({
  margin: "40px 0 40px 0",
}));

export const MessagesContent = styled(Box)(({ theme }) => ({
  flex: theme.spacing(1),
  background: "red",
}));

export const SendButton = styled(IconButton)(({ theme }) => ({
  width: "49px",
  height: "39px",
  background: "#2F80ED",
  color: "#ffff",
}));
