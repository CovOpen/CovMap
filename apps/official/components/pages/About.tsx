import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Fragen und Antworten zu CovMap!</Typography>
        </section>
        <section>
          <Typography variant="h2">Was ist die CovMap?</Typography>
          <Typography variant="body1">
            Die CovMap visualisiert eine regionale Risikoeinschätzung auf einer Deutschlandkarte. Unsere Einschätzung
            beruhen auf den Fallzahlstatistiken des Robert-Koch-Instituts und selbst entwickelten Modellen basierend auf
            dem Kontaktverhalten und selbst berichteten Symptomen der Bevölkerung. Die Hauptziele der CovMap sind:
            <br />
            <ul>
              <li>Risikogebiete so schnell wie möglich darzustellen</li>
              <li>Über allgemeine Schutzmaßnahmen zur Vermeidung von Infektionen zu informieren</li>
              <li>Zu den Angeboten mit Informationen und den aktuellen Verhaltensregeln der Landkreise zu verlinken</li>
            </ul>
            <br />
            Mit der CovMap möchten wir an eine freiwillige Reduzierung von Kontakten appellieren und gleichermaßen
            aufzeigen, wo diese nach unserer Meinung besonders notwendig sind.
          </Typography>
        </section>
        <section>
          <Typography variant="h2">Wie kann ich die CovMap erreichen?</Typography>
          <Typography variant="body1">
            Die CovMap ist als WebApp über <a href="www.covmap.de">www.covmap.de</a> und{" "}
            <a href="covmap.charite.de">covmap.charite.de</a> und als Android App über den Play Store (bald verfügbar)
            erreichbar.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Handelt es sich um offizielle Risikoeinschätzungen?</Typography>
          <Typography variant="body1">
            Nein, bei der CovMap Risikoeinschätzung handelt es sich nicht um eine offizielle Risikoeinschätzung einer
            nationalen Behörde oder Institution. Die Bewertung basiert auf Modellen, die von Wissenschaftlern der
            Charité, des Hasso-Plattner-Instituts und der Firma NETCHECK entwickelt worden sind.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Wie aktuell ist die CovMap?</Typography>
          <Typography variant="body1">
            Die CovMap wird einmal täglich aktualisiert. Der Datenstand ist in der Kartendarstellung oben rechts mit
            Datum und Uhrzeit erkenntlich.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Welche Daten verwendet die CovMap?</Typography>
          <Typography variant="body1">
            Die CovMap greift auf drei Datenquellen zurück, um die regionalen Risikobewertung durchzuführen: 1.)
            Fallzahlstatistiken vom Robert-Koch-Institut, 2.) ein geschätztes Kontaktverhalten, ermittelt aus GPS Daten
            von der Firma NETCHECK, 3.) Symptomdaten von der Chartié CovApp.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">
            Welche Vorteile ergeben sich durch die Auswertung des Kontaktverhaltens und der Symptomlast der Bevölkerung?
          </Typography>
          <Typography variant="body1">
            Damit das Virus übertragen werden kann, müssen sich Menschen begegnen. Wenige Tage nach der Infektion
            berichten viele infizierte Personen über Symptome. Damit stellen der Kontakt zwischen Menschen und das
            Bemerken von Symptomen die zwei frühesten beobachtbaren Ereignisse einer Infektion dar. Und genau da setzt
            unser Projekt an.
            <br />
            Wir charakterisieren aus anonymisierten Smartphone-Daten (ermittelt aus GPS Daten) das Kontaktverhalten. Des
            weiteren werten wir selbstberichtete Symptome aus. Nun ist es so, dass nicht jeder Kontakt zu einer
            Virusübertragung führt und auch Symptome nicht beweisend für eine Infektion mit dem Coronavirus sind. Wertet
            man jedoch die Daten von vielen Personen aus, dann erreicht man dadurch erstens eine Anonymisierung und man
            kann mit diesen Daten eine Prognose der zukünftigen Fallzahlen erstellen.
            <br />
            Der von uns entwickelte Kontakt-Index ist aktueller als die 7-Tages-Inzidenz und quasi ein Frühwarnsystem.
            Er gibt die Anzahl der durchschnittlichen Kontakte pro Person und Region in den letzten 24h Stunden an. In
            ersten Analysen konnten wir zeigen, dass eine hohe Anzahl an Kontakten mit einem vermehrten
            Infektionsgeschehen korreliert{" "}
            <sup>
              <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2">[1]</a>
            </sup>
            <br />
            Von anderen Autoren wurde gezeigt, dass die Auswertung von Symptomen zur Vorhersage von lokalen Ausbrüchen
            verwendet werden kann. Über die Charité CovApp werden von vielen Benutzern Symptomantworten eingegeben und
            wir planen, dies in ein verbessertes Modell einfließen zu lassen. Zeitlich ist die Symptomlast als Prädiktor
            für das Infektionsgeschehen zwischen Kontakt-Index und 7-Tages-Inzidenz einzuordnen.
            <br />
            Der große Vorteil der Auswertung von Kontakten und Symptomen liegt darin, dass die Daten ohne Verzögerung
            analysiert werden können und daher ohne den Meldeverzug der offiziellen RKI Daten zur Verfügung stehen.
            Dadurch können wir die Bevölkerung schneller auf die Möglichkeit eines erhöhten regionalen Risikos
            hinweisen.
            <br />
            Das CovMap Projekt wird zur Zeit aktiv weiterentwickelt und verbessert.
          </Typography>
        </section>
        <section>
          <Typography variant="h2">
            Welche Daten werden für die Erstellung der Karten verwendet und sind diese anonym?
          </Typography>
          <Typography variant="body1">
            Zur Einschätzung des regionales Risikos ziehen wir einerseits die offizielle 7-Tage-Inzidenz des RKIs heran
            und werten darüber hinaus das Kontaktverhalten ermittelt aus GPS Daten und die Antworten von Fragen nach
            Symptomen der Bevölkerung aus. Wir werten dabei die Daten von einer großen Anzahl von Personen aus, die
            zuvor zusammengefasst worden sind. Dies führt dazu, dass die Daten anonymisiert sind.
          </Typography>
        </section>
      </main>
    </>
  );
};
