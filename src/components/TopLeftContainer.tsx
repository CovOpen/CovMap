import React, { PropsWithChildren } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1090,
    display: "flex",
    alignItems: "left",
  },
}));

export const TopLeftContainer = ({ children }: PropsWithChildren<{}>) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
