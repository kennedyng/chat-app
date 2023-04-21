import {
  Toolbar,
  Stack,
  Typography,
  IconButton,
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  InputAdornment,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";
import SearchIcon from "@mui/icons-material/Search";
const channels = [
  {
    title: "welcome",
    label: "w",
  },
  {
    title: "Front End",
    label: "FE",
  },
];
const ChannelsTab = () => {
  const { setTabValue } = useSwapDrawerTabs();
  const theme = useTheme();

  return (
    <>
      <Toolbar sx={{ boxShadow: 4, position: "sticky", top: 0 }}>
        <Stack
          sx={{ flex: 1 }}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={700}>
            Channel
          </Typography>
          <IconButton sx={{ background: "#252329" }}>
            <AddIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Box>
        <Box sx={{ p: 2 }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </Box>

        <List>
          {channels.map(({ title, label }) => (
            <ListItem dense key={title} disableGutters>
              <ListItemButton disableRipple disableTouchRipple>
                <ListItemAvatar>
                  <Avatar>{label}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default ChannelsTab;
