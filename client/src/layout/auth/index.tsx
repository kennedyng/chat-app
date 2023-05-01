import { Grid, Paper, useTheme } from "@mui/material";
import { alpha, Box, styled } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const theme = useTheme();

  const ContentWrapper = styled(Box)(({ theme }) => ({
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }));

  const FormWrapper = styled(Paper)(({ theme }) => ({
    borderRadius: "0.93rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,

    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: 500,
    },
  }));

  return (
    <Grid container sx={{ height: { xs: "100%", md: "100vh" } }}>
      <ContentWrapper>
        <FormWrapper elevation={10}>
          <Outlet />
        </FormWrapper>
      </ContentWrapper>
    </Grid>
  );
};

export default AuthLayout;
