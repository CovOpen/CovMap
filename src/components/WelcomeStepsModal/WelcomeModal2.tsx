import React from "react";
import { Typography } from "@material-ui/core";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

export const WelcomeModal2: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();

  return (
    <>
      <Typography className={classes.title}>Was ist die CovMap?</Typography>

      <img src={"/images/WelcomeModalImage2.svg"} alt="Welcome" width="100%" />
      <img src={"/images/WelcomeModalImage2_sub.svg"} alt="Welcome" />

      <div className={classes.infoTextDiv}>
        <Typography className={classes.largeText}>
          Die CovMap möchte Risikogebiete so zeitnah wie möglich erkennen. Dazu ziehen wir die offiziellen Fallzahlen,
          sowie ein von uns entwickeltes Vorhersagemodell basierend auf Kontakten und Symptomen heran.
        </Typography>
      </div>
    </>
  );
};
