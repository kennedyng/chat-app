import {
  MenuItem,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import videoChatSvg from "../../assets/video-chat.svg";
import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
const FormDetails = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box component="form">
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
        size="small"
        placeholder="Email"
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
        size="small"
        placeholder="password"
        fullWidth
        margin="dense"
        variant="outlined"
      />

      <Button
        component={Link}
        to="/auth/gender"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
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
