import React from "react";
import Typography from "@material-ui/core/Typography";
import { DetailPageNavigateBackHeader } from "app-config/components/DetailPageNavigateBackHeader";

const SymptomLevel = () => {
  return (
    <main className="sections">
      <section>
        <DetailPageNavigateBackHeader title="Symptomlast" />
      </section>

      <section>
        <Typography>
          Wenige Tage nach einer Coronavirusinfektion entwickelt ein Teil der Personen Symptome
          wie zum Beispiel Husten, Fieber oder einen Verlust des Geschmacks. Diese Symptome gehören zu den frühesten
          beobachtbaren Ereignissen einer Infektion, sind jedoch nicht spezifisch für das Coronavirus und können beispielsweise auch bei einer harmlosen Erkältung auftreten. Falls man jedoch eine große
          Menschenmenge nach diesen Symptomen befragt, so konnte bereits gezeigt werden, dass man Hotspots des
          Coronavirus früher als durch die offiziellen Fallzahlstatistiken detektieren kann. Wir verwenden die Charité{" "}
          <a target="_blank" href="http://www.covapp.de" rel="noreferrer">
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
