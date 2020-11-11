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
import { useSelector } from "react-redux";
import { State } from "src/state";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const postCode = useSelector((state: State) => state.app.intro.postCode);
  const checked = useSelector((state: State) => state.app.intro.isPrivacyChecked);
  const [validatePostalCode, setValidatePostalCode] = useState(false);
  const [validateCheckbox, setValidateCheckbox] = useState(false);

  function onSkip() {
    setValidateCheckbox(true);
    setValidatePostalCode(false);
    if (checked) {
      dispatch(AppApi.setUserPostalCode(0));
      history.push("/");
    }
  }

  function submit() {
    setValidatePostalCode(true);
    setValidateCheckbox(true);
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
    dispatch(AppApi.setIntroValues({ isPrivacyChecked: event.target.checked }));
  }

  const isCheckboxError = validateCheckbox && !checked;
  const isPostCodeError = validatePostalCode && !isValidPostalCode(postCode);

  return (
    <>
      <Typography className={classes.title}>{t("welcome.regional-risk.title")}</Typography>

      <TextField
        className={classes.input}
        autoFocus
        error={isPostCodeError}
        helperText={isPostCodeError ? t("welcome.regional-risk.invalid-post-code") : null}
        variant="outlined"
        type="number"
        value={postCode}
        onChange={(event) => {
          dispatch(AppApi.setIntroValues({ postCode: event.target.value }));
        }}
        onKeyPress={onKeyPress}
        style={{ margin: "50px 0 30px 0", width: "180px", height: "80px" }}
      />

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
        <Checkbox value={checked} checked={checked} onChange={handleCheckedChange} />
        <Typography className={classes.smallText} style={isCheckboxError ? { color: "red" } : {}}>
          <Trans t={t} i18nKey="welcome.regional-risk.accept-privacy">
            part-0 <Link to={WelcomeModalStep.StepPostalCodeDataPrivacy}>part-1</Link> part-2
          </Trans>
        </Typography>
      </div>

      <div>
        <Button
          className={`${classes.primaryButton} ${classes.largeText}`}
          variant="contained"
          color="primary"
          onClick={submit}
        >
          {t("welcome.regional-risk.start")}
        </Button>
      </div>

      <div>
        <Button
          className={`${classes.secondaryButton} ${classes.largeText}`}
          style={{ width: "240px" }}
          variant="contained"
          onClick={onSkip}
        >
          {t("welcome.regional-risk.continue-without-post-code")}
        </Button>
      </div>
    </>
  );
};
