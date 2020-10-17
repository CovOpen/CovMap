import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(4),
      },
    },
  }),
);

export const Faq = () => {
  const classes = useStyles();
  return (
    <>
      <Container disableGutters maxWidth="sm" className={classes.root}>
        <Container>
          <Typography variant="h1">Fragen und Antworten zu CovMap!</Typography>
        </Container>
        <Container>
          <Typography variant="h2"><a href="#q1">Was ist CovMap?</a></Typography>
          <Typography variant="h2"><a href="#q2">Wie funktioniert CovMap?</a></Typography>
          <Typography variant="h2"><a href="#q3">Kann ich CovMap nutzen, ohne Daten von mir preiszugeben?</a></Typography>
        </Container>
        <Container>
          <Typography variant="h2"><a id="q1">Was ist CovMap?</a></Typography>
          <Typography variant="body1">
            Kontaktbeschränkungen sind ein wesentlicher Grund dafür, weshalb sich das Coronavirus (SARS-CoV-2) nur
            langsam in Deutschland ausbreitet. Das Ziel von CovMap ist es, an den Umstand zu erinnern, dass jeder Bürger
            dabei helfen kann, Infektionen durch das eigene Verhalten zu vermeiden. Auf einer Deutschlandkarte stellen
            wir das aktuelle Kontaktverhalten pro Landkreis dar und bewerten es hinsichtlich des Risikos von neuen
            Infektionen.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </Typography>
        </Container>
        <Container>
          <Typography variant="h2"><a id="q2">Wie funktioniert CovMap?</a></Typography>
          <Typography variant="body1">
            CovMap wertet die frühestmöglichen Etappen einer Infektion aus: 1) dem Kontakt zwischen Menschen, bei dem
            das Coronavirus übertragen werden kann, und 2) dem Auftreten von Symptomen, die nach der Inkubationszeit
            auftreten können. Da das Coronavirus nicht bei jedem Kontakt übertragen wird und auch Symptome andere
            Ursachen als das Coronavirus haben können, werten wir große Datenmengen an GPS- und Symptomdaten aus, um
            Aussagen zur Wahrscheinlichkeit für das Auftreten von neuen Fällen in einem Landkreis treffen zu können.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </Typography>
        </Container>

        <Container>
          <Typography variant="h2"><a id="q3">Kann ich CovMap nutzen, ohne Daten von mir preiszugeben?</a></Typography>
          <Typography variant="body1">
            Die Erhebung Deiner Daten ist vollkommen freiwillig und Du kannst CovMap auch nutzen, ohne dass Du uns Deine
            Daten bereitstellst. Bitte bedenke, dass unser Dienst jedoch nur funktionieren kann, wenn ausreichend viele
            Menschen aktiv daran teilnehmen. Deine Daten werden anonym ausgewertet.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </Typography>
          <div className="btn-group">
            <Button variant="contained" color="primary">
              <Link style={{ textDecoration: "none" }} to="/">
                Karte
              </Link>
            </Button>
          </div>
        </Container>
      </Container>
    </>
  );
};
