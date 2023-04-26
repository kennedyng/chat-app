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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useDrawer } from "../../context/drawer";
import { AddChannelButton } from "./styles";
import { useToggle } from "../../hooks/useToggle";
import { useQuery } from "react-query";
import { fetchAllChannels } from "src/api/channels";
import { PuffLoader } from "react-spinners";

const SearchTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "48px",
  },
}));

const ChannelsTab = () => {
  const { setTabValue } = useDrawer();

  const { data, isLoading, isSuccess } = useQuery("channels", fetchAllChannels);

  console.log(data);

  const [openChannelForm, toggleChannelForm] = useToggle();
  const theme = useTheme();

  const handleListItemClick = () => {
    setTabValue("2");
  };

  const handleAddNewChannelClick = () => {
    toggleChannelForm();
  };

  const handleSaveChannelClick = () => {
    toggleChannelForm();
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
          <AddChannelButton onClick={handleAddNewChannelClick}>
            <AddIcon />
          </AddChannelButton>
        </Stack>
      </Toolbar>

      <Dialog open={openChannelForm} onClose={toggleChannelForm}>
        <DialogTitle>
          <Typography fontWeight={700}>NEW CHANNEL</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField placeholder="Channel name" margin="normal" fullWidth />
          <TextField
            placeholder="Channel Description"
            margin="normal"
            multiline
            minRows={4}
            fullWidth
          />

          <DialogActions>
            <Button onClick={handleSaveChannelClick} variant="contained">
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

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
        {isLoading && (
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
              alightItems: "center",
            }}
          >
            <PuffLoader color={theme.palette.primary.main} />
          </Box>
        )}

        {isSuccess && (
          <List>
            {data.map(({ name, description, id }: any) => (
              <ListItem dense key={id} disableGutters>
                <ListItemButton
                  disableRipple
                  disableTouchRipple
                  onClick={handleListItemClick}
                >
                  <ListItemAvatar>
                    <Avatar alt={name}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

export default ChannelsTab;
