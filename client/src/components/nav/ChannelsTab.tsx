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
  styled,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useRef } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { createChannel, fetchAllChannels } from "src/api/channels";
import * as Yup from "yup";
import { useDrawer } from "../../context/drawer";
import { useToggle } from "../../hooks/useToggle";
import { AddChannelButton } from "./styles";

const SearchTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "48px",
  },
}));

const ChannelsTab = () => {
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const { setTabValue } = useDrawer();
  const { data, isLoading, isSuccess } = useQuery("channels", fetchAllChannels);
  const { mutate: mutateChannel, isLoading: isCreatingChannel } =
    useMutation(createChannel);
  const queryClient = useQueryClient();

  const [openChannelForm, toggleChannelForm] = useToggle();
  const theme = useTheme();
  const channelsEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleListItemClick = (channelId: string | number) => {
    setTabValue("2");
    navigate(`/${channelId}`);
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
      name: Yup.string()
        .max(20, "name must contain less than 20 characters")
        .min(2, "name must contain atleast two characters")
        .required("Required"),
      description: Yup.string()
        .required("no description is provided")
        .min(24, "Meaningful Description with atleast 24 characters")
        .max(
          100,
          " description must contain with atleast 100 or less characters"
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      const body = { ...values, id: String(auth()?.id), token: authHeader() };
      mutateChannel(body, {
        onSuccess() {
          queryClient.invalidateQueries("channels");
          toggleChannelForm();
          resetForm();

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

      <Dialog open={openChannelForm} onClose={toggleChannelForm}>
        <DialogTitle>
          <Typography fontWeight={700}>NEW CHANNEL</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
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

      <Box
        sx={{
          position: "absolute",

          height: "calc(100% - 78px)",
          overflow: "auto",
        }}
      >
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
            {data.map(({ name, id }: any) => (
              <ListItem dense key={id} disableGutters>
                <ListItemButton
                  disableRipple
                  disableTouchRipple
                  onClick={() => handleListItemClick(id)}
                >
                  <ListItemAvatar>
                    <Avatar src="/" alt={name.toUpperCase()}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}

            <div ref={channelsEndRef} />
          </List>
        )}
      </Box>
    </>
  );
};

export default ChannelsTab;
