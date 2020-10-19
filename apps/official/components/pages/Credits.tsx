import React from "react";
import Typography from "@material-ui/core/Typography";
const contributers = require('json-loader!./../../../../.all-contributorsrc');

export const Credits = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Danksagung</Typography>
        </section>
        <section>
        <Typography variant="body1">
            An der Entwicklung dieser App sind und waren verschiedene Personen und Unternehmen beteiligt, diesen möchten wir an dieser Stelle danken.
          </Typography>
          <Typography variant="h2">Personen</Typography>
          <Typography variant="body1">

            <ul>
            {
              contributers.contributors.map(el => <li><a href="{el.profile}" target='_blank' rel="noopener">{el.name}</a></li>)
            }
            </ul>
          </Typography>
        </section>
        <section>
          <Typography variant="h2">Unternehmen</Typography>
          <Typography variant="body1">
            Der Firma Portbluesky für die Freistellung von ... .

          </Typography>
          <Typography variant="body1">
            KeyCDN für die Bereitstellung ihrer Dienste.
            OpenStreetMap für die Bereitstellung ihrer Dienste.

          </Typography>
        </section>
      </main>
    </>
  );
};
