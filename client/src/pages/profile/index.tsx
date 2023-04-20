import {
  Box,
  Button,
  IconButton,
  styled,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Profile
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          sx={{
            background: "blue",
            width: { xs: "100%", md: 130 },
            height: 130,
          }}
        >
          Img
        </Box>
        <Typography>CHANGE PHOTO (optional)</Typography>
      </Stack>

      <Typography marginTop={4}>Display Name</Typography>
      <TextField
        margin="normal"
        size="small"
        placeholder="Enter display name"
        fullWidth
      />
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained">Save</Button>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
