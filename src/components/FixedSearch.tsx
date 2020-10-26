import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
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
    [theme.breakpoints.down("xs")]: {
      left: "0px",
      right: "48px", // right on the edge of the hamburger menu button
    },
  },
}));

const FixedSearch = () => {
  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      <Search />
    </div>
  );
};

export default FixedSearch;
