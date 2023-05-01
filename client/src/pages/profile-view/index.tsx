import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { HashLoader, PuffLoader } from "react-spinners";
import { API_URL } from "src/api";
import { getUserProfile } from "src/api/user";

const ProfileView = () => {
  const theme = useTheme();
  const authHeader = useAuthHeader();
  const userProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(authHeader()),
  });

  if (userProfileQuery.isLoading) {
    return <PuffLoader color={theme.palette.primary.main} />;
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5">Profile</Typography>
          <Button component={Link} to="/auth/set/profile" variant="outlined">
            Edit
          </Button>
        </Stack>

        <Avatar
          sx={{ height: 120, width: 120 }}
          src={`${API_URL}/${userProfileQuery.data?.data?.img_url}`}
        />

        <Typography my={2}>Display Name</Typography>
        <Typography color="text.secondary">
          {userProfileQuery.data?.data?.name}
        </Typography>
      </Box>
    </>
  );
};

export default ProfileView;
