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
  styled,
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
  {
    title: "Money Making",
    label: "ME",
  },
];

const SearchTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "48px",
  },
}));
const ChannelsTab = () => {
  const { setTabValue } = useSwapDrawerTabs();
  const theme = useTheme();

  const handleListItemClick = () => {
    setTabValue("2");
  };

  return (
    <>
      <Toolbar sx={{ boxShadow: 4, position: "sticky", top: 0 }}>
        <Stack
          sx={{ flex: 1 }}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="body1" fontWeight={700}>
            Channels
          </Typography>
          <IconButton
            sx={{ background: "#252329", width: "32px", height: "32px" }}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Box>
        <Box sx={{ px: 2, py: 1.5 }}>
          <SearchTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            type="search"
            placeholder="Search"
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </Box>

        <List>
          {channels.map(({ title, label }) => (
            <ListItem dense key={title} disableGutters>
              <ListItemButton
                disableRipple
                disableTouchRipple
                onClick={handleListItemClick}
              >
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
