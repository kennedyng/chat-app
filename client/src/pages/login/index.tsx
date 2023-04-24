import {
  Button,
  Divider,
  InputAdornment,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import GoogleIcon from "@mui/icons-material/Google";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useFormik } from "formik";

import * as Yup from "yup";
const FormDetails = () => {
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
      console.log(values);
    },
  });

  return (
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
        error={
          Boolean(formik.touched.password) && Boolean(formik.errors.password)
        }
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
        placeholder="password"
        helperText={formik.errors.password}
        fullWidth
        margin="dense"
        variant="outlined"
      />

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

const LoginPage = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Log In
      </Typography>

      <FormDetails />

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
