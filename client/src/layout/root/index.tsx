import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      RootLayout
      <Button component={Link} to="/auth">
        Login
      </Button>
    </div>
  );
};

export default RootLayout;
