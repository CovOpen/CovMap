import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { AppApi, InternalPages } from "state/app";
import { useThunkDispatch } from "useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../state";
import { triggerInstallPrompt } from "../state/thunks/triggerInstallPrompt"

import { Search } from './Search'
import { config } from "../../app-config/index"

const Logo = config.ui?.Logo

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
}));

export type NavBarProps = {
  showSearch: boolean;
}

export const NavBar = ({ showSearch }: NavBarProps) => {
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

  const handleInstall = () => {
    dispatch(triggerInstallPrompt())
    handleClose()
  }

  const selectPage = (pageId: string) => {
    dispatch(AppApi.gotoPage(pageId))
    handleClose()
  }

  const MenuEntries = () => {
    if (!config.content?.pages) {
      return null
    }

    return <>
      {config.content?.pages.map((page, key) => (
        <MenuItem key={key} className={classes.menuItem} onClick={() => selectPage(page.id)}>{page.title}</MenuItem>
      ))}
    </>
  }

  return (
    <AppBar position="static" style={{ position: 'relative', zIndex: 1200, touchAction: 'none' }}>
      <Toolbar style={{ height: 64 }}>
        {(Logo && <Logo />) || <img src={config.buildJSON.logoSrc} className={classes.logo} /> }
        {showSearch && < Search />}
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
              <MenuItem className={classes.menuItem} onClick={() => selectPage(InternalPages.MAP)}>Karte</MenuItem>
              <MenuEntries />
              {
                useSelector((state: State) => state.app.installPrompt) &&
                <MenuItem className={classes.menuItem} onClick={handleInstall}>App Installieren</MenuItem>
              }
            </div>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
