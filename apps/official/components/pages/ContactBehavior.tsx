import React from "react";
import Typography from "@material-ui/core/Typography";
import { DetailPageNavigateBackHeader } from "app-config/components/DetailPageNavigateBackHeader";

const ContactBehavior = () => {
  return (
    <main className="sections">
      <section>
        <DetailPageNavigateBackHeader title="Kontaktverhalten" />
      </section>

      <section>
        <Typography>Wie wird das Kontaktverhalten der Bevölkerung bestimmt?</Typography>
        <Typography>
          Unsere Gruppe hat ein Modell für das Kontaktverhalten auf Basis von GPS Daten entwickelt. Wir konnten einen{" "}
          <a target="_blank" href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2" rel="noreferrer">
            Kontakt-Index
          </a>{" "}
          entwickeln, der eine hohe Korrelation mit der {" "}
          <a
            target="_blank"
            href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Projekte_RKI/R-Wert-Erlaeuterung.pdf?__blob=publicationFile"
            rel="noreferrer"
          >
            effektiven Reproduktionszahl (R)
          </a>{" "} des Coronavirus aufweist, und das 6 Tage früher!
        </Typography>
        <Typography>
          Der R-Wert ist eine wichtige Maßzahl zur Steuerung der Corona Maßnahmen. Er besagt, wie viele Personen von
          einer infizierten Person im Durchschnitt angesteckt werden. Wenn der R-Wert 1 beträgt, bedeutet dies, dass
          eine infizierte Person eine weitere ansteckt. Ziel ist es, durch Maßnahmen einen R Wert unter 1 zu erreichen, d.h., dass eine infizierte
          Person im Durchschnitt weniger als eine weitere Person ansteckt. Ein R-Wert oberhalb von 1 führt dagegen zu einem exponentiellem Anstieg der Fallzahlen.
        </Typography>
        <Typography>
          Die Berechnung des R-Werts ist jedoch nicht trivial. Zur Berechnung greift das RKI auf das sogenannte „Nowcast“ Model zurück.
          Das Problem des R-Werts ist es, dass
          das Infektionsgeschehen mit mehreren Tage Verzögerung abgebildet wird. Dies erscheint auch logisch, wenn man
          bedenkt, dass man nach einer Ansteckung mit dem Coronavirus nicht sofort Symptome entwickelt. Falls sich eine Person einem Labortest unterzieht, dauert es in der Regel mehrere Tage, bis das Ergebnis dem Robert-Koch-Institut mitgeteilt wird.
          Der R-Wert ist somit immer ein Blick in die Vergangenheit. Der Vorteil unseres Kontakt-Index ist, dass die Auswertung von Kontakten viel schneller
          analysiert werden kann und daher ohne den Meldeverzug der offiziellen Daten zur Verfügung steht. Dadurch
          können wir die Bevölkerung schneller auf die Möglichkeit eines erhöhten regionalen Risikos hinweisen.
        </Typography>
      </section>
    </main>
  );
};

export default ContactBehavior;
