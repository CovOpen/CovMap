import React from "react";
import { QuestionnaireExecution } from "../CovQuestions/QuestionnaireExecution"

import questionnaire from "../../static/covmap.json"


export const Questions = () => {
  return (
    <>
      <QuestionnaireExecution currentQuestionnaire={JSON.parse(JSON.stringify(questionnaire))}/>
    </>
  );
};
