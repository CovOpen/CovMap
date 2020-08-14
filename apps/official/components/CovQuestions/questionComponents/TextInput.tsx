import React from "react";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { QuestionFormComponentProps } from "./QuestionFormComponent";

export const TextInput: React.FC<QuestionFormComponentProps> = ({ currentQuestion, onChange, value }) => {
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
      <FormLabel component="legend">{currentQuestion.text}</FormLabel>
      <TextField id={currentQuestion.id} autoFocus={true} onChange={handleChange} value={value ?? ""} />
    </FormControl>
  );
};
