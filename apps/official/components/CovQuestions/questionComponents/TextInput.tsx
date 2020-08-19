import React from "react";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { QuestionFormComponentProps } from "./QuestionFormComponent";
import { useStyles } from "app-config/components/CovQuestions/QuestionComponent";

export const TextInput: React.FC<QuestionFormComponentProps> = ({ currentQuestion, onChange, value }) => {
  const classes = useStyles();

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value.trim() === "") {
      onChange(undefined);
    } else {
      onChange(value);
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend"  className={classes.questionText}>{currentQuestion.text}</FormLabel>
      <TextField id={currentQuestion.id} autoFocus={true} onChange={handleChange} value={value ?? ""} />
    </FormControl>
  );
};
