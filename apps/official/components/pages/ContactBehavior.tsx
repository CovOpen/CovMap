import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";

const ContactBehavior = () => {
  return (
    <main className="sections">
      <section>
        <NavigationTitle title="Kontaktverhalten" backToExpandedFeatureInfo={true} />
      </section>

      <section>
        <Typography>Was ist das Kontaktverhalten und warum ist es wichtig?</Typography>
        <Typography>
          Das Virus wird von Mensch zu Mensch übertragen. Dabei ist der{" "}
          <a href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Projekte_RKI/R-Wert-Erlaeuterung.pdf?__blob=publicationFile">
            R-Wert
          </a>{" "}
          ist eine wichtige Maßzahl zur Steuerung der Corona Maßnahmen. Der R-Wert besagt, wie viele Personen von einer
          infizierten Person im Durchschnitt angesteckt werden. Wenn der R-Wert 1 beträgt, bedeutet dies, dass eine
          infizierte Person eine weitere ansteckt. Ziel ist es, durch Maßnahmen einen R Wert unter 1 zu erreichen, d.h.,
          dass eine infizierte Person im Durchschnitt weniger als eine weitere Person ansteckt. Ein R-Wert oberhalb von
          1 führt dagegen zu einer Kettenreaktion mit einem unkontrollierten Anstieg der Fallzahlen. Der R-Wert hängt
          einerseits von der Biologie des Virus ab ("wie ansteckungsfähig ist das Virus?"), andererseits von unserem
          Kontaktverhalten ("wie viele Personen treffe ich?"). Während wir die Biologie des Virus nicht ändern können,
          haben wir auf unser Kontaktverhalten einen großen Einfluss. Indem wir unsere Kontakte reduzieren, können wir
          es auch einem hoch ansteckenden Virus so schwer machen, eine weitere Person zu infizieren, dass der R-Wert
          unter eins sinkt. Das Problem des R-Werts ist es, dass das Infektionsgeschehen mit mehreren Tage Verzögerung
          abgebildet wird. Dies erscheint auch logisch, wenn man bedenkt, dass man nach einer Ansteckung mit dem
          Coronavirus nicht sofort Symptome entwickelt. Falls sich eine Person einem Labortest unterzieht, dauert es in
          der Regel mehrere Tage, bis das Ergebnis dem Robert-Koch-Institut mitgeteilt wird. Der R-Wert ist somit immer
          ein Blick in die Vergangenheit. Unsere Gruppe hat ein{" "}
          <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2">
            Modell für das Kontaktverhalten auf Basis von GPS Daten
          </a>{" "}
          entwickelt. Über die Berechnung eines sogenannten Kontakt-Index können wir direkt den R-Wert berechnen. Der
          Vorteil vom Kontakt-Index ist nun, dass er fast ohne Verzögerung berechnet werden kann. Von einem erhöhten
          Kontaktverhalten sprechen wir, wenn unser Modell voraussagt, dass in einer Region so viele Kontakte vorhanden
          sind, dass sich das Virus leicht ausbreiten kann und der R-Wert über 1 gehen müsste.
        </Typography>
      </section>
    </main>
  );
};

export default ContactBehavior;
