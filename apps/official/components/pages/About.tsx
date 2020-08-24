import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">About CovMap</Typography>
        </section>
        <section>
          <Typography variant="h2">Was ist CovMap?</Typography>
          <Typography variant="body1">
            Dad momentane Kontaktverhalten ist ein wesentlicher Grund dafür, weshalb sich das Coronavirus (SARS-CoV-2) nur langsam in Deutschland ausbreiten kann. Das Ziel von CovMap ist es, an den Umstand zu erinnern, dass jeder Bürger dabei helfen kann, Infektionen durch das eigene Verhalten zu vermeiden. Auf einer Deutschlandkarte stellen wir das momentane Kontaktverhalten pro Landkreis dar und bewerten es hinsichtlich des Risikos von neuen Infektionen.
          </Typography>
          <Typography variant="body1">
            Ein weiteres Ziel von CovMap ist es, lokale Ausbrüche des Virus möglichst frühzeitig zu erkennen.
          </Typography>
        </section>
          <section>
          <Typography variant="h2">Wie funktioniert CovMap?</Typography>
          <Typography variant="body1">
            CovMap wertet die frühestmöglichen Etappen eine Viruserkrankung aus: dem Kontakt, bei dem das Virus übertragen wird, und dem Auftreten von Symptomen. Hierzu werten wir große Datenmengen an GPS- und Symptomdaten der Bevölkerung aus.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Kann ich CovMap nutzen, ohne Daten preiszugeben?</Typography>
          <Typography variant="body1">
            Die Erhebung Deiner Daten ist vollkommen freiwillig und Du kannst die Karte von CovMap auch nutzen, ohne dass Du uns Deine Daten bereitstellst. Bitte bedenke, dass unser Dienst jedoch nur funktionieren kann, wenn ausreichend viele Menschen aktiv daran teilnehmen.
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
