import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "src/state";
import { Search } from "./Search";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    zIndex: theme.zIndex.appBar + 1,
    position: "fixed",
    top: 0,
    right: "64px",
    height: "64px",
    display: "inline-flex",
    alignItems: "center",
    pointerEvents: "auto",
    [theme.breakpoints.down("xs")]: {
      left: "0px",
      right: "48px", // right on the edge of the hamburger menu button
    },
  },
}));

const FixedSearch = () => {
  const classes = useStyles();
  const datasetFound = useSelector((state: State) => state.app.datasetFound);

  return <div className={classes.searchContainer}>{datasetFound === false ? null : <Search />}</div>;
};

export default FixedSearch;
