import React from "react";
import Typography from "@material-ui/core/Typography";

export const Legal = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Rechtliches</Typography>
        </section>
        <section>
          <Typography variant="h2">Uberschrift</Typography>
          <Typography variant="body1">Inhalt</Typography>
        </section>
      </main>
    </>
  );
};
