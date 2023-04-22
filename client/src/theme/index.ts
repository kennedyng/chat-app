import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#252329",
      paper: "#0B090C",
    },

    text: {
      secondary: "#828282",
      primary: "#E0E0E0",
    },
  },

  typography: {
    fontFamily: ["Noto Sans"].join(""),

    body1: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "25px",
    },
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

    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          background: "#252329",
          color: "white",
          fontWeight: 600,
          height: "42px",
          width: "42px",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          ".MuiDialog-paper": {
            background: "#120F13",
            borderRadius: "24px",
          },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          "& .MuiListItemText-primary": {
            fontWeight: 700,
            fontSize: 18,
            color: "#BDBDBD",
          },
        },
      },
    },
  },
});
