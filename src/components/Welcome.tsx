import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useThunkDispatch } from "useThunkDispatch";
import { withSnackbar } from 'notistack';

import { AppApi, Step } from "../state/app";

export const Welcome = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    const snack = enqueueSnackbar('BETA: Es gibt noch einiges zu tun.', { 
      variant: 'info',
      autoHideDuration: 15000,
      action: (key) => (
        <Button onClick={() => { closeSnackbar(key) }}>
                    Ok
        </Button>
      )
    });

    return () => {
      closeSnackbar(snack);
    }
  }, [])

  return (
    <>
      <main>
        <div id="info">
          {/* <img src="/images/logo.svg" alt="" /> */}
          <div className="text">Infektionsrisiko von COVID-19 gering halten</div>
          <div className="btn-group">
            <Button variant="contained" color="primary" onClick={() => dispatch(AppApi.gotoStep(Step.About))}>Infos</Button>
            <Button variant="contained" color="secondary" onClick={() => dispatch(AppApi.gotoStep(Step.Map))}>Karte</Button>
          </div>
        </div>
      </main>
    </>
  );
});
