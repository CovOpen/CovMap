import React from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import type { AppPage } from "../app-config.types";

const useStyles = makeStyles((theme) => ({
  outerPageDiv: {
    zIndex: 1095,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    flexShrink: 0,
    overflow: "hidden",
    paddingTop: "64px",
    [theme.breakpoints.down("xs")]: {
      // on mobile devices
      paddingTop: "0 !important",
    },
  },
  innerPageDiv: {
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
}));

export const RenderPageRoute = ({ page }: { page: AppPage }) => {
  const classes = useStyles();

  return (
    <Route
      path={page.route}
      key={page.id}
      component={() => (
        <div className={classes.outerPageDiv}>
          <div className={classes.innerPageDiv}>
            <page.Component />
          </div>
        </div>
      )}
      style={{ flex: "1 1 auto", position: "absolute" }}
    />
  );
};
