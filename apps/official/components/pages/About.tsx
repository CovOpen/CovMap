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
          <Typography variant="h2">Was ist CovMap?</Typography>
          <Typography variant="body1">
            Kontaktbeschränkungen sind ein wesentlicher Grund dafür, weshalb sich das Coronavirus (SARS-CoV-2) nur langsam in Deutschland ausbreitet. Das Ziel von CovMap ist es, an den Umstand zu erinnern, dass jeder Bürger dabei helfen kann, Infektionen durch das eigene Verhalten zu vermeiden. Auf einer Deutschlandkarte stellen wir das aktuelle Kontaktverhalten pro Landkreis dar und bewerten es hinsichtlich des Risikos von neuen Infektionen.
          </Typography>
        </section>
          <section>
          <Typography variant="h2">Wie funktioniert CovMap?</Typography>
          <Typography variant="body1">
            CovMap wertet die frühestmöglichen Etappen einer Infektion aus: 1) dem Kontakt zwischen Menschen, bei dem das Coronavirus übertragen werden kann, und 2) dem Auftreten von Symptomen, die nach der Inkubationszeit auftreten können. Da das Coronavirus nicht bei jedem Kontakt übertragen wird und auch Symptome andere Ursachen als das Coronavirus haben können, werten wir große Datenmengen an GPS- und Symptomdaten aus, um Aussagen zur Wahrscheinlichkeit für das Auftreten von neuen Fällen in einem Landkreis treffen zu können.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Kann ich CovMap nutzen, ohne Daten von mir preiszugeben?</Typography>
          <Typography variant="body1">
            Die Erhebung Deiner Daten ist vollkommen freiwillig und Du kannst CovMap auch nutzen, ohne dass Du uns Deine Daten bereitstellst. Bitte bedenke, dass unser Dienst jedoch nur funktionieren kann, wenn ausreichend viele Menschen aktiv daran teilnehmen. Deine Daten werden anonym ausgewertet.
          </Typography>
          <div className="btn-group">
            <Button
              variant="contained"
              color="primary"
            >
              <Link style={{ textDecoration: 'none' }} to="/">
                Karte
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};
