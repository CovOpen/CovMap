import React from "react";
import Typography from "@material-ui/core/Typography";

const SymptomLevel = () => {
  return (
    <main className="sections">
      <section>
        <Typography variant="h1">Symptomlast</Typography>
      </section>
      <section>
        <Typography>
          Wenige Tage nach einer Coronavirusinfektion entwickelt ein Teil der Personen nach der Inkubationszeit Symptome
          wie zum Beispiel Husten, Fieber, Verlust/Reduzierung des Geschmacks. Diese Symptome gehören zu den frühesten
          beobachtbaren Ereignissen der Virusinfektion, sie sind jedoch nicht spezifisch für eine Coronavirusinfektion,
          sondern treten beispielsweise auch bei einer harmlosen Erkältung auf. Falls man jedoch eine große
          Menschenmenge nach diesen Symptomen befragt, so konnte bereits gezeigt werden, dass man Hotspots des
          Coronavirus früher als durch die offiziellen Fallzahlstatistiken detektieren kann. Wir verwenden die Charité{" "}
          <a target="_blank" href="http://www.covapp.de">
            CovApp
          </a>
          , um die Antworten nach Symptomen von einer großen Anzahl von Menschen auszuwerten, und können daher indirekt
          auf eine Aktivität des Coronavirus in einer Region Rückschlüsse ziehen. Wir bereiten diese Funktion gerade vor
          und werden sie Dir bald zur Verfügung stellen können.
        </Typography>
      </section>
    </main>
  );
};

export default SymptomLevel;
