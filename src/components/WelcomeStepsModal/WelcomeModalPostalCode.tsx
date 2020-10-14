import React, { useEffect, useState } from "react";
import { useThunkDispatch } from "../../useThunkDispatch";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AppApi } from "../../state/app";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";
import { makeStyles } from "@material-ui/core/styles";

function isValidPostalCode(text: string) {
  return /^[1-9][0-9]{4}$/.test(text);
}

const useStyles = makeStyles(() => ({
  "input": {
    "& .MuiInputBase-input": {
      "-moz-appearance": "textfield",
    },
    "& .MuiInputBase-input::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      "margin": "0"
    },
    "& .MuiInputBase-input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      "margin": "0"
    }
  }
}))

export const WelcomeModalPostalCode: React.FC = () => {
  const classes = { ...useCommonWelcomeModalStyles(), ...useStyles() };
  const dispatch = useThunkDispatch();
  const [postCode, setPostCode] = useState("");
  const [alwaysValidate, setAlwaysValidate] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (alwaysValidate) {
      setError(!isValidPostalCode(postCode));
    }
  }, [alwaysValidate, postCode]);

  function onSkip() {
    return dispatch(AppApi.setUserPostalCode(0));
  }

  function submit() {
    if (isValidPostalCode(postCode)) {
      dispatch(AppApi.setUserPostalCode(parseInt(postCode, 10)));
    } else {
      setAlwaysValidate(true);
      setError(true);
    }
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      submit();
    }
  }

  return (
    <>
      <Typography className={classes.title}>
        Für Dein regionales Risiko brauchen wir noch die Postleitzahl Deines Wohnortes
      </Typography>

      <TextField
        className={classes.input}
        autoFocus
        error={error}
        helperText={error ? "Bitte valide PLZ eingeben" : null}
        variant="outlined"
        type="number"
        onChange={(event) => {
          setPostCode(event.target.value);
        }}
        onKeyPress={onKeyPress}
        onBlur={() => setAlwaysValidate(true)}
        style={{ margin: "50px 0 30px 0", width: "180px", height: "80px" }}
      />

      <Button
        className={`${classes.primaryButton} ${classes.largeText}`}
        variant="contained"
        color="primary"
        onClick={submit}
      >
        Jetzt starten
      </Button>

      <Button
        className={`${classes.secondaryButton} ${classes.largeText}`}
        style={{ width: "240px" }}
        variant="contained"
        onClick={onSkip}
      >
        Ohne Postleitzahl weiter
      </Button>

      <img
        src={"/images/icon-security.svg"}
        alt="Security Icon"
        style={{ width: "24px", height: "24px", margin: "24px 0 12px 0" }}
      />

      <div style={{ marginBottom: "28px" }}>
        <Typography className={classes.smallText}>Siehe unsere Datenschutzrichtlinien.</Typography>
      </div>
    </>
  );
};
