import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Collapse,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { useAuthHeader } from "react-auth-kit";
import { useDropzone } from "react-dropzone";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  createUserProfile,
  editUserProfile,
  getUserProfile,
} from "src/api/user";
import { NameValidation } from "src/utils/validation";
import * as Yup from "yup";
import { PuffLoader } from "react-spinners";

const SetProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const userProfileMutation = useMutation(createUserProfile);

  const queryClient = useQueryClient();
  // move to home only when profile is complete
  const userProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(authHeader()),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["userProfile"]);
      if (data?.completed) {
        navigate("/");
      }
    },
  });

  const [profilePic, setProfilePic] = useState<any>(null);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 5000000,
    accept: {
      "image/*": [],
      "image/jpeg": [],
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
      const data = {
        name,
        token: authHeader(),
        profilePic: acceptedFiles[0],
      };
      userProfileMutation.mutate(data, {
        onError: () => {
          toast.error("something went wrong try again");
        },
      });
    },
  });

  if (userProfileQuery.isLoading) {
    return <PuffLoader color={theme.palette.primary.main} />;
  }

  return (
    <Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ p: { xs: 2, md: 8 }, flex: 1 }}
      >
        <Collapse in={userProfileMutation.isSuccess}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {userProfileMutation.data?.message}
          </Alert>
        </Collapse>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Profile
        </Typography>

        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Avatar
            src={profilePic?.preview}
            sx={{
              width: { xs: "100%", md: 120 },
              height: 100,
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
    </Box>
  );
};

export default SetProfilePage;
