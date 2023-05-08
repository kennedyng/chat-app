import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";

import moment from "moment";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getChannelMessages, joinChannel } from "src/api/channels";
import { addMessage } from "src/api/message";
import { Loader } from "src/components/nav/styles";
import { messageDivider } from "src/utils";
import { MessagesContent, MessageTextField, SendButton } from "./styles";

import useSocket from "src/hooks/useSocket";
import { useEffect, useState } from "react";

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
            {moment(createdAt).calendar()}
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
  const auth = useAuthUser();
  const { channel } = useParams();

  const {
    message: receivedMessage,
    sendMessage,
    joinChannel: joinRoom,
  } = useSocket();

  useEffect(() => {
    joinRoom(Number(channel ?? 1));
  }, [channel]);

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
      const body = {
        token: authHeader(),
        roomId: Number(channel ?? 1),
        userId: String(auth()?.id),
        message,
      };

      // messageMutate(body, {
      //   onSuccess(data) {
      //     console.log("message saved", data);
      //   },

      //   onError(data) {
      //     console.log("eeror", data);
      //   },
      // });

      sendMessage(body);

      resetForm();
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
            <Box key={message.id}>
              <Divider>
                <Typography>
                  {moment(message.createdAt).format("MMM Do YY")}
                </Typography>
              </Divider>
              <MessageRender key={message.id} {...message} />
            </Box>
          ))}
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
