import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as dayjs from "dayjs";
import { useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getChannelMessages } from "src/api/channels";
import { addMessage } from "src/api/message";
import { Loader } from "src/components/nav/styles";
import { MessagesContent, MessageTextField, SendButton } from "./styles";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
            {dayjs(createdAt).fromNow()}
          </Typography>
        </Stack>

        <Typography fontWeight={500}>{message}</Typography>
      </Stack>
    </Stack>
  );
};

const GroupMessagePage = () => {
  const theme = useTheme();
  const authHeader = useAuthHeader();
  const { channel } = useParams();
  const { mutate: messageMutate } = useMutation(addMessage);

  const {
    isSuccess: isChannelMsgSuccess,
    data: channelMessages,
    isLoading: isGetingChannelMsgs,
  } = useQuery({
    queryKey: ["channelMsg", { channelId: channel }],
    queryFn: () => getChannelMessages({ roomId: Number(channel ?? 1) }),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    onSubmit: ({ message }, { resetForm }) => {
      resetForm();

      const body = {
        token: authHeader(),
        roomId: Number(channel ?? 1),
        message,
      };

      messageMutate(body, {
        onSuccess(data) {
          console.log("message saved", data);
        },

        onError(data) {
          console.log("eeror", data);
        },
      });
    },
  });

  return (
    <Stack
      sx={{
        height: "90vh",
        pt: 2,
      }}
    >
      {isGetingChannelMsgs && (
        <Box
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader color={theme.palette.primary.main} />
        </Box>
      )}
      {isChannelMsgSuccess && (
        <MessagesContent>
          {channelMessages.data?.map((message: any) => (
            <MessageRender key={message.id} {...message} />
          ))}

          <Divider>
            <Typography>today 12 feb</Typography>
          </Divider>
        </MessagesContent>
      )}

      <form onSubmit={formik.handleSubmit}>
        <MessageTextField
          {...formik.getFieldProps("message")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendButton type="submit">
                  <SendIcon fontSize="small" />
                </SendButton>
              </InputAdornment>
            ),
          }}
          placeholder="Type a message here"
          fullWidth
          variant="outlined"
        />
      </form>
    </Stack>
  );
};

export default GroupMessagePage;
