import React from "react";
import Typography from "@material-ui/core/Typography";

const SymptomLevel = () => {
    return (
        <main className="sections">
            <section>
                <Typography variant="h1" align="center">Symptomlast</Typography>
            </section>
            <section>
                <Typography>
                    Welche Vorteile ergeben sich durch die Auswertung des Kontaktverhaltens und der Symptomlast der Bevölkerung?
                    Damit das Virus übertragen werden kann, müssen sich Menschen begegnen. Wenige Tage nach der Infektion berichten viele infizierte Personen über Symptome. Damit stellen der Kontakt zwischen Menschen und das Bemerken von Symptomen die zwei frühesten beobachtbaren Ereignisse einer Infektion dar. Und genau da setzt unser Projekt an.
                    Wir charakterisieren aus anonymisierten Smartphone-Daten (ermittelt aus GPS Daten) das Kontaktverhalten. Des weiteren werten wir selbstberichtete Symptome aus. Nun ist es so, dass nicht jeder Kontakt zu einer Virusübertragung führt und auch Symptome nicht beweisend für eine Infektion mit dem Coronavirus sind. Wertet man jedoch die Daten von vielen Personen aus, dann erreicht man dadurch erstens eine Anonymisierung und man kann mit diesen Daten eine Prognose der zukünftigen Fallzahlen erstellen.
                    Der von uns entwickelte Kontakt-Index ist aktueller als die 7-Tages-Inzidenz und quasi ein Frühwarnsystem. Er gibt die Anzahl der durchschnittlichen Kontakte pro Person und Region in den letzten 24h Stunden an. In ersten Analysen konnten wir zeigen, dass eine hohe Anzahl an Kontakten mit einem vermehrten Infektionsgeschehen korreliert (LINK Publikation: https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2). Auch die Messung der Symptomlast wurde von uns entwickelt. Steigt in einer Region die Zahl der gemeldeten Symptome, fließt dies in unsere Risikoanalyse ein. Zeitlich ist die Symptomlast als Prädiktor für das Infektionsgeschehen zwischen Kontakt-Index und 7-Tages-Inzidenz einzuordnen.
                    Der große Vorteil der Auswertung von Kontakten und Symptomen liegt darin, dass die Daten ohne Verzögerung analysiert werden können und daher ohne den Meldeverzug der offiziellen RKI Daten zur Verfügung stehen. Dadurch können wir die Bevölkerung schneller auf die Möglichkeit eines erhöhten regionalen Risikos hinweisen.
                </Typography>
            </section>
        </main>
    );
};

export default SymptomLevel