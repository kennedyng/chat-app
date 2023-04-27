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
import { useMutation } from "react-query";
import { getChannelData } from "src/api/channels";
import { useAuthHeader } from "react-auth-kit";
import { useParams } from "react-router-dom";

const members = [
  {
    id: "ee",
    name: "Kennedy",
  },
  {
    id: "2",
    name: "Kennedy",
  },
];
const MembersTab = () => {
  const { setTabValue } = useDrawer();

  const {
    mutate: channelDataMutate,
    data: channelData,
    isLoading: isFetchingChannelData,
    isSuccess,
  } = useMutation(getChannelData);

  console.log("channel Data ===> ", channelData);

  const authHeader = useAuthHeader();
  const { channel } = useParams();

  useEffect(() => {
    const body = {
      token: String(authHeader()),
      roomId: Number(channel),
    };
    channelDataMutate(body, {
      onSuccess(data) {
        console.log(data.Room);
      },
    });
  }, []);

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

      {isSuccess && channelData && (
        <>
          <Box sx={{ px: 2, color: "#E0E0E0" }}>
            <Typography my={2} textTransform="uppercase" fontWeight={700}>
              {/* {channelData.Room?.name} */} Title
            </Typography>
            <Typography mt={2} mb={4}>
              {/* {channelData.Room.description} */} Description
            </Typography>
            <Typography textTransform="uppercase" fontWeight={700}>
              Members
            </Typography>
          </Box>
          <Box>
            <List>
              {[].map(({ id, name, description }) => (
                <ListItem dense key={id} disableGutters>
                  <ListItemButton disableRipple disableTouchRipple>
                    <ListItemAvatar>
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        variant="dot"
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </StyledBadge>
                    </ListItemAvatar>
                    <ListItemText primary={name} />
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
