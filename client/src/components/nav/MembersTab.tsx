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
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDrawer } from "../../context/drawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledBadge } from "./styles";
import { useQuery } from "react-query";
import { getChannelData } from "src/api/channels";
import { useAuthHeader } from "react-auth-kit";
import { useParams } from "react-router-dom";

const MembersTab = () => {
  const { setTabValue } = useDrawer();

  const authHeader = useAuthHeader();
  const { channel } = useParams();
  const {
    data: channelData,
    isLoading: isFetchingChannelData,
    isSuccess,
  } = useQuery("groupMembers", () =>
    getChannelData({ roomId: Number(channel), token: String(authHeader()) })
  );

  console.log(
    "channel Data ===> ",
    channelData?.members.map((i: any) => i.User?.profile?.name)
  );

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

      {isFetchingChannelData && <div>Loading...</div>}

      {isSuccess && (
        <>
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
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        variant="dot"
                      >
                        <Avatar alt="Remy Sharp" />
                      </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText primary={member.User?.profile?.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}
    </>
  );
};

export default MembersTab;
