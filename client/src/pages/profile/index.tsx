import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  styled,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import * as Yup from "yup";
import { NameValidation } from "src/utils/validation";
import { useMutation } from "react-query";
import { createUserProfilePic, editUserProfile } from "src/api/user";
import { LoadingButton } from "@mui/lab";
import { useAuthHeader } from "react-auth-kit";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

const ProfilePage = () => {
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const userProfileMutation = useMutation(editUserProfile);
  const profilePicMutation = useMutation(createUserProfilePic);

  const [profilePic, setProfilePic] = useState<any>(null);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 5000000,
    accept: {
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      setProfilePic(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: NameValidation,
    }),

    onSubmit: ({ name }) => {
      userProfileMutation.mutate(
        { name, token: authHeader() },
        {
          onError: () => {
            toast.error("something went wrong try again");
          },
        }
      );

      profilePicMutation.mutate(
        {
          profilePic: acceptedFiles[0],
          token: authHeader(),
        },
        {
          onError: () => {
            toast.error("something went wrong try again");
          },
        }
      );
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ flex: 1 }}>
      <Collapse
        in={userProfileMutation.isSuccess && profilePicMutation.isSuccess}
      >
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {userProfileMutation.data?.message}
        </Alert>
      </Collapse>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Profile
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Avatar
          src={profilePic?.preview}
          sx={{
            width: { xs: "100%", md: 130 },
            height: 130,
          }}
        />

        <div {...getRootProps({ className: "dropzone" })}>
          <input {...formik.getFieldProps("img_url")} {...getInputProps()} />
        </div>
        <Typography onClick={open} sx={{ cursor: "pointer" }}>
          CHANGE PHOTO (optional)
        </Typography>
      </Stack>

      <Typography marginTop={4}>Display Name</Typography>
      <TextField
        {...formik.getFieldProps("name")}
        error={Boolean(formik.touched.name) && Boolean(formik.errors.name)}
        helperText={formik.errors.name}
        margin="normal"
        size="small"
        placeholder="Enter display name"
        fullWidth
      />
      <Stack direction="row" justifyContent="flex-end">
        <LoadingButton
          type="submit"
          loading={userProfileMutation.isLoading}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
