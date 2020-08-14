import React from "react";
import { Checkbox, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";
import { QuestionFormComponentProps } from "./QuestionFormComponent";
import { isPrimitive } from "covquestions-js/primitive";

export const MultiSelect: React.FC<QuestionFormComponentProps> = ({
  currentQuestion,
  onChange,
  value: checkedValues,
}) => {
  const handleChange = (e: React.ChangeEvent<{ value: unknown; checked: boolean }>) => {
    const current = e.target.value;
    let values = checkedValues ? [...checkedValues] : [];
    if (e.target.checked) {
      if (isPrimitive(current)) {
        values.push(current);
      }
    } else {
      values = values.filter((value) => value !== current);
    }
    if (values.length > 0) {
      onChange(values);
    } else {
      onChange(undefined);
    }
  };

  const options = (currentQuestion.options || []).map(({ value, text }) => ({
    value,
    text,
    checked: checkedValues?.includes(value) ?? false,
  }));

  return (
    <FormGroup>
      <FormLabel component="legend">{currentQuestion.text}</FormLabel>
      {options.map((answer) => (
        <FormControlLabel
          key={answer.value}
          value={answer.value}
          control={<Checkbox name="checkedC" onChange={handleChange} checked={answer.checked} />}
          label={answer.text}
        />
      ))}
    </FormGroup>
  );
};
