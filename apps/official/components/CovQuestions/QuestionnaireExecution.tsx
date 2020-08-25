import React, { useEffect, useState } from "react";
import { createStyles, Button, Grid, makeStyles } from "@material-ui/core";
import { Question, QuestionnaireEngine, Result } from "covquestions-js";
import { ResultComponent } from "./ResultComponent";
import { QuestionComponent } from "./QuestionComponent";
import { Questionnaire } from "covquestions-js/models/Questionnaire.generated";
import { Primitive } from "covquestions-js/primitive";

type QuestionnaireExecutionProps = {
  currentQuestionnaire: Questionnaire;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      padding: "48px 24px 24px 24px"
    },
    execution: {
      maxHeight: "calc(100vh - 48px - 24px)",
      maxWidth: "600px",
      overflow: "auto",
    },
  })
);

export const QuestionnaireExecution: React.FC<QuestionnaireExecutionProps> = ({
  currentQuestionnaire,
}) => {
  const [questionnaireEngine, setQuestionnaireEngine] = useState(new QuestionnaireEngine(currentQuestionnaire));
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(undefined);
  const [result, setResult] = useState<Result[] | undefined>(undefined);
  const [showResult, setShowResult] = useState(false);
  const [doRerender, setDoRerender] = useState(false);

  const classes = useStyles();

  function restartQuestionnaire() {
    const engine = new QuestionnaireEngine(currentQuestionnaire);
    const nextQuestion = engine.nextQuestion();

    setShowResult(false);
    setResult(undefined);
    setQuestionnaireEngine(engine);
    setCurrentQuestion(nextQuestion);
    setDoRerender(true);
  }

  function handleNextClick(value: Primitive | Array<Primitive> | undefined) {
    questionnaireEngine.setAnswer(currentQuestion!.id, value);

    const nextQuestion = questionnaireEngine.nextQuestion();
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      setCurrentQuestion(undefined);
      setResult(questionnaireEngine.getResults());
    }
  }

  function submitAnswersAndShowResult() {
  	// TODO submit answers
    setShowResult(true);
  }

  useEffect(restartQuestionnaire, [currentQuestionnaire]);

  useEffect(() => {
    if (doRerender) {
      setDoRerender(false);
    }
  }, [doRerender]);

  return doRerender ? (
    <></>
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.execution}>
        {result === undefined && currentQuestion && (
          <QuestionComponent currentQuestion={currentQuestion} handleNextClick={handleNextClick}/>
        )}
        {result !== undefined && showResult && (<ResultComponent result={result}/>)}
        {result !== undefined && !showResult && (
          <Grid container justify="space-evenly">
            <Button onClick={() => setShowResult(true)} variant="outlined" color="secondary">Nur Ergebnis anzeigen</Button>
            <Button {() => submitAnswersAndShowResult()} variant="contained" color="secondary">Ergebnis abschicken und anzeigen</Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
