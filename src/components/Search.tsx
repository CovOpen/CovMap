import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { switchViewToPlace } from "../state/thunks/handleSearchQuery";
import Snackbar from '@material-ui/core/Snackbar';
import { useSelector } from "react-redux";
import { useThunkDispatch } from "useThunkDispatch";
import { fade } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import { AppApi } from "../state/app";
import { State } from "../state";

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.85),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.95),
    },
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const Search = () => {
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const hasSearchError = (useSelector((state: State) => state.app.hasSearchError))
  
  const handleSearch = (event) => {
    const location = event.target.value; 
    dispatch(switchViewToPlace(location, () => {
      console.log("the location wasnt found");
      //dispatch(AppApi.setErrorStateSearch(false));
    }));
  }

  return <>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onKeyPress = {(e) => {
          if (e.key === 'Enter') {
            {handleSearch(e)};
          }
        }}
        type = 'text'
        placeholder="PLZ oder Wohnort..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={hasSearchError}
        autoHideDuration={6000}
        message="Bitte die Eingabe überprüfen. <br /> Ortschaft konnte nicht gefunden werden."
        onClose = {() => {
          dispatch(AppApi.setErrorStateSearch(false))
        }}
      />
    </div>
  </>
}