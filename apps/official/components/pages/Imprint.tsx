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
          <Typography variant="h2">Die CovMap App ist ein Forschungsprojekt von Mitarbeiten der Charité, NETCHECK und dem Hasso Plattner Institut.</Typography>
          <Typography variant="body1">Falls Du Fragen hast, wende Dich an:</Typography>
          <Typography variant="body1">Dr. Alexander Thieme</Typography>
          <Typography variant="body1">Augustenburger Platz 1</Typography>
          <Typography variant="body1">13353 Berlin</Typography>
          <Typography variant="body1">Telefon: 030/450627346</Typography>
          <Typography variant="body1">Email: alexander-henry.thieme@charite.de</Typography>
        </section>
      </main>
    </>
  );
};
