import { Toolbar, Stack, Typography, IconButton, Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";
const MembersTab = () => {
  const { setTabValue } = useSwapDrawerTabs();
  return (
    <>
      <Toolbar>
        <Stack
          sx={{ flex: 1 }}
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h6" fontWeight={700}>
            Mebers
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Button onClick={() => setTabValue("1")}>Swap</Button>
    </>
  );
};

export default MembersTab;
