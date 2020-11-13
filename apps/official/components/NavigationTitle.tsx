import React from "react";
import { Box, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useQueryPreservingHistoryPush } from "app-config/components/customHistoryHooks";

export const NavigationTitle: React.FC<{ title: string; backToExpandedFeatureInfo?: boolean }> = (props) => {
  const customHistoryPush = useQueryPreservingHistoryPush();

  return (
    <Box display="flex" flex={1} alignItems="center" style={{ marginTop: "8px", width: "100%" }}>
      <ArrowBackIosIcon
        style={{ textDecoration: "none", cursor: "pointer", padding: "8px" }}
        aria-label="go back to map"
        onClick={() => customHistoryPush("/", { expanded: props.backToExpandedFeatureInfo ? "true" : undefined })}
        color="action"
      />
      <Typography variant="h1">{props.title}</Typography>
    </Box>
  );
};
