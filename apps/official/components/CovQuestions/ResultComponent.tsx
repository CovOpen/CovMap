import React from "react";
import { Result } from "covquestions-js";
import { Paper, Typography } from "@material-ui/core";

export const ResultComponent: React.FC<{ result: Result[] }> = ({ result }) => {
  return (
    <Paper style={{ color: "red", padding: "20px" }}>
      {result.length > 0 ? (
        result.map((it) => (
          <Typography key={it.resultCategory.id}>
            {it.resultCategory.description}: {it.result.text}
          </Typography>
        ))
      ) : (
        <Typography>No result applies</Typography>
      )}
    </Paper>
  );
};
