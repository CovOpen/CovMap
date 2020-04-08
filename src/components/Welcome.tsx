import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useThunkDispatch } from "useThunkDispatch";

import { AppApi, Step } from "../state/app";

export const Welcome = () => {
  const dispatch = useThunkDispatch();

  return (
    <>
      <main>
        <div id="info">
          {/* <img src="/images/logo.svg" alt="" /> */}
          <div className="text">
            <Typography variant="h1">Infektionsrisiko von COVID-19 gering halten</Typography>
          </div>
          <div className="btn-group">
            <Button variant="contained" color="primary" onClick={() => dispatch(AppApi.gotoStep(Step.About))}>Infos</Button>
            <Button variant="contained" color="secondary" onClick={() => dispatch(AppApi.gotoStep(Step.Map))}>Karte</Button>
          </div>
        </div>
      </main>
    </>
  );
};
