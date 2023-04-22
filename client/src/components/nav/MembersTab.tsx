import {
  Toolbar,
  Stack,
  Typography,
  IconButton,
  Button,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDrawer } from "../../context/drawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StyledBadge } from "./styles";

const members = [
  {
    id: "ee",
    name: "Kennedy",
  },
  {
    id: "2",
    name: "Kennedy",
  },
];
const MembersTab = () => {
  const { setTabValue } = useDrawer();
  return (
    <>
      <Toolbar>
        <Stack
          sx={{ flex: 1 }}
          alignItems="center"
          direction="row"
          spacing={1.5}
        >
          <IconButton onClick={() => setTabValue("1")}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography fontWeight={700}>All channels</Typography>
        </Stack>
      </Toolbar>

      <Box sx={{ px: 2, color: "#E0E0E0" }}>
        <Typography my={2} textTransform="uppercase" fontWeight={700}>
          Members
        </Typography>
        <Typography mt={2} mb={4}>
          Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan
          quis. In gravida mollis purus, at interdum arcu tempor non
        </Typography>
        <Typography textTransform="uppercase" fontWeight={700}>
          Members
        </Typography>
      </Box>
      <Box>
        <List>
          {members.map(({ id, name }) => (
            <ListItem dense key={id} disableGutters>
              <ListItemButton disableRipple disableTouchRipple>
                <ListItemAvatar>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default MembersTab;
