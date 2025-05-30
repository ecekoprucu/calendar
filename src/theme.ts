import { createTheme } from "@mui/material/styles";

// Create a custom theme with Apple-like aesthetics
export const theme = createTheme({
  palette: {
    primary: {
      main: "#0077FF",
      light: "#4D9BFF",
      dark: "#0055CC",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#34C759",
      light: "#70D98B",
      dark: "#248A3D",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FF3B30",
      light: "#FF6B62",
      dark: "#C9302C",
    },
    warning: {
      main: "#FF9500",
      light: "#FFB84D",
      dark: "#CC7A00",
    },
    info: {
      main: "#5AC8FA",
      light: "#8AD9FB",
      dark: "#28A0E5",
    },
    success: {
      main: "#34C759",
      light: "#70D98B",
      dark: "#248A3D",
    },
    background: {
      default: "#F5F5F7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1D1D1F",
      secondary: "#86868B",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});
