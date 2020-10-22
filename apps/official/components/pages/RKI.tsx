import React from "react";
import Typography from "@material-ui/core/Typography";

const RKI = () => {
  return (
    <main className="sections">
      <section>
        <Typography variant="h1">7-Tages-Inzidenz (RKI)</Typography>
      </section>
      <section>
        <Typography>
          Wie berechnet sich die 7-Tages-Inzidenz (Anzahl der Neuinfektionen pro 100.000 Einwohner der letzten 7 Tage)?
        </Typography>
        <Typography>
          Es werden alle gemeldeten Neuinfektionen der jeweils zurückliegenden sieben Tage innerhalb eines Landkreises
          addiert. Diese Summe wird durch die Einwohnerzahl des jeweiligen Landkreises geteilt. Danach wird dieser Wert
          mit 100.000 multipliziert. Die 7-Tages-Inzidenz stellt eine etablierte Größe dar, um aktuelle Hotspots der
          Coronavirus-Epidemie zu identifizieren. Man muss jedoch davon ausgehen, dass nicht alle Fälle gemeldet werden.
          Darüber hinaus gibt es einen Meldeverzug, da zwischen der Infektion und der Bestätigung durch einen Labortest
          und Meldung des Ergebnisses an das RKI Zeit vergehen.
        </Typography>
      </section>
    </main>
  );
};

export default RKI;
