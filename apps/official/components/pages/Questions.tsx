import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {QuestionnaireExecution} from "../CovQuestions/QuestionnaireExecution"

import questionnaire from "../../static/questionnaire.json"


export const Questions = () => {
  return (
    <>
      <QuestionnaireExecution 
                  currentQuestionnaire={JSON.parse(JSON.stringify(questionnaire))}
                  isJsonInvalid={false}/>
    </>
  );
};
