import React, { useState } from "react";
import { useThunkDispatch } from "../../useThunkDispatch";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AppApi } from "../../state/app";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

export const WelcomeModalPostalCode: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();
  const dispatch = useThunkDispatch();
  const [plz, setPlz] = useState('');

  return <>
    <Typography className={classes.title}>Um zu starten brauchen wir noch die Postleitzahl Deines Wohnortes</Typography>

    <TextField label="Postleitzahl" variant="outlined" onChange={(event) => setPlz(event.target.value)}/>

    <Button
      className={`${classes.primaryButton} ${classes.largeText}`}
      variant="contained"
      color="primary"
      onClick={() => dispatch(AppApi.setUserPostalCode(parseInt(plz, 10)))}
    >Jetzt starten</Button>
  </>;
};
