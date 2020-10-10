import { makeStyles } from "@material-ui/core/styles";

export const useCommonWelcomeModalStyles = makeStyles(() => ({
  title: {
    fontWeight: "bold",
    fontSize: "28px",
    lineHeight: "34px",
    textAlign: "center",
    margin: "32px",
  },
  largeText: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
  },
  smallText: {
    fontSize: "13px",
  },
  primaryButton: {
    color: "#FFFFFF",
    width: "194px",
    height: "51px",
    background: "#2274E3",
    borderRadius: "12px",
    margin: "10px"
  },
  secondaryButton: {
    color: "#828282",
    width: "194px",
    height: "51px",
    background: "#FFFFFF",
    borderRadius: "12px",
    margin: "10px",
    boxShadow: "none"
  },
  infoTextDiv: {
    margin: "20px 40px"
  }
}));
