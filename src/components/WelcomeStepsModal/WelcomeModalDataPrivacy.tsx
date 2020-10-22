import React from "react";
import { config } from "app-config/index";
import { CancelOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  outerDiv: { marginBottom: "28px" },
  iconDiv: { position: "absolute", right: "10px", top: "10px" },
  icon: {
    fontSize: "36px",
    cursor: "pointer",
  },
}));

export const WelcomeModalDataPrivacy: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.outerDiv}>
      <div className={classes.iconDiv}>
        <CancelOutlined classes={{ root: classes.icon }} onClick={history.goBack} />
      </div>
      <config.content.PrivacyComponent />
    </div>
  );
};
