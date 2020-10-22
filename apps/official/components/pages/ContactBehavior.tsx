import React from "react";
import Typography from "@material-ui/core/Typography";

const ContactBehavior = () => {
  return (
    <main className="sections">
      <section>
        <Typography variant="h1">Kontaktverhalten</Typography>
      </section>
      <section>
        <Typography>Wie wird das Kontaktverhalten der Bevölkerung bestimmt?</Typography>
        Unsere Gruppe hat ein Modell für das Kontaktverhalten auf Basis von GPS Daten entwickelt. Wir konnten einen{" "}
        <a target="_blank" href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2">
          Kontakt-Index
        </a>{" "}
        entwickeln, der eine hohe Korrelation mit der effektiven Reproduktionszahl (R) des Coronavirus aufweist, und das
        6 Tage früher!
        <Typography>
          Der R-Wert ist eine wichtige Maßzahl zur Steuerung der Corona Maßnahmen. Er besagt, wie viele Personen von
          einer infizierten Person im Durchschnitt angesteckt werden. Wenn der R Wert 1 beträgt, bedeutet dies, dass
          eine infizierte Person eine weitere ansteckt. Ziel ist es den R Wert unter 1 zu bekommen, einer infizierte
          Person also im Durchschnitt weniger als eine Person ansteckt.
        </Typography>
        <Typography>
          Die Berechnung des{" "}
          <a
            target="_blank"
            href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Projekte_RKI/R-Wert-Erlaeuterung.pdf?__blob=publicationFile"
          >
            R-Wertes
          </a>{" "}
          ist jedoch nicht ganz so einfach und zur Berechnung greift das RKI auf die sogenannte „Nowcast“ Model zurück.
          Da der R-Wert stärkeren Schwankungen unterliegt, hat das RKI eine Methode entwickelt, um den 7-Tage R-Wert zu
          berechnen und somit den R-Wert zu glätten. Das Problem des R-Werts und des 7-Tage R-Wert Wertes ist es, dass
          das Infektionsgeschehen mit mehreren Tage Verzögerung abgebildet wird. Dies erscheint auch logisch, wenn man
          bedenkt, dass man nach einer Ansteckung mit dem Coronavirus nicht sofort Symptome entwickelt und viele bei
          Symptomen auch einige Tage warten, bis zum Arzt gehen. Ein Labortest und bei einem positiven Ergebnis die
          Meldung an das RKI benötigen wiederum mehrere Tage Zeit. Der R-Wert ist somit immer ein Blick in die
          Vergangenheit. Der Vorteil unseres Kontakt-Index ist, dass die Auswertung von Kontakten viel schneller
          analysiert werden kann und daher ohne den Meldeverzug der offiziellen RKI Daten zur Verfügung steht. Dadurch
          können wir die Bevölkerung schneller auf die Möglichkeit eines erhöhten regionalen Risikos hinweisen.
        </Typography>
      </section>
    </main>
  );
};

export default ContactBehavior;
