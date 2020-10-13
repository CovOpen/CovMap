import { makeStyles } from "@material-ui/core/styles";

export const useCommonWelcomeModalStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "34px",
    textAlign: "center",
    margin: "32px 40px 0 40px",
  },
  largeText: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
  },
  smallText: {
    fontSize: "13px",
    textAlign: "center",
  },
  primaryButton: {
    color: "#FFFFFF",
    width: "194px",
    height: "51px",
    background: theme.palette.secondary.main,
    borderRadius: "12px",
    margin: "0",
    textTransform: "none",
    "&:focus": {
      background: theme.palette.secondary.main
    },
    "&:hover": {
      background: theme.palette.secondary.main
    },
    "&:active": {
      background: theme.palette.secondary.main
    }
  },
  secondaryButton: {
    color: "#828282",
    width: "194px",
    height: "51px",
    background: "rgba(255,255,255,0)",
    borderRadius: "12px",
    margin: "0",
    boxShadow: "none",
    textTransform: "none",
    "&:focus": {
      background: "rgba(255,255,255,0)"
    },
    "&:hover": {
      background: "rgba(255,255,255,0)"
    },
    "&:active": {
      background: "rgba(255,255,255,0)"
    }
  },
  infoTextDiv: {
    margin: "24px 28px",
  },
}));
