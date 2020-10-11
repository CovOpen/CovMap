import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    lowRisk: Palette["primary"];
    mediumRisk: Palette["primary"];
    highRisk: Palette["primary"];
  }
  interface PaletteOptions {
    lowRisk: PaletteOptions["primary"];
    mediumRisk: PaletteOptions["primary"];
    highRisk: PaletteOptions["primary"];
  }
}

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#2274E3",
      contrastText: "#E3E9F3",
    },
    primary: {
      main: "#E3E9F3",
      contrastText: "#161616",
    },
    text: {
      primary: "#161616",
    },
    warning: {
      main: "#FEAE00",
      contrastText: "#E3E9F3",
    },
    error: {
      main: "#ED4661",
      contrastText: "#E3E9F3",
    },
    success: {
      main: "#10B17E",
      contrastText: "#E3E9F3",
    },
    lowRisk: {
      main: "#219653",
    },
    mediumRisk: {
      main: "#EEC341",
    },
    highRisk: {
      main: "#E84C4C",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "20px",
    },
    h3: {
      fontSize: "16px",
      fontWeight: 600,
    },
  },
});
