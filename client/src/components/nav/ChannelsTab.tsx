import {
  Toolbar,
  Stack,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSwapDrawerTabs } from "../../context/swapSideBarTabs";
const ChannelsTab = () => {
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
            Channel
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Box sx={{ p: 2, background: "red" }}>
        <TextField placeholder="" fullWidth />
        <Button onClick={() => setTabValue("2")}>Swap</Button>
      </Box>
    </>
  );
};

export default ChannelsTab;
