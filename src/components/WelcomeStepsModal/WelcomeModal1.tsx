import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";
import { FullWidthFixedAspectImage } from "./FullWidthFixedAspectImage";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  listItemDiv: {
    display: "flex",
    flexDirection: "row",
    margin: "12px 12px 12px 8px",
  },
}));

export const WelcomeModal1: React.FC = () => {
  const classes = {
    ...useCommonWelcomeModalStyles(),
    ...useStyles(),
  };
  const { t } = useTranslation("common");

  const listIcon = (
    <img
      src={"/images/icon-checkmark-circle.svg"}
      alt="List Icon"
      style={{ width: "24px", height: "24px", marginRight: "12px" }}
    />
  );

  return (
    <>
      <Typography className={classes.title}>{t("welcome.title")}</Typography>

      <FullWidthFixedAspectImage aspect={62.1} src="/images/WelcomeModalImage1.svg" alt="Welcome" />

      <div className={classes.infoTextDiv}>
        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>{t("welcome.info-1")}</Typography>
        </div>
        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>{t("welcome.info-2")}</Typography>
        </div>

        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>{t("welcome.info-3")}</Typography>
        </div>

        <div className={classes.listItemDiv}>
          {listIcon}
          <Typography className={classes.largeText}>{t("welcome.info-4")}</Typography>
        </div>
      </div>
      <img src={"/images/Logo_Charite.svg"} alt="Charité Berlin" width="100" style={{ marginBottom: "24px" }} />
    </>
  );
};
