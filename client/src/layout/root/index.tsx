import { Button, Grid } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid container item xs={3} sx={{ background: "red" }}>
        Active User
      </Grid>

      <Grid container item xs={6} direction="column">
        |
        <Grid item>
          <Outlet />
        </Grid>
        <Grid item sx={{ postion: "absolute", bottom: 0, top: 4 }}>
          Action
        </Grid>
      </Grid>

      <Grid container item xs={3} sx={{ background: "green" }}>
        User Detailes
      </Grid>
    </Grid>
  );
};

export default RootLayout;
