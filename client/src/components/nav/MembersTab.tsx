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
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
  const { setTabValue } = useSwapDrawerTabs();
  return (
    <>
      <Toolbar>
        <Stack sx={{ flex: 1 }} alignItems="center" direction="row" spacing={2}>
          <IconButton onClick={() => setTabValue("1")}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography fontWeight={700}>All channels</Typography>
        </Stack>
      </Toolbar>

      <Box sx={{ px: 2, color: "#E0E0E0" }}>
        <Typography my={2} variant="h6" fontWeight={700}>
          Members
        </Typography>
        <Typography mt={2} mb={4}>
          Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan
          quis. In gravida mollis purus, at interdum arcu tempor non
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          Members
        </Typography>
      </Box>
      <Box>
        <List>
          {members.map(({ id, name }) => (
            <ListItem dense key={id} disableGutters>
              <ListItemButton disableRipple disableTouchRipple>
                <ListItemAvatar>
                  <Avatar>Ne</Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default MembersTab;
