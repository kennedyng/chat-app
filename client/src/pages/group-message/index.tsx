import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
const GroupMessagePage = () => {
  return (
    <Stack
      sx={{
        px: { xs: "10px", md: "76.6px" },
        height: "90vh",
        pt: 2,
      }}
    >
      <Box sx={{ background: "yellow", flex: 1 }}>dd</Box>
      <Box
        sx={{
          flex: 0.3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Button
                  variant="contained"
                  sx={{ width: "39px", height: "39px" }}
                >
                  <SendIcon sx={{ color: "#fff" }} fontSize="small" />
                </Button>
              </InputAdornment>
            ),
          }}
          placeholder="Type a message here"
          fullWidth
          variant="outlined"
        />
      </Box>
    </Stack>
  );
};

export default GroupMessagePage;
