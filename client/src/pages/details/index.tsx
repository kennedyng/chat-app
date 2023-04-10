import { Button, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const DetailsForm = () => {
  const navigate = useNavigate();
  return (
    <Box component="form">
      <TextField label="about me" fullWidth margin="dense" variant="standard" />
      <TextField
        multiline
        minRows={4}
        label="Description"
        fullWidth
        margin="dense"
      />
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Button variant="contained" endIcon={<ArrowRightIcon />}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

const DetailsPage = () => {
  return (
    <>
      <DetailsForm />
    </>
  );
};

export default DetailsPage;
