import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

const useStyles = makeStyles(() => ({
  listItemDiv: {
    display: "flex",
    flexDirection: "row",
    margin: "12px 12px 12px 8px",
  },
}));

export const WelcomeModal1: React.FC = () => {
  const classes = {
    ...useCommonWelcomeModalStyles(),
    ...useStyles(),
  };

  const listIcon = (
    <img
      src={"/images/icon-checkmark-circle.svg"}
      alt="List Icon"
      style={{ width: "24px", height: "24px", marginRight: "12px" }}
    />
  );

  return (
    <>
      <Typography className={classes.title}>Willkommen bei der CovMap</Typography>

      <img src={"/images/WelcomeModalImage1.svg"} alt="Welcome" width="100%" />

      <div className={classes.infoTextDiv}>
        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>
            Entwickelt von Ärzten der Charité - Universitätsmedizin Berlin
          </Typography>
        </div>
        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>
            Regionale Risikoeinschätzung zum Coronavirus 
          </Typography>
        </div>
        
        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>
            Informationen zu allgemeinen Schutzmaßnahmen
          </Typography>
        </div>
      

        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>
            Links zu aktuellen Verhaltensregeln aller Landkreise
          </Typography>
        </div>
      </div>
      <img src={"/images/Logo_Charite.svg"} alt="Charité Berlin" width="100" style={{ marginBottom: "24px" }} />
    </>
  );
};
