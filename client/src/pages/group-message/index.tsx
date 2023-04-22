import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { MessagesContent, MessageTextField, SendButton } from "./styles";

const messages = [
  {
    id: 1,
    author: "Nellie Francis",
    createdAt: "yesterday at 2:29 AM",
    message: `Morbi eget turpis ut massa luctus cursus. Sed sit amet risus quis neque condimentum aliquet. Phasellus consequat et justo eu accumsan 🙌. Proin pretium id nunc eu molestie. Nam consectetur, ligula vel mattis facilisis, ex mauris venenatis nulla, eget tempor enim neque eget massa 🤣`,
  },
  {
    id: 2,
    author: "Nellie Francis",
    createdAt: "yesterday at 2:29 AM",
    message:
      "Suspendisse enim tellus, elementum quis dictum sed, sodales at mauris 😀",
  },
];

interface MessageProps {
  id: string | number;
  author: string;
  createdAt: string;
  message: string;
}
const MessageRender: React.FC<MessageProps> = ({
  id,
  author,
  createdAt,
  message,
}) => {
  return (
    <Stack
      sx={{ mb: 4 }}
      direction="row"
      spacing={2}
      alignItems={{ xs: "baseline", md: "center" }}
    >
      <Avatar alt="s"></Avatar>
      <Stack spacing={2}>
        <Stack
          sx={{ color: "text.secondary" }}
          direction="row"
          alignItems="baseline"
          spacing={2}
        >
          <Typography fontWeight={700}>{author} </Typography>
          <Typography fontWeight={700} fontSize={14}>
            {createdAt}
          </Typography>
        </Stack>

        <Typography fontWeight={500}>{message}</Typography>
      </Stack>
    </Stack>
  );
};

const GroupMessagePage = () => {
  return (
    <Stack
      sx={{
        height: "90vh",
        pt: 2,
      }}
    >
      <MessagesContent>
        {messages.map((message) => (
          <MessageRender key={message.id} {...message} />
        ))}

        <Divider>
          <Typography>today 12 feb</Typography>
        </Divider>

        {messages.map((message) => (
          <MessageRender key={message.id} {...message} />
        ))}

        {messages.map((message) => (
          <MessageRender key={message.id} {...message} />
        ))}

        <Divider>
          <Typography>today 12 feb</Typography>
        </Divider>

        {messages.map((message) => (
          <MessageRender key={message.id} {...message} />
        ))}
      </MessagesContent>

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
