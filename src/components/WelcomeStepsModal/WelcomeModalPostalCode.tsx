import React, { useState } from "react";
import { useThunkDispatch } from "../../useThunkDispatch";
import { Checkbox, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AppApi } from "../../state/app";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";
import { makeStyles } from "@material-ui/core/styles";
import { switchViewToPlace } from "src/state/thunks/handleSearchQuery";
import { Link, useHistory } from "react-router-dom";
import { WelcomeModalStep } from "./welcomeStepsConfig";

function isValidPostalCode(text: string) {
  return /^[0-9]{5}$/.test(text);
}

const useStyles = makeStyles(() => ({
  input: {
    "& .MuiInputBase-input": {
      "-moz-appearance": "textfield",
    },
    "& .MuiInputBase-input::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      "margin": "0",
    },
    "& .MuiInputBase-input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      "margin": "0",
    },
  },
}));

export const WelcomeModalPostalCode: React.FC = () => {
  const classes = { ...useCommonWelcomeModalStyles(), ...useStyles() };
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const [postCode, setPostCode] = useState("");
  const [validate, setValidate] = useState(false);
  const [checked, setChecked] = useState(false);

  function onSkip() {
    dispatch(AppApi.setUserPostalCode(0));
    history.push("/");
  }

  function submit() {
    setValidate(true);
    if (isValidPostalCode(postCode) && checked) {
      dispatch(AppApi.setUserPostalCode(parseInt(postCode, 10)));
      history.push("/");
      void dispatch(switchViewToPlace(postCode));
    }
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      submit();
    }
  }

  function handleCheckedChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  const isCheckboxError = validate && !checked;
  const isPostCodeError = validate && !isValidPostalCode(postCode);

  return (
    <>
      <Typography className={classes.title}>
        Für Dein regionales Risiko brauchen wir noch die Postleitzahl Deines Wohnortes
      </Typography>

      <TextField
        className={classes.input}
        autoFocus
        error={isPostCodeError}
        helperText={isPostCodeError ? "Bitte valide PLZ eingeben" : null}
        variant="outlined"
        type="number"
        onChange={(event) => {
          setPostCode(event.target.value);
        }}
        onKeyPress={onKeyPress}
        style={{ margin: "50px 0 30px 0", width: "180px", height: "80px" }}
      />

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
        <Checkbox value={checked} onChange={handleCheckedChange} />
        <Typography className={classes.smallText} style={isCheckboxError ? { color: "red" } : {}}>
          Ja, ich habe die <Link to={WelcomeModalStep.StepPostalCodeDataPrivacy}>Datenschutzerklärung</Link> zur
          Kenntnis genommen und willige ein.
        </Typography>
      </div>

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
    </>
  );
};
