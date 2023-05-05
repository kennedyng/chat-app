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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { loginUser } from "src/api/user";
import { LoadingButton } from "@mui/lab";

import { useAuthUser, useSignIn } from "react-auth-kit";
import { EmailValidation, PasswordValidation } from "src/utils/validation";
import useSocket from "src/hooks/useSocket";

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const auth = useAuthUser();
  const {
    isLoading,
    mutate: loginMutate,
    isError,
    data,
    status,
    error,
  } = useMutation(loginUser, {
    onSuccess(data) {
      if (
        signIn({
          token: data.token,
          tokenType: "Bearer",
          expiresIn: 60,
          authState: { id: data.id },
        })
      ) {
        navigate("/auth/set/profile");
      }
    },
  });

  const userLoginError = error as any;

  const handleTesterLogin = () => {
    loginMutate({
      email: "Test@test.com",
      password: "ThinkIn2050Rich",
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: EmailValidation,
      password: PasswordValidation,
    }),
    onSubmit: (values) => {
      loginMutate(values);
    },
  });

  return (
    <Box sx={{ p: { xs: 2, md: 8 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Log In
      </Typography>

      <Collapse in={isError && userLoginError?.response?.status === 403}>
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

      <LoadingButton
        onClick={handleTesterLogin}
        loading={isLoading}
        variant="outlined"
        fullWidth
      >
        <span>continue as a Tester</span>
      </LoadingButton>

      <Typography sx={{ mt: 2 }} textAlign="center">
        Don't have an account yet?{" "}
        <MuiLink component={Link} to="/auth/register">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default LoginPage;
