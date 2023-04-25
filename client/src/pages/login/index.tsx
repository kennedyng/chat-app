import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  Divider,
  Fade,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

import GoogleIcon from "@mui/icons-material/Google";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { loginUser } from "src/api/user";
import { LoadingButton } from "@mui/lab";

import { useSignIn } from "react-auth-kit";

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const {
    isLoading,
    mutate: loginMutate,
    isError,
    error,
  } = useMutation(loginUser, {
    onSuccess({ data }) {
      if (
        signIn({
          token: data.token,
          tokenType: "Bearer",
          expiresIn: 60,
          authState: { id: data.id },
        })
      ) {
        navigate("/");
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      loginMutate(values);
    },
  });

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Log In
      </Typography>

      <Collapse in={isError}>
        <Alert severity="error">
          <AlertTitle>Auth Failed</AlertTitle>
          Invalid Email or Password — <strong>check it out!</strong>
        </Alert>
      </Collapse>

      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          {...formik.getFieldProps("email")}
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          size="small"
          placeholder="Email"
          helperText={formik.errors.email}
          fullWidth
          margin="dense"
          variant="outlined"
        />

        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          error={
            Boolean(formik.touched.password) && Boolean(formik.errors.password)
          }
          {...formik.getFieldProps("password")}
          size="small"
          type="password"
          placeholder="password"
          helperText={formik.errors.password}
          fullWidth
          margin="dense"
          variant="outlined"
        />

        <LoadingButton
          sx={{ mt: 2 }}
          type="submit"
          loading={isLoading}
          variant="contained"
          fullWidth
        >
          <span>Login</span>
        </LoadingButton>
      </Box>

      <Divider sx={{ my: 2 }}>
        <Typography>or</Typography>
      </Divider>

      <Stack spacing={2}>
        <Button startIcon={<GoogleIcon />} fullWidth variant="outlined">
          continue with Google
        </Button>

        <Button fullWidth variant="outlined">
          continue as a guest
        </Button>
      </Stack>

      <Typography sx={{ mt: 2 }} textAlign="center">
        Don't have an account yet?{" "}
        <MuiLink component={Link} to="#">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default LoginPage;
