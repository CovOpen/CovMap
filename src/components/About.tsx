import { Button } from "@material-ui/core";
import React from "react";

import { AppApi, Step } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export const About = () => {
  const dispatch = useThunkDispatch();
    
  return (
    <>
      <main className="sections">
        <section>
          <h1 className="uppercase">About CovMapper</h1>
        </section>
        <section>
          <h2>About this Mapper app...</h2>
          <p>
                        Some Paragraph
          </p>
          <p>
                        yes yes, another paragraph
          </p>
        </section>
        <section>
          <h2>Was passiert mit den Daten?</h2>
          <p>
                        All deine Daten werden nur anonymisiert weiterverarbeitet.
                        Wir erheben keine Bewegungsdaten.
          </p>
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
