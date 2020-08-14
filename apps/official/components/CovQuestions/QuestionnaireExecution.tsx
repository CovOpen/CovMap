import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography, makeStyles, createStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Question, QuestionnaireEngine, Result } from "covquestions-js";
import { ResultComponent } from "./ResultComponent";
import { QuestionComponent } from "./QuestionComponent";
import { Questionnaire } from "covquestions-js/models/Questionnaire.generated";
import { Primitive } from "covquestions-js/primitive";

type QuestionnaireExecutionProps = {
  currentQuestionnaire: Questionnaire;
  isJsonInvalid: boolean;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
    },
    paddingRight: {
      paddingLeft: 12,
    },
    execution: {
      height: "calc(60vh - 56px - 48px)",
      overflow: "auto",
    },
    internalState: {
      backgroundColor: "#F7FAFC",
      border: "1.5px solid #CBD5E0",
      borderRadius: 6,
      boxSizing: "border-box",
      boxShadow: "none",
      fontFamily: "Dosis",
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: "0.1rem",
      padding: 10,
      opacity: 0.6,
      overflow: "auto",
    },
    internalStateHeadline: {
      color: "#A0AEC0",
      fontFamily: "Dosis",
      fontWeight: 500,
      fontSize: 14,
      lineHeight: "17px",
      letterSpacing: "0.1em",
      opacity: 0.8,
      textTransform: "uppercase",
    },
  })
);

export const QuestionnaireExecution: React.FC<QuestionnaireExecutionProps> = ({
  currentQuestionnaire,
  isJsonInvalid,
}) => {
  const [questionnaireEngine, setQuestionnaireEngine] = useState(new QuestionnaireEngine(currentQuestionnaire));
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(undefined);
  const [result, setResult] = useState<Result[] | undefined>(undefined);
  const [doRerender, setDoRerender] = useState(false);

  const classes = useStyles();

  function restartQuestionnaire() {
    const engine = new QuestionnaireEngine(currentQuestionnaire);
    const nextQuestion = engine.nextQuestion();

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

  useEffect(restartQuestionnaire, [currentQuestionnaire]);

  useEffect(() => {
    if (doRerender) {
      setDoRerender(false);
    }
  }, [doRerender]);

  return doRerender ? (
    <></>
  ) : (
    <div className={classes.root}>
      <Grid container item xs={12} className={`${classes.paddingRight} grid-row`} justify="flex-end">
        <Button onClick={restartQuestionnaire} variant="contained" color="secondary">
          Restart Questionnaire
        </Button>
      </Grid>
      {isJsonInvalid ? (
        <Grid item xs={12} className={`${classes.paddingRight} grid-row`}>
          <Alert severity="warning">Cannot load questionnaire. JSON is invalid!</Alert>
        </Grid>
      ) : null}
      <Grid item xs={12} className={`${classes.paddingRight} grid-row ${classes.execution}`}>
        {result === undefined && currentQuestion ? (
          <QuestionComponent currentQuestion={currentQuestion} handleNextClick={handleNextClick} />
        ) : null}
        {result !== undefined ? <ResultComponent result={result} /> : null}
      </Grid>
      <Grid item xs={12} className={`${classes.paddingRight} grid-row`}>
        {questionnaireEngine ? (
          <>
            <Typography className={classes.internalStateHeadline}>Internal state</Typography>
            <Paper
              className={classes.internalState}
              style={{ height: `calc(40vh - 37px - ${isJsonInvalid ? 58 : 0}px)` }}
            >
              <Box style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(questionnaireEngine.getDataObjectForDeveloping(), null, 2)}
              </Box>
            </Paper>
          </>
        ) : null}
      </Grid>
    </div>
  );
};
