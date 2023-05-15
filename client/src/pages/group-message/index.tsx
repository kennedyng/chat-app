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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getChannelMessages } from "src/api/channels";
import { addMessage } from "src/api/message";
import { getUserProfile } from "src/api/user";
import { Loader } from "src/components/nav/styles";
import useSocket from "src/hooks/useSocket";
import { MessageTextField, MessagesContent, SendButton } from "./styles";
import groupByCreatedTime from "src/utils/groupByCreatedTime";
import * as Yup from "yup";

interface MessageProps {
  User: {
    profile: {
      name?: string;
      img_url?: string;
    };
  };
  createdAt: string;
  message: string;
}
const MessageRender: React.FC<MessageProps> = ({
  User,
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
      <Avatar src={User.profile.img_url}></Avatar>
      <Stack spacing={2}>
        <Stack
          sx={{ color: "text.secondary" }}
          direction="row"
          alignItems="baseline"
          spacing={2}
        >
          <Typography fontWeight={700}>{User.profile?.name} </Typography>
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
  const messageEndRef = useRef<HTMLDivElement>(null);

  const [channelReceivedMessages, setChannelReceivedMessages] = useState<any>(
    []
  );

  const userProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(authHeader()),
  });

  const {
    socket,
    message: receivedMessage,
    sendMessage,
    joinChannel: joinRoom,
    leaveChannel,
  } = useSocket();

  useEffect(() => {
    joinRoom(Number(channel ?? 1));

    return () => {
      leaveChannel(Number(channel ?? 1));
      setChannelReceivedMessages([]);
    };
  }, [channel]);

  const { mutate: messageMutate } = useMutation(addMessage);

  const channelMessagesQuery = useQuery({
    queryKey: ["channelMsg", { channelId: channel }],
    queryFn: () => getChannelMessages({ roomId: Number(channel ?? 1) }),
    onSuccess: (data) => {
      // setChannelReceivedMessages(data);
    },
  });

  useEffect(() => {
    if (Object.values(receivedMessage).length) {
      setChannelReceivedMessages((prevData: any) => [
        ...prevData,
        receivedMessage,
      ]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelReceivedMessages]);

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
    onSubmit: ({ message }, { resetForm }) => {
      const body = {
        token: authHeader(),
        roomId: Number(channel ?? 1),
        userId: auth()?.id,
        message,
      };

      messageMutate(body, {
        onError(data) {
          console.log("eeror", data);
        },
      });

      sendMessage({
        message,
        roomId: Number(channel ?? 1),
        createdAt: new Date(),
        User: {
          profile: userProfileQuery.data?.data,
        },
      });

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
      {channelMessagesQuery.isLoading && (
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

      <MessagesContent>
        {channelMessagesQuery.data?.map((item: any) => (
          <React.Fragment key={item.createdTime}>
            <Divider>
              <Typography>{item.createdTime}</Typography>
            </Divider>
            {item.messages.map((msg: any) => (
              <MessageRender key={msg.id} {...msg} />
            ))}
          </React.Fragment>
        ))}

        <Divider
          sx={{
            display: channelReceivedMessages.length ? "flex" : "none",
          }}
        >
          now
        </Divider>
        {channelReceivedMessages.map((msg: any) => (
          <React.Fragment key={msg.createdTime}>
            <MessageRender {...msg} />
          </React.Fragment>
        ))}

        <div ref={messageEndRef} />
      </MessagesContent>

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
