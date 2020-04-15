import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useThunkDispatch } from "useThunkDispatch";

import { AppApi, InternalPages } from "../../../src/state/app";

export const Welcome = () => {
  const dispatch = useThunkDispatch();

  return (
    <>
      <main>
        <div id="info">
          <div className="text">
            <Typography variant="h1">Infektionsrisiko von COVID-19 gering halten</Typography>
          </div>
          <div className="btn-group">
            <Button variant="contained" color="primary" onClick={() => dispatch(AppApi.gotoPage('about-page'))}>Infos</Button>
            <Button variant="contained" color="secondary" onClick={() => dispatch(AppApi.gotoPage(InternalPages.MAP))}>Karte</Button>
          </div>
        </div>
      </main>
    </>
  );
};
