import {
  Toolbar,
  Stack,
  Typography,
  IconButton,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDrawer } from "../../context/drawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ListContent, Loader, StyledBadge } from "./styles";
import { useQuery } from "react-query";
import { getChannelData } from "src/api/channels";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import { API_URL } from "src/api";
import useSocket from "src/hooks/useSocket";

const MembersTab = () => {
  const theme = useTheme();

  const { activeUsers, socket } = useSocket();

  const { setTabValue } = useDrawer();

  const authHeader = useAuthHeader();
  const { channel } = useParams();
  const {
    data: channelData,
    isLoading: isFetchingChannelData,
    isSuccess,
  } = useQuery({
    queryKey: ["groupMembers", channel],
    queryFn: () =>
      getChannelData({ roomId: Number(channel), token: String(authHeader()) }),
  });

  return (
    <>
      <Toolbar>
        <Stack
          sx={{ flex: 1 }}
          alignItems="center"
          direction="row"
          spacing={1.5}
        >
          <IconButton onClick={() => setTabValue("1")}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography fontWeight={700}>All channels</Typography>
        </Stack>
      </Toolbar>

      {isFetchingChannelData && <Loader color={theme.palette.primary.main} />}

      {isSuccess && (
        <ListContent>
          <Box sx={{ px: 2, color: "#E0E0E0" }}>
            <Typography my={2} textTransform="uppercase" fontWeight={700}>
              {channelData.Room?.name}
            </Typography>
            <Typography mt={2} mb={4}>
              {channelData.Room?.description}
            </Typography>
            <Typography textTransform="uppercase" fontWeight={700}>
              Members
            </Typography>
          </Box>
          <Box>
            <List>
              {channelData.members.map((member: any) => (
                <ListItem dense key={member.id} disableGutters>
                  <ListItemButton disableRipple disableTouchRipple>
                    <ListItemAvatar>
                      <StyledBadge
                        overlap="rectangular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        variant={
                          Object.values(activeUsers).includes(member.userId)
                            ? "dot"
                            : "standard"
                        }
                      >
                        <Avatar
                          alt={member.User?.profile?.name}
                          src={member.User?.profile?.img_url}
                        />
                      </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText primary={member.User?.profile?.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </ListContent>
      )}
    </>
  );
};

export default MembersTab;
