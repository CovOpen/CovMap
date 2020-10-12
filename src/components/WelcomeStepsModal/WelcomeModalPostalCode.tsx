import React, { useEffect, useState } from "react";
import { useThunkDispatch } from "../../useThunkDispatch";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AppApi } from "../../state/app";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

export const WelcomeModalPostalCode: React.FC = () => {
  const classes = useCommonWelcomeModalStyles();
  const dispatch = useThunkDispatch();
  const [postCode, setPostCode] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(false);

  function isValidPostalCode(text: string) {
    const postCodeAsNumber = parseInt(text, 10);
    return !isNaN(postCodeAsNumber) && postCodeAsNumber < 100000;
  }

  useEffect(
    () => {
      if (touched) {
        setError(!isValidPostalCode(postCode));
      }
    },
    [touched, postCode],
  );

  function onPostalCodeChange(event) {
    setPostCode(event.target.value);
    setTouched(true);
  }

  function onSkip() {
    return dispatch(AppApi.setUserPostalCode(0));
  }

  function onSubmit() {
    if (isValidPostalCode(postCode)) {
      dispatch(AppApi.setUserPostalCode(parseInt(postCode, 10)));
    } else {
      setError(true);
    }
  }

  return (
    <>
      <Typography className={classes.title}>
        Für Dein regionales Risiko brauchen wir noch die Postleitzahl Deines Wohnortes
      </Typography>

      <TextField
        error={error}
        label="Postleitzahl"
        variant="outlined"
        type="number"
        onChange={onPostalCodeChange}
        onBlur={() => setTouched(true)}
        style={{ marginBottom: "12px" }}
      />

      <Button
        className={`${classes.primaryButton} ${classes.largeText}`}
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Jetzt starten
      </Button>
      <Button className={`${classes.secondaryButton} ${classes.largeText}`} variant="contained" onClick={onSkip}>
        Ohne Postleitzahl weiter
      </Button>
      <img
        src={"/images/icon-security.svg"}
        alt="Security Icon"
        style={{ width: "24px", height: "24px", margin: "24px 0 12px 0" }}
      />
      <Typography className={classes.smallText}>Siehe unsere Datenschutzrichtlinien.</Typography>
    </>
  );
};
