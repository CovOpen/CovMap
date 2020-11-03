import React, { createRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { State } from "../../../src/state";
import Logo from "../static/images/logo.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    "& > *": {
      height: "38px",
      width: "auto",
    },
  },
  paused: {
    "& > *": {
      "-webkit-animation-play-state": "paused !important",
      "-moz-animation-play-state": "paused !important",
      "-o-animation-play-state": "paused !important",
      "animation-play-state": "paused !important",
    },
  },
}));

export function AnimatedLogo() {
  const classes = useStyles();
  const loading = useSelector((state: State) => state.app.isLoading);
  const logoRef = createRef<any>();

  useEffect(() => {
    if (logoRef.current) {
      if (!loading) {
        const svg = logoRef.current.children[0];
        svg.classList.add(classes.paused);
      } else {
        const svg = logoRef.current.children[0];
        svg.classList.remove(classes.paused);
      }
    }
  }, [loading]);

  return (
    <div ref={logoRef} className={classes.logo}>
      <Logo />
    </div>
  );
}
