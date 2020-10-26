import React from "react";
import Typography from "@material-ui/core/Typography";
import { NavigationTitle } from "app-config/components/NavigationTitle";

export const Imprint = () => {
  return (
    <>
      <main className="sections">
        <section>
          <NavigationTitle title={"Impressum"} />
        </section>
        <section>
          <Typography variant="h2">Anbieter</Typography>
          <Typography variant="body1">Charité – Universitätsmedizin Berlin</Typography>
          <Typography variant="body1">Zentrale Postanschrift: Charitéplatz 1, 10117 Berlin</Typography>
          <Typography variant="body1">
            Die Charité – Universitätsmedizin Berlin ist eine Körperschaft des Öffentlichen Rechts. Sie wird durch den
            Vorstandsvorsitzenden gesetzlich vertreten.
          </Typography>
        </section>
        <section>
          <Typography variant="h2">Kontakt</Typography>
          <Typography variant="body1">
            Für Hinweise, Lob und Kritik schreiben Sie uns bitte eine E-Mail an:{" "}
            <a href="mailto:covmap@charite.de">covmap@charite.de</a>
          </Typography>
          <Typography variant="body1">
            Internet:{" "}
            <a href="https://www.charite.de" target="_blank" rel="noreferrer">
              https://www.charite.de
            </a>
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Verantwortlicher im Sinne des Medienrechts</Typography>
          <Typography variant="body1">
            Prof. Dr. Heyo K. Kroemer, der Vorstandsvorsitzende der Charité – Universitätsmedizin Berlin
          </Typography>
          <Typography variant="body1">Verantwortlich für Inhalte:</Typography>
          <Typography variant="body1">Projektleitung CovMap: Dr. med. Alexander H. Thieme, M.Sc.</Typography>
          <Typography variant="body1">Das gesamte Team:</Typography>
          <Typography variant="body1">
            Dr. Thieme (Charité), Dr. Mittermaier (Charité), Dr. Gertler (Charité), Prof. Dr. Lippert (HPI), Dr.
            Konigorski (HPI), Dr. Edelmann (HPI), PD. Dr. Rüdiger (NET CHECK), Hr. Zernick (NET CHECK)
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Zuständige Aufsichtsbehörde</Typography>
          <Typography variant="body1">
            Der Regierende Bürgermeister von Berlin – inkl. Wissenschaft und Forschung
          </Typography>
          <Typography variant="body1">
            Kontakt:{" "}
            <a href="https://www.berlin.de/rbmskzl/" target="_blank" rel="noreferrer">
              https://www.berlin.de/rbmskzl/
            </a>
          </Typography>
          <Typography variant="body1">Senatsverwaltung für Gesundheit, Pflege und Gleichstellung</Typography>
          <Typography variant="body1">
            Kontakt:{" "}
            <a href="https://www.berlin.de/sen/gpg/" target="_blank" rel="noreferrer">
              https://www.berlin.de/sen/gpg/
            </a>
          </Typography>
          <Typography variant="body1">Umsatzsteuer-Identifikationsnummer: DE 228847810</Typography>
        </section>
      </main>
    </>
  );
};
