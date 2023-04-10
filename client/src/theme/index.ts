import { createTheme } from "@mui/material";
import { red, indigo, cyan, blue, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
  },
});
