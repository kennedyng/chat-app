import { Toolbar, Stack, Typography, IconButton, Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const MembersTab = () => {
  const { setTabValue } = useSwapDrawerTabs();
  return (
    <>
      <Toolbar>
        <Stack sx={{ flex: 1 }} alignItems="center" direction="row" spacing={2}>
          <IconButton onClick={() => setTabValue("1")}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography fontWeight={700}>All channels</Typography>
        </Stack>
      </Toolbar>
    </>
  );
};

export default MembersTab;
