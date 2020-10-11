import React from "react";
import Typography from "@material-ui/core/Typography";

export const Imprint = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Impressum</Typography>
        </section>
        <section>
          <Typography variant="h2">
            CovMap ist ein Gemeinschaftsprojekt der Charité, der NETCHECK GmbH und des Hasso Plattner Instituts.
          </Typography>
          <Typography variant="body1">Falls Du Fragen hast, wende Dich an:</Typography>
          <Typography variant="body1">
            CovMap Team, Augustenburger Platz 1, 13353 Berlin, Telefon: 030/450627346, Email:
            alexander-henry.thieme@charite.de
          </Typography>
        </section>
      </main>
    </>
  );
};
