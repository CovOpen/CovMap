import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { switchViewToPlace, getPossibleSearchResults } from "../state/thunks/handleSearchQuery";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "src/useThunkDispatch";
import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { useTranslation } from "react-i18next";

import { State } from "../state";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.appBar + 1, // on top of appBar
    padding: theme.spacing(0, 2),
    /* marginLeft: "auto", */
    [theme.breakpoints.down("xs")]: {
      // on mobile devices
      flex: 1,
    },
  },
  search: {
    "position": "relative",
    "borderRadius": theme.shape.borderRadius,
    "backgroundColor": fade(theme.palette.common.white, 0.85),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.95),
    },
    [theme.breakpoints.down("xs")]: {
      // on mobile devices
      boxShadow: "0px 2px 5px -1px rgba(0,0,0,0.55)",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  listbox: {
    "borderRadius": `0 0 ${theme.shape.borderRadius} ${theme.shape.borderRadius}`,
    "margin": 0,
    "position": "absolute",
    "listStyle": "none",
    "backgroundColor": theme.palette.common.white,
    "overflow": "auto",
    "zIndex": 100000,
    "maxHeight": "200px",
    "fontFamily": theme.typography.fontFamily,
    "color": "inherit",
    "minWidth": "200px",
    "boxShadow": "0px 2px 5px -1px rgba(0,0,0,0.55)",
    "& li": {
      padding: theme.spacing(0, 1),
      lineHeight: "42px",
    },
    '& li[data-focus="true"]': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

type Possibilities = {
  results: Array<any>;
};

export const Search = ({ className = "" }: { className?: string }) => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation(["translation"]);
  const classes = useStyles();
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const placeholder = currentLayerGroup.search?.placeholder;
  const [possibilities, setPossibilities] = useState<Possibilities>(() => ({
    results: [],
  }));

  const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } = useAutocomplete({
    id: "autocomplete",
    options: possibilities.results.map((result) => result.name),
    getOptionLabel: (option) => option,
    onChange: (event, value) => {
      dispatch(switchViewToPlace(value));
    },
    blurOnSelect: true,
  });

  const handleSearch = (event) => {
    event.persist();
    const location = event.target.value;
    dispatch(
      switchViewToPlace(
        location,
        () => {
          event.target.blur();
        },
        () => {
          console.log("the location wasnt found");
        },
      ),
    );
  };

  return (
    <div className={`${classes.root} ${className}`}>
      <div {...getRootProps()} className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              {
                handleSearch(e);
              }
            }
          }}
          type="text"
          placeholder={typeof placeholder === "function" ? placeholder(t) : placeholder || "Suche"}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search", ...getInputProps() }}
          onFocus={() => setPossibilities(() => dispatch(getPossibleSearchResults()))}
        />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            return (
              <li {...getOptionProps({ option, index })} key={index}>
                {option}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
