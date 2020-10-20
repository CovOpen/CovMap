import React from "react";
import Typography from "@material-ui/core/Typography";

const ContactBehavior = () => {
    return (
        <main className="sections">
            <section>
                <Typography variant="h1" align="center">Kontakverhalten</Typography>
            </section>
            <section>
                <Typography>
                    Was genau ist der Kontakt-Index?
                    Wir konnten zeigen (LINK Publikation: https://www.medrxiv.org/content/10.1101/2020.10.02.20188136v2), dass der Kontakt-Index eine hohe Korrelation mit dem 7-Tage R-Wert (Reproduktionszahl R) aufweist.
                    Der R-Wert ist eine wichtige Maßzahl zur Steuerung der Corona Maßnahmen. Er besagt, wie viele Personen von einer infizierten Person im Durchschnitt angesteckt werden. Wenn der R Wert 1 beträgt, bedeutet dies, dass eine infizierte Person eine weitere ansteckt. Ziel ist es den R Wert unter 1 zu bekommen, einer infizierte Person also im Durchschnitt weniger als eine Person ansteckt.
                    Die Berechnung des R-Wertes ist jedoch nicht ganz so einfach und zur Berechnung greift das RKI auf die sogenannte „Nowcast“ Model zurück. Da der R-Wert stärkeren Schwankungen unterliegt, hat das RKI eine Methode entwickelt, um den 7-Tage R-Wert zu berechnen und somit den R-Wert zu glätten (LINK RKI: https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Projekte_RKI/R-Wert-Erlaeuterung.pdf?__blob=publicationFile) . Das Problem des R-Werts und des 7-Tage R-Wert Wertes ist es, dass das Infektionsgeschehen von vor 7-10 Tagen abgebildet wird (wenn sich jemand infiziert hat dauert es einige Tage, bis man Symptome entwickelt und sich testen lässt, das Testergebnis liegt nicht sofort vor und die Meldung an das Gesundheitsamt benötigt auch Zeit). Der Vorteil unseres Kontakt-Index ist, dass die Auswertung von Kontakten ohne Verzögerung analysiert werden kann und daher ohne den Meldeverzug der offiziellen RKI Daten zur Verfügung steht. Dadurch können wir die Bevölkerung schneller auf die Möglichkeit eines erhöhten regionalen Risikos hinweisen.
                    Wenn der Kontakt-Index über 50 liegt, entspricht dies einem 7-Tage R-Wert von über 1 und es besteht dringlicher Handlungsbedarf die Kontakte wieder zu reduzieren, um das Infektionsgeschehen wieder einzudämmen. Liegt der Kontakt-Index hingegen unter 1, entspricht dies einem 7-Tage R-Wert von unter 1.
                </Typography>

                <Typography>
                    {
                        `
                        Kontaktindex ausreichend reduziert: Das Kontaktverhalten ist ausreichend reduziert (Kontakt-Index > 50). Wir müssen aber weiter wachsam sein, Kontakte auf das Nötigste minimieren und uns an die AHA+L Regeln halten.
                        Kontaktindex zu hoch: Achtung, das Kontaktverhalten ist zu hoch (Kontakt-Index > 50), es besteht sofortiger Handlungsbedarf, damit die Zunahme der Neuinfektionen gestoppt wird. Hilf mit! Beschränke alle Kontakte auf das absolute Minimum und halte Dich an die AHA+L Regeln!
                        `
                    }
                </Typography>
            </section>
        </main>
    );
};

export default ContactBehavior