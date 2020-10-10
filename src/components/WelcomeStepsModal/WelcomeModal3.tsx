import React from "react";
import { Typography } from "@material-ui/core";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

export const WelcomeModal3: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();

  return <>
    <Typography className={classes.title}>Persönliche Risikoeinstufung</Typography>

    <img src={"/images/illustration.png"} alt="Welcome" width="100%"/>

    <div className={classes.infoTextDiv}>
      <Typography className={classes.smallText}>
        Auf der Karte kannst du ganz einfach erkennen wie das momentane
        Infektionsgeschehen in Deutschland und Deiner Region ist und was
        du aktiv tun kannst, um dies zu verbessern.
      </Typography>
    </div>
  </>;
};
