import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { AppApi } from "src/state/app";
import { useThunkDispatch } from "src/useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../state";
import { triggerInstallPrompt } from "../state/thunks/triggerInstallPrompt";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    backgroundColor: theme.palette.primary.light,
    bottom: 0,
    zIndex: 9000,
  },
  item: {
    margin: theme.spacing(2),
    textAlign: "center",
  },
}));

type InstallPromptProps = {
  shouldShow: boolean;
};
type NoThanksState = boolean;

export const InstallPrompt = ({ shouldShow }: InstallPromptProps) => {
  const dispatch = useThunkDispatch();
  const prompt = useSelector((state: State) => state.app.installPrompt);
  const installed = useSelector((state: State) => state.app.isInstalled);
  const [noThanks, setNoThanks] = useState<NoThanksState>(() => false);

  const classes = useStyles();

  const cancelInstallPrompt = () => {
    setNoThanks(true);
  };

  const handleResult = (result) => {
    result.outcome !== "accepted" && setNoThanks(true);
  };

  useEffect(() => {
    const listener = (event) => {
      event.preventDefault();
      const boundPrompt = event.prompt.bind(event as any);
      dispatch(AppApi.setInstallPrompt(boundPrompt));
    };

    window.addEventListener("beforeinstallprompt", listener);
    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  const dialog = (
    <div className={classes.root}>
      <p className={classes.item}>Diese App kann auf deinem Geraet installiert werden.</p>
      <p>Tappe den Button unten um dich zu entscheiden!</p>
      <Button
        className={classes.item}
        variant="contained"
        color="primary"
        onClick={() => dispatch(triggerInstallPrompt(handleResult))}
      >
        Alles klar!
      </Button>
      <Button className={classes.item} variant="contained" color="primary" onClick={cancelInstallPrompt}>
        Nee danke.
      </Button>
    </div>
  );

  return !noThanks && shouldShow && prompt && !installed ? dialog : null;
};
