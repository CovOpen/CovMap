import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { AppApi, Step } from "state/app";
import { useThunkDispatch } from "useThunkDispatch";
import SearchIcon from '@material-ui/icons/Search';
import { fade} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import { AnimatedLogo } from "./AnimatedLogo";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    paddingRight: 10,
    marginRight: theme.spacing(2),
  },
  title: {
    flexShrink: 1
  },
  menuItem: {
    touchAction: 'none'
  },
  menu: {
    touchAction: 'none',
  },
  menuContent: {
    backgroundColor: theme.palette.primary.light
  },
  logo: {
    height: '32px', 
    width: 'auto', 
    marginTop: '9px'
  },
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

export const NavBar = () => {
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <AppBar position="static" style={{ position: 'relative', zIndex: 1200, touchAction: 'none' }}>
      <Toolbar style={{ height: 64 }}>
        <AnimatedLogo />
        <Typography variant="h6" className={classes.title}>
          <img src="/logo.svg" className={classes.logo} />
        </Typography>

        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="PLZ oder Wohnort..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
        </div>

        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          
          <Menu
            className={classes.menu}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <div className={classes.menuContent}>
              <MenuItem className={classes.menuItem} onClick={() => dispatch(AppApi.gotoStep(Step.Welcome))}>Start</MenuItem>
              <MenuItem className={classes.menuItem} onClick={() => dispatch(AppApi.gotoStep(Step.Map))}>Karte</MenuItem>
              <MenuItem className={classes.menuItem} onClick={() => dispatch(AppApi.gotoStep(Step.About))}>About</MenuItem>
              <MenuItem className={classes.menuItem} onClick={() => dispatch(AppApi.gotoStep(Step.Imprint))}>Impressum</MenuItem>
            </div>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
