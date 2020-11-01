import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppApi } from "src/state/app";
import { useThunkDispatch } from "src/useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../state";
import { triggerInstallPrompt } from "../state/thunks/triggerInstallPrompt";
import * as clipboard from "clipboard-polyfill";
import { useTranslation } from "react-i18next";

import { config } from "app-config/index";
import { Drawer, useMediaQuery, Typography } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import { VERSION, HASH_LONG, HASH_SHORT } from "src/version";
import FixedSearch from "./FixedSearch";
import { welcomeStepsConfig } from "./WelcomeStepsModal/welcomeStepsConfig";
import GithubIcon from "src/../static/images/social-github.svg";
import TwitterIcon from "src/../static/images/social-twitter.svg";
// import InstagramIcon from "src/../static/images/social-instagram.svg";
// import FacebookIcon from "src/../static/images/social-facebook.svg";
import { usePathPreservingQueryChange } from "app-config/components/customHistoryHooks";

const Logo = config.ui?.Logo;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    [theme.breakpoints.down("xs")]: {
      // on mobile devices
      backgroundColor: "transparent",
      boxShadow: "none",
      pointerEvents: "none",
    },
  },
  title: {
    flexShrink: 1,
  },
  menuItem: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(1),
  },
  menuIcon: {
    // share icon
    padding: 0,
    margin: theme.spacing(0, 1),
  },

  menuContent: {
    paddingBottom: theme.spacing(4),
  },
  drawerScrollContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "auto",
  },
  logo: {
    height: "32px",
    width: "auto",
  },
  version: {
    fontSize: "12px",
    margin: "auto",
    marginBottom: "10px",
    marginTop: 0,
  },
  drawer: {
    pointerEvents: "auto",
    height: "100%",
  },
  drawerPaper: {
    height: "100%",
    width: "20rem",
    maxWidth: "70vw",
    display: "flex",
    overflow: "hidden",
  },

  fullHeightToolbar: {
    minHeight: "64px",
  },
  socialIcons: {
    margin: "0 auto",
    marginTop: "auto",
  },
  drawerIcon: {
    "margin": theme.spacing(4, "auto"),
    "& > svg": {
      height: "50px",
    },
  },
}));

export const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // some wierd bug makes every logo disappear when one logo has a display: none style
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const { t } = useTranslation(["translation", "common"]);
  const urlParams = useParams<{ subPage?: string }>();
  const location = useLocation();
  const history = useHistory();
  const pushQueryChange = usePathPreservingQueryChange();

  const isMenuOpen: boolean = new URLSearchParams(location.search).has("isMenuOpen");

  const handleOpenMenu = () => {
    pushQueryChange({ isMenuOpen: "true" });
  };

  const handleCloseMenu = () => {
    if (history.length > 1) {
      history.goBack();
    } else {
      pushQueryChange({ isMenuOpen: undefined });
    }
  };

  const handlePageEntryClick = (link: string) => {
    history.replace(link);
  };

  const handleInstall = () => {
    handleCloseMenu();
    dispatch(triggerInstallPrompt());
  };

  const handleShare = async () => {
    handleCloseMenu();
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

  const MenuEntries: React.FC = () => {
    if (!config.content?.pages) {
      return null;
    }

    return (
      <>
        {config.content?.pages.map((page) => {
          if (page.hidden) {
            return null;
          }

          return (
            <div key={page.id}>
              {page.menuDivider ? <Divider /> : null}
              <MenuItem className={classes.menuItem} onClick={() => handlePageEntryClick(page.route)}>
                {typeof page.title === "function" ? page.title(t) : page.title}
              </MenuItem>
            </div>
          );
        })}
      </>
    );
  };

  const NavMenuContent = () => {
    return (
      <div className={classes.menuContent}>
        <MenuItem className={classes.menuItem} onClick={() => handlePageEntryClick("/")}>
          {t("common:pages.map")}
        </MenuItem>
        <MenuEntries />
        {useSelector((state: State) => state.app.installPrompt) && (
          <div>
            <Divider />
            <MenuItem className={classes.menuItem} onClick={handleInstall}>
              {t("common:pages.install")}
            </MenuItem>
          </div>
        )}
        <Divider />
        <MenuItem className={classes.menuItem} onClick={handleShare}>
          {t("common:pages.share")} <ShareIcon className={classes.menuIcon} />
        </MenuItem>
      </div>
    );
  };

  const isCurrentPageWelcomeScreen = welcomeStepsConfig.find(({ name }) => name === urlParams.subPage) !== undefined;
  const showSearch = !urlParams.subPage || isCurrentPageWelcomeScreen;

  return (
    <AppBar classes={{ root: classes.appBar }} style={{ height: 64, flex: "0 0 auto" }}>
      <Toolbar className={classes.fullHeightToolbar}>
        <Link to="/" style={{ pointerEvents: "auto" }}>
          {!isMobile && ((Logo && <Logo />) || <img src={config.buildJSON.logoSrc} className={classes.logo} />)}
        </Link>
        {showSearch && <FixedSearch />}
        <MenuIconButton handleMenu={handleOpenMenu} />
        <Drawer
          open={isMenuOpen}
          anchor="right"
          id="menu-appbar"
          keepMounted
          onClose={handleCloseMenu}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar className={classes.fullHeightToolbar}>
            {" "}
            {/* only here for the gutter feel free create your own gutter styles and remove this */}
            <MenuCloseButton handleClose={handleCloseMenu} />
          </Toolbar>
          <div className={classes.drawerScrollContainer}>
            <NavMenuContent />
            <div className={classes.socialIcons}>
              <IconButton size="small" href="https://github.com/CovOpen/CovMapper" target="_blank" rel="noopener">
                <GithubIcon />
              </IconButton>
              <IconButton size="small" href="https://twitter.com/CovMap" target="_blank" rel="noopener">
                <TwitterIcon />
              </IconButton>
              {/* <IconButton size="small" href="https://www.instagram.com/covmap/" target="_blank" rel="noopener">
                <InstagramIcon />
              </IconButton>
              <IconButton size="small" href="https://www.facebook.com/covmap" target="_blank" rel="noopener">
                <FacebookIcon />
              </IconButton> */}
            </div>
            {(Logo && (
              <div className={classes.drawerIcon}>
                <Logo />
              </div>
            )) || <img src={config.buildJSON.logoSrc} className={classes.logo} />}
            <Typography className={classes.version}>
              {"v" + VERSION} -{" "}
              <a
                href={"https://github.com/CovOpen/CovMapper/commit/" + HASH_LONG}
                target="_blank"
                rel="noopener noreferrer"
              >
                {HASH_SHORT}
              </a>
            </Typography>
          </div>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

const useIconStyles = makeStyles((theme) => ({
  menuIcon: {
    zIndex: 1400, // put it on top of everything
    marginLeft: "auto",
    padding: theme.spacing(0.5),
    pointerEvents: "auto",
    [theme.breakpoints.down("xs")]: {
      // on mobile devices
      "backgroundColor": theme.palette.background.default,
      "borderRadius": theme.shape.borderRadius * 1.5,
      "boxShadow": "0px 2px 5px -1px rgba(0,0,0,0.55)",
      "&:hover": {
        backgroundColor: theme.palette.background.default,
      },
    },
  },

  closeIcon: {
    "backgroundColor": theme.palette.secondary.main,
    "borderRadius": theme.shape.borderRadius * 1.5,
    "boxShadow": "0px 2px 5px -1px rgba(0,0,0,0.55)",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const MenuCloseButton = ({ handleClose }) => {
  const classes = useIconStyles();

  return (
    <IconButton // if open show close icon
      classes={{
        root: `${classes.menuIcon} ${classes.closeIcon}`,
      }}
      aria-label="Close Main Menu"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleClose}
      color="primary"
    >
      <CloseRounded />
    </IconButton>
  );
};

const MenuIconButton = ({ handleMenu }) => {
  const classes = useIconStyles();

  return (
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
  );
};
