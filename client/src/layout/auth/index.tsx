import { Grid, Paper, useTheme } from "@mui/material";
import { alpha, Box, styled } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const theme = useTheme();

  const TopBox = styled(Box)(({ theme }) => ({
    background: theme.palette.primary.main,
    height: "50%",
    width: "100%",
  }));

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
    padding: theme.spacing(4),
    width: 500,
  }));

  return (
    <Grid container sx={{ height: "100vh" }}>
      <TopBox />
      <ContentWrapper>
        <FormWrapper>
          <Outlet />
        </FormWrapper>
      </ContentWrapper>
    </Grid>
  );
};

export default AuthLayout;
