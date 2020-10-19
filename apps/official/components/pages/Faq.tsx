import React, { ReactElement } from "react";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { RiskBadge } from "../RiskBadge";

const useStyles = makeStyles(() => ({
  textBlock: {
    marginBottom: "10px",
  },
}));

const FaqAccordion: React.FC<{ title: string; content: string | ReactElement }> = (props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h3" style={{ margin: "10px" }}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {typeof props.content === "string" ? (
          <Typography style={{ width: "100%" }}>{props.content}</Typography>
        ) : (
            props.content
          )}
      </AccordionDetails>
    </Accordion>
  );
};

const RiskHeading: React.FC<{ risk: 1 | 2 | 3 }> = ({ risk = 1 }) => {
  const riskText = ["Normales", "Mittleres", "Hohes"]
  return (
    <div style={{
      display: "flex",
      alignItems: "center"
    }}>
      <RiskBadge riskScore={risk} />
      <Typography variant="h3" style={{ margin: "0 1rem" }}>
        {`${riskText[risk - 1] || "Normales"} Risiko`}
      </Typography>
    </div>
  )
}

export const Faq: React.FC = () => {
  const classes = useStyles();

  return (
    <main className="sections">
      <section>
        <Typography variant="h1">Fragen und Antworten zu CovMap!</Typography>
      </section>

      <section>
        <FaqAccordion
          title="Was ist die CovMap?"
          content={
            <Typography style={{ width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={classes.textBlock}>
                  Die CovMap visualisiert eine regionale Risikoeinschätzung auf einer Deutschlandkarte. Unsere
                  Einschätzung beruhen auf täglich aktualisierten Fallzahlstatistiken des Robert-Koch-Instituts und
                  Vorhersagen von selbst entwickelten Modellen basierend auf dem Kontaktverhalten und selbst berichteten
                  Symptomen der Bevölkerung. Mit der CovMap möchten wir folgende Fragen zum Coronavirus adressieren :
                </div>
                <div className={classes.textBlock}>
                  <ul style={{ listStyle: "inside" }}>
                    <li>Wie hoch ist das regionale Risiko?</li>
                    <li>Welche allgemeine Schutzmaßnahmen gibt es?</li>
                    <li>Was sind die aktuellen Verhaltensregeln des Landkreises?</li>
                  </ul>
                </div>
                <div className={classes.textBlock}>
                  Mit der CovMap möchten wir an eine freiwillige Reduzierung von Kontakten appellieren und gleichermaßen
                  aufzeigen, wo diese nach unserer Meinung besonders notwendig sind.
                </div>
              </div>
            </Typography>
          }
        />

        <FaqAccordion
          title="Wie kann ich die CovMap erreichen?"
          content="Die CovMap ist als WebApp über www.covmap.de und covmap.charite.de und als Android App über den Play Store
            (bald verfügbar) erreichbar."
        />

        <FaqAccordion
          title="Handelt es sich um offizielle Risikoeinschätzungen?"
          content="Nein, bei der CovMap Risikoeinschätzung handelt es sich nicht um eine offizielle Risikoeinschätzung einer
            nationalen Behörde oder Institution. Die CovMap Risikoeinschätzung wurde von Wissenschaftlern der
            Charité, des Hasso-Plattner-Instituts und Spezialisten der Firma NETCHECK entwickelt."
        />
        <FaqAccordion
          title="Welche Risikostufen gibt es?"
          content={
            <Box display="flex" flexDirection="column">
              <Typography>Auf der Karte stellen wir ein normales, mittleres und hohes Risiko dar.</Typography>
              <RiskHeading risk={3} />
              <Typography>
                Ein hohes Risiko leiten wir von der etablierten 7-Tages-Inzidenz des RKIs ab, wenn die Schwelle von 50
                Neuinfektionen in den letzten 7 Tagen pro 100.000 Einwohner überschritten wurde.
              </Typography>
              <RiskHeading risk={2} />

              <Typography>
                Von einem mittleren Risiko gehen wir aus, wenn die 7-Tages-Inzidenz zwischen 20 und 50 Neuinfektionen in
                den letzten 7 Tagen pro 100.000 liegt oder unser Vorhersagemodell auf einen Anstieg der Neuinfektionen
                hindeutet. Eine Region mit mittlerem Risiko kann in Zukunft eine Region mit hohem Risiko werden.
              </Typography>
              <RiskHeading risk={1} />

              <Typography>
                Ein normales Risiko liegt vor, wenn die Zahl der Neuinfektionen gering ist und unser Vorhersagemodell
                keinen Anstieg vermuten lässt. Bitte beachte, dass das Virus derzeit überall in Deutschland zirkuliert
                und daher eine Ansteckung auch in einer Region mit einem normalen Risiko möglich ist.
              </Typography>
            </Box>
          }
        />
        <FaqAccordion
          title="Wie aktuell ist die CovMap?"
          content="Die CovMap wird einmal täglich aktualisiert. Der Datenstand ist in der Kartendarstellung oben rechts mit
            Datum und Uhrzeit erkenntlich."
        />

        <FaqAccordion
          title="Welche Daten verwendet die CovMap?"
          content="Die CovMap greift auf drei Datenquellen zurück, um die regionalen Risikobewertung durchzuführen: 1.)
            Fallzahlstatistiken vom Robert-Koch-Institut, 2.) ein geschätztes Kontaktverhalten, ermittelt aus GPS Daten
            von der Firma NETCHECK, 3.) Symptomdaten von der Chartié CovApp."
        />

        <FaqAccordion
          title="Welche Vorteile ergeben sich durch die Auswertung des Kontaktverhaltens und der Symptomlast der Bevölkerung?"
          content={
            <Typography style={{ width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={classes.textBlock}>
                  Damit das Virus übertragen werden kann, müssen sich Menschen begegnen. Wenige Tage nach der Infektion
                  berichten viele infizierte Personen über Symptome. Damit stellen der Kontakt zwischen Menschen und das
                  Bemerken von Symptomen die zwei frühesten beobachtbaren Ereignisse einer Infektion dar. Und genau da
                  setzt unser Projekt an.
                </div>
                <div className={classes.textBlock}>
                  Wir charakterisieren aus anonymisierten Smartphone-Daten (ermittelt aus GPS Daten) das
                  Kontaktverhalten. Des weiteren werten wir selbstberichtete Symptome aus. Nun ist es so, dass nicht
                  jeder Kontakt zu einer Virusübertragung führt und auch Symptome nicht beweisend für eine Infektion mit
                  dem Coronavirus sind. Wertet man jedoch die Daten von vielen Personen aus, dann erreicht man dadurch
                  erstens eine Anonymisierung und man kann mit diesen Daten eine Prognose der zukünftigen Fallzahlen
                  erstellen.
                </div>
                <div className={classes.textBlock}>
                  Der von uns entwickelte Kontakt-Index ist aktueller als die 7-Tages-Inzidenz und quasi ein
                  Frühwarnsystem. Er gibt die Anzahl der durchschnittlichen Kontakte pro Person und Region in den
                  letzten 24h Stunden an. In ersten Analysen konnten wir zeigen, dass eine hohe Anzahl an Kontakten mit
                  einem vermehrten Infektionsgeschehen korreliert.
                  <Typography variant="caption" style={{ verticalAlign: "super" }}>
                    <a
                      href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      [1]
                    </a>
                  </Typography>
                </div>
                <div className={classes.textBlock}>
                  Von anderen Autoren wurde gezeigt, dass die Auswertung von Symptomen zur Vorhersage von lokalen
                  Ausbrüchen verwendet werden kann. Über die Charité CovApp werden von vielen Benutzern Symptomantworten
                  eingegeben und wir planen, dies in ein verbessertes Modell einfließen zu lassen. Zeitlich ist die
                  Symptomlast als Prädiktor für das Infektionsgeschehen zwischen Kontakt-Index und 7-Tages-Inzidenz
                  einzuordnen.
                </div>
                <div className={classes.textBlock}>
                  Der große Vorteil der Auswertung von Kontakten und Symptomen liegt darin, dass die Daten ohne
                  Verzögerung analysiert werden können und daher ohne den Meldeverzug der offiziellen RKI Daten zur
                  Verfügung stehen. Dadurch können wir die Bevölkerung schneller auf die Möglichkeit eines erhöhten
                  regionalen Risikos hinweisen.
                </div>
                <div className={classes.textBlock}>
                  Das CovMap Projekt wird zur Zeit aktiv weiterentwickelt und verbessert.
                </div>
              </div>
            </Typography>
          }
        />
      </section>
    </main>
  );
};
