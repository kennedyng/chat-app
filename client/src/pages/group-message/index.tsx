import { Container, Grid } from "@mui/material";
import React from "react";

const GroupMessagePage = () => {
  return (
    <Grid container sx={{ px: { xs: "10px", md: "76.6px" }, height: 1 }}>
      <Grid container item sx={{ background: "blue" }} xs={12}>
        dd
      </Grid>
      <Grid container item sx={{ background: "red" }}>
        message
      </Grid>
    </Grid>
  );
};

export default GroupMessagePage;
