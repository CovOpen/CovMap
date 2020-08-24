import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">About</Typography>
        </section>
        <section>
          <Typography variant="h2">Was ist CovMap?</Typography>
          <Typography variant="body1">
            Unser momentanes Kontaktverhalten ist ein wesentlicher Grund, warum sich das Coronavirus (SARS-CoV-2) nur langsam in Deutschland ausbreiten kann. Das Ziel von CovMap ist es, an den Umstand zu erinnern, dass jeder Bürger dabei helfen kann, Infektionen durch Kontaktbeschränkugen zu vermeiden. Auf einer Deutschlandkarte wird pro Landkreis das momentane Kontaktverhalten der Bevölkerung dargestellt.
          </Typography>
          <Typography variant="body1">
            Ein weiteres Ziel von CovMap ist es, lokale Ausbrüche des Virus möglichst frühzeitig zu detektieren.
          </Typography>
        </section>
          <section>
          <Typography variant="h2">Wie funktioniert CovMap?</Typography>
          <Typography variant="body1">
            CovMap wertet Daten zu den frühestmöglichen Etappen der Viruserkrankung aus: dem Kontakt zwischen Menschen, bei dem das Virus übertragen werden kann, und dem Auftreten von Symptomen. Hierzu werten wir GPS- und selbstberichtete Symptome der Bevölkerung anonym aus.
          </Typography>
        </section>

        <section>
          <Typography variant="h2">Kann ich CovMap nutzen, ohne Daten preiszugeben?</Typography>
          <Typography variant="body1">
            Die Erhebung Deiner Daten ist vollkommen freiwillig und Du kannst die CovMap Karte auch nutzen, ohne dass Du uns Deine Daten bereitstellst. Bitte bedenke, dass unser Dienst jedoch nur funktionieren kann, wenn ausreichend viele Menschen aktiv daran teilnehmen.
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
