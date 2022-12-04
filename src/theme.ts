import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#292b59",
    },
    secondary: {
      main: "#0a0828",
    },
    error: {
      main: "#f33450",
    },
  },
});

export default theme;
