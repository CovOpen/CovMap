import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { AppApi, Step } from "state/app";
import { useThunkDispatch } from "useThunkDispatch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
  }
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
        <Typography variant="h6" className={classes.title}>
          <img src="/logo.svg" className={classes.logo} />
        </Typography>
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
