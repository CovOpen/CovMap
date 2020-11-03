import React from "react";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { RiskBadge } from "../RiskBadge";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import ContactsMediumBackgroundIcon from "../../static/images/contacts-medium-background.svg";

const useStyles = makeStyles(() => ({
  textBlock: {
    marginBottom: "10px",
  },
}));

const FaqAccordion: React.FC<{ title: string }> = (props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h3" style={{ margin: "10px" }}>
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
};

const RiskHeading: React.FC<{ risk: 1 | 2 | 3 }> = ({ risk = 1 }) => {
  const riskText = ["Normales", "Mittleres", "Hohes"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <RiskBadge riskScore={risk} />
      <Typography variant="h3" style={{ margin: "0 1rem" }}>
        {`${riskText[risk - 1] || "Normales"} Risiko`}
      </Typography>
    </div>
  );
};

export const Faq: React.FC = () => {
  const classes = useStyles();

  return (
    <main className="sections">
      <section>
        <NavigationTitle title={"Fragen und Antworten zur CovMap!"} />
      </section>

      <section>
        <FaqAccordion title="Was ist die CovMap?">
          <Typography style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className={classes.textBlock}>
                Die CovMap visualisiert eine regionale Risikoeinschätzung auf einer Deutschlandkarte. Die
                Risikoeinschätzung beruht auf täglich aktualisierten Fallzahlstatistiken des Robert-Koch-Instituts und
                Vorhersagen von selbst entwickelten Modellen basierend auf dem Kontaktverhalten und berichteten
                Symptomen der Bevölkerung. Mit der CovMap möchten wir folgende Fragen zum Coronavirus adressieren:
              </div>
              <div className={classes.textBlock}>
                <ul style={{ listStyle: "inside" }}>
                  <li>Wie hoch ist das regionale Risiko?</li>
                  <li>Wie kann ich mich schützen?</li>
                  <li>Welche Verhaltensregeln gelten im Landkreis?</li>
                </ul>
              </div>
              <div className={classes.textBlock}>
                Mit der CovMap möchten wir zu einer freiwilligen Reduzierung von Kontakten aufrufen und aufzeigen, wo
                dies besonders notwendig ist.
              </div>
            </div>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Wie kann ich die CovMap erreichen?">
          <Typography style={{ width: "100%" }}>
            Die CovMap ist als WebApp über <a href="https://www.covmap.de">www.covmap.de</a> und{" "}
            <a href="https://covmap.charite.de">covmap.charite.de</a> und als Android App über den Play Store (bald
            verfügbar) erreichbar.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Was macht die CovMap besonders?">
          <Typography style={{ width: "100%" }}>
            Die CovMap wertet zur regionalen Risikobestimmung neben den offiziellen Fallzahlstatistiken des
            Robert-Koch-Instituts große Sätze an GPS- und Symptom-Daten aus. Diese Daten entstammen aus anderen Apps,
            bei denen die Nutzer der Auswertung ihrer GPS Daten zugestimmt haben. Diese Daten sind die Basis für ein von
            uns entwickeltes Modell, welches den Kontakt-Index berechnet. Zudem werden aktuelle Symptome abgefragt,
            ausgewertet und fließen zusätzlich in die Risikoeinschätzung mit ein (bald verfügbar). Der Kontakt-Index und
            die Symptome spiegeln frühzeitig das Infektionsgeschehen wider und ermöglichen so eine zeitnahe Anpassung.
            Im Gegensatz dazu sind die Zahlen der Neuinfektionen, die vom Robert-Koch-Institut veröffentlicht werden,
            der Stand der Neuinfektionen von vor circa einer Woche. Dieser Verzug kommt dadurch Zustande, dass eine
            Person, die neu mit dem Virus infiziert wurde, nach wenigen Tagen Symptome entwickelt (es gibt auch
            symptomlose Verläufe), sich erst dann testen lässt, der Test Zeit benötigt und auch die Meldung an das
            Gesundeitsamt Zeit in Anspruch nimmt.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Handelt es sich um offizielle Risikoeinschätzungen?">
          <Typography style={{ width: "100%" }}>
            Nein, bei der CovMap Risikoeinschätzung handelt es sich nicht um eine offizielle Risikoeinschätzung einer
            nationalen Behörde oder Institution. Die CovMap Risikoeinschätzung wurde von Forschenden der Charité, des
            Hasso-Plattner-Instituts und Datenspezialisten der Firma NET CHECK entwickelt. Das von uns entwickelte
            Modell zur Risikoeinschätzung wurde erst kürzlich entwickelt und wird deswegen laufend evaluiert.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Welche Risikostufen gibt es?">
          <Box display="flex" flexDirection="column">
            <Typography>Auf der Karte stellen wir ein normales, mittleres und hohes Risiko dar.</Typography>
            <RiskHeading risk={1} />

            <Typography>
              Ein normales Risiko liegt vor, wenn die 7-Tages-Inzidenz des Robert-Koch-Instituts geringer als 20
              Neuinfektionen pro 100.000 Einwohner ist und unser Vorhersagemodell keinen Anstieg vermuten lässt. Bitte
              beachte, dass das Virus derzeit überall in Deutschland zirkuliert und daher eine Ansteckung auch in einer
              Region mit einem normalen Risiko möglich ist.
            </Typography>

            <RiskHeading risk={2} />

            <Typography>
              Von einem mittleren Risiko gehen wir aus, wenn die 7-Tages-Inzidenz zwischen 20 und 50 Neuinfektionen pro
              100.000 Einwohnern liegt oder unser Vorhersagemodell auf einen Anstieg der Neuinfektionen hindeutet. Eine
              Region mit mittlerem Risiko kann in Zukunft eine Region mit hohem Risiko werden.
            </Typography>
            <RiskHeading risk={3} />
            <Typography>
              Ein hohes Risiko leiten wir von der 7-Tages-Inzidenz ab, wenn die Schwelle von 50 Neuinfektionen pro
              100.000 Einwohner überschritten wurde.
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                <ContactsMediumBackgroundIcon />
              </div>
              <Typography variant="h3" style={{ margin: "0 1rem" }}>
                Erhöhtes Kontaktverhalten in der Bevölkerung
              </Typography>
            </div>
            <Typography>
              In dieser Region registrieren wir viele Kontakte, weshalb sich das Virus leichter ausbreiten kann. Unser
              Vorhersagemodell sagt einen Anstieg der 7-Tages-Inzidenz voraus.
            </Typography>
          </Box>
        </FaqAccordion>

        <FaqAccordion title="Welche Konsequenzen ergeben sich aus der Risikoeinschätzung?">
          <Typography style={{ width: "100%" }}>
            Wir möchten mit diesem Projekt zu einer freiwilligen Reduktion von Kontakten aufrufen, insbesondere in
            Gebieten mit mittlerem und hohem Risiko. Falls sich Kontakte nicht vermeiden lassen, findest Du auf unserer
            Seite Informationen über allgemeine Schutzmaßnahmen, mit denen sich das Übertragungsrisiko verringern lässt.
            Zusätzlich verlinken wir zu den Webseiten der Landkreise, so dass Du Dich über die aktuellen und offiziellen
            Verhaltensregeln in Deiner Region informieren kannst.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Wie aktuell ist die CovMap?">
          <Typography style={{ width: "100%" }}>
            Die CovMap wird einmal täglich aktualisiert. Der Datenstand ist in der Kartendarstellung oben rechts mit
            Datum erkenntlich.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Welche Daten verwendet die CovMap?">
          <Typography style={{ width: "100%" }}>
            Die CovMap greift auf drei Datenquellen zurück, um die regionalen Risikobewertung durchzuführen: 1.)
            Fallzahlstatistiken vom Robert-Koch-Institut, 2.) ein geschätztes Kontaktverhalten (Kontakt-Index),
            ermittelt aus GPS Daten von der Firma NET CHECK, 3.) Symptomdaten von der Chartié CovApp (
            <a href="https://covapp.charite.de">https://covapp.charite.de</a>)
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Welche Vorteile ergeben sich durch die Auswertung von Kontakten und Symptomen der Bevölkerung?">
          <Typography style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className={classes.textBlock}>
                Damit das Virus übertragen werden kann, müssen sich Menschen begegnen. Wenige Tage nach der Infektion
                berichten viele infizierte Personen über Symptome. Damit stellen der Kontakt zwischen Menschen und das
                Bemerken von Symptomen die zwei frühesten beobachtbaren Ereignisse einer Infektion dar. Hier setzt die
                CovMap an.
              </div>
              <div className={classes.textBlock}>
                Wir charakterisieren aus anonymisierten GPS-Daten das Kontaktverhalten. Zusätzlich werten wir
                selbstberichtete Symptome aus. Naturlich führt nicht jeder Kontakt zu einer Virusübertragung und
                Symptome allein beweisen keine Infektion mit dem Coronavirus. Wertet man jedoch die Daten von vielen
                Personen aus, dann kann eine Prognose der zukünftigen Fallzahlen erstellt werden. Wir haben dieses
                Modell erst kürzlich entwickelt und evaulieren und verbessern es kontinuierlich.
              </div>
              <div className={classes.textBlock}>
                Die vom Robert Koch-Institut gemeldete 7-Tages-Inzidenz spiegelt das Infektionsgeschehen wider, das
                bereits vor einiger Zeit stattgefunden hat, und ist deshalb ein Blick in die Vergangenheit. Der von uns
                entwickelte Kontakt-Index ist ein Maß für die Anzahl der Kontakte pro Person und Region und kann
                schneller ausgewertet werden. In{" "}
                <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2">ersten Analysen</a> konnten wir
                zeigen, dass ein hoher Kontakt-Index mit einem vermehrten Infektionsgeschehen korreliert. Der
                Kontakt-Index erlaubt insofern einen vorsichtigen Blick in die Zukunft und kann als eine Art
                Frühwarnsystem angesehen werden. Wichtig ist, dass es sich bei dem hinterlegten Algorithmus um ein
                rechnerisches Modell handelt. Das tatsächliche Infektionsgeschehen kann deshalb von der Vorhersage auf
                Basis des Kontakt-Index abweichen.
              </div>
              <div className={classes.textBlock}>
                Man weiß inzwischen, dass die Auswertung von Symptomen zur Vorhersage von lokalen Ausbrüchen verwendet
                werden kann. Zeitlich ist die Symptomlast als Variable für die Vorhersage des Infektionsgeschehens
                zwischen Kontakt-Index und 7-Tages-Inzidenz einzuordnen. Über die CovApp der Charité geben viele
                Nutzerinnen und Nutzern ihre Symptome an. Wir planen, diese Angaben anonymisiert in ein verbessertes
                Modell einfließen zu lassen.
              </div>
              <div className={classes.textBlock}>
                Der große Vorteil der Auswertung von Kontakten und Symptomen liegt darin, dass die Daten fast ohne
                Verzögerung analysiert werden können und daher ohne den Meldeverzug der offiziellen Fallzahlen des
                Robert Koch-Instituts zur Verfügung stehen. Dadurch können wir die Bevölkerung schneller auf die
                Möglichkeit eines erhöhten regionalen Risikos hinweisen.
              </div>
              <div className={classes.textBlock}>
                Das CovMap Projekt wird zurzeit aktiv weiterentwickelt und verbessert.
              </div>
            </div>
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Wie funktioniert die Vorhersage, ob in einer Region mit vermehrten Neuinfektionen zu rechnen ist?">
          <Typography style={{ width: "100%" }}>
            Unsere Arbeiten beruhen auf einem etablierten theoretischen Modell für die Vorhersage der Reproduktionszahl
            (R-Wert). Der R-Wert gibt an, wie viele Personen sich innerhalb eines bestimmten Zeitraumes typischerweise
            an einer erkrankten Person anstecken. Diese Ansteckungen hängen unter anderem von der Zahl der Kontakte pro
            Person ab und ein mathematischer Zusammenhang kann für die Bestimmung genutzt werden. Der Kontakt zwischen
            zwei Personen kann zu einer Übertragung des Coronavirus führen. Bei unserer Methode müssen wir nicht wissen,
            ob eine Person tatsächlich infiziert ist und können dennoch eine Vorhersage darüber treffen, wie sich die
            Zahl der Neuinfektionen entwickeln wird. Da ein Kontakt und die potentielle Virusübertragung das früheste
            Ereignis einer Infektion mit dem Coronavirus darstellt, gewinnen wir einen Zeitvorteil von bis zu 3 Wochen
            gegen über den offiziellen Fallzahlstatistiken mit bestätigten Infektionen. Statistisch gesehen ist übrigens
            nicht die Zahl der Kontakte pro Person entscheidend, sondern eine spezielle Metrik, welche die Verteilung
            der Anzahl der Kontakte berücksichtigt. Diese Metrik wurde von uns unter dem Namen Kontakt-Index berechnet
            und wird für die Prognose verwendet, ob es zu einem Anstieg von Neuinfektionen kommen kann.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Was ist der Kontakt-Index?">
          <Typography style={{ width: "100%" }}>
            Der Kontakt-Index wurde von unserer Gruppe entwickelt und in einer wissenschaftlichen Arbeit (
            <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2">Preprint</a>) beschrieben.
            Grundlegend ist die Beobachtung, dass nicht jede Person die gleiche Zahl von Kontakten pro Tag hat, sondern
            es dabei sehr große Unterschiede gibt. Da Personen mit sehr vielen Kontakten („Superkontakter“) eine höhere
            Wahrscheinlichkeit haben, das Coronavirus weiterzugeben, spielt diese Beobachtung eine wichtige Rolle für
            die Ausbreitung des Coronavirus (siehe auch Freundschaftsparadox). Anders gesagt, ist nicht nur die reine
            Zahl an Kontakten für die Virusausbreitung entscheidend, sondern auch die Unterschiedlichkeit der
            Kontaktzahlen (Heterogenität). Der Kontakt-Index zeigt nun sowohl die Gesamtzahl der Kontakte als auch die
            Heterogenität an. Wir konnten zeigen, dass der Kontakt-Index sehr gut mit der Ausbreitung des Coronavirus in
            Deutschland korrelierte.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Warum hilft es Kontakte zu reduzieren?">
          <Typography style={{ width: "100%" }}>
            Das Coronaviurs überträgt sich von Mensch zu Mensch. Es wird hauptsächlich über die sogenannte
            Tröpfcheninfektion und über Aerosole übertragen. Je weniger Kontakte jemand hat, desto schwerer ist es für
            das Virus, sich weiter zu verbreiten. Weitere Informationen zum Coronavirus findest Du auf der{" "}
            <a href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Steckbrief.html">
              Webpage des Robert-Koch-Instituts
            </a>
            .
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Was kann ich konkret tun, um die Ausbreitung des Coronavirus zu verringern?">
          <Typography style={{ width: "100%" }}>
            Das Coronaviurs überträgt sich von Mensch zu Mensch, deswegen ist es wichtig, dass wir Kontakte reduzieren
            und uns zusätzlich an Infektionsschutzmaßnahmen halten und diese umzusetzen. Die{" "}
            <a href="https://www.infektionsschutz.de/coronavirus/alltag-in-zeiten-von-corona.html">
              AHA + L + A Formel
            </a>{" "}
            fast die wichtigsten Infektionsschutzmaßnahmen zusammen: Abstand halten, Hygiene beachten (Händewaschen, in
            die Ellenbeuge niesen), Alltagsmaske (Mund-Nasen-Bedeckung) tragen und regelmäßiges Lüften sind sehr
            wichtig. Das weitere A steht für die
            <a href="https://www.bundesregierung.de/breg-de/themen/corona-warn-app">Corona-Warn-App</a>, welche
            Nutzerinnen und Nutzer der App über Kontakte zu infizierten Personen informiert.
          </Typography>
        </FaqAccordion>

        <FaqAccordion title="Was ist das Freundschaftsparadox?">
          <Typography style={{ width: "100%" }}>
            Der Kontakt-Index ist anschaulich mit dem sogenannten{" "}
            <a href="https://de.wikipedia.org/wiki/Freundschaftsparadox">Freundschaftsparadox</a> verbunden. Danach gilt
            für die meisten Menschen - z.B. in Facebook - dass ihre Freunde im Durchschnitt mehr Freunde haben als sie
            selbst. Das wiederum liegt daran, dass Personen mit vielen Freunden eine höhere Wahrscheinlichkeit haben,
            mit einer beliebigen Person X verbunden zu sein, als Personen, die wenige Freunde haben. Daher sind
            vereinfacht gesagt viele Freunde oder Kontakte von X Superkontakter. Diese Beobachtung macht sich auch in
            der Ausbreitung von Infektionskrankheiten bemerkbar. D.h. wenn ich jemanden anstecke, wird diese Person
            wahrscheinlich jemand mit vielen Kontakten sein. Also wird im Mittel nicht die mittlere Zahl der Kontakte
            angesteckt, sondern mehr als diese Zahl. Der Kontakt-Index übernimmt diese Abweichung.
          </Typography>
        </FaqAccordion>
      </section>
    </main>
  );
};
