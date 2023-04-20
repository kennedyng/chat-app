import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import AddIcon from "@mui/icons-material/Add";

const Nav = () => {
  return (
    <AppBar>
      <Toolbar>
        <Grid container>
          <Grid
            item
            xs={3}
            display={{ xs: "none", md: "block" }}
            sx={{ pr: 4 }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Channel</Typography>
              <IconButton color="primary" sx={{ borderRadius: "8px" }}>
                <AddIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            ddd
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
