import React from "react";
import { Typography } from "@material-ui/core";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

export const WelcomeModal3: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();

  return (
    <>
      <Typography className={classes.title}>Was zeigt mir die CovMap an?</Typography>

      <img src={"/images/WelcomeModalImage3.svg"} alt="Welcome" width="100%" />
      <img src={"/images/WelcomeModalImage3_sub.svg"} alt="Welcome" />

      <div className={classes.infoTextDiv}>
        <Typography className={classes.largeText}>
          Auf der Karte kannst du ganz einfach erkennen, wo sich momentane Risikogebiete in Deutschland und in Deiner
          Region befinden.
        </Typography>
        <Typography className={classes.smallText} style={{ marginTop: "20px" }}>
          Grün = normales Risiko
        </Typography>
        <Typography className={classes.smallText}>Orange = mittleres Risiko</Typography>
        <Typography className={classes.smallText}>Rot = hohes Risiko</Typography>
      </div>
    </>
  );
};
