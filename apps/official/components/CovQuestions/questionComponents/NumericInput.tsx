import React from "react";
import { Grid, Input, Slider, Typography } from "@material-ui/core";
import { QuestionFormComponentProps } from "./QuestionFormComponent";

export const NumericInput: React.FC<QuestionFormComponentProps> = ({ currentQuestion, onChange, value }) => {
  const { min, max, step, defaultValue } = currentQuestion.numericOption || {};
  const fallbackValue = defaultValue ?? min ?? max ?? 0;

  const handleSliderChange = (_e: React.ChangeEvent<{}>, newValue: number | number[]) => {
    onChange(typeof newValue === "number" ? newValue : fallbackValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleBlur = () => {
    if (min !== undefined && value < min) {
      onChange(min);
    } else if (max !== undefined && value > max) {
      onChange(max);
    }
  };

  return (
    <>
      <Typography id="discrete-slider-always" gutterBottom>
        {currentQuestion.text}
      </Typography>
      <Grid container item spacing={2} alignItems="center" xs={12}>
        <Grid item xs>
          <Slider
            value={value ?? fallbackValue}
            min={min}
            max={max}
            step={step}
            key={currentQuestion.id}
            onChange={handleSliderChange}
            aria-labelledby="discrete-slider-always"
          />
        </Grid>
        <Grid item xs>
          <Input
            data-testid={"NumericInput"}
            value={value ?? ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min,
              max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
