import React from "react";
import { Typography } from "@material-ui/core";

export const Imprint = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Impressum</Typography>
        </section>
        <section>
          <Typography variant="h2">Who this Mapper app...</Typography>
          <Typography variant="body1">Some Paragraph.</Typography>
        </section>
      </main>
    </>
  );
};
