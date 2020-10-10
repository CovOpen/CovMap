import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

const useStyles = makeStyles(() => ({
  listItemDiv: {
    display: "flex",
    flexDirection: "row",
    margin: "6px"
  }
}))

export const WelcomeModal1: React.FC = () => {
  const classes = {
    ...useCommonWelcomeModalStyles(),
    ...useStyles()
  };

  const listIcon = <img src={"/images/illustration.png"} alt="List Icon" width="20px"/>;

  return <>
    <Typography className={classes.title}>Willkommen bei der CovMap</Typography>

    <img src={"/images/illustration.png"} alt="Welcome" width="100%"/>

    <div className={classes.infoTextDiv}>
      <div className={classes.listItemDiv}>
        {listIcon}
        <Typography className={classes.largeText}>Entwickelt von Ärzten der Charité Berlin</Typography>
      </div>
      <div className={classes.listItemDiv}>
        {listIcon}
        <Typography className={classes.largeText}>Geographische Informationen zum Corona-Virus in
          Echtzeit</Typography>
      </div>
    </div>

    <img src={"/images/illustration.png"} alt="Charité Berlin" width="100"/>
  </>;
};
