import { Button, Typography } from "@material-ui/core";
import React from "react";

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const About = () => {
  const dispatch = useThunkDispatch();
    
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">About CovMapper</Typography>
        </section>
        <section>
          <Typography variant="h2">About this Mapper app...</Typography>
          <Typography variant="body1">
                        Some Paragraph
          </Typography>
          <Typography variant="body1">
                        yes yes, another paragraph
          </Typography>
        </section>
        <section>
          <Typography variant="h2">Was passiert mit den Daten?</Typography>
          <Typography variant="body1">
                        All deine Daten werden nur anonymisiert weiterverarbeitet.
                        Wir erheben keine Bewegungsdaten.
          </Typography>
          <div className="btn-group">
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(AppApi.gotoStep(Step.Map))}
            >
                            Karte
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};
