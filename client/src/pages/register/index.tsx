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
import { registerUser } from "src/api/user";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { EmailValidation, PasswordValidation } from "src/utils/validation";

const RegisterPage = () => {
  const {
    isLoading,
    mutate: registerMutate,
    isError,
    isSuccess,
    error,
  } = useMutation(registerUser, {
    onSuccess(data) {
      console.log(data);
    },
  });

  const navigate = useNavigate();
  const registerUserError = error as any;

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
      registerMutate(values, {
        onSuccess: () => {
          toast.success("You are now Registered");
        },
      });
    },
  });

  return (
    <Box sx={{ p: { xs: 2, md: 8 } }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Register
      </Typography>

      <Collapse in={isError && registerUserError?.response.status === 409}>
        <Alert severity="error">
          <AlertTitle>{registerUserError?.response.statusText}</AlertTitle>
          {registerUserError?.response.data.message} —{" "}
          <strong>check it out!</strong>
        </Alert>
      </Collapse>

      <Collapse in={isSuccess}>
        <Alert severity="success">
          <AlertTitle>Registed Successfully</AlertTitle>
          You can now log in —{" "}
          <MuiLink component={Link} to="/auth/login">
            <Typography component="strong" sx={{ textDecoration: "underline" }}>
              Login
            </Typography>
          </MuiLink>
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
