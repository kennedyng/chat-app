import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#333333",
      paper: "#0B090C",
    },
  },

  typography: {
    fontFamily: ["Noto Sans"].join(""),
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#3C393F",
            borderRadius: "8px",
          },
        },
      },
    },
  },
});
