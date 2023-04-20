import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "../../components/nav";

const RootLayout = () => {
  return (
    <>
      <Nav />
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          component={Paper}
          container
          item
          display={{ xs: "none", md: "block" }}
          md={3}
        >
          Side Bar
        </Grid>

        <Grid container item xs={12} md={9} direction="column">
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayout;
