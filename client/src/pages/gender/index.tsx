import {
  Box,
  Button,
  IconButton,
  styled,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

const data = [
  {
    icon: <ManIcon sx={{ fontSize: 100 }} />,
    titile: "Male",
    link: "/auth/personal/details",
  },

  {
    icon: <WomanIcon sx={{ fontSize: 100 }} />,
    titile: "Male",
    link: "/auth/personal/details",
  },
];

const IconButtonHolder = styled(IconButton)(({ theme }) => ({
  border: `2px solid`,
}));
const GenderPage = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack
        justifyContent="center"
        direction={{ xs: "column", md: "row" }}
        spacing={2}
      >
        {data.map(({ icon, titile, link }, index) => (
          <Stack
            spacing={0.5}
            justifyContent="center"
            alignItems="center"
            key={"gender-key" + index}
          >
            <IconButtonHolder onClick={() => navigate(link)}>
              {icon}
            </IconButtonHolder>
            <Typography fontWeight={700} color="text.secondary">
              Male
            </Typography>
          </Stack>
        ))}

        <IconButton></IconButton>
      </Stack>
      <Typography textAlign="center" fontWeight={700} sx={{ my: 2 }}>
        Select Your Gender
      </Typography>

      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        fullWidth
        variant="contained"
      >
        Back
      </Button>
    </Box>
  );
};

export default GenderPage;
