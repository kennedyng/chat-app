import {
  Alert,
  AlertTitle,
  Collapse,
  Divider,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";

import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useFormik } from "formik";

import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import { loginUser } from "src/api/user";
import * as Yup from "yup";

import { useAuthUser, useSignIn } from "react-auth-kit";
import { useErrorBoundary } from "react-error-boundary";
import { EmailValidation, PasswordValidation } from "src/utils/validation";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const auth = useAuthUser();

  const {
    isLoading,
    mutate: loginMutate,
    isError,
    data,
    status,
    error,
  } = useMutation(loginUser, {
    onError: (err: AxiosError) => {
      if (err.response?.status !== 403) {
        showBoundary(err);
      }
    },
    onSuccess(data) {
      if (
        signIn({
          token: data.token,
          tokenType: "Bearer",
          expiresIn: 36000,
          authState: { id: data.id },
        })
      ) {
        navigate("/auth/set/profile");
      } else {
        showBoundary(new Error("Something went wrong"));
      }
    },
  });

  let alertMessage;

  if (error?.response?.status === 403) {
    alertMessage = (
      <Alert severity="error">
        <AlertTitle>Auth Failed</AlertTitle>
        Invalid Email or Password — <strong>check it out!</strong>
      </Alert>
    );
  }

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

      {alertMessage}

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
