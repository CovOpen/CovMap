import React from "react";
import { TextField, Typography } from "@material-ui/core";
import { QuestionFormComponentProps } from "./QuestionFormComponent";
import { dateInSecondsTimestamp } from "../../utils/date";

export const DatePicker: React.FC<QuestionFormComponentProps> = ({ currentQuestion, onChange, value }) => {
  // If the caller send a string date, like 2020-03-25, we should also return a string date.
  const callerExpectsStringDate = typeof value === "string";

  const handleChange = (e: any) => {
    if (callerExpectsStringDate) {
      onChange(e.target.value);
    } else {
      const dateInSeconds = dateInSecondsTimestamp(e.target.value);
      if (isNaN(dateInSeconds)) {
        onChange(undefined);
      } else {
        onChange(dateInSeconds);
      }
    }
  };

  const controlledValue = callerExpectsStringDate
    ? value
    : value !== undefined
    ? new Date(value * 1000).toISOString().slice(0, 10)
    : "";

  return (
    <>
      <Typography id="date-picker-inline" gutterBottom>
        {currentQuestion.text}
      </Typography>
      <TextField
        id="date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        value={controlledValue}
      />
    </>
  );
};
