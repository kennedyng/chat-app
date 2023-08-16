import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { API_URL } from "src/api";
import { getUserProfile } from "src/api/user";

const ProfileView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const userProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(authHeader()),
  });

  if (userProfileQuery.isLoading) {
    return <PuffLoader color={theme.palette.primary.main} />;
  }

  return (
    <Box sx={{ flex: 1 }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ position: "absolute", m: 1 }}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ p: { xs: 2, md: 8 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5">Profile</Typography>
          <Button component={Link} to="/auth/edit/profile" variant="outlined">
            Edit
          </Button>
        </Stack>

        <Avatar
          sx={{ height: 120, width: 120 }}
          src={userProfileQuery.data?.data.img_url}
        />

        <Typography my={2}>Display Name</Typography>
        <Typography color="text.secondary">
          {userProfileQuery.data?.data?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileView;
