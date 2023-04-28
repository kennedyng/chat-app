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

import { useSignIn } from "react-auth-kit";
import { EmailValidation, PasswordValidation } from "src/utils/validation";

const RegisterPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const {
    isLoading,
    mutate: loginMutate,
    isError,
    status,
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
      email: EmailValidation,
      password: PasswordValidation,
    }),
    onSubmit: (values) => {
      loginMutate(values);
    },
  });

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Register
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
          <span>Register</span>
        </LoadingButton>
      </Box>

      <Divider sx={{ my: 2 }}>
        <Typography>or</Typography>
      </Divider>

      <Typography sx={{ mt: 2 }} textAlign="center">
        Already have an account?{" "}
        <MuiLink component={Link} to="/auth/login">
          Login
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
