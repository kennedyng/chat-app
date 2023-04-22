import SendIcon from "@mui/icons-material/Send";
import { InputAdornment, Stack } from "@mui/material";
import { MessagesContent, MessageTextField, SendButton } from "./styles";

const GroupMessagePage = () => {
  return (
    <Stack
      sx={{
        px: { xs: "10px", md: "76.6px" },
        height: "90vh",
        pt: 2,
      }}
    >
      <MessagesContent>dd</MessagesContent>

      <MessageTextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendButton>
                <SendIcon fontSize="small" />
              </SendButton>
            </InputAdornment>
          ),
        }}
        placeholder="Type a message here"
        fullWidth
        variant="outlined"
      />
    </Stack>
  );
};

export default GroupMessagePage;
