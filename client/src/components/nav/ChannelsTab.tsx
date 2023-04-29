import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createChannel, fetchAllChannels, joinChannel } from "src/api/channels";
import { useDrawer } from "src/context/drawer";
import { useToggle } from "src/hooks/useToggle";
import { DescriptionValidation, NameValidation } from "src/utils/validation";
import * as Yup from "yup";

import {
  AddChannelButton,
  ListContent,
  Loader,
  SearchTextField,
} from "./styles";

const ChannelsTab = () => {
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const { setTabValue } = useDrawer();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["channels"],
    queryFn: () => fetchAllChannels(),
  });
  const { mutate: mutateChannel, isLoading: isCreatingChannel } =
    useMutation(createChannel);

  const { mutate: joinChannelMutate, isLoading: isJoiningChannel } =
    useMutation(joinChannel);
  const queryClient = useQueryClient();

  const [openChannelForm, toggleChannelForm] = useToggle();
  const theme = useTheme();
  const channelsEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const [selectedListItem, setSelectedListItem] = useState<number>(0);

  const handleListItemClick = (channelId: number) => {
    setSelectedListItem(Number(channelId));
    const body = {
      roomId: channelId,
      token: authHeader(),
    };

    joinChannelMutate(body, {
      onSuccess: ({ data }) => {
        toast.success(data.message);
        //swapping the sidebar tab to members tab
        setTabValue("2");
        navigate(`/${channelId}`);
      },

      onError: () => {
        toast.error("something went wrong try again");
      },
    });
  };

  const handleAddNewChannelClick = () => {
    toggleChannelForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: NameValidation,
      description: DescriptionValidation,
    }),
    onSubmit: (values, { resetForm }) => {
      const body = { ...values, id: String(auth()?.id), token: authHeader() };
      mutateChannel(body, {
        onSuccess() {
          queryClient.invalidateQueries(["channels"]);
          resetForm();
          toggleChannelForm();
          //scolling channel list to bottom

          channelsEndRef.current?.scrollIntoView({ behavior: "smooth" });
        },
      });
    },
  });

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

      <Dialog keepMounted open={openChannelForm} onClose={toggleChannelForm}>
        <DialogTitle>
          <Typography fontWeight={700}>NEW CHANNEL</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              {...formik.getFieldProps("name")}
              placeholder="Channel name"
              margin="normal"
              fullWidth
              error={
                Boolean(formik.touched.name) && Boolean(formik.errors.name)
              }
              helperText={formik.errors.name}
            />
            <TextField
              id="description"
              autoFocus
              error={
                Boolean(formik.touched.description) &&
                Boolean(formik.errors.description)
              }
              {...formik.getFieldProps("description")}
              placeholder="Channel Description"
              margin="normal"
              multiline
              minRows={4}
              fullWidth
              helperText={formik.errors.description}
            />

            <DialogActions>
              <LoadingButton
                type="submit"
                loading={isCreatingChannel}
                variant="contained"
              >
                <span>Save</span>
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {isLoading && <Loader color={theme.palette.primary.main} />}
      {isSuccess && (
        <ListContent>
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
            {data.map(({ name, id }: any) => (
              <ListItem dense key={id} disableGutters>
                <ListItemButton
                  disableRipple
                  disableTouchRipple
                  onClick={() => handleListItemClick(id)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ textTransform: "uppercase" }}>
                      {name?.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                  {selectedListItem === Number(id) && isJoiningChannel && (
                    <Typography variant="caption">Joining...</Typography>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <div ref={channelsEndRef} />
        </ListContent>
      )}
    </>
  );
};

export default ChannelsTab;
