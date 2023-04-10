import {
  MenuItem,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import videoChatSvg from "../../assets/video-chat.svg";
import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Link } from "react-router-dom";
const FormDetails = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box component="form">
      <TextField
        label="User Name"
        fullWidth
        margin="dense"
        variant="standard"
      />
      <FormControl variant="standard" margin="dense" fullWidth>
        <InputLabel id="demo-simple-select-label">Choose Room</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button
        component={Link}
        to="/auth/gender"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Chat
      </Button>
    </Box>
  );
};

const LoginPage = () => {
  return (
    <Box>
      <Typography color="primary" variant="h6" textAlign="center">
        Chat
      </Typography>
      <Typography textAlign="center" color="text.secondary">
        Enjoy The Chat
      </Typography>

      <FormDetails />
    </Box>
  );
};

export default LoginPage;
