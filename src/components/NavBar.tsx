import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppApi } from "src/state/app";
import { useThunkDispatch } from "src/useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../state";
import { triggerInstallPrompt } from "../state/thunks/triggerInstallPrompt";
import * as clipboard from "clipboard-polyfill";

import { Search } from "./Search";
import { config } from "app-config/index";

const Logo = config.ui?.Logo;

const useStyles = makeStyles((theme) => ({
  title: {
    flexShrink: 1,
  },
  menuItem: {
    touchAction: "none",
    paddingLeft: 0,
  },
  menuIcon: {
    padding: 0,
  },
  menu: {
    touchAction: "none",
  },
  menuContent: {
    backgroundColor: theme.palette.primary.light,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  logo: {
    height: "32px",
    width: "auto",
    marginTop: "9px",
  },
}));

export type NavBarProps = {
  showSearch: boolean;
};

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
    handleClose();
    dispatch(triggerInstallPrompt());
  };

  const handleShare = async () => {
    handleClose();
    try {
      await (window.navigator as any).share({
        title: "CovMap",
        url: "https://" + window.location.hostname,
      });
    } catch (err) {
      clipboard.writeText("https://" + window.location.hostname);
      dispatch(AppApi.setSnackbarMessage({ text: "Link in Zwischenablage kopiert", type: "info" }));
    }
  };

  const MenuEntries = (props) => {
    if (!config.content?.pages) {
      return null;
    }

    return (
      <>
        {config.content?.pages.map((page) => (
          <Link key={page.id} style={{ textDecoration: "none" }} to={page.route}>
            <MenuItem className={classes.menuItem} onClick={props.handleClose}>
              {page.title}
            </MenuItem>
          </Link>
        ))}
      </>
    );
  };

  return (
    <AppBar position="relative" style={{ height: 64, flex: "0 0 auto" }}>
      <Toolbar>
        {(Logo && <Logo />) || <img src={config.buildJSON.logoSrc} className={classes.logo} />}
        {showSearch && <Search />}
        <div>
          <IconButton
            classes={{
              root: classes.menuIcon,
            }}
            aria-label="Main Menu"
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
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <div className={classes.menuContent}>
              <Link key="map" style={{ textDecoration: "none" }} to="/">
                <MenuItem className={classes.menuItem} onClick={handleClose}>
                  Karte
                </MenuItem>
              </Link>
              <MenuEntries handleClose={handleClose} />
              {useSelector((state: State) => state.app.installPrompt) && (
                <div>
                  <Divider />
                  <MenuItem className={classes.menuItem} onClick={handleInstall}>
                    App Installieren
                  </MenuItem>
                </div>
              )}
              <Divider />
              <MenuItem className={classes.menuItem} onClick={handleShare}>
                Share <ShareIcon className={classes.menuIcon} />
              </MenuItem>
            </div>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
