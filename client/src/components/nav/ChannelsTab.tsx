import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createChannel, fetchAllChannels, joinChannel } from "src/api/channels";
import { useDrawer } from "src/context/drawer";
import useSocket from "src/hooks/useSocket";
import { useToggle } from "src/hooks/useToggle";
import { DescriptionValidation, NameValidation } from "src/utils/validation";
import * as Yup from "yup";

import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import {
  AddChannelButton,
  ListContent,
  Loader,
  SearchTextField,
} from "./styles";
import { PropagateLoader } from "react-spinners";

const ChannelsTab = () => {
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const { setTabValue } = useDrawer();

  const { ref, inView } = useInView();

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

  const [queryValue, setQueryValue] = useState("");

  const [queryDebouncedValue] = useDebounce(queryValue, 500);

  const channelsQuery = useInfiniteQuery({
    queryKey: ["channels", queryDebouncedValue],

    queryFn: ({ pageParam = 0 }) =>
      fetchAllChannels({
        query: queryDebouncedValue,
        cursor: pageParam,
        limit: 10,
      }),
    getNextPageParam: (data) => data.nextCursor ?? undefined,
  });

  React.useEffect(() => {
    if (inView) {
      channelsQuery.fetchNextPage();
    }
  }, [inView]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(event.target.value);
  };

  const handleListItemClick = (channelId: number) => {
    setSelectedListItem(Number(channelId));
    const body = {
      roomId: Number(channelId),
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

  const createChannelFormik = useFormik({
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
          <Tooltip arrow title="Create new Channel">
            <AddChannelButton onClick={handleAddNewChannelClick}>
              <AddIcon />
            </AddChannelButton>
          </Tooltip>
        </Stack>
      </Toolbar>

      <Dialog
        keepMounted
        open={openChannelForm}
        onClose={() => toggleChannelForm()}
      >
        <DialogTitle>
          <Typography fontWeight={700}>NEW CHANNEL</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={createChannelFormik.handleSubmit}>
            <TextField
              {...createChannelFormik.getFieldProps("name")}
              placeholder="Channel name"
              margin="normal"
              fullWidth
              error={
                Boolean(createChannelFormik.touched.name) &&
                Boolean(createChannelFormik.errors.name)
              }
              helperText={createChannelFormik.errors.name}
            />
            <TextField
              id="description"
              error={
                Boolean(createChannelFormik.touched.description) &&
                Boolean(createChannelFormik.errors.description)
              }
              {...createChannelFormik.getFieldProps("description")}
              placeholder="Channel Description"
              margin="normal"
              multiline
              minRows={4}
              fullWidth
              helperText={createChannelFormik.errors.description}
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

      <ListContent>
        <Box component="form" sx={{ px: 2, py: 1.5 }}>
          <SearchTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={queryValue}
            onChange={handleInputChange}
            type="search"
            placeholder="Search"
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </Box>

        {channelsQuery.isLoading && (
          <Loader color={theme.palette.primary.main} />
        )}

        <List>
          {channelsQuery.data?.pages.map((page: any, index) => (
            <React.Fragment key={"page-" + index}>
              {page.data.map((channel: any) => (
                <ListItem dense key={channel.id} disableGutters>
                  <ListItemButton
                    disableRipple
                    disableTouchRipple
                    onClick={() => handleListItemClick(channel.id)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ textTransform: "uppercase" }}>
                        {channel.name?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={channel.name} />
                    {selectedListItem === Number(channel.id) &&
                      isJoiningChannel && (
                        <Typography variant="caption">Joining...</Typography>
                      )}
                  </ListItemButton>
                </ListItem>
              ))}
            </React.Fragment>
          ))}

          <Stack direction="row" justifyContent="center">
            <Loader
              size={30}
              color={theme.palette.primary.main}
              loading={channelsQuery.isFetchingNextPage}
            />
          </Stack>
        </List>

        <div ref={ref}></div>
      </ListContent>
    </>
  );
};

export default ChannelsTab;
